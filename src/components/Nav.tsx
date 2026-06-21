'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold" style={{ color: '#0f1f3d' }}>Leasly</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#f5c518', color: '#0f1f3d' }}>BETA</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/listings" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Find a place</Link>
            <Link href="/lease-reader" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">AI Lease Reader</Link>
            <Link href="/create-listing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">List your place</Link>
            <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Log in</Link>
            <Link href="/auth/signup" className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-colors" style={{ backgroundColor: '#0f1f3d' }}>Sign up</Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link href="/listings" className="block text-sm font-medium text-gray-700 py-2" onClick={() => setOpen(false)}>Find a place</Link>
          <Link href="/lease-reader" className="block text-sm font-medium text-gray-700 py-2" onClick={() => setOpen(false)}>AI Lease Reader</Link>
          <Link href="/create-listing" className="block text-sm font-medium text-gray-700 py-2" onClick={() => setOpen(false)}>List your place</Link>
          <Link href="/auth/login" className="block text-sm font-medium text-gray-700 py-2" onClick={() => setOpen(false)}>Log in</Link>
          <Link href="/auth/signup" className="block text-sm font-semibold px-4 py-2 rounded-lg text-white text-center mt-2" style={{ backgroundColor: '#0f1f3d' }} onClick={() => setOpen(false)}>Sign up</Link>
        </div>
      )}
    </nav>
  )
}
