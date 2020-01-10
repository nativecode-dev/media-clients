import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource } from '@nativecode/rest-client'

import { Movie } from '../Models/Movie'

export class ProfileResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  list(start?: string, end?: string): Promise<Movie[]> {
    return this._get<Movie[]>('profile')
  }
}
