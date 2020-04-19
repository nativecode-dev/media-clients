import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { RestResource } from '@nativecode/rest-client'

import { Rootfolder } from '../Models'

export class RootfolderResource extends RestResource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  list(start?: string, end?: string): Promise<Rootfolder[]> {
    return this.http_get<Rootfolder[]>('rootfolder')
  }
}
