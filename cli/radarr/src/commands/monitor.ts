import { Global, Output } from '@nativecode/media-cli'
import { Arguments, CommandModule } from 'yargs'

import logger from '../logging'

import client, { GetMovieById } from '../client'
import { ListPropertyFilter } from '../filters'

export interface MonitorOptions extends Global {
  id: string
  monitor: boolean
}

export class MonitorCommand implements CommandModule<{}, MonitorOptions> {
  private readonly log = logger.extend('monitor')

  builder = {
    monitor: {
      boolean: true,
      default: undefined,
    },
  }

  command = 'monitor <id> [monitor]'

  handler = async (args: Arguments<MonitorOptions>) => {
    const radarr = client(args)
    const movie = await GetMovieById(radarr, args.id)

    console.log(movie)

    const changed = args.monitor !== movie.monitored
    const defined = args.monitor !== undefined

    if (changed && defined) {
      movie.monitored = args.monitor
      this.log.trace(`args.monitor: ${args.monitor}`, `monitored: ${movie.monitored}`)
    }

    const output = {
      title: movie.title,
      available: movie.downloaded,
      monitored: movie.monitored,
      id: movie.id,
      imdb: args.id,
      tmdb: movie.tmdbId,
    }

    Output(args, output, movie.titleSlug, args.compact, ListPropertyFilter)
  }
}

export default new MonitorCommand()
