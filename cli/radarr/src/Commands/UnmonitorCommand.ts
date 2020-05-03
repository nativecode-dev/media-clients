import { Arguments } from 'yargs'
import { RadarrClient } from '@nativecode/radarr'
import { BaseCommand } from '@nativecode/media-cli'

import { RadarrOptions } from '../Options/RadarrOptions'

export class UnmonitorCommand extends BaseCommand<RadarrOptions> {
  aliases = ['unmonitor']
  command = 'unmonitor'
  builder = {}

  handler = async (args: Arguments<RadarrOptions>) => {
    const radarr = new RadarrClient({ apikey: args.apikey, host: args.apiurl })
    const movies = await radarr.unmonitor(args.dryrun)

    if (args.dryrun) {
      console.log(movies.map((movie) => movie.title))
    }
  }
}
