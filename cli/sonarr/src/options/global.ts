import { Argv, Arguments } from 'yargs'

export interface Global extends Arguments {
  apikey: string
  compact: boolean
  endpoint: string
  output: 'json' | 'pretty' | 'xml'
}

export default function(argv: Argv<{}>): Argv<{}> {
  return argv
    .option('apikey', {
      type: 'string',
    })
    .option('compact', {
      alias: ['c'],
      boolean: true,
      default: false,
      type: 'boolean',
    })
    .option('endpoint', {
      default: 'http://localhost:8989/api',
      type: 'string',
    })
    .option('output', {
      alias: ['o'],
      default: 'pretty',
      choices: ['json', 'pretty', 'xml'],
      type: 'string',
    })
}
