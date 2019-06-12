import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Indexer } from '../Models/Indexer'

export class IndexerResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  indexer(id: number): Promise<Indexer> {
    return this._get('indexer/{:id}', [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: id,
      },
    ])
  }

  list(): Promise<Indexer[]> {
    return this._get('indexer')
  }

  remove(id: number): Promise<void> {
    return this._delete('indexer/{:id}', [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: id,
      },
    ])
  }

  update(indexer: Indexer): Promise<Indexer> {
    return this._put('indexer/{:id}', indexer, [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: indexer.id,
      },
    ])
  }
}
