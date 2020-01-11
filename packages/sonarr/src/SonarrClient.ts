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
import { EpisodeFileResource } from './Resources/EpisodeFileResource'
import { DiskspaceResource } from './Resources/DiskspaceResource'
import { HistoryResource } from './Resources/HistoryResource'
import { WantedMissingResource } from './Resources/WantedMissingResource'
import { ParsedEpisodeInfoResource } from './Resources/ParsedEpisodeInfoResource'
import { ReleaseResource } from './Resources/ReleaseResource'

export class SonarrClient {
  public readonly backup: BackupResource
  public readonly calendar: CalendarResource
  public readonly command: CommandResource
  public readonly diskspace: DiskspaceResource
  public readonly episodes: EpisodeResource
  public readonly files: EpisodeFileResource
  public readonly history: HistoryResource
  public readonly indexer: IndexerResource
  public readonly parser: ParsedEpisodeInfoResource
  public readonly profile: ProfileResource
  public readonly release: ReleaseResource
  public readonly series: SeriesResource
  public readonly system: SystemResource
  public readonly wanted: WantedMissingResource

  constructor(endpoint: URL, apikey: string, logger: Lincoln) {
    this.backup = new BackupResource(endpoint, apikey, logger)
    this.calendar = new CalendarResource(endpoint, apikey, logger)
    this.command = new CommandResource(endpoint, apikey, logger)
    this.diskspace = new DiskspaceResource(endpoint, apikey, logger)
    this.episodes = new EpisodeResource(endpoint, apikey, logger)
    this.files = new EpisodeFileResource(endpoint, apikey, logger)
    this.history = new HistoryResource(endpoint, apikey, logger)
    this.indexer = new IndexerResource(endpoint, apikey, logger)
    this.parser = new ParsedEpisodeInfoResource(endpoint, apikey, logger)
    this.profile = new ProfileResource(endpoint, apikey, logger)
    this.release = new ReleaseResource(endpoint, apikey, logger)
    this.series = new SeriesResource(endpoint, apikey, logger)
    this.system = new SystemResource(endpoint, apikey, logger)
    this.wanted = new WantedMissingResource(endpoint, apikey, logger)
  }
}
