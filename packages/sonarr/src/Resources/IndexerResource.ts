import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceParamType } from '@nativecode/rest-client'

import { Indexer } from '../Models/Indexer'

export class IndexerResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  indexer(id: number): Promise<Indexer> {
    return this.http_get('indexer/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  list(): Promise<Indexer[]> {
    return this.http_get('indexer')
  }

  remove(id: number): Promise<void> {
    return this.http_delete('indexer/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  update(indexer: Indexer): Promise<Indexer> {
    return this.http_put('indexer/{:id}', indexer, {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: indexer.id,
    })
  }
}
