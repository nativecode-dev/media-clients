import { Movie } from '@nativecode/radarr'
import { CommandModule, Arguments } from 'yargs'

import client from '../client'
import logger from '../logging'

import { CreateIntFilter, Global, Output } from '@nativecode/media-cli'

const log = logger.extend('list')

export interface ListOptions extends Global {
  year?: string
}

interface MovieDisplay {
  id: number
  imdb: string
  tmdb: number
  title: string
  year: number
}

function filter(args: Arguments<ListOptions>, movies: Movie[]): Movie[] {
  if (args.year) {
    const year = args.year
    log.debug('filter', args.year)

    movies = movies.filter(movie => {
      const intFilter = CreateIntFilter(year)
      return intFilter(movie.year.toString())
    })
  }

  if (movies.length > 0) {
    return movies
  }

  console.log('No movies were found.')
  return []
}

function map(movies: Movie[]): MovieDisplay[] {
  return movies.map(movie => ({
    id: movie.id,
    imdb: movie.imdbId,
    tmdb: movie.tmdbId,
    title: movie.title,
    year: movie.year,
  }))
}

export class ListCommand implements CommandModule<{}, ListOptions> {
  aliases = ['ls']
  command = 'list [year]'
  describe = 'show list of available movies'
  handler = async (args: Arguments<ListOptions>) => {
    try {
      const radarr = client(args)
      const movies = await radarr.movie.list()
      const filtered = map(filter(args, movies))
      Output(args, filtered, 'movie', args.compact)
    } catch (error) {
      console.error(error.message || 'ERROR')
      process.exit(-1)
    }
  }
}

export default new ListCommand()
