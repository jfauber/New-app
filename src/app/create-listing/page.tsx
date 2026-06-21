'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Upload, CheckCircle, Plus, X } from 'lucide-react'

const AMENITIES = ['WiFi', 'Air conditioning', 'Heating', 'Kitchen', 'In-unit laundry', 'Laundry in building', 'Parking', 'Dishwasher', 'TV', 'Gym access', 'Rooftop access', 'Pets allowed']

const UNIVERSITIES = [
  'University of Michigan', 'Michigan State University', 'University of Wisconsin',
  'Ohio State University', 'Indiana University', 'Purdue University',
  'Northwestern University', 'University of Illinois',
]

export default function CreateListingPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', university: '', location: '', price: '',
    beds: '', baths: '', dateStart: '', dateEnd: '', amenities: [] as string[], rules: '',
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const newFiles = [...photos, ...files].slice(0, 8)
    setPhotos(newFiles)
    setPhotoPreviews(newFiles.map((f) => URL.createObjectURL(f)))
  }

  function removePhoto(i: number) {
    setPhotos(photos.filter((_, idx) => idx !== i))
    setPhotoPreviews(photoPreviews.filter((_, idx) => idx !== i))
  }

  function toggleAmenity(a: string) {
    setForm((f) => ({ ...f, amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a] }))
  }

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  if (submitted) {
    return (
      <>
        <Nav />
        <main className="flex-1 bg-gray-50 flex items-center justify-center py-20">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center max-w-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#0f1f3d' }}>Listing submitted!</h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">Your listing is under review. We'll notify you once it's live — usually within 24 hours.</p>
            <a href="/listings" className="inline-block px-6 py-3 rounded-xl font-semibold text-sm text-white" style={{ backgroundColor: '#0f1f3d' }}>Browse other listings</a>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#0f1f3d' }}>List your place</h1>
            <p className="text-gray-500 text-sm">Takes about 5 minutes. We'll review before it goes live.</p>
          </div>

          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all" style={step >= s ? { backgroundColor: '#0f1f3d', color: 'white' } : { backgroundColor: '#e5e7eb', color: '#9ca3af' }}>
                  {step > s ? <CheckCircle size={16} /> : s}
                </div>
                <span className="text-xs text-gray-400 hidden sm:block">{s === 1 ? 'Basics' : s === 2 ? 'Photos & Amenities' : 'Dates & Price'}</span>
                {s < 3 && <div className="w-8 h-px bg-gray-200 mx-1" />}
              </div>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">
                <h2 className="font-semibold text-lg" style={{ color: '#0f1f3d' }}>Tell us about your place</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Listing title</label>
                  <input type="text" required placeholder="e.g. Sunny 1BR near Central Campus" value={form.title} onChange={(e) => update('title', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">University</label>
                  <select required value={form.university} onChange={(e) => update('university', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100 bg-white">
                    <option value="">Select a university</option>
                    {UNIVERSITIES.map((u) => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Address / neighborhood</label>
                  <input type="text" required placeholder="e.g. 123 S. State St, Ann Arbor, MI" value={form.location} onChange={(e) => update('location', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Bedrooms</label>
                    <select required value={form.beds} onChange={(e) => update('beds', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100 bg-white">
                      <option value="">Select</option>
                      <option value="0">Studio</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Bathrooms</label>
                    <select required value={form.baths} onChange={(e) => update('baths', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100 bg-white">
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="1.5">1.5</option>
                      <option value="2">2</option>
                      <option value="2+">2+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                  <textarea required rows={4} placeholder="Describe your apartment..." value={form.description} onChange={(e) => update('description', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100 resize-none" />
                </div>
                <button type="button" onClick={() => setStep(2)} disabled={!form.title || !form.university || !form.location || !form.beds || !form.baths || !form.description} className="w-full py-3.5 rounded-xl font-semibold text-sm text-white disabled:opacity-50 transition-opacity" style={{ backgroundColor: '#0f1f3d' }}>Continue</button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg" style={{ color: '#0f1f3d' }}>Photos & amenities</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Photos (up to 8)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {photoPreviews.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removePhoto(i)} className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow"><X size={12} /></button>
                      </div>
                    ))}
                    {photos.length < 8 && (
                      <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors">
                        <Plus size={20} className="text-gray-400 mb-1" />
                        <span className="text-xs text-gray-400">Add photo</span>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
                      </label>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                  <div className="grid grid-cols-2 gap-2">
                    {AMENITIES.map((a) => (
                      <button key={a} type="button" onClick={() => toggleAmenity(a)} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm border transition-all text-left ${form.amenities.includes(a) ? 'border-transparent text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`} style={form.amenities.includes(a) ? { backgroundColor: '#0f1f3d' } : {}}>
                        {form.amenities.includes(a) && <CheckCircle size={14} />}{a}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">House rules (optional)</label>
                  <textarea rows={3} placeholder="No smoking, no pets, quiet hours after 10pm..." value={form.rules} onChange={(e) => update('rules', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100 resize-none" />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">Back</button>
                  <button type="button" onClick={() => setStep(3)} className="flex-1 py-3.5 rounded-xl font-semibold text-sm text-white" style={{ backgroundColor: '#0f1f3d' }}>Continue</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">
                <h2 className="font-semibold text-lg" style={{ color: '#0f1f3d' }}>Availability & pricing</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Available from</label>
                    <input type="date" required value={form.dateStart} onChange={(e) => update('dateStart', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Available until</label>
                    <input type="date" required value={form.dateEnd} onChange={(e) => update('dateEnd', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Price per night (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                    <input type="number" required min={10} max={500} placeholder="0" value={form.price} onChange={(e) => update('price', e.target.value)} className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 ring-blue-100" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Most student sublets list between $50–$130/night.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Summary</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-gray-600"><span>Title</span><span className="font-medium text-gray-900 truncate ml-4 max-w-[200px]">{form.title}</span></div>
                    <div className="flex justify-between text-gray-600"><span>University</span><span className="font-medium text-gray-900">{form.university}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Price</span><span className="font-medium text-gray-900">${form.price}/night</span></div>
                    <div className="flex justify-between text-gray-600"><span>Photos</span><span className="font-medium text-gray-900">{photos.length} uploaded</span></div>
                    <div className="flex justify-between text-gray-600"><span>Amenities</span><span className="font-medium text-gray-900">{form.amenities.length} selected</span></div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800"><span className="font-semibold">Before you list:</span> Make sure your lease allows subletting. <a href="/lease-reader" className="underline font-semibold">Check with our AI Lease Reader →</a></p>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">Back</button>
                  <button type="submit" disabled={!form.dateStart || !form.dateEnd || !form.price} className="flex-1 py-3.5 rounded-xl font-semibold text-sm disabled:opacity-50 transition-opacity" style={{ backgroundColor: '#f5c518', color: '#0f1f3d' }}>Submit listing</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
