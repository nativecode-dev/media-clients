import { Argv } from 'yargs'

export function GlobalApply(argv: Argv<{}>): Argv<{}> {
  return argv
    .option('compact', {
      alias: ['c'],
      boolean: true,
      default: false,
      type: 'boolean',
    })
    .option('output', {
      alias: ['o'],
      default: 'pretty',
      choices: ['json', 'pretty', 'xml'],
      type: 'string',
    })
}
