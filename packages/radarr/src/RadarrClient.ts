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
    this.calendar = new CalendarResource(endpoint, apikey, logger)
    this.diskspace = new DiskspaceResource(endpoint, apikey, logger)
    this.history = new HistoryResource(endpoint, apikey, logger)
    this.indexer = new IndexerResource(endpoint, apikey, logger)
    this.movie = new MovieResource(endpoint, apikey, logger)
    this.profile = new ProfileResource(endpoint, apikey, logger)
    this.system = new SystemResource(endpoint, apikey, logger)
  }
}
