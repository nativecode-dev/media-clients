import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceParamType } from '@nativecode/rest-client'

import { ParsedEpisodeInfo } from '../Models'

export class ParsedEpisodeInfoResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  parse(path?: string, title?: string): Promise<ParsedEpisodeInfo> {
    return this.http_get<ParsedEpisodeInfo>(
      'parsed',
      {
        key: 'path',
        type: ResourceParamType.Query,
        value: path,
      },
      {
        key: 'title',
        type: ResourceParamType.Query,
        value: title,
      },
    )
  }
}
