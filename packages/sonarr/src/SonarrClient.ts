import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { BackupResource } from './Resources/BackupResource'
import { SeriesResource } from './Resources/SeriesResource'
import { SystemResource } from './Resources/SystemResource'
import { CommandResource } from './Resources/CommandResource'
import { CalendarResource } from './Resources/CalendarResource'
import { IndexerResource } from './Resources/IndexerResource'

export class SonarrClient {
  public readonly backup: BackupResource
  public readonly calendar: CalendarResource
  public readonly command: CommandResource
  public readonly indexer: IndexerResource
  public readonly shows: SeriesResource
  public readonly system: SystemResource

  constructor(private readonly endpoint: URL, private readonly apikey: string, logger: Lincoln) {
    this.backup = new BackupResource(endpoint, apikey, logger)
    this.calendar = new CalendarResource(endpoint, apikey, logger)
    this.command = new CommandResource(endpoint, apikey, logger)
    this.indexer = new IndexerResource(endpoint, apikey, logger)
    this.shows = new SeriesResource(endpoint, apikey, logger)
    this.system = new SystemResource(endpoint, apikey, logger)
  }
}
