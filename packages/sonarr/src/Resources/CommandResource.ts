import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { RestResource, ResourceParamType } from '@nativecode/rest-client'

import { Command } from '../Models/Command'

export class CommandResource extends RestResource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  backup(): Promise<Command> {
    return this.execute('Backup')
  }

  command(id: number): Promise<Command> {
    return this.http_get('command/{:id}', {
      key: 'id',
      type: ResourceParamType.RouteParameter,
      value: id,
    })
  }

  commands(): Promise<Command[]> {
    return this.http_get('command')
  }

  private execute(command: string, params?: any): Promise<Command> {
    return this.http_post('command', { name: command, ...params })
  }
}
