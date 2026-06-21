'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Search, SlidersHorizontal, MapPin, Calendar, Bed, X } from 'lucide-react'

const MOCK_LISTINGS = [
  { id: '1', title: 'Sunny Studio Near Central Campus', price: 65, location: 'Central Campus, Ann Arbor', university: 'University of Michigan', beds: 0, dateStart: 'May 1', dateEnd: 'Aug 15', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80', host: { name: 'Priya K.', avatar: 'P' } },
  { id: '2', title: 'Modern 1BR with In-Unit Laundry', price: 95, location: 'Kerrytown, Ann Arbor', university: 'University of Michigan', beds: 1, dateStart: 'May 15', dateEnd: 'Jul 31', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80', host: { name: 'Marcus T.', avatar: 'M' } },
  { id: '3', title: 'Spacious 2BR — Walk to Law School', price: 130, location: 'Burns Park, Ann Arbor', university: 'University of Michigan', beds: 2, dateStart: 'Jun 1', dateEnd: 'Aug 31', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80', host: { name: 'Sophia W.', avatar: 'S' } },
  { id: '4', title: 'Cozy Room in Shared House', price: 45, location: 'South University, Ann Arbor', university: 'University of Michigan', beds: 1, dateStart: 'May 1', dateEnd: 'Aug 1', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80', host: { name: 'James L.', avatar: 'J' } },
  { id: '5', title: 'Luxury High-Rise Studio — City Views', price: 110, location: 'Downtown Ann Arbor', university: 'University of Michigan', beds: 0, dateStart: 'Jun 15', dateEnd: 'Aug 15', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', host: { name: 'Alex R.', avatar: 'A' } },
  { id: '6', title: 'Charming 2BR Near Diag', price: 115, location: 'The Diag Area, Ann Arbor', university: 'University of Michigan', beds: 2, dateStart: 'May 1', dateEnd: 'Jul 15', image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&q=80', host: { name: 'Nina P.', avatar: 'N' } },
]

export default function ListingsPage() {
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(200)
  const [beds, setBeds] = useState<number | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = MOCK_LISTINGS.filter((l) => {
    const matchSearch = search === '' || l.title.toLowerCase().includes(search.toLowerCase()) || l.location.toLowerCase().includes(search.toLowerCase())
    const matchPrice = l.price <= maxPrice
    const matchBeds = beds === null || l.beds === beds
    return matchSearch && matchPrice && matchBeds
  })

  return (
    <>
      <Nav />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#0f1f3d' }}>Find your summer place</h1>
            <p className="text-gray-500 text-sm">Student sublets at University of Michigan</p>
          </div>

          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search by location or title..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 ring-blue-200" />
            </div>
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <SlidersHorizontal size={16} />Filters
            </button>
          </div>

          {filtersOpen && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Max price / night: ${maxPrice}</label>
                <input type="range" min={30} max={200} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-yellow-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Bedrooms</label>
                <div className="flex gap-2">
                  {[null, 0, 1, 2].map((b) => (
                    <button key={String(b)} onClick={() => setBeds(b)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${beds === b ? 'text-white border-transparent' : 'text-gray-600 border-gray-200 hover:bg-gray-50'}`} style={beds === b ? { backgroundColor: '#0f1f3d' } : {}}>
                      {b === null ? 'Any' : b === 0 ? 'Studio' : `${b} BR`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-end">
                <button onClick={() => { setSearch(''); setMaxPrice(200); setBeds(null); setFiltersOpen(false) }} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                  <X size={14} /> Clear all
                </button>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500 mb-4">{filtered.length} listing{filtered.length !== 1 ? 's' : ''} found</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((listing) => (
              <Link key={listing.id} href={`/listings/${listing.id}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 right-3 bg-white rounded-lg px-2 py-1 text-xs font-bold shadow-sm" style={{ color: '#0f1f3d' }}>${listing.price}/night</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-900 transition-colors">{listing.title}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-2"><MapPin size={12} />{listing.location}</div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1"><Calendar size={12} />{listing.dateStart} — {listing.dateEnd}</div>
                    <div className="flex items-center gap-1"><Bed size={12} />{listing.beds === 0 ? 'Studio' : `${listing.beds} BR`}</div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#0f1f3d' }}>{listing.host.avatar}</div>
                    <span className="text-xs text-gray-500">{listing.host.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-2">No listings match your filters.</p>
              <button onClick={() => { setSearch(''); setMaxPrice(200); setBeds(null) }} className="text-sm text-blue-600 hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
