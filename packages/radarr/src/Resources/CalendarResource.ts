import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Movie } from '../Models/Movie'

export class CalendarResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  list(start?: string, end?: string): Promise<Movie[]> {
    return this._get<Movie[]>('calendar', [
      {
        key: 'start',
        type: ResourceRouteParamType.Query,
        value: start || '',
      },
      {
        key: 'end',
        type: ResourceRouteParamType.Query,
        value: end || '',
      },
    ])
  }
}
