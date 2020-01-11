import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { History } from '../Models/History'
import { SortDirection } from '../Models/SortDirection'

export enum HistorySortKey {
  Date = 'date',
  Title = 'movie.title',
}

export interface HistoryOptions {
  pageSize: number
  sortDir?: SortDirection
  sortKey?: HistorySortKey
}

export class HistoryResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  page(page: number = 1, options?: HistoryOptions): Promise<History> {
    const merged: HistoryOptions = { ...{ pageSize: 0 }, ...options }

    return this.http_get<History>('history', [
      {
        key: 'page',
        type: ResourceRouteParamType.Query,
        value: page,
      },
      {
        key: 'pageSize',
        type: ResourceRouteParamType.Query,
        value: merged.pageSize,
      },
      {
        key: 'sortDir',
        type: ResourceRouteParamType.Query,
        value: merged.sortDir,
      },
      {
        key: 'sortKey',
        type: ResourceRouteParamType.Query,
        value: merged.sortKey,
      },
    ])
  }
}
