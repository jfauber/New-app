'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { MapPin, Calendar, Bed, Bath, Wifi, Car, Utensils, Wind, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

const MOCK_LISTINGS: Record<string, {
  id: string; title: string; price: number; location: string; university: string; beds: number; baths: number;
  dateStart: string; dateEnd: string; images: string[]; description: string;
  amenities: string[]; rules: string[]; host: { name: string; avatar: string; bio: string; since: string };
}> = {
  '1': {
    id: '1', title: 'Sunny Studio Near Central Campus', price: 65, location: 'Central Campus, Ann Arbor, MI', university: 'University of Michigan', beds: 0, baths: 1, dateStart: 'May 1, 2025', dateEnd: 'Aug 15, 2025',
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=80', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&q=80'],
    description: 'A bright and cozy studio apartment just a 5-minute walk from the Diag. Perfect for a summer intern or visiting student. Newly renovated kitchen, large windows, and tons of natural light.',
    amenities: ['WiFi', 'Air conditioning', 'In-unit kitchen', 'Parking available', 'Laundry in building'],
    rules: ['No smoking', 'No pets', 'Quiet hours after 10pm', 'No parties'],
    host: { name: 'Priya K.', avatar: 'P', bio: 'Junior studying Information Science. Doing my summer internship in NYC and hoping to find someone who will love this place as much as I do.', since: 'April 2025' },
  },
  '2': {
    id: '2', title: 'Modern 1BR with In-Unit Laundry', price: 95, location: 'Kerrytown, Ann Arbor, MI', university: 'University of Michigan', beds: 1, baths: 1, dateStart: 'May 15, 2025', dateEnd: 'Jul 31, 2025',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80'],
    description: 'Updated 1-bedroom in the Kerrytown neighborhood — walkable to Whole Foods, the farmers market, and downtown. In-unit washer/dryer, central AC, and modern finishes throughout.',
    amenities: ['WiFi', 'Air conditioning', 'In-unit laundry', 'Dishwasher', 'Parking'],
    rules: ['No smoking', 'Pets OK (small dogs only)', 'No parties'],
    host: { name: 'Marcus T.', avatar: 'M', bio: 'Senior in Engineering. Spending the summer in San Francisco.', since: 'March 2025' },
  },
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'WiFi': <Wifi size={16} />, 'Air conditioning': <Wind size={16} />, 'In-unit kitchen': <Utensils size={16} />,
  'In-unit laundry': <Utensils size={16} />, 'Parking available': <Car size={16} />, 'Parking': <Car size={16} />,
  'Laundry in building': <Utensils size={16} />, 'Dishwasher': <Utensils size={16} />,
}

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const listing = MOCK_LISTINGS[id]
  const [imgIdx, setImgIdx] = useState(0)
  const [showContact, setShowContact] = useState(false)

  if (!listing) {
    return (
      <>
        <Nav />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">Listing not found.</p>
            <Link href="/listings" className="text-sm font-semibold underline" style={{ color: '#0f1f3d' }}>Back to listings</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/listings" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to listings
          </Link>

          <div className="relative rounded-2xl overflow-hidden bg-gray-200 mb-8 h-72 md:h-96">
            <img src={listing.images[imgIdx]} alt={listing.title} className="w-full h-full object-cover" />
            {listing.images.length > 1 && (
              <>
                <button onClick={() => setImgIdx((i) => (i - 1 + listing.images.length) % listing.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-50 transition-colors"><ChevronLeft size={20} /></button>
                <button onClick={() => setImgIdx((i) => (i + 1) % listing.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-50 transition-colors"><ChevronRight size={20} /></button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {listing.images.map((_, i) => <button key={i} onClick={() => setImgIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white scale-125' : 'bg-white/50'}`} />)}
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#0f1f3d' }}>{listing.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={14} />{listing.location}</span>
                  <span className="flex items-center gap-1"><Bed size={14} />{listing.beds === 0 ? 'Studio' : `${listing.beds} bedroom`}</span>
                  <span className="flex items-center gap-1"><Bath size={14} />{listing.baths} bath</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h2 className="font-semibold mb-3" style={{ color: '#0f1f3d' }}>About this place</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{listing.description}</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h2 className="font-semibold mb-4" style={{ color: '#0f1f3d' }}>Amenities</h2>
                <div className="grid grid-cols-2 gap-2">
                  {listing.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-gray-400">{AMENITY_ICONS[a] || '•'}</span>{a}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h2 className="font-semibold mb-3" style={{ color: '#0f1f3d' }}>House rules</h2>
                <ul className="space-y-2">
                  {listing.rules.map((r) => (
                    <li key={r} className="text-sm text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />{r}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h2 className="font-semibold mb-4" style={{ color: '#0f1f3d' }}>Your host</h2>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0" style={{ backgroundColor: '#0f1f3d' }}>{listing.host.avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{listing.host.name}</p>
                    <p className="text-xs text-gray-400 mb-2">Leasly member since {listing.host.since}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{listing.host.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm sticky top-24">
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold" style={{ color: '#0f1f3d' }}>${listing.price}</span>
                  <span className="text-gray-400 text-sm">/ night</span>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Available</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-700"><Calendar size={14} className="text-gray-400" />{listing.dateStart} — {listing.dateEnd}</div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">University</p>
                    <p className="text-sm text-gray-700 mt-1">{listing.university}</p>
                  </div>
                </div>
                {showContact ? (
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm font-medium text-gray-800 mb-1">Contact the host</p>
                    <p className="text-xs text-gray-500 mb-3">Sign up to send a message and book this place.</p>
                    <Link href="/auth/signup" className="block w-full py-2.5 rounded-xl text-sm font-semibold text-white text-center" style={{ backgroundColor: '#0f1f3d' }}>Create an account</Link>
                    <Link href="/auth/login" className="block text-xs text-gray-400 mt-2 hover:text-gray-600">Already have an account? Log in</Link>
                  </div>
                ) : (
                  <button onClick={() => setShowContact(true)} className="w-full py-3.5 rounded-xl font-semibold text-sm" style={{ backgroundColor: '#f5c518', color: '#0f1f3d' }}>Request to book</button>
                )}
                <p className="text-xs text-gray-400 text-center mt-3">You won't be charged yet</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
