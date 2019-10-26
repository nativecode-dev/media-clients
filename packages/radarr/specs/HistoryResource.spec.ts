import 'mocha'

import expect from './expect'
import Logger from './logging'

import { step } from 'mocha-steps'

import { APIKEY, ENDPOINT } from './env'
import { RadarrClient } from '../src/RadarrClient'

describe('when using the HistoryResource class', () => {
  const sut = new RadarrClient(ENDPOINT, APIKEY, Logger.extend('history-resource'))

  step('should get history', async () => {
    const result = await sut.history.page()
    expect(result.page).to.equal(1)
  })
})
