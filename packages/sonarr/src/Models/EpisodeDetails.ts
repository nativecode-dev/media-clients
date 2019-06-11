import { Image } from './Image'
import { Season } from './Season'
import { RestResource } from './RestResource'
import { QualityProfile } from './QualityProfile'

export interface EpisodeDetails extends RestResource {
  tvdbId: number
  tvRageId: number
  imdbId: string
  title: string
  cleanTitle: string
  status: string
  overview: string
  airTime: string
  monitored: boolean
  qualityProfileId: number
  seasonFolder: boolean
  lastInfoSync: Date
  runtime: number
  images: Image[]
  seriesType: string
  network: string
  useSceneNumbering: boolean
  titleSlug: string
  path: string
  year: number
  firstAired: Date
  qualityProfile: QualityProfile
  seasons: Season[]
}
