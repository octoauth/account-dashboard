import OctoauthClient from 'octoauth-client'
import settings from '../settings'

export default new OctoauthClient({
    clientId: settings.octoauthClientId,
    redirectURI: window.location.origin,
    scopes: settings.octoauthScopes,
    serverURL: settings.octoauthBaseURL
})
