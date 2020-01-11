import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Paging } from '../Models/Paging'
import { WantedMissing } from '../Models/WantedMissing'
import { PagingOptions } from './HistoryResource'

export class WantedMissingResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  list(sortKey: string = 'airDateUtc', options: PagingOptions = {}): Promise<Paging<WantedMissing>> {
    return this._get<Paging<WantedMissing>>('diskspace', [
      {
        key: 'sortKey',
        type: ResourceRouteParamType.Query,
        value: sortKey,
      },
      {
        key: 'page',
        type: ResourceRouteParamType.Query,
        value: options.page,
      },
      {
        key: 'pageSize',
        type: ResourceRouteParamType.Query,
        value: options.pageSize,
      },
      {
        key: 'sortDir',
        type: ResourceRouteParamType.Query,
        value: options.sortDir,
      },
      {
        key: 'episodeId',
        type: ResourceRouteParamType.Query,
        value: options.episodeId,
      },
    ])
  }
}
