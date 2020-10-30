import { Global } from '@nativecode/media-cli'
import { SonarrClient } from '@nativecode/sonarr'

export default function (args: Global): SonarrClient {
  return new SonarrClient({ apikey: args.apikey, host: args.endpoint })
}
