import { CommandModule, Arguments } from 'yargs'

import client, { GetMovieById } from '../client'

import { Global, Output } from '@nativecode/media-cli'
import { DefaultFilter } from '../filters'

export interface MovieOptions extends Global {
  id: string
  property: string[]
}

export class MovieCommand implements CommandModule<{}, MovieOptions> {
  command = 'movie <id> [property...]'
  describe = 'view info for movie'
  handler = async (args: Arguments<MovieOptions>) => {
    try {
      const radarr = client(args)
      const movie = await GetMovieById(radarr, args.id)
      Output(args, movie, 'movie', args.compact, DefaultFilter)
    } catch (error) {
      console.error(error.message || 'ERROR')
      process.exit(-1)
    }
  }
}

export default new MovieCommand()
