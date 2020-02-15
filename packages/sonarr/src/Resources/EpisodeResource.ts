import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { RestResource, ResourceParamType } from '@nativecode/rest-client'

import { Episode } from '../Models/Episode'

export class EpisodeResource extends RestResource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  id(episodeId: number): Promise<Episode> {
    return this.http_get<Episode>('episode/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: episodeId,
    })
  }

  list(seriesId: number): Promise<Episode[]> {
    return this.http_get<Episode[]>('episode', {
      key: 'seriesId',
      type: ResourceParamType.Query,
      value: seriesId,
    })
  }

  update(episode: Episode): Promise<Episode> {
    return this.http_put('episode', episode)
  }
}
