import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'
import { ResourceOptions } from '@nativecode/rest-client'

import { PlexResource } from '../../PlexResource'
import { ServersResponse } from '../Responses/ServersResponse'
import { PreferencesResponse } from '../Responses/PreferencesResponse'

export class ServerResource extends PlexResource {
  constructor(url: URL, logger: Lincoln, options: Partial<ResourceOptions> = {}) {
    super(url, logger, options)
  }

  list(token: string): Promise<ServersResponse> {
    return this.xmljson('servers', 'GET', [this.getTokenHeader(token)])
  }

  preferences(token: string): Promise<PreferencesResponse> {
    return this.xmljson(':/prefs', 'GET', [this.getTokenHeader(token)])
  }
}
