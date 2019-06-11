import { URL } from 'url'

export const ENDPOINT = new URL('http://test-sonarr.in.nativecode.com/api')
export const APIKEY: string = process.env.SONARR_APIKEY || 'invalid_key'
