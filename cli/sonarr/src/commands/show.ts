import chunk from 'chunk-text'

import { Series } from '@nativecode/sonarr'
import { Is, DictionaryOf } from '@nofrills/types'
import { Global, VerticalTable } from '@nativecode/media-cli'
import { Arguments, CommandModule, Options } from 'yargs'

import client from '../client'

import { DefaultFilter } from '../filters'

export interface ShowOptions extends Global {
  id: string
  overview: boolean
  property?: string
}

function getPropertyValue(args: ShowOptions, instance: any): any {
  if (args.property) {
    return instance[args.property]
  }

  return instance
}

function display(args: ShowOptions, show: Series): void {
  const property = getPropertyValue(args, show)

  if (Is.object(property)) {
    VerticalTable(args, property, 'show', args.compact, DefaultFilter(property))
  } else if (Is.array(property)) {
    VerticalTable(args, property, 'show', args.compact, DefaultFilter(property))
  } else if (Is.string(property)) {
    const chunks = chunk(property, process.stdout.columns - 30)
    VerticalTable(args, chunks, args.property!, args.compact || true, DefaultFilter(chunks))
  } else {
    VerticalTable(args, show, 'show', args.compact, DefaultFilter(show))
  }
}

const options: DictionaryOf<Options> = {}

export class ShowCommand implements CommandModule<{}, ShowOptions> {
  aliases = ['series']
  command = 'show <id> [property]'
  builder = options
  handler = async (args: Arguments<ShowOptions>) => {
    const sonarr = client(args)
    const show = await sonarr.shows.id(parseInt(args.id, 0))
    display(args, show)
  }
}

export default new ShowCommand()
