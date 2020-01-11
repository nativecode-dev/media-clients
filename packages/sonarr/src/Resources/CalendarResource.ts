import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceParamType } from '@nativecode/rest-client'

import { Episode } from '../Models/Episode'

export class CalendarResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  list(start?: string, end?: string): Promise<Episode[]> {
    return this.http_get<Episode[]>(
      'calendar',
      {
        key: 'end',
        type: ResourceParamType.Query,
        value: end,
      },
      {
        key: 'start',
        type: ResourceParamType.Query,
        value: start,
      },
    )
  }
}
