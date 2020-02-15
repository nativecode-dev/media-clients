import xml2json from 'xml2json'

import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'
import { Resource, ResourceOptions, ResourceParam, ResourceParams, ResourceParamType } from '@nativecode/rest-client'

export abstract class PlexResource extends Resource {
  constructor(url: URL, logger: Lincoln, options: Partial<ResourceOptions> = {}) {
    super(url, logger, options)
  }

  protected getTokenHeader(token: string): ResourceParam {
    return {
      key: 'X-Plex-Token',
      type: ResourceParamType.Header,
      value: token,
    }
  }

  protected async xml(route: string, method: string, params: ResourceParams): Promise<string> {
    const buffer = await this.response(route, method, params)
    const xml = buffer.toString('utf-8')
    return xml2json.toJson(xml)
  }

  protected async xmljson<T>(route: string, method: string, params: ResourceParams): Promise<T> {
    const xml = await this.xml(route, method, params)
    return JSON.parse(xml)
  }
}
