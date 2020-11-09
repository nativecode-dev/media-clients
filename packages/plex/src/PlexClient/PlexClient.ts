import merge from 'deepmerge'

import { URL } from 'url'
import { Lincoln, CreateLogger } from '@nofrills/lincoln-debug'
import { ResourceHeader } from '@nativecode/rest-client'

import { PlexClientOptions } from './PlexClientOptions'
import { ServerResource } from './Resources/ServerResource'
import { AccountResource } from './Resources/AccountResource'
import { LibraryResource } from './Resources/LibraryResource'
import { SystemResource } from './Resources/SystemResource'
import { MediaTypeDefinition } from '../MediaTypes/MediaTypeDefinition'

const packageInfo = require('../../package.json')

const DefaultPlexOptions: Partial<PlexClientOptions> = {
  app: {
    name: 'PlexClient',
    version: packageInfo.version,
  },
  host: 'localhost',
  port: 32400,
  secure: false,
}

export class PlexClient {
  private readonly log: Lincoln

  readonly options: PlexClientOptions
  readonly accounts: AccountResource
  readonly libraries: LibraryResource
  readonly servers: ServerResource
  readonly system: SystemResource

  constructor(options: Partial<PlexClientOptions> = {}, logger?: Lincoln) {
    this.log = logger ? logger.extend('plexclient') : CreateLogger('plexclient')
    this.options = merge.all<PlexClientOptions>([{}, DefaultPlexOptions, options])

    const headers: ResourceHeader[] = [
      { name: 'X-Plex-Client-Identifier', value: this.options.app.name },
      { name: 'X-Plex-Product', value: 'PlexClient' },
      { name: 'X-Plex-Version', value: this.options.app.version },
    ]

    if (this.options.token) {
      headers.push({ name: 'X-Plex-Token', value: this.options.token })
    }

    const url = this.url()
    const resoptions = { headers }

    this.accounts = new AccountResource(url, this.log, resoptions)
    this.libraries = new LibraryResource(url, this.log, resoptions)
    this.servers = new ServerResource(url, this.log, resoptions)
    this.system = new SystemResource(url, this.log, resoptions)
  }

  thumbnail(mediaType: MediaTypeDefinition): string {
    return `${this.url()}/web/img/sections/${mediaType.typeString}_large.png`
  }

  private url(): URL {
    const protocol = this.options.secure ? 'https' : 'http'
    return new URL(`${protocol}://${this.options.host}:${this.options.port}`)
  }
}
