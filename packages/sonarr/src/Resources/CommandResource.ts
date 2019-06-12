import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Command } from '../Models/Command'

export class CommandResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  backup(): Promise<Command> {
    return this.execute('Backup')
  }

  command(id: number): Promise<Command> {
    return this._get('command/{:id}', [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: id,
      },
    ])
  }

  commands(): Promise<Command[]> {
    return this._get('command')
  }

  private execute(command: string, params?: any): Promise<Command> {
    return this._post('command', { name: command, ...params })
  }
}
