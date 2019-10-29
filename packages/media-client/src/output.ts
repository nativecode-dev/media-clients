import Table from 'cli-table2'

import { Is } from '@nofrills/types'

import { parse } from 'js2xmlparser'

import { Global } from './options/global'

export type ArrayFilter = <T>(value: T) => boolean
export type ObjectFilter = (name: string) => boolean

export const DefaultObjectFilter = () => true

function createTable<T extends any>(
  value: T,
  compact: boolean,
  filter?: ObjectFilter,
  headers: string[] = [],
): Table.Table {
  const table = new Table({ head: headers, style: { compact } })

  const rows = Object.keys(value)
    .filter(filter || DefaultObjectFilter)
    .map(key => {
      const instance: any = {}
      const property = value[key]
      instance[key] = property

      if (Is.array(property)) {
        instance[key] = property.length > 0 ? createTable(property, compact, filter).toString() : ''
      } else if (Is.object(property)) {
        instance[key] = createTable(property, compact, filter).toString()
      }

      return instance
    })

  table.push(...rows)
  return table
}

export function HorizontalTable<T extends any>(
  args: Global,
  value: T | T[],
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
      const table = createTable(value, compact, filter, Object.keys(value))
      return console.log(table.toString())
  }
}

export function VerticalTable<T extends any>(
  args: Global,
  value: T | T[],
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
      const table = createTable(value, compact, filter)
      return console.log(table.toString())
  }
}
