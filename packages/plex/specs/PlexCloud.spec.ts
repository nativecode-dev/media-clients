import expect from './expect'
import Logger from './logging'

import { PlexCloud } from '../src/PlexCloud/PlexCloud'
import { cacheExists, cacheRead, cacheSave } from './cache'

function getPassword() {
  if (process.env.PLEX_PASSWORD) {
    return process.env.PLEX_PASSWORD
  }

  return ''
}

function getUsername() {
  if (process.env.PLEX_USERNAME) {
    return process.env.PLEX_USERNAME
  }

  return ''
}

describe('when using PlexCloud', () => {
  const password = getPassword()
  const username = getUsername()

  const plex = new PlexCloud({}, Logger)

  it('should get user info', async () => {
    const login = await plex.accounts.login(username, password)
    expect(login.user.username).to.equal(username)
  })

  it('should get auth token', async () => {
    const token = await plex.accounts.token(username, password)
    expect(token).to.not.be.empty
  })

  describe('with auth token', () => {
    let token: string

    before(async () => {
      const exists = await cacheExists('plex.token')

      if (exists) {
        const buffer = await cacheRead('plex.token')
        token = buffer.toString()
      } else {
        token = await plex.accounts.token(username, password)
        await cacheSave(token, 'plex.token')
      }
    })

    it('should list servers', async () => {
      const servers = await plex.system.servers(token)
      expect(servers.MediaContainer.Server).to.not.be.empty
    })

    xit('should list devices', async () => {
      // TODO: Something is wrong with returned XML - MP
      const devices = await plex.system.devices(token)
      console.log(JSON.stringify(devices))
    })

    it('should get current remote ip', async () => {
      const ip = await plex.system.ip(token)
      expect(ip).to.not.be.empty
    })

    it('should list resources', async () => {
      const resources = await plex.system.resources(token)
      expect(resources.MediaContainer.Device).to.not.be.empty
    })
  })
})
