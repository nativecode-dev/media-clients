import os from 'os'

import { URL } from 'url'

function endpoint(): string {
  if (process.env.RADARR_ENDPOINT) {
    return process.env.RADARR_ENDPOINT
  }

  return `http://${os.hostname()}:7878/api`
}

export const APIKEY: string = process.env.RADARR_APIKEY || 'invalid_key'
export const ENDPOINT = new URL(endpoint())
