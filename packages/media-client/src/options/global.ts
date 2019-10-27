import { Argv, Arguments } from 'yargs'

export interface Global extends Arguments {
  apikey: string
  compact: boolean
  endpoint: string
  output: 'json' | 'pretty' | 'xml'
}

export function GlobalOptions(argv: Argv<{}>): Argv<{}> {
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
      default: 'http://localhost:7878/api',
      type: 'string',
    })
    .option('output', {
      alias: ['o'],
      default: 'pretty',
      choices: ['json', 'pretty', 'xml'],
      type: 'string',
    })
}
