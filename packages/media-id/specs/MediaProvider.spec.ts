import 'mocha'

import { fs } from '@nofrills/fs'

import expect from './index'

import { MediaProvider } from '../src/MediaProvider'
import { GuessItInfo } from '../src/Mappers/GuessItInfo'
import { MediaFileFilterFactory } from '../src/Filters/MediaFileFilterFactory'
import { GuessItMapperFactory } from '../src/Mappers/GuessItMapperFactory'

describe('when using MediaProvider', () => {
  it('should get entries', async () => {
    const provider = new MediaProvider<GuessItInfo>()
    const path = fs.join(process.env.HOME!, 'Videos')
    const entries = await provider.entries(path, [MediaFileFilterFactory()], [GuessItMapperFactory()])
    expect(entries).not.empty
  })
})
