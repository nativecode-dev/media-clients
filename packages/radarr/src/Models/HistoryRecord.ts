import { Movie } from './Movie'
import { Quality } from './Quality'
import { HistoryData } from './HistoryData'
import { RestResource } from './RestResource'

export interface HistoryRecord extends RestResource {
  episodeId: number
  movieId: number
  seriesId: number
  sourceTitle: string
  quality: Quality
  qualityCutoffNotMet: boolean
  date: Date
  downloadId: string
  eventType: string
  data: HistoryData
  movie: Movie
}
