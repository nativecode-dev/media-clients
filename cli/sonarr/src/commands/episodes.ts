import { Global, Output } from '@nativecode/media-cli'
import { Arguments, CommandModule } from 'yargs'

import client from '../client'

import { DefaultFilter } from '../filters'

export interface EpisodeOptions extends Global {
  showId: string
  seasons: string[]
}

export class EpisodesCommand implements CommandModule<{}, EpisodeOptions> {
  aliases = ['ep']
  command = 'episodes <show-id> [seasons...]'
  handler = async (args: Arguments<EpisodeOptions>) => {
    const sonarr = client(args)
    const id = parseInt(args.showId, 0)
    const episodes = await sonarr.episodes.list(id)
    const seasons = args.seasons.map(season => parseInt(season, 0))
    const filtered = episodes.filter(episode => seasons.includes(episode.seasonNumber))
    Output(args, filtered, 'episodes', args.compact, DefaultFilter)
  }
}

export default new EpisodesCommand()
