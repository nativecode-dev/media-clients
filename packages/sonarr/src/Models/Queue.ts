import { Series } from './Series'
import { Episode } from './Episode'
import { RestResource } from './RestResource'
import { QualityProfile } from './QualityProfile'

export interface Queue extends RestResource {
  episode: Episode
  quality: QualityProfile
  series: Series
  size: number
  title: string
  sizeleft: number
  timeleft: string
  estimatedCompletionTime: string
  status: string
  trackedDownloadStatus: string
  statusMessages: string[]
  downloadId: string
  protocol: string
}
