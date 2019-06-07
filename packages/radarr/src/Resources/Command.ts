import { Resource } from '@nativecode/rest-client'

export class Command extends Resource {
  constructor(url: URL, apikey: string) {
    super(url)
  }
}
