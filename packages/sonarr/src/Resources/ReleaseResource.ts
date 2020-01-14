import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceParamType } from '@nativecode/rest-client'

import { Release } from '../Models'
import { ReleasePush } from '../Models/ReleasePush'

export class ReleaseResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  download(guid: string, indexerId: string): Promise<Release[]> {
    return this.http_post('release', [
      {
        key: 'guid',
        type: ResourceParamType.Query,
        value: guid,
      },
      {
        key: 'indexerId',
        type: ResourceParamType.Query,
        value: indexerId,
      },
    ])
  }

  get(episodeId: number): Promise<Release[]> {
    return this.http_get<Release[]>('diskspace', {
      key: 'episodeId',
      type: ResourceParamType.Query,
      value: episodeId,
    })
  }

  push(push: ReleasePush) {
    return this.http_post('release/push', push)
  }
}
