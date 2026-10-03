import { useMemo, useState } from 'react'
import { Minus, Plus, Sparkles } from 'lucide-react'
import { formatTL } from '@/data/menu'
import { useCart } from '@/lib/cart'

const sizes = [
  { id: 's', label: 'Small', ml: 240, price: 0, scale: 0.84 },
  { id: 'm', label: 'Medium', ml: 350, price: 20, scale: 0.94 },
  { id: 'l', label: 'Large', ml: 470, price: 35, scale: 1.04 },
] as const

const milks = [
  { id: 'none', label: 'No Milk', price: 0, color: '' },
  { id: 'whole', label: 'Whole Milk', price: 0, color: '#f3e6dc' },
  { id: 'oat', label: 'Oat Milk', price: 20, color: '#ead8c0' },
  { id: 'almond', label: 'Almond Milk', price: 25, color: '#efdccd' },
] as const

const syrups = [
  { id: 'none', label: 'No Syrup', price: 0, color: '' },
  { id: 'rose', label: 'Rose', price: 15, color: '#e597aa' },
  { id: 'caramel', label: 'Salted Caramel', price: 15, color: '#c98a4b' },
  { id: 'hazelnut', label: 'Hazelnut', price: 15, color: '#a0704e' },
] as const

const BASE = 90
const SHOT = 25

