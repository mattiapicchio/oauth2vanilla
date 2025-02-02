'use server'

export const validateOAuthSession = async ({
  state,
  code,
  activeOauthState,
}: {
  code: string
  state: string
  activeOauthState?: string
}) => {
  if (!code || !state) return

  if (state === activeOauthState) {
    // Exchange the authorization code for an access token
    return await exchangeCodeForToken(code)
  } else {
    console.warn('State mismatch. Possible CSRF attack')
  }
}

const exchangeCodeForToken = async (code: string) => {
  const clientId = `${process.env.NEXT_PUBLIC_GCP_CLIENT_ID}`
  const clientSecret = `${process.env.NEXT_PUBLIC_GCP_CLIENT_SECRET}`
  const redirectUri = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}`
  const tokenUrl = 'https://oauth2.googleapis.com/token'

  const params = new URLSearchParams()
  params.append('code', code)
  params.append('client_id', clientId)
  params.append('client_secret', clientSecret)
  params.append('redirect_uri', redirectUri)
  params.append('grant_type', 'authorization_code')

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (response.ok) {
      const data = await response.json()

      if (process.env.NODE_ENV === 'development') {
        // Make a sample request to get the user's email
        trySampleRequest(data.access_token)
      }

      return data.access_token
    } else {
      console.error('Error exchanging code for token:', response.statusText)
    }
  } catch (error) {
    console.error('Error exchanging code for token:', error)
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
