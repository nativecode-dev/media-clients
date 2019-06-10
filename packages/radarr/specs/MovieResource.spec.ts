import expect from './expect'
import Logger from './logging'

import { URL } from 'url'

import { MovieResource } from '../src/Resources/MovieResource'

const url = new URL('http://test-radarr.in.nativecode.com/api')
const apikey: string = process.env.RADARR_APIKEY || 'invalid_key'

describe('when using MovieResource', () => {
  const movieResource = new MovieResource(url, apikey, Logger.extend('movie-resource'))

  it('should get list of movies', async () => {
    const movies = await movieResource.list()
    expect(movies.length).to.equal(1)
  })

  it('should get single movie', async () => {
    const movie = await movieResource.id(1)
    expect(movie.title).to.equal('Banana')
  })
})
