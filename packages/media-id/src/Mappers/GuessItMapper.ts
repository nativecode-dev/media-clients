import fetch from 'node-fetch'

import { fs } from '@nofrills/fs'

import { GuessItInfo } from './GuessItInfo'

export async function GuessItMapper(filename: string, url: string = 'https://guessit.nativecode.com'): Promise<GuessItInfo> {
  const response = await fetch(`${url}/?filename=${filename}`)
  const json: GuessItInfo = await response.json()

  const guessit = {
    ...json,
    ...{
      extension: fs.ext(filename),
      filename: fs.basename(filename),
      filepath: fs.dirname(filename),
    },
  }

  return guessit
}
