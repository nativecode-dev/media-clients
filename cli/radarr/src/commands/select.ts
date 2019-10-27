import yargsui from 'yargs-interactive'

import { URL } from 'url'
import { RadarrClient } from '@nativecode/radarr'
import { CommandModule, Arguments, Argv } from 'yargs'

import { Global } from '../options/global'
import logger from '../logging'

export interface SelectOptions extends Global {
  series?: string
  season?: string
}

export class SelectCommand implements CommandModule<{}, SelectOptions> {
  command = 'select'
  describe = 'view info for movie'
  build = (argv: Argv): Argv => argv
  handler = async (args: Arguments<SelectOptions>) => {
    const radarr = new RadarrClient(new URL(args.endpoint), args.apikey, logger.extend('select'))
    const movies = await radarr.movie.list()

    const results = await yargsui().interactive({
      interactive: {
        default: true,
      },
      movie: {
        choices: movies.map(movie => movie.title),
        describe: 'select movie',
        prompt: 'always',
        type: 'list',
      },
    })

    const selected = movies.find(movie => movie.title === results.movie)

    if (selected) {
      const movie = await radarr.movie.id(selected.id)
      console.log(movie)
    }
  }
}

export default new SelectCommand()
