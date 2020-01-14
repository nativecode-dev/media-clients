import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln-debug'
import { ResourceOptions, ResourceParamType } from '@nativecode/rest-client'

import { PlexResource } from '../../PlexResource'
import { LoginResponse } from '../Responses/LoginResponse'

export class AccountResource extends PlexResource {
  constructor(url: URL, logger: Lincoln, options?: Partial<ResourceOptions>) {
    super(url, logger, options)
  }

  login(username: string, password: string): Promise<LoginResponse> {
    return this.json(
      'https://plex.tv/users/sign_in.json',
      'POST',
      [
        {
          key: 'Authorization',
          type: ResourceParamType.Header,
          value: 'Basic ' + this.btoa(`${username}:${password}`),
        },
      ],
      { username, password },
    )
  }

  async token(username: string, password: string): Promise<string> {
    const login = await this.login(username, password)
    return login.user.authToken
  }
}
