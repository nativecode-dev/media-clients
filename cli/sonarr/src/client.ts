import { URL } from 'url'
import { SonarrClient } from '@nativecode/sonarr'

import logger from './logging'

import { Global } from '@nativecode/media-cli'

export default function(args: Global): SonarrClient {
  const url = new URL(args.endpoint)
  return new SonarrClient(url, args.apikey, logger)
}
