import os from 'os'

import { URL } from 'url'

function endpoint(): string {
  if (process.env.SONARR_TEST_ENDPOINT) {
    return process.env.SONARR_TEST_ENDPOINT
  }

  if (process.env.SONARR_ENDPOINT) {
    return process.env.SONARR_ENDPOINT
  }

  return 'localhost'
}

export const APIKEY: string =
  process.env.SONARR_TEST_APIKEY || process.env.SONARR_APIKEY || '31312e9d204348fda11cf569ad3d1a17'
export const ENDPOINT = endpoint()
