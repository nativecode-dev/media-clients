import { URL } from 'url'

function endpoint(): string {
  if (process.env.SONARR_ENDPOINT) {
    return process.env.SONARR_ENDPOINT
  }

  return 'http://test-sonarr.in.nativecode.com/api'
}

export const APIKEY: string = process.env.SONARR_APIKEY || 'invalid_key'
export const ENDPOINT = new URL(endpoint())
