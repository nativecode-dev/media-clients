import merge from 'deepmerge'

import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'
import { ResourceHeader } from '@nativecode/rest-client'

import { AccountResource } from '../PlexClient'
import { SystemResource } from './Resources/SystemResource'
import { LibraryResource } from './Resources/LibraryResource'
import { PlexClientOptions } from '../PlexClient/PlexClientOptions'

const packageInfo = require('../../package.json')

const DefaultPlexOptions: Partial<PlexClientOptions> = {
  app: {
    name: 'PlexCloud',
    version: packageInfo.version,
  },
}

export class PlexCloud {
  private readonly log: Lincoln

  readonly options: PlexClientOptions
  readonly accounts: AccountResource
  readonly libraries: LibraryResource
  readonly system: SystemResource

  constructor(options: Partial<PlexClientOptions> = {}, logger: Lincoln) {
    this.log = logger.extend('plexcloud')
    this.options = merge.all<PlexClientOptions>([DefaultPlexOptions, options])

    const headers: ResourceHeader[] = [
      { name: 'X-Plex-Client-Identifier', value: this.options.app.name },
      { name: 'X-Plex-Product', value: 'PlexCloud' },
      { name: 'X-Plex-Version', value: this.options.app.version },
    ]

    const url = new URL('https://plex.tv')
    const resoptions = { headers }

    this.accounts = new AccountResource(url, this.log, resoptions)
    this.libraries = new LibraryResource(url, this.log, resoptions)
    this.system = new SystemResource(url, this.log, resoptions)

    this.log.trace(this.options)
  }
}
