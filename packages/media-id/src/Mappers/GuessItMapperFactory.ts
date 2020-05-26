import { GuessItInfo } from './GuessItInfo'
import { MediaMapper } from '../MediaMapper'
import { GuessItMapper } from './GuessItMapper'

export function GuessItMapperFactory(url: string = 'https://guessit.nativecode.com'): MediaMapper<GuessItInfo> {
  return (filename: string) => GuessItMapper(filename, url)
}
