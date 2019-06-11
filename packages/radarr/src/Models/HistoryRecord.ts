import { Movie } from './Movie'
import { Quality } from './Quality'
import { HistoryData } from './HistoryData'

export interface HistoryRecord {
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
  id: number
}
