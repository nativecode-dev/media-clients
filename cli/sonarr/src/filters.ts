import { FilterFunction } from '@nativecode/media-cli'

import logger from './logging'

export class PropertyFilter {
  private readonly log = logger.extend('property-filter')

  constructor(private readonly included: string[] = [], private readonly ignored: string[] = []) {}

  filtered<T extends any>(key: string, instance: T): boolean {
    const ignored = this.ignored.includes(key)
    const included = this.included.includes(key)
    const value = instance[key]

    this.log.trace(key, ignored, included, value)

    if (ignored === false || included) {
      return true
    }

    return false
  }

  ignore(property: string): void {
    this.ignored.push(property)
  }

  include(property: string): void {
    this.included.push(property)
  }
}

const DefaultPropertyFilter = new PropertyFilter(
  ['id', 'title'],
  ['images', 'overview', 'seasons', 'subtitles', 'sortTitle', 'statistics'],
)

export function DefaultFilter<T>(instance: T): FilterFunction {
  return (key: string) => DefaultPropertyFilter.filtered(key, instance)
}

export default DefaultPropertyFilter
