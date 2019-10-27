export type FilterFunction = (value: string) => boolean

export function createIntFilter(filter: string): FilterFunction {
  if (filter.startsWith('<=')) {
    return (value: string) => parseInt(value, 0) <= parseInt(filter.substring(2), 0)
  }

  if (filter.startsWith('>=')) {
    return (value: string) => parseInt(value, 0) >= parseInt(filter.substring(2), 0)
  }

  if (filter.startsWith('!=')) {
    return (value: string) => parseInt(value, 0) !== parseInt(filter.substring(2), 0)
  }

  if (filter.startsWith('>')) {
    return (value: string) => parseInt(value, 0) > parseInt(filter.substring(1), 0)
  }

  if (filter.startsWith('<')) {
    return (value: string) => parseInt(value, 0) < parseInt(filter.substring(1), 0)
  }

  if (filter.startsWith('=')) {
    return (value: string) => parseInt(value, 0) === parseInt(filter.substring(1), 0)
  }

  return () => false
}

export function createStringFilter(filter: string): FilterFunction {
  if (filter.startsWith('<=')) {
    return (value: string) => value <= filter.substring(2)
  }

  if (filter.startsWith('>=')) {
    return (value: string) => value >= filter.substring(2)
  }

  if (filter.startsWith('!=')) {
    return (value: string) => value !== filter.substring(1)
  }

  if (filter.startsWith('>')) {
    return (value: string) => value > filter.substring(1)
  }

  if (filter.startsWith('<')) {
    return (value: string) => value < filter.substring(1)
  }

  if (filter.startsWith('=')) {
    return (value: string) => value === filter.substring(1)
  }

  return () => false
}
