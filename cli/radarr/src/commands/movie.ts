import { URL } from 'url'
import { RadarrClient } from '@nativecode/radarr'
import { CommandModule, Arguments, Argv } from 'yargs'

import logger from '../logging'
import output from '../output'

import { Global } from '../options/global'

const log = logger

export interface MovieOptions extends Global {
  id: number
}

export class MovieCommand implements CommandModule<{}, MovieOptions> {
  command = 'movie <id>'
  describe = 'view info for movie'
  build = (argv: Argv): Argv => argv
  handler = async (args: Arguments<MovieOptions>) => {
    try {
      const url = new URL(args.endpoint)
      const radarr = new RadarrClient(url, args.apikey, log)
      const movie = await radarr.movie.id(args.id)
      output(args, movie)
    } catch (error) {
      console.error(error.message || 'ERROR')
      process.exit(-1)
    }
  }
}

export default new MovieCommand()
