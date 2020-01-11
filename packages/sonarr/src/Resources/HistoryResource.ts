import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { History } from '../Models'

export interface PagingOptions {
  page?: number
  pageSize?: number
  sortDir?: string
  episodeId?: string
}

export class HistoryResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  get(sortKey: string = 'date', options: PagingOptions = {}): Promise<History> {
    return this.http_get('history', [
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
