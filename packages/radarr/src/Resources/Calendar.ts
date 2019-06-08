import { URL } from 'url'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Calendar } from '../Models/Calendar'

export class CalendarResource extends Resource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }

  all(start?: Date, end?: Date): Promise<Calendar[]> {
    return this.get<Calendar[]>('calendar', [
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
