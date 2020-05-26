import { MediaFilter } from '../MediaFilter'

export function MediaFileFilterFactory(): MediaFilter {
  return (filename: string) => {
    const regex = /\.(avi|mp4|mpeg|mpg|wmv)$/gim
    return regex.test(filename)
  }
}
