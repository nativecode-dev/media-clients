import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Episode } from '../Models/Episode'

export class EpisodeResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  id(episodeId: number): Promise<Episode> {
    return this.http_get<Episode>('episode/{:id}', {
      key: 'id',
      type: ResourceRouteParamType.RouteParameter,
      value: episodeId,
    })
  }

  list(seriesId: number): Promise<Episode[]> {
    return this.http_get<Episode[]>('episode', {
      key: 'seriesId',
      type: ResourceRouteParamType.Query,
      value: seriesId,
    })
  }

  update(episode: Episode): Promise<Episode> {
    return this.http_put('episode', episode)
  }
}
