import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

const ADMIN_EMAIL = 'rubexydesigns@gmail.com'

interface AuthContextValue {
  user: User | null
  isAdmin: boolean
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadSession() {
      const { data } = await supabase.auth.getSession()

      if (!isMounted) return

      setUser(data.session?.user ?? null)
      setIsLoading(false)
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    const email = user?.email?.toLowerCase() ?? ''

    return {
      user,
      isAdmin: email === ADMIN_EMAIL,
      isLoading,
      signOut: async () => {
        await supabase.auth.signOut()
      },
    }
  }, [isLoading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
