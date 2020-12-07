import merge from 'deepmerge'

import { URL } from 'url'
import { Lincoln, CreateLogger } from '@nofrills/lincoln-debug'

import { SonarrOptions } from './SonarrOptions'
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
import { RootfolderResource } from './Resources/RootfolderResource'

const DefaultSonarrOptions: Partial<SonarrOptions> = {
  host: 'localhost',
  port: 8989,
  secure: false,
}

export class SonarrClient {
  private readonly log: Lincoln
  private readonly options: SonarrOptions

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
  public readonly rootfolder: RootfolderResource

  constructor(options: Partial<SonarrOptions>, logger?: Lincoln) {
    this.log = logger ? logger.extend('sonarr') : CreateLogger('sonarr')
    this.options = merge.all<SonarrOptions>([DefaultSonarrOptions, options])

    const url = this.url()
    this.backup = new BackupResource(url, this.options.apikey, this.log)
    this.calendar = new CalendarResource(url, this.options.apikey, this.log)
    this.command = new CommandResource(url, this.options.apikey, this.log)
    this.diskspace = new DiskspaceResource(url, this.options.apikey, this.log)
    this.episodes = new EpisodeResource(url, this.options.apikey, this.log)
    this.files = new EpisodeFileResource(url, this.options.apikey, this.log)
    this.history = new HistoryResource(url, this.options.apikey, this.log)
    this.indexer = new IndexerResource(url, this.options.apikey, this.log)
    this.parser = new ParsedEpisodeInfoResource(url, this.options.apikey, this.log)
    this.profile = new ProfileResource(url, this.options.apikey, this.log)
    this.release = new ReleaseResource(url, this.options.apikey, this.log)
    this.series = new SeriesResource(url, this.options.apikey, this.log)
    this.system = new SystemResource(url, this.options.apikey, this.log)
    this.wanted = new WantedMissingResource(url, this.options.apikey, this.log)
    this.rootfolder = new RootfolderResource(url, this.options.apikey, this.log)
  }

  private url() {
    const protocol = this.options.secure ? 'https' : 'http'
    return new URL(`${protocol}://${this.options.host}:${this.options.port}/api`)
  }
}
