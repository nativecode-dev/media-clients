import expect, { TIMEOUT_LONG } from './expect'

import { URL } from 'url'

import { MovieResource } from '../src/Resources/MovieResource'

const radarrUrl = new URL('http://radarr.in.nativecode.com/api')
const radarrApiKey: string = process.env.RADARR_APIKEY || 'invalid_key'

describe('when using MovieResource', () => {
  const movieResource = new MovieResource(radarrUrl, radarrApiKey)

  // Can't use arrow functions when setting timeouts in Typescript - MP
  it('should get list of movies', async function() {
    this.timeout(TIMEOUT_LONG)
    const movies = await movieResource.list()
    expect(movies).to.not.be.empty
  })
})
