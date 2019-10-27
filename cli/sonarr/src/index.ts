import yargs, { Arguments } from 'yargs'

import { ConfigureCommand, Global } from '@nativecode/media-cli'

import env from './env'

import ListCommand, { ListOptions } from './commands/list'

yargs
  .scriptName('sonarr-cli')
  .command('$0 <list>', false)
  .command<Global>(new ConfigureCommand())
  .command<ListOptions>(ListCommand)
  .middleware((args: Arguments<Global>) => {
    args = env(args)

    if (process.env.DEBUG) {
      console.log(args)
    }
  })
  .showHelpOnFail(true)
  .help()
  .parse()
