import { Global } from './options/global'

export default function<T>(args: Global, value: T): void {
  switch (args.output) {
    case 'json':
      return console.log(JSON.stringify(value))

    default:
      return console.log(value)
  }
}
