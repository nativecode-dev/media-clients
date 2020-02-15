import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { RestResource } from '@nativecode/rest-client'

import { Diskspace } from '../Models/Diskspace'

export class DiskspaceResource extends RestResource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  list(): Promise<Diskspace[]> {
    return this.http_get<Diskspace[]>('diskspace')
  }
}
