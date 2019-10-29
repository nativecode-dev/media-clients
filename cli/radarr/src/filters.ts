export class PropertyFilter {
  constructor(private readonly included: string[] = [], private readonly ignored: string[] = []) {}

  filtered<T>(instance: T): boolean {
    return Object.keys(instance).reduce<boolean>((result, key) => {
      const ignored = this.ignored.includes(key) === false
      const included = this.included.includes(key)

      if (ignored && included) {
        return true
      }

      return result
    }, false)
  }

  ignore(property: string): void {
    this.ignored.push(property)
  }

  include(property: string): void {
    this.included.push(property)
  }
}

const DefaultPropertyFilter = new PropertyFilter(['images', 'overview', 'subtitles', 'sortTitle', 'statistics'])

export function DefaultFilter(key: string): boolean {
  return DefaultPropertyFilter.filtered(key)
}

export default DefaultPropertyFilter
