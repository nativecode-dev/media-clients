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
    const url = this.getApiUrl(endpoint.toString())
    this.backup = new BackupResource(url, apikey, logger)
    this.calendar = new CalendarResource(url, apikey, logger)
    this.command = new CommandResource(url, apikey, logger)
    this.diskspace = new DiskspaceResource(url, apikey, logger)
    this.episodes = new EpisodeResource(url, apikey, logger)
    this.files = new EpisodeFileResource(url, apikey, logger)
    this.history = new HistoryResource(url, apikey, logger)
    this.indexer = new IndexerResource(url, apikey, logger)
    this.parser = new ParsedEpisodeInfoResource(url, apikey, logger)
    this.profile = new ProfileResource(url, apikey, logger)
    this.release = new ReleaseResource(url, apikey, logger)
    this.series = new SeriesResource(url, apikey, logger)
    this.system = new SystemResource(url, apikey, logger)
    this.wanted = new WantedMissingResource(url, apikey, logger)
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
