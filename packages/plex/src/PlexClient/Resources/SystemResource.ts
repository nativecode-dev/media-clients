import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'
import { ResourceOptions, ResourceParamType } from '@nativecode/rest-client'

import { PlexResource } from '../../PlexResource'
import { AgentResponse } from '../Responses/AgentResponse'
import { DriveResponse } from '../Responses/DriveResponse'
import { TranscodersResponse } from '../Responses/TranscodersResponse'
import { MediaTypeDefinition } from '../../MediaTypes/MediaTypeDefinition'

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

  transcoders(token: string): Promise<TranscodersResponse> {
    return this.xmljson('transcode/sessions', 'GET', [this.getTokenHeader(token)])
  }
}
