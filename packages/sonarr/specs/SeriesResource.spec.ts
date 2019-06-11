import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { SeriesResource } from '../src/Resources/SeriesResource'

describe('when using SeriesResource', () => {
  const sut = new SeriesResource(ENDPOINT, APIKEY, Logger.extend('series-resource'))

  it('should get list of series', async () => {
    const series = await sut.list()
    expect(series).to.not.be.empty
  })

  it('should get single series', async () => {
    const series = await sut.id(1)
    expect(series.title).to.equal('Transformers')
  })
})
