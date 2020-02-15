import { TimeSpanElapsed } from './TimeSpanElapsed'

const convert = (time: number[]) => {
  const nanoseconds = time[0] * 1e9 + time[1]
  const milliseconds = nanoseconds / 1e6
  const seconds = nanoseconds / 1e9

  return {
    seconds,
    milliseconds,
    nanoseconds,
  }
}

export const TimeSpan = (): TimeSpanElapsed => {
  const start = process.hrtime()

  const end = (type: string) => {
    const converted: { [key: string]: number } = convert(process.hrtime(start))
    return converted[type]
  }

  const results = () => end('milliseconds')
  results.rounded = () => Math.round(end('milliseconds'))
  results.seconds = () => end('seconds')
  results.nanoseconds = () => end('nanoseconds')

  return results
}
