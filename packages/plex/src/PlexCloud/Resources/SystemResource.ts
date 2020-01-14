import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'
import { ResourceOptions } from '@nativecode/rest-client'

import { PlexResource } from '../../PlexResource'
import { ServersResponse } from '../Responses/ServersResponse'
import { ResourcesResponse } from '../Responses/ResourcesResponse'

export class SystemResource extends PlexResource {
  constructor(url: URL, logger: Lincoln, options: Partial<ResourceOptions> = {}) {
    super(url, logger, options)
  }

  devices(token: string) {
    return this.xmljson('devices', 'GET', [this.getTokenHeader(token)])
  }

  ip(token: string): Promise<string> {
    return this.text('pms/:/ip', 'GET', [this.getTokenHeader(token)])
  }

  resources(token: string): Promise<ResourcesResponse> {
    return this.xmljson('api/resources', 'GET', [this.getTokenHeader(token)])
  }

  servers(token: string): Promise<ServersResponse> {
    return this.xmljson('pms/servers', 'GET', [this.getTokenHeader(token)])
  }
}
