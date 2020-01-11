import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceParamType } from '@nativecode/rest-client'

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

    return this.http_get<History>(
      'history',
      {
        key: 'page',
        type: ResourceParamType.Query,
        value: page,
      },
      {
        key: 'pageSize',
        type: ResourceParamType.Query,
        value: merged.pageSize,
      },
      {
        key: 'sortDir',
        type: ResourceParamType.Query,
        value: merged.sortDir,
      },
      {
        key: 'sortKey',
        type: ResourceParamType.Query,
        value: merged.sortKey,
      },
    )
  }
}
