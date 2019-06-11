export interface SystemStatus {
  version: string
  buildTime: Date
  isDebug: boolean
  isProduction: boolean
  isAdmin: boolean
  isUserInteractive: boolean
  startupPath: string
  appData: string
  osVersion: string
  isMonoRuntime: boolean
  isMono: boolean
  isLinux: boolean
  isOsx: boolean
  isWindows: boolean
  branch: string
  authentication: string
  sqliteVersion: string
  urlBase: string
  runtimeVersion: string
}
