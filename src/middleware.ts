import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

import { ROUTES } from './utils/routes'

export function middleware(request: NextRequest) {
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

  return NextResponse.next()
}

export const config = {
  matcher:
    /*

* Ignore static and public files

* https://clerk.com/blog/skip-nextjs-middleware-static-and-public-files

*/

    ['/((?!.*\\.).*)'],
}
