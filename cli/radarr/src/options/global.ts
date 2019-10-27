import { Argv, Arguments } from 'yargs'

export interface Global extends Arguments {
  apikey: string
  endpoint: string
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
}
