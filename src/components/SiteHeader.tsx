import { useEffect, useState } from 'react'
import { Coffee, Menu as MenuIcon, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/lib/cart'

const links = [
  { href: '#menu', label: 'Menu' },
  { href: '#tasarla', label: 'Build Your Coffee' },
  { href: '#mekan', label: 'Our Space' },
  { href: '#rezervasyon', label: 'Reservations' },
]

export default function SiteHeader() {
  const { count, setOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [bump, setBump] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!count) return

    setBump(true)

    const t = setTimeout(() => setBump(false), 350)

    return () => clearTimeout(t)
  }, [count])

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-[1.35rem] border px-3 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? 'metal border-white/80 shadow-[0_12px_35px_-20px_rgb(67_41_31/0.45)] backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        {/* Brand */}
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          onClick={() => setMobile(false)}
        >
          <span className="metal-rose grid h-9 w-9 place-items-center rounded-full text-white shadow-sm transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
            <Coffee size={18} strokeWidth={2.2} />
          </span>

          <span className="font-display text-xl font-semibold tracking-tight text-cocoa-700 transition-colors group-hover:text-rose-600">
            Rosé & Co.
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-sm font-semibold text-cocoa-600 transition duration-200 hover:bg-white/65 hover:text-rose-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className={`btn-metal relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-cocoa-700 transition duration-200 hover:-translate-y-0.5 ${
              bump ? 'scale-110' : ''
            }`}
            aria-label="View your order"
          >
            <ShoppingBag size={16} />

            <span className="hidden sm:inline">Order</span>

            {count > 0 && (
              <span className="metal-rose grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          <button
            className="btn-metal grid h-9 w-9 place-items-center rounded-full md:hidden"
            onClick={() => setMobile((m) => !m)}
            aria-label={mobile ? 'Close menu' : 'Open menu'}
            aria-expanded={mobile}
          >
            {mobile ? <X size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobile && (
        <nav className="metal mx-auto mt-2 max-w-6xl rounded-[1.35rem] border border-white/80 p-2 shadow-[0_16px_35px_-24px_rgb(67_41_31/0.45)] md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobile(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-cocoa-600 transition duration-200 hover:bg-white/65 hover:text-rose-600"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}