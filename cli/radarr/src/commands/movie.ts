import { CommandModule, Arguments } from 'yargs'

import client from '../client'

import { Global, Output } from '@nativecode/media-cli'

export interface MovieOptions extends Global {
  id: number
  property: string[]
}

export class MovieCommand implements CommandModule<{}, MovieOptions> {
  command = 'movie <id> [property...]'
  describe = 'view info for movie'
  handler = async (args: Arguments<MovieOptions>) => {
    try {
      const radarr = client(args)
      const movie = await radarr.movie.id(args.id)
      const filter =
        args.property.length > 0
          ? (property: string) => args.property.map(p => p.toLowerCase()).includes(property.toLowerCase())
          : undefined
      Output(args, movie, 'movie', args.compact, filter)
    } catch (error) {
      console.error(error.message || 'ERROR')
      process.exit(-1)
    }
  }
}

export default new MovieCommand()
