import React, { createContext, useContext, useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

type User = any

interface AuthContextValue {
  user: User | null
  isAdmin: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function load() {
      const { data: { user: currentUser } = {} } = await supabase.auth.getUser()
      if (!mounted) return
      setUser(currentUser ?? null)

      if (currentUser) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', currentUser.id)
            .single()

          if (error) {
            console.warn('Could not read profile for current user:', error.message || error)
            setIsAdmin(false)
          } else if (data) {
            setIsAdmin(Boolean(data.is_admin))
          }
        } catch (err) {
          console.warn('Error querying profiles table:', err)
          setIsAdmin(false)
        }
      }

      setLoading(false)
    }

    load()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (!currentUser) {
        setIsAdmin(false)
        setLoading(false)
        return
      }

      ;(async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', currentUser.id)
            .single()

          if (error) {
            console.warn('Could not read profile for current user:', error.message || error)
            setIsAdmin(false)
          } else if (data) {
            setIsAdmin(Boolean(data.is_admin))
          }
        } catch (err) {
          console.warn('Error querying profiles table:', err)
          setIsAdmin(false)
        }
      })()
    })

    return () => {
      mounted = false
      listener?.subscription?.unsubscribe()
    }
  }, [])

  // expose admin flag globally for legacy components (if needed)
  useEffect(() => {
    try {
      ;(window as any).__isAdmin = isAdmin
    } catch (e) {
      // noop in non-browser environments
    }
  }, [isAdmin])

  async function signIn(email: string, password: string) {
    const res = await supabase.auth.signInWithPassword({ email, password })
    if (res.error) return { error: res.error }
    // profile check will happen via auth state change
    return {}
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
  }

  const value: AuthContextValue = { user, isAdmin, loading, signIn, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
