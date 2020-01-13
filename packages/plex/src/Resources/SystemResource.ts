import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'
import { ResourceOptions, ResourceParamType } from '@nativecode/rest-client'

import { PlexResource } from '../PlexResource'
import { MediaTypeDefinition } from '../MediaTypes/MediaTypeDefinition'
import { AgentResponse } from '../Responses/AgentResponse'
import { DriveResponse } from '../Responses'

export class SystemResource extends PlexResource {
  constructor(url: URL, logger: Lincoln, options: Partial<ResourceOptions> = {}) {
    super(url, logger, options)
  }

  agents(token: string, mediaType: MediaTypeDefinition): Promise<AgentResponse> {
    return this.xmljson('system/agents', 'GET', [
      this.getTokenHeader(token),
      {
        key: 'mediaType',
        type: ResourceParamType.Query,
        value: mediaType.id,
      },
    ])
  }

  drives(token: string): Promise<DriveResponse> {
    return this.xmljson('services/browse', 'GET', [this.getTokenHeader(token)])
  }
}
