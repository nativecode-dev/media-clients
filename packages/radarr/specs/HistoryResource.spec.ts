import 'mocha'

import expect from './expect'

import { step } from 'mocha-steps'

import { APIKEY, ENDPOINT } from './env'
import { RadarrClient } from '../src/RadarrClient'

describe('when using the HistoryResource class', () => {
  const sut = new RadarrClient({ apikey: APIKEY, host: ENDPOINT })

  step('should get history', async () => {
    const result = await sut.history.page()
    expect(result.page).to.equal(1)
  })
})
