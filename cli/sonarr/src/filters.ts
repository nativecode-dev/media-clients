const ignoreProperties = ['images', 'overview', 'seasons', 'subtitles', 'sortTitle', 'statistics']
const includeProperties: string[] = []

export function ListPropertyFilter(key: string): boolean {
  const included = includeProperties.includes(key)
  const ignored = ignoreProperties.includes(key) === false
  return ignored || included
}
