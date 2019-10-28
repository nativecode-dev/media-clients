interface FilterStatement {
  operation: string
  value: string
}

function getStatement(value: string): FilterStatement {
  const regex = /([<>!=]{0,2})([^\n]+)/g
  const matches = regex.exec(value)

  if (matches) {
    const operation = matches[1]
    const value = matches[2]

    return {
      operation,
      value,
    }
  }

  return {
    operation: '',
    value: '',
  }
}

export type FilterCompare = <T>(comparison: T, value: T) => boolean
export type FilterConverter = (value: string) => any
export type FilterFunction = (value: string) => boolean

const DefaultConverter: FilterConverter = value => value

export function CreateFilter(filter: string, converter: FilterConverter = DefaultConverter): FilterFunction {
  const statement = getStatement(filter)

  switch (statement.operation) {
    case '=':
      return (value: string) => converter(value) === converter(statement.value)
    case '!=':
      return (value: string) => converter(value) !== converter(statement.value)
    case '>':
      return (value: string) => converter(value) > converter(statement.value)
    case '>=':
      return (value: string) => converter(value) >= converter(statement.value)
    case '<':
      return (value: string) => converter(value) < converter(statement.value)
    case '<=':
      return (value: string) => converter(value) <= converter(statement.value)
    default:
      return (value: string) => converter(value) === converter(statement.value)
  }
}

export function CreateIntFilter(filter: string): FilterFunction {
  return CreateFilter(filter, value => parseInt(value, 0))
}
