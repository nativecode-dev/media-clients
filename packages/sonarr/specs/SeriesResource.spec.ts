import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'

describe('when using SeriesResource', () => {
  const sut = new SonarrClient(ENDPOINT, APIKEY, Logger.extend('series-resource'))

  it('should get list of series', async () => {
    const series = await sut.series.list()
    expect(series).to.not.be.empty
  })

  it('should get single series', async () => {
    const series = await sut.series.id(1)
    expect(series.title).to.equal('Transformers')
  })
})
