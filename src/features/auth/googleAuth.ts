import { generateCryptoRandomValue } from '@/utils/cryptoUtils'

const authBaseUrl = `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}`

export const redirectToGoogleAuth = () => {
  const clientId = `${process.env.NEXT_PUBLIC_GCP_CLIENT_ID}`
  const redirectUri = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}`
  const responseType = 'token'
  const scope = 'openid email profile'
  const state = generateCryptoRandomValue()
  const prompt = 'consent'

  // Save the state value in localStorage to validate the auth flow is not tampered with
  localStorage.setItem('oauth_state', state)

  const authUrl = `${authBaseUrl}?client_id=${encodeURIComponent(
    clientId,
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${encodeURIComponent(
    responseType,
  )}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}&prompt=${encodeURIComponent(prompt)}`

  // Redirect the user to Google's OAuth 2.0 endpoint
  window.location.href = authUrl
}

// `https://oauth2.googleapis.com/token`.

export const handleOAuthCallback = () => {
  if (typeof window === 'undefined') return

  const hash = window.location.hash.substring(1) // Remove the '#' character

  if (!hash) {
    return
  }

  const params: { [key: string]: string | null } = {}

  const regex = /([^&=]+)=([^&]*)/g
  let m
  while ((m = regex.exec(hash)) !== null) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
  }
  console.log('result', params)

  const activeOauthState = localStorage.getItem('oauth_state')
  if (params['state'] === activeOauthState && params['access_token']) {
    // TODO: change this to a HttpOnly cookie
    document.cookie = `access_token=${params['access_token']}; Secure; SameSite=Strict; Path=/;`

    // TODO: add sample request to verify flow
    // trySampleRequest();
  } else {
    console.warn('State mismatch. Possible CSRF attack')
  }
}
