export interface PlexOptionsApp {
  name: string
  version: string
}

export interface PlexOptionsAuth {
  token: string
  password: string
  username: string
}

export interface PlexOptions {
  app: PlexOptionsApp
  auth?: Partial<PlexOptionsAuth>
}
