import os from 'os'

import { URL } from 'url'

function endpoint(): string {
  if (process.env.SONARR_ENDPOINT) {
    return process.env.SONARR_ENDPOINT
  }

  return `http://${os.hostname()}:8989/api`
}

export const APIKEY: string = process.env.SONARR_APIKEY || 'invalid_key'
export const ENDPOINT = new URL(endpoint())
