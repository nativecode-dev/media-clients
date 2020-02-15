import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'

import { Resource } from './Resource'
import { ResourceOptions } from './ResourceOptions'
import { DefaultResourceCache } from './CacheStores/NullResourceCache'
import { ResourceCache } from './ResourceCache'

export abstract class RestResource extends Resource {
  constructor(
    url: URL,
    logger: Lincoln,
    options: Partial<ResourceOptions> = {},
    cache: ResourceCache = DefaultResourceCache,
  ) {
    super(url, logger, options, cache)
  }
}
