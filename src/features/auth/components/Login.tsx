'use client'

import { Button } from '@/components/Button'
import { redirectToGoogleAuth } from '@/features/auth/googleAuth'
import { cn } from '@/utils/cn'

type LoginProps = {
  className?: string
}

export default function Login({ className }: LoginProps) {
  return (
    <div className={cn('flex', className)}>
      <Button onClick={() => redirectToGoogleAuth()}>Login</Button>
    </div>
  )
}
