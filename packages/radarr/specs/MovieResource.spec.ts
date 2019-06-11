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
    expect(sut.movie.imdb('tt1814643')).to.eventually.not.be.empty
  })

  step('should get movie by TMDB ID', async () => {
    expect(sut.movie.tmdb(535292)).to.eventually.not.be.empty
  })

  step('should get movie by lookup', async () => {
    expect(sut.movie.lookup('21 Bridges')).to.eventually.not.be.empty
  })

  step('should get list of movies', async () => {
    movies = await sut.movie.list()
    expect(movies).to.not.be.empty
  })

  step('should get single movie', async () => {
    const movie = await sut.movie.id(1)
    expect(movie.title).to.equal('Banana')
  })

  step('should add movie', async () => {
    const add: MovieInfo = {
      images: [],
      qualityProfileId: 1,
      path: '/movies/21 Bridges (2019)/',
      title: '21 Bridges',
      titleSlug: '21 Bridges',
      tmdbId: 535292,
      year: 2019,
    }

    const existing = movies.find(movie => movie.title === add.title)

    if (existing === undefined) {
      movie = await sut.movie.add(add)

      expect(movie.id).does.not.equal(0)
      expect(movie.title).to.equal(add.title)
    } else {
      movie = existing
    }
  })

  step('should delete added movie', () => {
    expect(sut.movie.remove(movie.id)).to.eventually.not.be.rejected
  })
})
