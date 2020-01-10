import 'mocha'

import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'

describe('when using SeriesResource', () => {
  const sut = new SonarrClient(ENDPOINT, APIKEY, Logger.extend('shows-resource'))

  it('should get list of shows', async () => {
    const shows = await sut.shows.list()
    expect(shows).to.not.be.empty
  })

  it('should get single shows', async () => {
    const shows = await sut.shows.id(1)
    expect(shows.title).to.equal('Transformers')
  })
})
