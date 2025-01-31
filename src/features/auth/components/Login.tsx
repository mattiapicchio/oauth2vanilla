'use client'

import { Button } from '@/components/Button'
import { redirectToGoogleAuth } from '@/features/auth/googleAuth'
import { cn } from '@/utils/cn'

type LoginProps = {
  className?: string
}

// TODO: customise Google Button
export default function Login({ className }: LoginProps) {
  return (
    <div className={cn('flex', className)}>
      <Button onClick={() => redirectToGoogleAuth()}>Login with Google</Button>
    </div>
  )
}
