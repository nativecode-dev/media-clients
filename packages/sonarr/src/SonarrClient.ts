import { URL } from 'url'
import { Lincoln, CreateLogger } from '@nofrills/lincoln-debug'

import { BackupResource } from './Resources/BackupResource'
import { SeriesResource } from './Resources/SeriesResource'
import { SystemResource } from './Resources/SystemResource'
import { CommandResource } from './Resources/CommandResource'
import { IndexerResource } from './Resources/IndexerResource'
import { EpisodeResource } from './Resources/EpisodeResource'
import { ProfileResource } from './Resources/ProfileResource'
import { HistoryResource } from './Resources/HistoryResource'
import { ReleaseResource } from './Resources/ReleaseResource'
import { CalendarResource } from './Resources/CalendarResource'
import { DiskspaceResource } from './Resources/DiskspaceResource'
import { EpisodeFileResource } from './Resources/EpisodeFileResource'
import { WantedMissingResource } from './Resources/WantedMissingResource'
import { ParsedEpisodeInfoResource } from './Resources/ParsedEpisodeInfoResource'

export class SonarrClient {
  private readonly log: Lincoln

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

  constructor(endpoint: URL, apikey: string, logger?: Lincoln) {
    this.log = logger ? logger.extend('sonarr') : CreateLogger('sonarr')

    const url = this.getApiUrl(endpoint.toString())
    this.backup = new BackupResource(url, apikey, this.log)
    this.calendar = new CalendarResource(url, apikey, this.log)
    this.command = new CommandResource(url, apikey, this.log)
    this.diskspace = new DiskspaceResource(url, apikey, this.log)
    this.episodes = new EpisodeResource(url, apikey, this.log)
    this.files = new EpisodeFileResource(url, apikey, this.log)
    this.history = new HistoryResource(url, apikey, this.log)
    this.indexer = new IndexerResource(url, apikey, this.log)
    this.parser = new ParsedEpisodeInfoResource(url, apikey, this.log)
    this.profile = new ProfileResource(url, apikey, this.log)
    this.release = new ReleaseResource(url, apikey, this.log)
    this.series = new SeriesResource(url, apikey, this.log)
    this.system = new SystemResource(url, apikey, this.log)
    this.wanted = new WantedMissingResource(url, apikey, this.log)
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
