import { useRef } from 'react'
import { ArrowDown, Star } from 'lucide-react'
import { cdn } from '@/lib/img'
import OpenBadge from './OpenBadge'

export default function Hero() {
  const card = useRef<HTMLDivElement>(null)

  // Gentle 3D tilt on the hero image frame
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = card.current
    if (!el) return

    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5

    el.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg)`
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const onLeave = () => {
    if (card.current) {
      card.current.style.transform = ''
    }
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:pb-24 lg:pt-40"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="relative z-10">
          <OpenBadge />

          <h1 className="mt-7 max-w-xl font-display text-5xl font-light leading-[0.98] tracking-[-0.035em] text-cocoa-700 sm:text-6xl lg:text-[5.5rem]">
            A little
            <br />
            <span className="text-rose-metal font-semibold italic">
              rose
            </span>
            <br />
            in every cup.
          </h1>

          <p className="mt-7 max-w-lg text-[1.05rem] leading-8 text-cocoa-500">
            Rosé & Co. is a modern coffee house where specialty coffee meets
            soft pink details, slow mornings, and beautifully crafted desserts.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#menu"
              className="metal-rose rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
            >
              Explore the Menu
            </a>

            <a
              href="#rezervasyon"
              className="btn-metal rounded-full px-7 py-3.5 text-sm font-bold text-cocoa-700"
            >
              Reserve a Table
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-cocoa-500">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 text-rose-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>

              <span className="font-semibold text-cocoa-600">4.9</span>

              <span className="text-steel-500">
                · 1,200+ reviews
              </span>
            </div>

            <span className="hidden h-4 w-px bg-steel-300 sm:block" />

            <span className="hidden text-steel-500 sm:block">
              Freshly roasted every day
            </span>
          </div>
        </div>

        <div className="relative lg:pt-4">
          <div className="metal-rose absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-45 blur-3xl" />

          <div
            ref={card}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className="metal rivets shine relative rounded-[2rem] p-3 transition-transform duration-300 ease-out will-change-transform"
          >
            <img
              src={cdn('hero.png', 1100)}
              srcSet={`${cdn('hero.png', 700)} 700w, ${cdn('hero.png', 1100)} 1100w`}
              sizes="(min-width: 1024px) 560px, 100vw"
              alt="Espresso flowing from a chrome espresso machine into a pink cup"
              className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
              fetchPriority="high"
            />

            <div className="metal-cocoa absolute -bottom-6 -left-6 rounded-2xl px-5 py-4 text-white shadow-lg">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-rose-300">
                Today's Roast
              </div>

              <div className="mt-0.5 font-display text-lg">
                Ethiopia Guji · 93°C
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#menu"
        className="mx-auto mt-20 flex w-fit flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-steel-500 transition-colors hover:text-rose-600"
      >
        Scroll
        <ArrowDown size={15} className="animate-bounce" />
      </a>
    </section>
  )
}