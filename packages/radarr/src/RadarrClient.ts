import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'

import { SystemResource } from './Resources/SystemResource'
import { MovieResource } from './Resources/MovieResource'
import { HistoryResource } from './Resources/HistoryResource'
import { IndexerResource } from './Resources/IndexerResource'
import { CalendarResource } from './Resources/CalendarResource'
import { DiskspaceResource } from './Resources/DiskspaceResource'
import { ProfileResource } from './Resources/ProfileResource'

export class RadarrClient {
  readonly calendar: CalendarResource
  readonly diskspace: DiskspaceResource
  readonly history: HistoryResource
  readonly indexer: IndexerResource
  readonly movie: MovieResource
  readonly profile: ProfileResource
  readonly system: SystemResource

  constructor(endpoint: URL, apikey: string, logger: Lincoln) {
    const url = this.getApiUrl(endpoint.toString())
    this.calendar = new CalendarResource(url, apikey, logger)
    this.diskspace = new DiskspaceResource(url, apikey, logger)
    this.history = new HistoryResource(url, apikey, logger)
    this.indexer = new IndexerResource(url, apikey, logger)
    this.movie = new MovieResource(url, apikey, logger)
    this.profile = new ProfileResource(url, apikey, logger)
    this.system = new SystemResource(url, apikey, logger)
  }

  private getApiUrl(endpoint: string) {
    if (endpoint.endsWith('/api') || endpoint.endsWith('/api/')) {
      return new URL(endpoint)
    }

    if (endpoint.endsWith('/')) {
      return new URL(`${endpoint}api`)
    }

    return new URL(`${endpoint}/api`)
  }
}
