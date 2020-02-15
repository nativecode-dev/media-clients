import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { RestResource, ResourceParamType } from '@nativecode/rest-client'

import { EpisodeFile } from '../Models/EpisodeFile'
import { EpisodeFileQuality } from '../Models'

export class EpisodeFileResource extends RestResource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  delete(episodeFileId: number) {
    return this.http_delete('episodefile/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: episodeFileId,
    })
  }

  id(episodeId: number): Promise<EpisodeFile> {
    return this.http_get<EpisodeFile>('episodefile/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: episodeId,
    })
  }

  list(seriesId: number): Promise<EpisodeFile[]> {
    return this.http_get<EpisodeFile[]>('episodefile', {
      key: 'seriesId',
      type: ResourceParamType.Query,
      value: seriesId,
    })
  }

  update(quality: EpisodeFileQuality): Promise<EpisodeFile> {
    return this.http_put('episode', quality)
  }
}
