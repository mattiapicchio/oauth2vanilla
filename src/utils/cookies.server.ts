'use server'

import { cookies } from 'next/headers'
import 'server-only'

// TODO: check docs for 'server-only'

export async function getCookie(key: string) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(key)

  if (cookie) {
    return cookie.value
  }
}

export async function setCookie(key: string, value: string) {
  const cookieStore = await cookies()
  cookieStore.set(key, value, { secure: true })
}

export async function checkCookie(key: string) {
  const cookieStore = await cookies()
  return cookieStore.has(key)
}
