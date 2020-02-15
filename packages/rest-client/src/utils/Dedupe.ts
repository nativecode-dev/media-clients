export function Dedupe<T extends any>(source: T[], target: T[] = []): T[] {
  return source
    .concat(target || [])
    .filter((item, index, array) => array.indexOf(item) === index)
    .reduce<T[]>((results, item) => {
      if (results.includes(item)) {
        return results
      }
      return [...results, item]
    }, [])
}
