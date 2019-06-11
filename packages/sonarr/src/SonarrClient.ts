import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { BackupResource } from './Resources/BackupResource'
import { SeriesResource } from './Resources/SeriesResource'
import { CalendarResource } from './Resources/CalendarResource'

export class SonarrClient {
  public readonly backup: BackupResource
  public readonly calendar: CalendarResource
  public readonly series: SeriesResource

  constructor(private readonly endpoint: URL, private readonly apikey: string, logger: Lincoln) {
    this.backup = new BackupResource(endpoint, apikey, logger)
    this.calendar = new CalendarResource(endpoint, apikey, logger)
    this.series = new SeriesResource(endpoint, apikey, logger)
  }
}
