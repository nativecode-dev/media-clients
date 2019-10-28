import { Global } from '@nativecode/media-cli'

export default function(global: Global): Global {
  return Object.assign(global, {
    apikey: process.env.RADARR_APIKEY || global.apikey,
    endpoint: process.env.RADARR_ENDPOINT || global.endpoint,
  })
}
