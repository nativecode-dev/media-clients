import { fs } from '@nofrills/fs'

const filepath = fs.join(__dirname, '../../../', '.cache')

export function cacheRead(filename: string): Promise<Buffer> {
  const fullpath = fs.join(filepath, filename)
  return fs.readFile(fullpath)
}

export function cacheExists(filename: string): Promise<boolean> {
  const fullpath = fs.join(filepath, filename)
  return fs.exists(fullpath)
}

export async function cacheSave<T>(value: T, filename: string): Promise<void> {
  const fullpath = fs.join(filepath, filename)
  return fs.writeFile(fullpath, value)
}
