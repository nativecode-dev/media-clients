import { Series } from './Series'
import { Episode } from './Episode'
import { RestResource } from './RestResource'
import { EpisodeFileQuality } from './EpisodeFileQuality'

export interface HistoryRecord extends RestResource {
  episodeId: number
  seriesId: number
  sourceTitle: string
  quality: EpisodeFileQuality
  qualityCutoffNotMet: boolean
  date: string
  downloadId: string
  eventType: string
  data: {
    droppedPath: string
    importedPath: string
    downloadClient: string
  }
  episode: Episode
  series: Series
}
