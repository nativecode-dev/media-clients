import yargs from 'yargs'
import yargsui from 'yargs-interactive'

import ListCommand, { ListOptions } from './commands/list'

yargs
  .command<ListOptions>(ListCommand)
  .showHelp()
  .showHelpOnFail(true)
  .parse()
