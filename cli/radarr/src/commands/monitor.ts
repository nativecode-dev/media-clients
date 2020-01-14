import { Global, Output } from '@nativecode/media-cli'
import { Arguments, CommandModule } from 'yargs'

import client, { GetMovieById } from '../client'
import { ListPropertyFilter } from '../filters'

export interface MonitorOptions extends Global {
  id: string
  monitor: boolean
}

export class MonitorCommand implements CommandModule<{}, MonitorOptions> {
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
