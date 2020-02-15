import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { RestResource, ResourceParamType } from '@nativecode/rest-client'

import { Series } from '../Models/Series'

export class SeriesResource extends RestResource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  id(id: number): Promise<Series> {
    return this.http_get<Series>('series/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  list(): Promise<Series[]> {
    return this.http_get<Series[]>('series')
  }

  update(series: Series): Promise<Series> {
    return this.http_put('series', series, {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: series.id,
    })
  }
}
