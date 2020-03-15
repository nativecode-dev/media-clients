import { Arguments } from 'yargs'

export interface Global extends Arguments {
  compact: boolean
  output: 'json' | 'pretty' | 'xml'
}
