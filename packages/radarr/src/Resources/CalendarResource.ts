import { URL } from 'url'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Movie } from '../Models/Movie'

export class CalendarResource extends Resource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }

  list(start?: Date, end?: Date): Promise<Movie[]> {
    return this.get<Movie[]>('calendar', [
      {
        key: 'start',
        type: ResourceRouteParamType.Query,
        value: start,
      },
      {
        key: 'end',
        type: ResourceRouteParamType.Query,
        value: end,
      },
    ])
  }
}
