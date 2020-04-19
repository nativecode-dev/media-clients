import 'mocha'

import expect from './expect'

import { APIKEY, ENDPOINT } from './env'
import { RadarrClient } from '../src/RadarrClient'

describe('when using the RootfolderResource class', () => {
  const sut = new RadarrClient({ apikey: APIKEY, host: ENDPOINT })

  it('should get list of root folders', async () => {
    const folders = await sut.rootfolder.list()
    expect(folders).to.not.be.empty
  })
})
