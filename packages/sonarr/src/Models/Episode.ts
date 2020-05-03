import { RestResource } from './RestResource'
import { EpisodeDetails } from './EpisodeDetails'
import { EpisodeFile } from './EpisodeFile'

export interface Episode extends RestResource {
  seriesId: number
  episodeFile: EpisodeFile
  episodeFileId: number
  seasonNumber: number
  episodeNumber: number
  title: string
  airDate: string
  airDateUtc: Date
  overview: string
  hasFile: boolean
  monitored: boolean
  sceneEpisodeNumber: number
  sceneSeasonNumber: number
  tvDbEpisodeId: number
  series: EpisodeDetails
  downloading: boolean
}
