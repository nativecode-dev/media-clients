import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'

import { BackupResource } from './Resources/BackupResource'
import { SeriesResource } from './Resources/SeriesResource'
import { SystemResource } from './Resources/SystemResource'
import { CommandResource } from './Resources/CommandResource'
import { CalendarResource } from './Resources/CalendarResource'
import { IndexerResource } from './Resources/IndexerResource'
import { EpisodeResource } from './Resources/EpisodeResource'
import { ProfileResource } from './Resources/ProfileResource'

export class SonarrClient {
  public readonly backup: BackupResource
  public readonly calendar: CalendarResource
  public readonly command: CommandResource
  public readonly episodes: EpisodeResource
  public readonly indexer: IndexerResource
  public readonly profile: ProfileResource
  public readonly shows: SeriesResource
  public readonly system: SystemResource

  constructor(endpoint: URL, apikey: string, logger: Lincoln) {
    this.backup = new BackupResource(endpoint, apikey, logger)
    this.calendar = new CalendarResource(endpoint, apikey, logger)
    this.command = new CommandResource(endpoint, apikey, logger)
    this.episodes = new EpisodeResource(endpoint, apikey, logger)
    this.indexer = new IndexerResource(endpoint, apikey, logger)
    this.profile = new ProfileResource(endpoint, apikey, logger)
    this.shows = new SeriesResource(endpoint, apikey, logger)
    this.system = new SystemResource(endpoint, apikey, logger)
  }
}
