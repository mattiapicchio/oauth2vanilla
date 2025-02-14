import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { validateOAuthSession } from './features/auth/googleAuth'
import { getCookie } from './utils/cookies.server'
import { KEY } from './utils/keys'
// import { ROUTES } from './utils/routes'

export default async function middleware(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get(KEY.PARAM_CODE)
  const state = searchParams.get(KEY.PARAM_STATE)

  const activeOauthState = await getCookie(KEY.AUTH_STATE)

  if (code && state && activeOauthState) {
    // Setting cookies on the response using the `ResponseCookies` API
    const response = NextResponse.next()
    const token = await validateOAuthSession({ state, code, activeOauthState })

    if (token) {
      response.cookies.set(KEY.ACCESS_TOKEN, token)
    }

    return response
  }

  /* --------------------------------------------------------- */

  /* ROUTE GUARDS */

  /* --------------------------------------------------------- */

  // TODO: uncomment after login is implemented

  // const isAuthenticated = false //request.cookies.get(COOKIES.ACCESS_TOKEN)

  // const pathname = request.nextUrl.pathname

  // const isProtectedRoute = pathname === ROUTES.HOME

  // const isLoginRoute = pathname === ROUTES.LOGIN

  // if (isProtectedRoute && !isAuthenticated) {
  //   return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
  // }

  // if (isLoginRoute && isAuthenticated) {
  //   return NextResponse.redirect(new URL(ROUTES.HOME, request.url))
  // }

  /* --------------------------------------------------------- */
}

export const config = {
  matcher:
    /*

* Ignore static and public files

* https://clerk.com/blog/skip-nextjs-middleware-static-and-public-files

*/

    ['/((?!.*\\.).*)'],
}
