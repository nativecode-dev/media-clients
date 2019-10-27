import { CommandModule, Arguments } from 'yargs'

import { Global, Output } from '@nativecode/media-cli'
import client from '../client'

export interface ListOptions extends Global {
  movie?: string
  year?: number
}

export class ListCommand implements CommandModule<{}, ListOptions> {
  command = 'list [shows]'
  build = {}
  handler = async (args: Arguments<ListOptions>) => {
    const sonarr = client(args)

    if (args.shows) {
      const seasons = await sonarr.shows.list()
      Output(args, seasons, 'seasons', args.compact)
    } else {
      const shows = await sonarr.shows.list()
      Output(args, shows, 'shows', args.compact)
    }
  }
}

export default new ListCommand()
