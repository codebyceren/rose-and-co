import { Coffee, Instagram } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer className="px-5 pb-10 pt-10 sm:px-8">
      <div className="metal-cocoa mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-[2rem] px-8 py-10 text-white sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="metal-rose grid h-10 w-10 place-items-center rounded-full">
            <Coffee size={18} />
          </span>

          <div>
            <div className="text-chrome font-display text-2xl font-semibold">
              Rosé & Co.
            </div>

            <div className="text-xs text-rose-300">
              Chrome · Rose · Cocoa — 2026
            </div>
          </div>
        </div>

        <p className="max-w-xs text-center text-sm text-white/70 sm:text-right">
          Specialty coffee, handmade desserts, and beautiful mornings in
          Kadıköy.
        </p>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="btn-metal grid h-10 w-10 place-items-center rounded-full text-cocoa-700"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>
      </div>
    </footer>
  )
}