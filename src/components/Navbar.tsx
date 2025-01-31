'use client'

import { cn } from '@/utils/cn'
import { ROUTES } from '@/utils/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './Button'

export default function NavBar({ className }: { className?: string }) {
  const pathname = usePathname()

  if (pathname === ROUTES.LOGIN) return null

  // TODO: change to logout when user is signed in

  return (
    <nav className={cn('flex w-screen bg-primary justify-end', className)}>
      <Link href={ROUTES.LOGIN} className="flex items-center px-4 py-3">
        <Button variant="secondary">Sign In</Button>
      </Link>
    </nav>
  )
}
