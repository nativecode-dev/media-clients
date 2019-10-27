import Table from 'cli-table2'

import { Is } from '@nofrills/types'

import { parse } from 'js2xmlparser'

import { Global } from './options/global'

export type ArrayFilter = <T>(value: T) => boolean
export type ObjectFilter = (name: string) => boolean

export const DefaultObjectFilter = () => true

function fromArray<T extends any>(values: T, compact: boolean = true): Table.Table {
  const table = new Table({
    head: Object.keys(values[0]),
    style: { compact },
  })

  const data = values.map((val: T) => Object.values(val))
  table.push(...data)
  return table
}

function fromObject<T extends any>(value: T, compact: boolean = false, filter?: ObjectFilter): Table.Table {
  const table = new Table({
    style: { compact },
  })

  const rows = Object.keys(value)
    .filter(filter || DefaultObjectFilter)
    .map(key => {
      const instance: any = {}
      const property = value[key]
      instance[key] = property

      if (Is.array(property)) {
        instance[key] = property.length > 0 ? fromArray(property).toString() : ''
      } else if (Is.object(property)) {
        instance[key] = fromObject(property).toString()
      }

      return instance
    })

  table.push(...rows)
  return table
}

export function Output<T extends any>(
  args: Global,
  value: T,
  tag: string,
  compact: boolean,
  filter: ObjectFilter = DefaultObjectFilter,
): void {
  switch (args.output) {
    case 'json':
      return console.log(JSON.stringify(value))

    case 'xml':
      return console.log(parse(tag, value))

    default:
      if (value && value.length > 0) {
        const table = fromArray(value, compact)
        return console.log(table.toString())
      } else if (value) {
        const table = fromObject(value, compact, filter)
        return console.log(table.toString())
      }
  }
}
