import { URL } from 'url'

import { CommandModule, Arguments, Argv } from 'yargs'
import { RadarrClient, Movie } from '@nativecode/radarr'

import { Global } from '../options/global'
import logger from '../logging'

const log = logger.extend('list')

export interface ListOptions extends Global {
  year?: string
}

interface MovieLite {
  title: string
  year: number
}

type FilterFunction = (value: string) => boolean

function convert(filter: string): FilterFunction {
  if (filter.startsWith('<=')) {
    return (value: string) => parseInt(value, 0) <= parseInt(filter.substring(2), 0)
  }

  if (filter.startsWith('>=')) {
    return (value: string) => parseInt(value, 0) >= parseInt(filter.substring(2), 0)
  }

  if (filter.startsWith('>')) {
    return (value: string) => parseInt(value, 0) > parseInt(filter.substring(1), 0)
  }

  if (filter.startsWith('<')) {
    return (value: string) => parseInt(value, 0) < parseInt(filter.substring(1), 0)
  }

  return () => false
}

function filter(args: Arguments<ListOptions>, movies: Movie[]): Movie[] {
  if (args.year) {
    const year = args.year
    log.debug('filter', args.year)

    movies = movies.filter(movie => {
      const func = convert(year)
      return func(movie.year.toString())
    })
  }

  if (movies.length > 0) {
    return movies
  }

  console.log('No movies were found.')
  return []
}

function map(movies: Movie[]): MovieLite[] {
  return movies.map(movie => ({
    title: movie.title,
    year: movie.year,
  }))
}

export class ListCommand implements CommandModule<{}, ListOptions> {
  command = 'list [year]'
  describe = 'show list of available movies'
  build = (argv: Argv): Argv => argv
  handler = async (args: Arguments<ListOptions>) => {
    const radarr = new RadarrClient(new URL(args.endpoint), args.apikey, log)
    const movies = await radarr.movie.list()
    map(filter(args, movies)).forEach(output => console.log(output))
  }
}

export default new ListCommand()
