import expect from './expect'
import Logger from './logging'

import { step } from 'mocha-steps'

import { APIKEY, ENDPOINT } from './env'
import { HistoryResource } from '../src/Resources/HistoryResource'

describe('when using the HistoryResource class', () => {
  const sut = new HistoryResource(ENDPOINT, APIKEY, Logger.extend('history-resource'))

  step('should get history', async () => {
    const result = await sut.page()
    expect(result.page).to.equal(1)
  })
})
