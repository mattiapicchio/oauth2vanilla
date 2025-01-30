const authBaseUrl = `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}`
export const redirectToGoogleAuth = () => {
  const clientId = `${process.env.NEXT_PUBLIC_GCP_CLIENT_ID}`
  const redirectUri = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}`
  const responseType = 'code'
  const scope = 'openid email profile'
  const accessType = 'offline'

  const authUrl = `${authBaseUrl}?client_id=${encodeURIComponent(
    clientId,
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${encodeURIComponent(
    responseType,
  )}&scope=${encodeURIComponent(scope)}&access_type=${encodeURIComponent(accessType)}`

  // Redirect the user to Google's OAuth 2.0 endpoint
  window.location.href = authUrl
}

// `https://oauth2.googleapis.com/token`.
