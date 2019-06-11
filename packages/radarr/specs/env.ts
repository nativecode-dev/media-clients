import { URL } from 'url'

export const APIKEY: string = process.env.RADARR_APIKEY || 'invalid_key'
export const ENDPOINT = new URL('http://test-radarr.in.nativecode.com/api')
