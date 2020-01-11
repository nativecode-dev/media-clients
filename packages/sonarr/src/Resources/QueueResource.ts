import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'
import { Queue } from '../Models'

export class QueueResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  delete(id: number, blacklist: boolean = false) {
    return this._delete('queue', [
      {
        key: 'id',
        type: ResourceRouteParamType.Query,
        value: id,
      },
      {
        key: 'blacklist',
        type: ResourceRouteParamType.Query,
        value: blacklist,
      },
    ])
  }

  list(): Promise<Queue[]> {
    return this._get<Queue[]>('queue')
  }
}
