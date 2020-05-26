import 'mocha'
import expect from './index'

import { GuessItMapper } from '../src/Mappers/GuessItMapper'

describe('when using GuessItMapper', () => {
  it('should map movie filename', async () => {
    const guessit = await GuessItMapper('Se7en.(1995).avi', 'https://guessit.nativecode.com')
    expect(guessit.title).equal('Se7en')
  })
})
