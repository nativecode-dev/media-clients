import { Is } from '@nofrills/types'
import { Arguments, CommandModule } from 'yargs'
import { DictionaryOf } from '@nofrills/collections'
import { Global, FilterCompare, VerticalTable } from '@nativecode/media-cli'

import client from '../client'
import logger from '../logging'

import { DefaultFilter } from '../filters'

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
  private readonly log = logger.extend('find')

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
      this.log.trace(args.property, operator, args.value)
      return filter(args.value, property)
    })

    if (args.summary) {
      VerticalTable(args, { found: results.length }, 'movie', args.compact, DefaultFilter)
    } else {
      VerticalTable(args, results, 'movie', args.compact, DefaultFilter)
    }
  }
}

export default new FindCommand()
