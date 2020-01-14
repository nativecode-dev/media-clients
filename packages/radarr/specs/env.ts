import os from 'os'

import { URL } from 'url'

function endpoint(): string {
  if (process.env.RADARR_TEST_ENDPOINT) {
    return process.env.RADARR_TEST_ENDPOINT
  }

  if (process.env.RADARR_ENDPOINT) {
    return process.env.RADARR_ENDPOINT
  }

  return 'localhost'
}

export const APIKEY: string =
  process.env.RADARR_TEST_APIKEY || process.env.RADARR_APIKEY || '46aa7e39bff545b0af772eaa0338f098'
export const ENDPOINT = endpoint()
