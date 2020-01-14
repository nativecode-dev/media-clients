import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'
import { ResourceOptions, ResourceParamType } from '@nativecode/rest-client'

import { PlexResource } from '../../PlexResource'

export class LibraryResource extends PlexResource {
  constructor(url: URL, logger: Lincoln, options?: Partial<ResourceOptions>) {
    super(url, logger, options)
  }

  list(token: string, redirect: boolean = true) {
    return this.xmljson('library/sections', 'GET', [
      this.getTokenHeader(token),
      {
        key: 'redirect',
        type: ResourceParamType.Query,
        value: redirect,
      },
    ])
  }
}
