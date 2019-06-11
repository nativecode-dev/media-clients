import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource } from '@nativecode/rest-client'

import { Backup } from '../Models/Backup'

export class BackupResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  list(): Promise<Backup[]> {
    return this._get<Backup[]>('system/backup')
  }
}
