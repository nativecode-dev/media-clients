import expect from './expect'
import Logger from './logging'

import { URL } from 'url'

import { SeriesResource } from '../src/Resources/SeriesResource'

const url = new URL('http://test-sonarr.in.nativecode.com/api')
const apikey: string = process.env.SONARR_APIKEY || 'invalid_key'

describe('when using SeriesResource', () => {
  const sut = new SeriesResource(url, apikey, Logger.extend('series-resource'))

  it('should get list of series', async () => {
    const series = await sut.list()
    expect(series).to.not.be.empty
  })

  it('should get single series', async () => {
    const series = await sut.id(1)
    expect(series.title).to.equal('Transformers')
  })
})
