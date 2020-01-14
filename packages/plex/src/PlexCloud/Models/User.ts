import { Roles } from './Roles'
import { Subscription } from './Subscription'

export interface User {
  id: number
  uuid: string
  email: string
  joined_at: string
  username: string
  title: string
  thumb: string
  hasPassword: boolean
  authToken: string
  authentication_token: string
  subscription: Subscription
  roles: Roles
  entitlements: string[]
  confirmedAt: string
  forumId: string | null
  rememberMe: boolean
}
