import { Language } from './Language'
import { MediaInfo } from './MediaInfo'
import { RestResource } from './RestResource'
import { EpisodeFileQuality } from './EpisodeFileQuality'

export interface EpisodeFile extends RestResource {
  seriesId: number
  seasonNumber: number
  relativePath: string
  path: string
  size: number
  dataAdded: string
  sceneName: string
  quality: EpisodeFileQuality
  language: Language
  mediaInfo: MediaInfo
  originalFilePath: string
  qualityCutoffNotMet: boolean
}
