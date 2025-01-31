'use client'

import { handleOAuthCallback } from '@/features/auth/googleAuth'

export default function LandingPage() {
  handleOAuthCallback()

  return <div>Welcome!</div>
}
