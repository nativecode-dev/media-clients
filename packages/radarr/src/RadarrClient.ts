import { URL } from 'url'
import { Lincoln, CreateLogger } from '@nofrills/lincoln-debug'

import { SystemResource } from './Resources/SystemResource'
import { MovieResource } from './Resources/MovieResource'
import { HistoryResource } from './Resources/HistoryResource'
import { IndexerResource } from './Resources/IndexerResource'
import { CalendarResource } from './Resources/CalendarResource'
import { DiskspaceResource } from './Resources/DiskspaceResource'
import { ProfileResource } from './Resources/ProfileResource'

export class RadarrClient {
  private readonly log: Lincoln

  readonly calendar: CalendarResource
  readonly diskspace: DiskspaceResource
  readonly history: HistoryResource
  readonly indexer: IndexerResource
  readonly movie: MovieResource
  readonly profile: ProfileResource
  readonly system: SystemResource

  constructor(endpoint: URL, apikey: string, logger?: Lincoln) {
    this.log = logger ? logger.extend('radarr') : CreateLogger('radarr')

    const url = this.getApiUrl(endpoint.toString())
    this.calendar = new CalendarResource(url, apikey, this.log)
    this.diskspace = new DiskspaceResource(url, apikey, this.log)
    this.history = new HistoryResource(url, apikey, this.log)
    this.indexer = new IndexerResource(url, apikey, this.log)
    this.movie = new MovieResource(url, apikey, this.log)
    this.profile = new ProfileResource(url, apikey, this.log)
    this.system = new SystemResource(url, apikey, this.log)
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
