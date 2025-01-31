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
    // Make a sample request to get the user's email
    trySampleRequest(params['access_token'])
  } else {
    console.warn('State mismatch. Possible CSRF attack')
  }
}

const trySampleRequest = async (accessToken: string) => {
  try {
    const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      console.log('User email:', data.email)
    } else if (response.status === 401) {
      // Token invalid, so prompt for user permission.
      console.warn('Token invalid, please sign in again.')
    } else {
      console.error('Error fetching user email:', response.statusText)
    }
  } catch (error) {
    console.error('Error fetching user email:', error)
  }
}
