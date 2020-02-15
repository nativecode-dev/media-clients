import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { RestResource, ResourceParamType } from '@nativecode/rest-client'

import { Movie } from '../Models/Movie'

export class CalendarResource extends RestResource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  list(start?: string, end?: string): Promise<Movie[]> {
    return this.http_get<Movie[]>(
      'calendar',
      {
        key: 'end',
        type: ResourceParamType.Query,
        value: end || '',
      },
      {
        key: 'start',
        type: ResourceParamType.Query,
        value: start || '',
      },
    )
  }
}
