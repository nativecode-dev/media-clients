import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { RestResource } from '@nativecode/rest-client'

import { Profile } from '../Models'

export class ProfileResource extends RestResource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  list(start?: string, end?: string): Promise<Profile[]> {
    return this.http_get<Profile[]>('profile')
  }
}
