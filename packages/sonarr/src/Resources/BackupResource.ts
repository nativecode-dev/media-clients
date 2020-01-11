import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Backup } from '../Models/Backup'

export class BackupResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  list(): Promise<Backup[]> {
    return this.http_get<Backup[]>('system/backup')
  }

  async remove(id: number): Promise<void> {
    await this.http_delete('v3/system/backup/{:id}', [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: id,
      },
    ])
  }
}
