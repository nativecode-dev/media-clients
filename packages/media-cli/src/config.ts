import { fs } from '@nofrills/fs'

const configname = '.radarrrc.json'

function EtcConfigPath(): string {
  return fs.join('/etc', configname)
}

function UserConfigPath(): string {
  const root = process.env.HOME || process.cwd()
  return fs.join(root, configname)
}

export async function ConfigPath(): Promise<string> {
  const paths = [EtcConfigPath(), UserConfigPath()]
  const tasks = paths.map(async path => ((await fs.exists(path)) ? path : null))
  const found = await Promise.all(tasks)

  return found.reduce<string>((previous, current) => {
    if (current === null) {
      return previous
    }
    return current
  }, UserConfigPath())
}

export async function LoadConfig<T>(filepath: string): Promise<T | null> {
  if (await fs.exists(filepath)) {
    return fs.json<T>(filepath)
  }

  return null
}

export function SaveConfig<T>(filepath: string, config: T): Promise<boolean> {
  return fs.save(filepath, config)
}
