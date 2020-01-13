import expect from './expect'
import Logger from './logging'

import { PlexClient } from '../src/PlexClient'
import { Movie } from '../src/MediaTypes/Movie'
import { Directory } from '../src/Models/Directory'

function getHost() {
  if (process.env.PLEX_HOST) {
    return process.env.PLEX_HOST
  }

  return 'localhost'
}

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

describe('when using PlexClient', () => {
  const password = getPassword()
  const username = getUsername()

  const plex = new PlexClient('@nativecode/plex:test', { host: getHost() }, Logger)

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
      token = await plex.accounts.token(username, password)
    })

    it('should list agents for movies', async () => {
      const agents = await plex.system.agents(token, Movie)
      expect(agents.MediaContainer.Agent).to.not.be.empty
    })

    it('should list connected drives', async () => {
      const drives = await plex.system.drives(token)
      expect(drives.MediaContainer.Path).to.not.be.undefined
    })

    it('should get list of servers', async () => {
      const servers = await plex.servers.list(token)
      expect(servers.MediaContainer.Server).to.not.be.empty
    })

    it('should get server preferences', async () => {
      const preferences = await plex.servers.preferences(token)
      expect(preferences.MediaContainer.Setting).to.not.be.empty
    })

    it('should get list of libraries', async () => {
      const libraries = await plex.libraries.list(token)
      expect(libraries.MediaContainer.Directory).to.not.be.empty
    })

    it('should get list of onDeck', async () => {
      const ondeck = await plex.libraries.onDeck(token)
      expect(ondeck.MediaContainer.Video).to.not.be.empty
    })

    it('should get list recently added', async () => {
      const recents = await plex.libraries.recentlyAdded(token)
      expect(recents.MediaContainer.Video).to.not.be.empty
    })

    describe('for specified library', () => {
      let directory: Directory

      before(async () => {
        const libraries = await plex.libraries.list(token)
        directory = libraries.MediaContainer.Directory[0]
      })

      it('should get single library', async () => {
        const response = await plex.libraries.get(token, directory.key)
        expect(response.MediaContainer.Directory).to.not.be.empty
      })

      xit('should analyze library', async () => {
        // TODO: Not sure why it's not working, will revisit - MP
        const analyze = await plex.libraries.analyze(token, directory.key)
        console.log(analyze)
      })

      it('should refresh library', () => {
        expect(plex.libraries.refresh(token, directory.key)).to.eventually.be.fulfilled
      })
    })
  })
})
