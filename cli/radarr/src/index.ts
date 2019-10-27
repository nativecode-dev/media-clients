import yargs, { Arguments } from 'yargs'

import env from './env'
import global, { Global } from './options/global'

import ListCommand, { ListOptions } from './commands/list'
import SelectCommand, { SelectOptions } from './commands/select'
import MovieCommand, { MovieOptions } from './commands/movie'

global(yargs)
  .scriptName('radarr-cli')
  .command('$0 <list|select>', false)
  .command<ListOptions>(ListCommand)
  .command<MovieOptions>(MovieCommand)
  .command<SelectOptions>(SelectCommand)
  .middleware((args: Arguments<Global>) => {
    args = env(args)

    if (process.env.DEBUG) {
      console.log(args)
    }
  })
  .showHelpOnFail(true)
  .parse()
