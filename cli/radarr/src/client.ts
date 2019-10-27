import { URL } from 'url'
import { RadarrClient } from '@nativecode/radarr'

import logger from './logging'

import { Global } from './options/global'

export default function(args: Global): RadarrClient {
  const url = new URL(args.endpoint)
  return new RadarrClient(url, args.apikey, logger)
}
