export interface PlexOptions {
  app: {
    name: string
    version: string
  }
  auth: {
    token?: string
    password: string
    username: string
  }
}
