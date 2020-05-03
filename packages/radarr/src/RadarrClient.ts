import merge from 'deepmerge'

import { URL } from 'url'
import { Throttle } from '@nnode/common'
import { Lincoln, CreateLogger } from '@nofrills/lincoln-debug'

import { Movie, Profile } from './Models'
import { RadarrOptions } from './RadarrOptions'
import { MovieResource } from './Resources/MovieResource'
import { SystemResource } from './Resources/SystemResource'
import { ProfileResource } from './Resources/ProfileResource'
import { HistoryResource } from './Resources/HistoryResource'
import { IndexerResource } from './Resources/IndexerResource'
import { CalendarResource } from './Resources/CalendarResource'
import { DiskspaceResource } from './Resources/DiskspaceResource'

const DefaultRadarrOptions: Partial<RadarrOptions> = {
  host: 'localhost',
  port: 7878,
  secure: false,
}

export class RadarrClient {
  private readonly log: Lincoln
  private readonly options: RadarrOptions

  readonly calendar: CalendarResource
  readonly diskspace: DiskspaceResource
  readonly history: HistoryResource
  readonly indexer: IndexerResource
  readonly movie: MovieResource
  readonly profile: ProfileResource
  readonly system: SystemResource

  constructor(options: Partial<RadarrOptions>, logger?: Lincoln) {
    this.log = logger ? logger.extend('radarr') : CreateLogger('radarr')
    this.options = merge.all<RadarrOptions>([DefaultRadarrOptions, options])

    const url = this.url()
    this.calendar = new CalendarResource(url, this.options.apikey, this.log)
    this.diskspace = new DiskspaceResource(url, this.options.apikey, this.log)
    this.history = new HistoryResource(url, this.options.apikey, this.log)
    this.indexer = new IndexerResource(url, this.options.apikey, this.log)
    this.movie = new MovieResource(url, this.options.apikey, this.log)
    this.profile = new ProfileResource(url, this.options.apikey, this.log)
    this.system = new SystemResource(url, this.options.apikey, this.log)
  }

  async unmonitor(dryrun: boolean): Promise<Movie[]> {
    const movies = await this.movie.list()
    const profiles = await this.profile.list()

    const completed = movies
      .filter((movie) => movie.downloaded && movie.hasFile && movie.monitored)
      .filter((movie) => {
        const profile = this.getProfile(profiles, movie)
        return profile.cutoff.id === movie.movieFile.quality.quality.id
      })

    if (dryrun) {
      return completed
    }

    return Throttle(
      completed.map((movie) => async () => {
        const source = await this.movie.id(movie.id)
        source.monitored = false
        return this.movie.update(source)
      }),
    )
  }

  private getProfile(profiles: Profile[], movie: Movie): Profile {
    const profile = profiles.find((profile) => profile.id === movie.profileId)

    if (profile) {
      return profile
    }

    throw new Error(`profile ${movie.profileId} not found`)
  }

  private url() {
    const protocol = this.options.secure ? 'https' : 'http'
    return new URL(`${protocol}://${this.options.host}:${this.options.port}/api`)
  }
}
