import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'

import { Resource } from './Resource'
import { ResourceOptions } from './ResourceOptions'
import { DefaultResourceCache } from './CacheStores/NullResourceCache'
import { ResourceCache } from './ResourceCache'
import { Merge } from './utils/Merge'

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
  constructor(
    url: URL,
    logger: Lincoln,
    options: Partial<ResourceOptions> = {},
    cache: ResourceCache = DefaultResourceCache,
  ) {
    super(url, logger, Merge<ResourceOptions>(DefaultResourceOptions, options), cache)
  }
}
