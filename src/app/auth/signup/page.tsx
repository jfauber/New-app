'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Loader2, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const isEdu = email.endsWith('.edu')

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!isEdu) {
      setError('Please use a .edu email address to verify your student status.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      })
      if (authError) throw authError
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <>
        <Nav />
        <main className="flex-1 bg-gray-50 flex items-center justify-center py-16 px-4">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center max-w-sm">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={28} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: '#0f1f3d' }}>Check your inbox</h2>
            <p className="text-gray-500 text-sm leading-relaxed">We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main className="flex-1 bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#0f1f3d' }}>Create your account</h1>
            <p className="text-gray-500 text-sm">Student verification required via .edu email.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                <input type="text" required placeholder="Alex Johnson" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Student email (.edu)</label>
                <div className="relative">
                  <input type="email" required placeholder="you@umich.edu" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }} className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100" />
                  {email.length > 3 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isEdu ? <CheckCircle size={16} className="text-green-500" /> : <AlertCircle size={16} className="text-orange-400" />}
                    </span>
                  )}
                </div>
                {email.length > 3 && !isEdu && <p className="text-xs text-orange-500 mt-1">Must be a .edu email address</p>}
                {isEdu && <p className="text-xs text-green-600 mt-1">Student email verified</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} required minLength={8} placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">{error}</div>}

              <button type="submit" disabled={loading || !isEdu} className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity" style={{ backgroundColor: '#0f1f3d' }}>
                {loading ? <><Loader2 size={16} className="animate-spin" /> Creating account...</> : 'Create account'}
              </button>

              <p className="text-xs text-gray-400 text-center">By signing up you agree to our Terms of Service and Privacy Policy.</p>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">Already have an account? <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: '#0f1f3d' }}>Log in</Link></p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
