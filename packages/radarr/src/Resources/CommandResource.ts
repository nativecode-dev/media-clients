import { URL } from 'url'
import { Resource } from '@nativecode/rest-client'

export class CommandResource extends Resource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }
}
