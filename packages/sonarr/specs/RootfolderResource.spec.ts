import 'mocha'

import expect from './expect'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'

describe('when using RootfolderResource', () => {
	const sut = new SonarrClient({ apikey: APIKEY, host: ENDPOINT })

  it('should get list of root folders', async () => {
    const folders = await sut.rootfolder.list()
    expect(folders).to.not.be.empty
  })
})
