'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, ArrowRight, Loader2 } from 'lucide-react'

type Verdict = 'allowed' | 'not_allowed' | 'unclear'

interface LeaseResult {
  verdict: Verdict
  explanation: string
  relevant_clause: string
}

export default function LeaseReaderPage() {
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<LeaseResult | null>(null)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.type === 'application/pdf') {
      setFile(dropped)
      setResult(null)
      setError('')
    } else {
      setError('Please upload a PDF file.')
    }
  }

  async function analyze() {
    if (!file) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/analyze-lease', { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Analysis failed')
      }
      const data = await res.json()
      setResult(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const verdictConfig = {
    allowed: { icon: <CheckCircle size={28} className="text-green-600" />, bg: 'bg-green-50', border: 'border-green-200', titleColor: 'text-green-700', label: 'Subletting Allowed', badgeBg: 'bg-green-100' },
    not_allowed: { icon: <XCircle size={28} className="text-red-600" />, bg: 'bg-red-50', border: 'border-red-200', titleColor: 'text-red-700', label: 'Subletting Not Allowed', badgeBg: 'bg-red-100' },
    unclear: { icon: <AlertCircle size={28} className="text-yellow-600" />, bg: 'bg-yellow-50', border: 'border-yellow-200', titleColor: 'text-yellow-700', label: 'Unclear — Review Needed', badgeBg: 'bg-yellow-100' },
  }

  return (
    <>
      <Nav />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#0f1f3d' }}>AI Lease Reader</h1>
            <p className="text-gray-500 text-lg">Upload your lease PDF and find out if you can sublet — in seconds.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
            <div
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${dragging ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setResult(null); setError('') } }} />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(15,31,61,0.08)' }}>
                    <FileText size={20} style={{ color: '#0f1f3d' }} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload size={36} className="mx-auto mb-3 text-gray-300" />
                  <p className="font-medium text-gray-700 mb-1">Drop your lease PDF here</p>
                  <p className="text-sm text-gray-400">or click to browse</p>
                </>
              )}
            </div>

            {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}

            <button onClick={analyze} disabled={!file || loading} className="w-full mt-6 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50" style={{ backgroundColor: '#0f1f3d', color: 'white' }}>
              {loading ? <><Loader2 size={18} className="animate-spin" />Analyzing your lease...</> : <>Analyze lease</>}
            </button>

            {loading && (
              <div className="mt-4">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full animate-pulse" style={{ width: '60%', backgroundColor: '#f5c518' }} />
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">Reading the subletting clauses...</p>
              </div>
            )}
          </div>

          {result && (
            <div className="space-y-4">
              <div className={`rounded-2xl p-6 border ${verdictConfig[result.verdict].bg} ${verdictConfig[result.verdict].border}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${verdictConfig[result.verdict].badgeBg}`}>
                    {verdictConfig[result.verdict].icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Verdict</p>
                    <p className={`text-2xl font-bold ${verdictConfig[result.verdict].titleColor}`}>{verdictConfig[result.verdict].label}</p>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed ${verdictConfig[result.verdict].titleColor}`}>{result.explanation}</p>
              </div>

              {result.relevant_clause && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Relevant Clause from Your Lease</p>
                  <blockquote className="border-l-4 border-gray-300 pl-4 text-sm text-gray-600 italic leading-relaxed">"{result.relevant_clause}"</blockquote>
                </div>
              )}

              {result.verdict === 'allowed' && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                  <p className="font-semibold text-gray-800 mb-4">Great news! You can sublet. Ready to find a tenant?</p>
                  <Link href="/create-listing" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: '#f5c518', color: '#0f1f3d' }}>
                    Create a listing <ArrowRight size={16} />
                  </Link>
                </div>
              )}

              <button onClick={() => { setFile(null); setResult(null); setError('') }} className="w-full py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">Analyze another lease</button>
            </div>
          )}

          <div className="mt-8 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 text-center leading-relaxed">Leasly uses AI to analyze your lease. This is not legal advice. When in doubt, consult your landlord or a tenant rights organization.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
