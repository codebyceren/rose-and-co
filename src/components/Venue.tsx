import { useEffect, useState } from 'react'
import { Clock, MapPin, Phone } from 'lucide-react'
import { cdn } from '@/lib/img'
import { trackShine } from '@/lib/useReveal'
import { hours } from './OpenBadge'

const shots = [
  {
    file: 'interior.png',
    title: 'Lounge',
    text: 'Brushed aluminum walls, pink velvet seating, and warm walnut tables.',
  },
  {
    file: 'hero.png',
    title: 'Bar',
    text: 'Our chrome espresso machine warms up every morning at 7:30 AM.',
  },
  {
    file: 'latte.png',
    title: 'The Cup',
    text: 'Rose Latte — our signature drink made with house-made rose syrup.',
  },
  {
    file: 'dessert.png',
    title: 'Display',
    text: 'Pink mirror cake and fudgy brownies, freshly made every day.',
  },
]

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const fmt = (h: number) =>
  `${String(Math.floor(h)).padStart(2, '0')}:${h % 1 ? '30' : '00'}`

export default function Venue() {
  const [i, setI] = useState(0)
  const [today, setToday] = useState<number | null>(null)

  useEffect(() => setToday(new Date().getDay()), [])

  return (
    <section id="mekan" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-rose-600">
            03 — Our Space
          </p>

          <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <h2 className="max-w-2xl font-display text-4xl font-light tracking-[-0.025em] text-cocoa-700 sm:text-5xl lg:text-6xl">
              Steel, velvet{' '}
              <span className="italic text-cocoa-500">and walnut.</span>
            </h2>

            <p className="max-w-sm text-sm leading-6 text-cocoa-500 lg:text-right">
              A warm corner of Kadıköy designed for slow mornings, good coffee,
              and conversations that last.
            </p>
          </div>
        </div>

        <div className="reveal mt-12 grid gap-8 lg:grid-cols-[1.65fr_1fr] lg:gap-10">
          {/* Gallery */}
          <div
            className="metal shine rounded-[2rem] p-3"
            onPointerMove={trackShine}
          >
            <div className="relative overflow-hidden rounded-[1.5rem]">
              {shots.map((s, idx) => (
                <img
                  key={s.file + idx}
                  src={cdn(s.file, 1200)}
                  alt={s.title}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  className={`aspect-[16/10] w-full object-cover transition-all duration-700 ${
                    idx === i
                      ? 'relative scale-100 opacity-100'
                      : 'absolute inset-0 scale-[1.04] opacity-0'
                  }`}
                />
              ))}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa-900/90 via-cocoa-900/45 to-transparent p-7 pt-24 text-white">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-rose-300">
                  Rosé & Co.
                </div>

                <div className="mt-1 font-display text-3xl">
                  {shots[i].title}
                </div>

                <p className="mt-1 max-w-md text-sm leading-6 text-white/75">
                  {shots[i].text}
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-3">
              {shots.map((s, idx) => (
                <button
                  key={s.file + idx}
                  onClick={() => setI(idx)}
                  className={`group overflow-hidden rounded-xl transition duration-300 ${
                    idx === i
                      ? 'ring-2 ring-rose-500 ring-offset-2 ring-offset-steel-100'
                      : 'opacity-55 hover:opacity-100'
                  }`}
                  aria-label={`View ${s.title}`}
                >
                  <img
                    src={cdn(s.file, 240)}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Information */}
          <div className="flex flex-col gap-5">
            <div className="metal rivets rounded-[2rem] p-7 sm:p-8">
              <div className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cocoa-500">
                <Clock size={16} />
                Opening Hours
              </div>

              <div className="my-5 h-px bg-steel-200" />

              <ul className="space-y-1.5">
                {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                  <li
                    key={d}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                      d === today
                        ? 'metal-rose font-bold text-white shadow-sm'
                        : 'text-cocoa-600 hover:bg-white/50'
                    }`}
                  >
                    <span>{days[d]}</span>

                    <span className="font-mono text-xs">
                      {fmt(hours[d][0])} – {fmt(hours[d][1])}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="metal-cocoa relative overflow-hidden rounded-[2rem] p-7 text-white sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rose-500/15 blur-3xl" />

              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-rose-300">
                  Find us
                </p>

                <div className="mt-5 flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-rose-300" />

                  <p className="text-sm leading-6 text-white/85">
                    Moda Caddesi No: 42
                    <br />
                    Kadıköy, Istanbul
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                  <Phone size={18} className="shrink-0 text-rose-300" />

                  <a
                    href="tel:+902160000000"
                    className="text-sm transition hover:text-rose-300"
                  >
                    0216 000 00 00
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}