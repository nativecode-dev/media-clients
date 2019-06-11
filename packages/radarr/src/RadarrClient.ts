import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'

import { SystemResource } from './Models/SystemResource'
import { MovieResource } from './Resources/MovieResource'
import { HistoryResource } from './Resources/HistoryResource'
import { CalendarResource } from './Resources/CalendarResource'
import { DiskspaceResource } from './Resources/DiskspaceResource'

export class RadarrClient {
  public readonly calendar: CalendarResource
  public readonly diskspace: DiskspaceResource
  public readonly history: HistoryResource
  public readonly movie: MovieResource
  public readonly system: SystemResource

  constructor(private readonly endpoint: URL, private readonly apikey: string, private readonly logger: Lincoln) {
    this.calendar = new CalendarResource(endpoint, apikey, logger)
    this.diskspace = new DiskspaceResource(endpoint, apikey, logger)
    this.history = new HistoryResource(endpoint, apikey, logger)
    this.movie = new MovieResource(endpoint, apikey, logger)
    this.system = new SystemResource(endpoint, apikey, logger)
  }
}
