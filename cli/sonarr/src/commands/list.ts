import { CommandModule, Arguments } from 'yargs'

import { Global, Output } from '@nativecode/media-cli'
import client from '../client'

export interface ListOptions extends Global {
  movie?: string
  year?: number
}

export class ListCommand implements CommandModule<{}, ListOptions> {
  command = 'list [series]'
  build = {}
  handler = async (args: Arguments<ListOptions>) => {
    const sonarr = client(args)

    if (args.series) {
      const seasons = await sonarr.series.list()
      Output(args, seasons, 'seasons', args.compact)
    } else {
      const series = await sonarr.series.list()
      Output(args, series, 'series', args.compact)
    }
  }
}

export default new ListCommand()
