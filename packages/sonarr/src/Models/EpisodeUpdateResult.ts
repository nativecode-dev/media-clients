import { EpisodeUpdateQuality } from './EpisodeUpdateQuality'

export interface EpisodeUpdateResult {
  seriesId: number
  seasonNumber: number
  path: string
  size: number
  dataAdded: string
  sceneName: string
  quality: EpisodeUpdateQuality
}
