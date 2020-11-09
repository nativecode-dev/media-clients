export interface PlexOptionsAuth {
  token: string
  password: string
  username: string
}

export interface PlexOptions {
  app: {
    name: string
    version: string
  }
  auth?: Partial<PlexOptionsAuth>
}
