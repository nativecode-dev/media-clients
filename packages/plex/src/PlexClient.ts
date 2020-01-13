import merge from 'deepmerge'

import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'

import { ServerResource } from './Resources/ServerResource'
import { AccountResource } from './Resources/AccountResource'
import { LibraryResource } from './Resources/LibraryResource'
import { SystemResource } from './Resources/SystemResource'
import { MediaTypeDefinition } from './MediaTypes/MediaTypeDefinition'

export interface PlexOptions {
  auth: {
    token?: string
    password: string
    username: string
  }
  host: string
  port: number
  secure: boolean
}

const DefaultPlexOptions: Partial<PlexOptions> = {
  host: 'localhost',
  port: 32400,
  secure: false,
}

export class PlexClient {
  readonly options: PlexOptions
  readonly accounts: AccountResource
  readonly libraries: LibraryResource
  readonly servers: ServerResource
  readonly system: SystemResource

  constructor(appname: string, options: Partial<PlexOptions> = {}, logger: Lincoln) {
    const headers = [
      { name: 'X-Plex-Client-Identifier', value: appname || '@nativecode/plex:test' },
      { name: 'X-Plex-Product', value: 'PlexClient' },
      { name: 'X-Plex-Version', value: '0.0.0' },
    ]

    this.options = merge.all<PlexOptions>([DefaultPlexOptions, options])

    const url = this.createUrl()
    const resoptions = { headers }

    this.accounts = new AccountResource(url, logger, resoptions)
    this.libraries = new LibraryResource(url, logger, resoptions)
    this.servers = new ServerResource(url, logger, resoptions)
    this.system = new SystemResource(url, logger, resoptions)
  }

  thumbnail(mediaType: MediaTypeDefinition): string {
    return `${this.createUrl()}/web/img/sections/${mediaType.typeString}_large.png`
  }

  private createUrl(): URL {
    const protocol = this.options.secure ? 'https' : 'http'
    return new URL(`${protocol}://${this.options.host}:${this.options.port}`)
  }
}
