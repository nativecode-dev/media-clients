import { LoadConfig, ConfigPath, Global } from '@nativecode/media-cli'

export interface Config {
  apikey: string
  endpoint: string
}

export async function Load(args: Global): Promise<void> {
  const path = await ConfigPath('.sonarrrc.json')
  const config = await LoadConfig<Config>(path)

  if (config !== null) {
    args.apikey = config.apikey
    args.endpoint = config.endpoint
  }
}
