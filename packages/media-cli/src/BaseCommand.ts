import { CommandModule, CommandBuilder, Arguments } from 'yargs'

import { Global } from './Global'

export abstract class BaseCommand<T extends Global> implements CommandModule<{}, T> {
  abstract aliases: string[]
  abstract command: string
  abstract builder: CommandBuilder<{}, T>
  abstract handler(args: Arguments<T>): void
}
