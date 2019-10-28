import { Global } from '@nativecode/media-cli'

export default function(global: Global): Global {
  return Object.assign(global, {
    apikey: process.env.SONARR_APIKEY || global.apikey,
    endpoint: process.env.SONARR_ENDPOINT || global.endpoint,
  })
}
