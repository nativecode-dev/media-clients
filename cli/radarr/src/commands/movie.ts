import { URL } from 'url'
import { RadarrClient } from '@nativecode/radarr'
import { CommandModule, Arguments, Argv } from 'yargs'

import { Global } from '../options/global'
import logger from '../logging'

const log = logger

export interface MovieOptions extends Global {
  id: number
}

export class MovieCommand implements CommandModule<{}, MovieOptions> {
  command = 'movie <id>'
  describe = 'view info for movie'
  build = (argv: Argv): Argv => argv
  handler = async (args: Arguments<MovieOptions>) => {
    const radarr = new RadarrClient(new URL(args.endpoint), args.apikey, log)
    const movie = await radarr.movie.id(args.id)
    console.log(movie)
  }
}

export default new MovieCommand()
