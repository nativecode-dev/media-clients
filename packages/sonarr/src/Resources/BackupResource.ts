import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { RestResource, ResourceParamType } from '@nativecode/rest-client'

import { Backup } from '../Models/Backup'

export class BackupResource extends RestResource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  list(): Promise<Backup[]> {
    return this.http_get<Backup[]>('system/backup')
  }

  async remove(id: number): Promise<void> {
    await this.http_delete('v3/system/backup/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }
}
