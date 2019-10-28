import { Is } from '@nofrills/types'
import { Arguments, CommandModule } from 'yargs'
import { DictionaryOf } from '@nofrills/collections'
import { Global, FilterCompare, Output } from '@nativecode/media-cli'

import client from '../client'
import { ListPropertyFilter } from '../filters'

const OPERATORS: DictionaryOf<string> = {
  equal: '=',
  like: 'in',
  in: 'in',
  contains: 'in',
  '!equal': '!=',
  '!like': '!in',
  '!in': 'in',
  '!contains': 'in',
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
}

const FILTERS: DictionaryOf<FilterCompare> = {
  '=': (comparison: any, value: any): boolean => comparison.toLowerCase() === value.toLowerCase(),
  '!=': (comparison: any, value: any): boolean => comparison.toLowerCase() !== value.toLowerCase(),
  '>': (comparison: any, value: any): boolean => value > comparison,
  '>=': (comparison: any, value: any): boolean => value >= comparison,
  '<': (comparison: any, value: any): boolean => value < comparison,
  '<=': (comparison: any, value: any): boolean => value <= comparison,
  in: (comparison: any, value: any): boolean => {
    if (Is.string(value)) {
      return value.toLowerCase().includes(comparison.toLowerCase())
    } else if (Is.number(value)) {
      return value === comparison
    }
    return false
  },
  '!in': (comparison: any, value: any): boolean => {
    if (Is.string(value)) {
      return value.toLowerCase().includes(comparison.toLowerCase()) === false
    }
    return false
  },
}

export interface FindOptions extends Global {
  operator: string
  property: string
  summary: true
  value: string
}

export class FindCommand implements CommandModule<{}, FindOptions> {
  builder = {
    summary: {
      boolean: true,
      default: false,
    },
  }

  command = 'find <property> <operator> <value>'

  handler = async (args: Arguments<FindOptions>) => {
    const radarr = client(args)
    const movies = await radarr.movie.list()

    const results = movies.filter(movie => {
      const instance: any = movie
      const property = instance[args.property]
      const operator = OPERATORS[args.operator]
      const filter = FILTERS[operator]
      return filter(args.value, property)
    })

    if (args.summary) {
      Output(args, { found: results.length }, 'movie', args.compact, ListPropertyFilter)
    } else {
      Output(args, results, 'movie', args.compact, ListPropertyFilter)
    }
  }
}

export default new FindCommand()
