import { Global, Output } from '@nativecode/media-cli'
import { Arguments, CommandModule, Options } from 'yargs'

import client from '../client'

import { ListPropertyFilter } from '../filters'

export interface CalendarOptions extends Global {
  end?: string
  start?: string
}

function days(date: Date, days: number): Date {
  const newdate = new Date(date)
  newdate.setDate(newdate.getDate() + days)
  return newdate
}

const options: { [key: string]: Options } = {
  end: {
    default: days(new Date(), 7).toISOString(),
    type: 'string',
  },
  start: {
    default: days(new Date(), -7).toISOString(),
    type: 'string',
  },
}

export class CalendarCommand implements CommandModule<{}, CalendarOptions> {
  aliases = ['cal']
  command = 'calendar'
  builder = options
  handler = async (args: Arguments<CalendarOptions>) => {
    const sonarr = client(args)
    const episodes = await sonarr.calendar.list(args.start, args.end)
    Output(args, episodes, 'episodes', args.compact, ListPropertyFilter)
  }
}

export default new CalendarCommand()
