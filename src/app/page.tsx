'use server'

import { getCookie } from '@/utils/cookies.server'
import { KEY } from '@/utils/keys'

async function getAccessToken() {
  const token = await getCookie(KEY.ACCESS_TOKEN)
  return !!token
}

export default async function Home() {
  const isUserAthenticated = await getAccessToken()
  console.log('isUserAthenticated', isUserAthenticated)

  return (
    <div className="flex-col justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Oauth2 Sandbox
    </div>
  )
}
