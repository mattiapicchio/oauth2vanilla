import { generateCryptoRandomValue } from '@/utils/cryptoUtils'
import { KEY } from '@/utils/keys'

const authBaseUrl = `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}`

export const redirectToGoogleAuth = () => {
  if (typeof window !== 'undefined') {
    const clientId = `${process.env.NEXT_PUBLIC_GCP_CLIENT_ID}`
    const redirectUri = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}`
    const responseType = 'code'
    const scope = 'openid email profile'
    const state = generateCryptoRandomValue()
    const prompt = 'consent'
    // TODO: test offline access type for refresh token
    // const accessType = 'offline'

    // Save the state value in a cookie to validate the auth flow is not tampered with
    document.cookie = `${KEY.AUTH_STATE}=${state};`

    const authUrl = `${authBaseUrl}?client_id=${encodeURIComponent(
      clientId,
    )}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${encodeURIComponent(
      responseType,
    )}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}&prompt=${encodeURIComponent(prompt)}`

    // Redirect the user to Google's OAuth 2.0 endpoint
    window.location.href = authUrl
  }
}
