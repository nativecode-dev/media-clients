import { fs } from '@nofrills/fs'

import { Config } from './Config'

export class Configuration<T extends Config> {
  private readonly filedir: string
  private readonly filepath: string

  constructor(private readonly cwd: string, readonly filename: string) {
    this.filedir = fs.basename(cwd)
    this.filepath = cwd
  }

  async find(): Promise<string[]> {
    const home = process.env.HOME || this.cwd
    const files = await fs.globs([`${home}/.config/**/${this.filename}`, `/etc/**/${this.filename}`])
    return files.filter(file => /node_modules/.test(file) === false)
  }

  async load(): Promise<T> {
    const files = await this.find()
    const jsons = await Promise.all<T>(files.map(file => fs.json(file)))
    return jsons.reduce((result, current) => {
      return { ...result, ...current }
    }, {} as T)
  }

  save(config: T): Promise<boolean> {
    return fs.save(this.filename, config, true)
  }
}
