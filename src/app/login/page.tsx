import Login from '@/features/auth/components/Login'

export default async function Home() {
  return (
    <div className="flex-col justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Login className="mt-12" />
    </div>
  )
}
