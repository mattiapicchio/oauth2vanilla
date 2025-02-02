'use server'

import { validateOAuthSession } from '@/features/auth/googleAuth'
import { getCookie } from '@/utils/cookies.server'
import { KEY } from '@/utils/keys'

async function handleOAuthCallback({ state, code }: { code?: string; state?: string }) {
  'use server'

  if (!code || !state) return

  const activeOauthState = await getCookie(KEY.AUTH_STATE)
  console.log('yoo activeOauthState', activeOauthState)

  return await validateOAuthSession({ state, code, activeOauthState })
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { code, state } = await searchParams
  console.log('code', code)
  console.log('state', state)

  if (Array.isArray(code) || Array.isArray(state)) {
    throw new Error('Expected single value for code and state')
  }
  await handleOAuthCallback({ state, code })

  return (
    <div className="flex-col justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Oauth2 Sandbox
    </div>
  )
}
