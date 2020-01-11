import { RestResource, Series } from '.'

export interface WantedMissing extends RestResource {
  seriesId: number
  episodeFileId: number
  seasonNumber: number
  episodeNumber: number
  title: string
  airDate: string
  aitDateUtc: string
  overview: string
  hasFile: boolean
  monitored: boolean
  unverifiedSceneNumbering: boolean
  series: Series
}
