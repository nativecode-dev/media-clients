import yargs, { Arguments } from 'yargs'

import env from './env'
import log from './logging'

import { ConfigureCommand, GlobalOptions, Global } from '@nativecode/media-cli'

import { Load } from './config'

import CalendarCommand, { CalendarOptions } from './commands/calendar'
import ListCommand, { ListOptions } from './commands/list'
import MonitorCommand, { MonitorOptions } from './commands/monitor'
import MovieCommand, { MovieOptions } from './commands/movie'
import SelectCommand, { SelectOptions } from './commands/select'

const args = GlobalOptions(yargs)
  .scriptName('radarr-cli')
  .command('$0 <list|select>', false)
  .command<CalendarOptions>(CalendarCommand)
  .command<Global>(new ConfigureCommand())
  .command<ListOptions>(ListCommand)
  .command<MonitorOptions>(MonitorCommand)
  .command<MovieOptions>(MovieCommand)
  .command<SelectOptions>(SelectCommand)
  .middleware(async (args: Arguments<Global>) => {
    args = env(args)
    await Load(args)

    if (process.env.DEBUG) {
      console.log(args)
    }
  })
  .showHelpOnFail(true)
  .help()
  .parse()

log.trace(args)
