import 'mocha'

import expect from './expect'
import Logger from './logging'

import { step } from 'mocha-steps'

import { APIKEY, ENDPOINT } from './env'
import { Movie } from '../src/Models/Movie'
import { MovieInfo } from '../src/Models/MovieInfo'
import { RadarrClient } from '../src/RadarrClient'

describe('when using the MovieResource class', () => {
  const sut = new RadarrClient(ENDPOINT, APIKEY, Logger.extend('movie-resource'))

  let movie: Movie
  let movies: Movie[]

  it('should fail to find movie', () => {
    expect(sut.movie.id(0)).to.eventually.be.rejected
  })

  it('should fail to add movie', () => {
    const add: MovieInfo = {
      images: [],
      qualityProfileId: 1,
      path: '/movies/',
      title: '',
      titleSlug: '',
      tmdbId: 0,
      year: 1900,
    }

    expect(sut.movie.add(add)).to.eventually.be.rejected
  })

  step('should get movie by IMDb ID', async () => {
    const imdb = await sut.movie.imdb('tt1814643')
    expect(imdb).to.not.be.empty
  })

  step('should get movie by TMDB ID', async () => {
    const tmdb = await sut.movie.tmdb(535292)
    expect(tmdb).to.not.be.empty
  })

  step('should get movie by lookup', async () => {
    const lookup = await sut.movie.lookup('21 Bridges')
    expect(lookup).to.not.be.empty
  })

  step('should get list of movies', async () => {
    movies = await sut.movie.list()
    expect(movies).to.not.be.empty
  })

  step('should get single movie', async () => {
    const movie = await sut.movie.id(1)
    expect(movie.title).to.equal('Banana')
  })
})
