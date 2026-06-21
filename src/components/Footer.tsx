import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f1f3d' }} className="text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold">Leasly</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#f5c518', color: '#0f1f3d' }}>BETA</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">The student subletting platform. Know if you can sublet, then list in minutes.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-400">Platform</h4>
            <ul className="space-y-2">
              {[
                { href: '/listings', label: 'Find a place' },
                { href: '/create-listing', label: 'List your place' },
                { href: '/lease-reader', label: 'AI Lease Reader' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-400">Company</h4>
            <ul className="space-y-2">
              {['About', 'Privacy', 'Terms', 'Contact'].map((label) => (
                <li key={label}>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Leasly. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Starting with <span style={{ color: '#f5c518' }}>University of Michigan</span> 🐝</p>
        </div>
      </div>
    </footer>
  )
}
