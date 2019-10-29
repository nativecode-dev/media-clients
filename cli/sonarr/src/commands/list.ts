import { CommandModule, Arguments, Options } from 'yargs'

import { Global, VerticalTable, HorizontalTable } from '@nativecode/media-cli'

import client from '../client'

import { DefaultFilter } from '../filters'

export interface ListOptions extends Global {
  ids?: string[]
  year?: number
}

const options: { [key: string]: Options } = {}

export class ListCommand implements CommandModule<{}, ListOptions> {
  aliases = ['ls']
  builder = options
  command = 'list [ids...]'
  handler = async (args: Arguments<ListOptions>) => {
    const sonarr = client(args)

    if (args.ids && args.ids.length > 0) {
      const ids = args.ids.map(arg => parseInt(arg, 0))
      const tasks = ids.map(id => sonarr.shows.id(id))
      const shows = await Promise.all(tasks)
      const seasons = shows.map(result => result.seasons)
      HorizontalTable(args, seasons, 'seasons', args.compact, DefaultFilter(seasons))
    } else {
      const shows = await sonarr.shows.list()
      HorizontalTable(args, shows, 'shows', args.compact, DefaultFilter(shows))
    }
  }
}

export default new ListCommand()
