import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'
import { ResourceOptions, ResourceParamType } from '@nativecode/rest-client'

import { PlexResource } from '../../PlexResource'
import { OnDeckResponse } from '../Responses/OnDeckResponse'
import { LibraryResponse } from '../Responses/LibraryResponse'
import { LibrariesResponse } from '../Responses/LibrariesResponse'
import { RecentlyAddedResponse } from '../Responses/RecentlyAddedResponse'

export class LibraryResource extends PlexResource {
  constructor(url: URL, logger: Lincoln, options: Partial<ResourceOptions> = {}) {
    super(url, logger, options)
  }

  async analyze(token: string, library: string, force: boolean = false): Promise<void> {
    await this.response('library/sections/{:section_id}/analyze', 'GET', [
      this.getTokenHeader(token),
      {
        key: 'section_id',
        type: ResourceParamType.RouteParameter,
        value: library,
      },
      {
        key: 'force',
        type: ResourceParamType.Query,
        value: force,
      },
    ])
  }

  delete(token: string, library: string) {
    return this.xmljson('library/sections/{:section_id}', 'DELETE', [
      this.getTokenHeader(token),
      {
        key: 'section_id',
        type: ResourceParamType.RouteParameter,
        value: library,
      },
    ])
  }

  get(token: string, library: string): Promise<LibraryResponse> {
    return this.xmljson('library/sections/{:section_id}', 'GET', [
      this.getTokenHeader(token),
      {
        key: 'section_id',
        type: ResourceParamType.RouteParameter,
        value: library,
      },
    ])
  }

  list(token: string): Promise<LibrariesResponse> {
    return this.xmljson('library/sections', 'GET', [this.getTokenHeader(token)])
  }

  onDeck(token: string): Promise<OnDeckResponse> {
    return this.xmljson('library/onDeck', 'GET', [this.getTokenHeader(token)])
  }

  recentlyAdded(token: string): Promise<RecentlyAddedResponse> {
    return this.xmljson('library/recentlyAdded', 'GET', [this.getTokenHeader(token)])
  }

  async refresh(token: string, library: string, force: boolean = false): Promise<void> {
    await this.response('library/sections/{:section_id}/refresh', 'GET', [
      this.getTokenHeader(token),
      {
        key: 'section_id',
        type: ResourceParamType.RouteParameter,
        value: library,
      },
      {
        key: 'force',
        type: ResourceParamType.Query,
        value: force,
      },
    ])
  }
}
