import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await auth.signIn(email, password)
    setLoading(false)
    if (res.error) {
      setError(res.error.message || 'Sign in failed')
      return
    }

    // wait a moment for auth state to update
    setTimeout(() => {
      if (auth.isAdmin) navigate('/')
    }, 500)
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm">Email</span>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>

        <label className="block">
          <span className="text-sm">Password</span>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>

        {error && <div className="text-destructive">{error}</div>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}
