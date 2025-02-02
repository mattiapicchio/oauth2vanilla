import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.json({ message: 'Cookie set' })
  response.cookies.set('foo', 'fooooo', { secure: true })
  console.log('response.cookies', response.cookies)

  return response
}
