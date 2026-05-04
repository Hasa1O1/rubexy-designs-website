import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export function AdminBar() {
  const { isAdmin, user, signOut } = useAuth()

  if (!isAdmin) {
    return null
  }

  return (
    <div className="border-b border-orange-200 bg-orange-50 px-4 py-2 text-sm text-gray-700">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <span className="font-brand">Admin mode: {user?.email}</span>
        <Button type="button" size="sm" variant="outline" className="gap-2" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )
}
