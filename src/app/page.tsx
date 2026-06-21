'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  Upload,
  Search,
  CheckCircle,
  Star,
  ArrowRight,
  FileText,
  Shield,
  Zap,
} from 'lucide-react'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ backgroundColor: '#0f1f3d' }}>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f5c518 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f5c518 0%, transparent 40%)' }} />
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: 'rgba(245,197,24,0.15)', color: '#f5c518' }}>
                <Zap size={14} />
                Now live at University of Michigan
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Your apartment<br />
                <span style={{ color: '#f5c518' }}>should not sit empty.</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                Leasly connects students who need to sublet with people who need a place to stay — starting with knowing if you are even allowed to.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/create-listing" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base transition-all hover:opacity-90" style={{ backgroundColor: '#f5c518', color: '#0f1f3d' }}>
                  List your place <ArrowRight size={18} />
                </Link>
                <Link href="/listings" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all">
                  Find a place <Search size={18} />
                </Link>
              </div>
              <p className="text-gray-500 text-sm mt-6">
                Not sure if you can sublet?{' '}
                <Link href="/lease-reader" className="underline" style={{ color: '#f5c518' }}>
                  Check your lease with AI
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f3d' }}>How Leasly works</h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">From lease uncertainty to booked in three steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', icon: <FileText size={28} />, title: 'Upload your lease', description: 'Drop in your PDF. Our AI reads the subletting clause and tells you in plain English whether you are allowed to sublet.', cta: { label: 'Try it free', href: '/lease-reader' } },
                { step: '02', icon: <Upload size={28} />, title: 'List your apartment', description: 'Add photos, set your dates and price, pick your university. Takes about five minutes.', cta: { label: 'Create a listing', href: '/create-listing' } },
                { step: '03', icon: <CheckCircle size={28} />, title: 'Get booked', description: 'Students and visitors find you through Leasly. You review requests and confirm bookings.', cta: { label: 'See listings', href: '/listings' } },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
                  <div className="absolute top-6 right-6 text-4xl font-bold opacity-10" style={{ color: '#0f1f3d' }}>{item.step}</div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white" style={{ backgroundColor: '#0f1f3d' }}>{item.icon}</div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#0f1f3d' }}>{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{item.description}</p>
                  <Link href={item.cta.href} className="text-sm font-semibold inline-flex items-center gap-1" style={{ color: '#0f1f3d' }}>
                    {item.cta.label} <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Lease Reader Demo */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: 'rgba(15,31,61,0.08)', color: '#0f1f3d' }}>
                  <Shield size={14} /> Powered by Claude AI
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: '#0f1f3d' }}>Know before you list.</h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-6">
                  Most students have no idea if their lease allows subletting. Our AI reads the legal language and gives you a plain-English answer in seconds — for free.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Upload any lease PDF', 'Instant verdict: Allowed, Not Allowed, or Unclear', 'Exact clause highlighted from your lease', 'Plain English explanation'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle size={18} style={{ color: '#f5c518' }} />{item}
                    </li>
                  ))}
                </ul>
                <Link href="/lease-reader" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#0f1f3d' }}>
                  Try the AI Lease Reader <ArrowRight size={18} />
                </Link>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="bg-white rounded-xl p-5 mb-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FileText size={16} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">lease_2024.pdf</p>
                      <p className="text-xs text-gray-400">Uploaded &middot; Analyzing&hellip;</p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '70%', backgroundColor: '#f5c518' }} />
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle size={22} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-green-600 uppercase tracking-wide">Verdict</p>
                      <p className="text-lg font-bold text-green-700">Subletting Allowed</p>
                    </div>
                  </div>
                  <p className="text-sm text-green-700 leading-relaxed">Your lease permits subletting with written landlord approval at least 30 days in advance. You are responsible for your subtenant's conduct.</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 border-l-4 border-gray-300">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Relevant Clause</p>
                  <p className="text-xs text-gray-600 italic leading-relaxed">"Tenant may sublet the Premises with prior written consent of Landlord, provided notice is given no fewer than thirty (30) days before the proposed commencement of any sublease."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0f1f3d' }}>Students love Leasly</h2>
              <p className="text-gray-500">Early feedback from our beta users.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: 'I uploaded my lease at midnight before my internship started. Took 30 seconds to know I was good to go. Saved me so much stress.', name: 'Priya K.', role: 'Junior, Ross School of Business' },
                { quote: 'I was paying rent in Ann Arbor while studying abroad in Barcelona. Leasly helped me find a subtenant in less than a week.', name: 'Marcus T.', role: 'Senior, College of Engineering' },
                { quote: 'The AI lease reader found the exact clause my landlord was referencing. I never would have found it on my own in that 40-page document.', name: 'Sophia W.', role: 'Graduate Student, LSA' },
              ].map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="#f5c518" style={{ color: '#f5c518' }} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#0f1f3d' }}>{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist */}
        <section className="py-20" style={{ backgroundColor: '#0f1f3d' }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Be first when we launch at your school.</h2>
            <p className="text-gray-400 mb-8 text-lg">We are starting with University of Michigan and expanding to more campuses. Get early access.</p>
            {submitted ? (
              <div className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg" style={{ backgroundColor: 'rgba(245,197,24,0.15)', color: '#f5c518' }}>
                <CheckCircle size={22} /> You are on the list! We will be in touch.
              </div>
            ) : (
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" required placeholder="your@umich.edu" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-4 py-3.5 rounded-xl text-gray-900 text-sm outline-none focus:ring-2 ring-yellow-400" />
                <button type="submit" disabled={loading} className="px-6 py-3.5 rounded-xl font-semibold text-sm disabled:opacity-60" style={{ backgroundColor: '#f5c518', color: '#0f1f3d' }}>
                  {loading ? 'Joining...' : 'Join waitlist'}
                </button>
              </form>
            )}
            <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
