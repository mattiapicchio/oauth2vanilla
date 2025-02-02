'use client'

import { Button } from '@/components/Button'
import { cn } from '@/utils/cn'
import { redirectToGoogleAuth } from '../googleAuthRedirect'

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
