import { URL } from 'url'

function endpoint(): string {
  if (process.env.RADARR_ENDPOINT) {
    return process.env.RADARR_ENDPOINT
  }

  return 'http://test-radarr.in.nativecode.com/api'
}

export const APIKEY: string = process.env.RADARR_APIKEY || 'invalid_key'
export const ENDPOINT = new URL(endpoint())
