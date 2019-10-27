import { Argv, Arguments, Options } from 'yargs'

export interface Global extends Arguments {
  apikey: string
  endpoint: string
  output: 'json' | 'pretty'
}

export default function(argv: Argv<{}>): Argv<{}> {
  return argv
    .option('apikey', {
      type: 'string',
    })
    .option('endpoint', {
      default: 'http://localhost:7878/api',
      type: 'string',
    })
    .option('output', {
      alias: ['o'],
      default: 'pretty',
      choices: ['json', 'pretty'],
      type: 'string',
    })
}
