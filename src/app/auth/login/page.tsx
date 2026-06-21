'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) throw authError
      window.location.href = '/'
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <main className="flex-1 bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#0f1f3d' }}>Welcome back</h1>
            <p className="text-gray-500 text-sm">Log in to manage your listings and bookings.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" required autoComplete="email" placeholder="you@umich.edu" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} required autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">{error}</div>}

              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity" style={{ backgroundColor: '#0f1f3d' }}>
                {loading ? <><Loader2 size={16} className="animate-spin" /> Logging in...</> : 'Log in'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">Don't have an account? <Link href="/auth/signup" className="font-semibold hover:underline" style={{ color: '#0f1f3d' }}>Sign up</Link></p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