function Chip({
  active,
  onClick,
  children,
  swatch,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  swatch?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200 ${
        active
          ? 'metal-rose text-white shadow-md'
          : 'bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/15 hover:text-white'
      }`}
    >
      {swatch !== undefined && (
        <span
          className="h-3.5 w-3.5 rounded-full ring-1 ring-white/20"
          style={{ background: swatch || 'rgb(255 255 255 / 0.08)' }}
        />
      )}

      {children}
    </button>
  )
}

export default function CoffeeBuilder() {
  const [size, setSize] = useState<(typeof sizes)[number]>(sizes[1])
  const [shots, setShots] = useState(2)
  const [milk, setMilk] = useState<(typeof milks)[number]>(milks[1])
  const [syrup, setSyrup] = useState<(typeof syrups)[number]>(syrups[1])
  const [foam, setFoam] = useState(true)
  const [cinnamon, setCinnamon] = useState(false)

  const { lines, add, change } = useCart()

  const price =
    BASE +
    size.price +
    (shots - 1) * SHOT +
    milk.price +
    syrup.price +
    (cinnamon ? 5 : 0)

  const name =
    milk.id === 'none'
      ? shots >= 3
        ? 'Triple Americano'
        : 'Americano'
      : shots >= 3
        ? 'Strong Latte'
        : foam
          ? 'Cappuccino'
          : 'Latte'

  const fullName = `${syrup.id !== 'none' ? `${syrup.label} ` : ''}${name}`

  const note = useMemo(
    () =>
      [
        size.label,
        `${shots} shot${shots !== 1 ? 's' : ''}`,
        milk.label,
        syrup.label,
        foam ? 'with foam' : null,
        cinnamon ? 'with cinnamon' : null,
      ]
        .filter(Boolean)
        .join(' · '),
    [size, shots, milk, syrup, foam, cinnamon],
  )

  const cartKey = `custom-${note}`

  const quantity = lines.find((line) => line.key === cartKey)?.qty ?? 0

  const addToCart = () => {
    add({
      key: cartKey,
      name: fullName,
      price,
      note,
    })
  }

  const espressoH = 14 + shots * 8
  const milkH = milk.id === 'none' ? 0 : 34
  const foamH = foam && milk.id !== 'none' ? 10 : 0
  const total = espressoH + milkH + foamH
  const top = 100 - total

  return (
    <section id="tasarla" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-28">
      <div className="metal-cocoa reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] p-6 text-white sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-rose-300">
                02 — Build Your Coffee
              </p>

              <h2 className="mt-3 max-w-2xl font-display text-4xl font-light tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                Make your cup{' '}
                <span className="text-chrome font-semibold italic">
                  your way.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-white/60">
                Choose every detail, watch your cup come together, and make it
                completely yours.
              </p>
            </div>

            <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 md:block">
              Custom coffee
            </div>
          </div>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="relative mx-auto flex min-h-[430px] w-full max-w-sm flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.035] px-6 py-8">
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/[0.06] to-transparent" />

              <div className="absolute top-10 flex gap-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-10 w-2 rounded-full bg-white/30 blur-[3px]"
                    style={{
                      animation: `steam 2.6s ease-in-out ${i * 0.5}s infinite`,
                    }}
                  />
                ))}
              </div>

              <svg
                viewBox="0 0 220 220"
                className="relative mt-6 w-full drop-shadow-2xl transition-transform duration-500"
                style={{ transform: `scale(${size.scale})` }}
                aria-label={`${fullName} preview`}
              >
                <defs>
                  <clipPath id="cup-inside">
                    <path d="M40 40 h120 l-12 120 a20 20 0 0 1 -20 18 h-56 a20 20 0 0 1 -20 -18 z" />
                  </clipPath>

                  <linearGradient id="chrome" x1="0" x2="1">
                    <stop offset="0" stopColor="#8f939a" />
                    <stop offset="0.3" stopColor="#ffffff" />
                    <stop offset="0.55" stopColor="#b9bcc2" />
                    <stop offset="0.8" stopColor="#f4f4f6" />
                    <stop offset="1" stopColor="#7b7f87" />
                  </linearGradient>

                  <linearGradient id="espresso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#6b4231" />
                    <stop offset="1" stopColor="#22140e" />
                  </linearGradient>
                </defs>

                <ellipse
                  cx="100"
                  cy="190"
                  rx="86"
                  ry="12"
                  fill="url(#chrome)"
                />

                <path
                  d="M160 70 q40 0 34 40 q-4 26 -40 30"
                  fill="none"
                  stroke="url(#chrome)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                <g clipPath="url(#cup-inside)">
                  <rect
                    x="30"
                    y="40"
                    width="140"
                    height="140"
                    fill="#fbf7f5"
                    opacity="0.15"
                  />

                  <g style={{ transition: 'all .5s' }}>
                    <rect
                      x="30"
                      y={40 + (top + foamH + milkH) * 1.4}
                      width="140"
                      height={espressoH * 1.4 + 2}
                      fill="url(#espresso)"
                      style={{ transition: 'all .5s' }}
                    />

                    {milkH > 0 && (
                      <rect
                        x="30"
                        y={40 + (top + foamH) * 1.4}
                        width="140"
                        height={milkH * 1.4 + 1}
                        fill={milk.color}
                        style={{ transition: 'all .5s' }}
                      />
                    )}

                    {milkH > 0 && (
                      <rect
                        x="30"
                        y={40 + (top + foamH + milkH) * 1.4 - 8}
                        width="140"
                        height="16"
                        fill="#a77558"
                        opacity="0.55"
                        style={{ transition: 'all .5s' }}
                      />
                    )}

                    {syrup.color && (
                      <rect
                        x="30"
                        y={40 + top * 1.4}
                        width="140"
                        height={total * 1.4}
                        fill={syrup.color}
                        opacity="0.28"
                        style={{ transition: 'all .5s' }}
                      />
                    )}

                    {foamH > 0 && (
                      <rect
                        x="30"
                        y={40 + top * 1.4}
                        width="140"
                        height={foamH * 1.4}
                        fill="#fffaf6"
                        style={{ transition: 'all .5s' }}
                      />
                    )}

                    {cinnamon &&
                      foamH > 0 &&
                      [55, 78, 100, 120, 140, 66, 112, 132].map((x, i) => (
                        <circle
                          key={i}
                          cx={x}
                          cy={40 + top * 1.4 + 4 + (i % 3) * 3}
                          r="1.8"
                          fill="#8a5a44"
                        />
                      ))}
                  </g>
                </g>

                <path
                  d="M40 40 h120 l-12 120 a20 20 0 0 1 -20 18 h-56 a20 20 0 0 1 -20 -18 z"
                  fill="none"
                  stroke="url(#chrome)"
                  strokeWidth="7"
                />

                <ellipse
                  cx="100"
                  cy="40"
                  rx="62"
                  ry="5"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                />
              </svg>

              <div className="relative mt-2 text-center">
                <div className="font-display text-2xl">{fullName}</div>

                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-rose-300">
                  {size.ml} ml
                </div>
              </div>
            </div>

            <div className="space-y-7">
              <div>
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                  Size
                </h3>

                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <Chip
                      key={s.id}
                      active={size.id === s.id}
                      onClick={() => setSize(s)}
                    >
                      {s.label}

                      {s.price > 0 && (
                        <span className="opacity-60">+{s.price}</span>
                      )}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                  Espresso Shots
                </h3>

                <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1.5">
                  <button
                    type="button"
                    onClick={() => setShots((s) => Math.max(1, s - 1))}
                    className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Decrease shots"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-16 text-center font-mono text-sm font-medium">
                    {shots} shot{shots !== 1 ? 's' : ''}
                  </span>

                  <button
                    type="button"
                    onClick={() => setShots((s) => Math.min(4, s + 1))}
                    className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Increase shots"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                  Milk
                </h3>

                <div className="flex flex-wrap gap-2">
                  {milks.map((m) => (
                    <Chip
                      key={m.id}
                      active={milk.id === m.id}
                      onClick={() => setMilk(m)}
                      swatch={m.color}
                    >
                      {m.label}

                      {m.price > 0 && (
                        <span className="opacity-60">+{m.price}</span>
                      )}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                  Syrup
                </h3>

                <div className="flex flex-wrap gap-2">
                  {syrups.map((s) => (
                    <Chip
                      key={s.id}
                      active={syrup.id === s.id}
                      onClick={() => setSyrup(s)}
                      swatch={s.color}
                    >
                      {s.label}

                      {s.price > 0 && (
                        <span className="opacity-60">+{s.price}</span>
                      )}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Chip active={foam} onClick={() => setFoam((f) => !f)}>
                  Milk Foam
                </Chip>

                <Chip
                  active={cinnamon}
                  onClick={() => setCinnamon((c) => !c)}
                >
                  Cinnamon <span className="opacity-60">+5</span>
                </Chip>
              </div>

              <div className="flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Your total
                  </div>

                  <div className="mt-1 font-display text-4xl">
                    {formatTL(price)}
                  </div>
                </div>

                {quantity > 0 ? (
                  <div className="metal-rose flex items-center gap-1 rounded-full px-1.5 py-1 text-white shadow-md">
                    <button
                      type="button"
                      onClick={() => change(cartKey, -1)}
                      className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/20"
                      aria-label="Decrease custom coffee quantity"
                    >
                      <Minus size={17} />
                    </button>

                    <span className="min-w-7 text-center font-mono font-bold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={addToCart}
                      className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/20"
                      aria-label="Increase custom coffee quantity"
                    >
                      <Plus size={17} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={addToCart}
                    className="metal-rose flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
                  >
                    <Sparkles size={18} />
                    Add to Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}