import { Quality } from './Quality'
import { MediaInfo } from './MediaInfo'
import { RestResource } from './RestResource'

export interface MovieFile extends RestResource {
  movieId: number
  relativePath: string
  size: number
  dateAdded: Date
  quality: Quality
  edition: string
  mediaInfo: MediaInfo
}
