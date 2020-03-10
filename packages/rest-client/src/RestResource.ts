import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'

import { Merge } from './utils/Merge'
import { Resource } from './Resource'
import { ResourceOptions } from './ResourceOptions'

const DefaultResourceOptions: Partial<ResourceOptions> = {
  headers: [
    {
      name: 'Accept',
      value: 'application/json',
    },
    {
      name: 'Content-Type',
      value: 'application/json',
    },
  ],
}

export abstract class RestResource extends Resource {
  constructor(url: URL, logger: Lincoln, options: Partial<ResourceOptions> = {}) {
    super(url, logger, Merge<ResourceOptions>(DefaultResourceOptions, options))
  }
}
