import { Movie } from '@nativecode/radarr'
import { Arguments, CommandModule } from 'yargs'
import { Global, VerticalTable } from '@nativecode/media-cli'

import logger from '../logging'

import client, { GetMovieById } from '../client'
import { DefaultFilter } from '../filters'

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

    const changed = args.monitor !== movie.monitored
    const defined = args.monitor !== undefined && movie.id

    if (changed && defined) {
      movie.monitored = args.monitor
      await radarr.movie.update(movie as Movie)
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

    VerticalTable(args, output, movie.titleSlug, args.compact, DefaultFilter)
  }
}

export default new MonitorCommand()
