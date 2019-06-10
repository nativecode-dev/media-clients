import { Quality } from './Quality'
import { MediaInfo } from './MediaInfo'

export interface MovieFile {
  movieId: number
  relativePath: string
  size: number
  dateAdded: Date
  quality: Quality
  edition: string
  mediaInfo: MediaInfo
  id: number
}
