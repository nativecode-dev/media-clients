export interface TimeSpanElapsed {
  (): number
  rounded: () => number
  seconds: () => number
  nanoseconds: () => number
}
