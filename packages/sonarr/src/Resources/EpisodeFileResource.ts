import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { EpisodeFile } from '../Models/EpisodeFile'
import { EpisodeFileQuality } from '../Models'

export class EpisodeFileResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  delete(episodeFileId: number) {
    this.http_delete('episodefile/{:id}', [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: episodeFileId,
      },
    ])
  }

  id(episodeId: number): Promise<EpisodeFile> {
    return this.http_get<EpisodeFile>('episodefile/{:id}', [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: episodeId,
      },
    ])
  }

  list(seriesId: number): Promise<EpisodeFile[]> {
    return this.http_get<EpisodeFile[]>('episodefile', [
      {
        key: 'seriesId',
        type: ResourceRouteParamType.Query,
        value: seriesId,
      },
    ])
  }

  update(quality: EpisodeFileQuality): Promise<EpisodeFile> {
    return this.http_put('episode', quality)
  }
}
