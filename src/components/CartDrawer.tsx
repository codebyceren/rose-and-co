import { useState } from 'react'
import {
  Loader2,
  Minus,
  PackageCheck,
  Plus,
  ShoppingBag,
  X,
} from 'lucide-react'
import { formatTL } from '@/data/menu'
import { useCart } from '@/lib/cart'
import { submitNetlifyForm } from '@/lib/forms'

const pickupTimes = [
  'In 15 minutes',
  'In 30 minutes',
  'In 45 minutes',
  'In 1 hour',
]

const field =
  'w-full rounded-xl border border-steel-300 bg-white/80 px-3.5 py-3 text-sm text-cocoa-700 outline-none transition placeholder:text-steel-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-300/30'

export default function CartDrawer() {
  const { lines, open, setOpen, change, clear, total, count } = useCart()
  const [pickup, setPickup] = useState(pickupTimes[1])
  const [state, setState] = useState<
    'idle' | 'sending' | 'done' | 'error'
  >('idle')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const fd = new FormData(e.currentTarget)

    setState('sending')

    try {
      await submitNetlifyForm('siparis', {
        'bot-field': String(fd.get('bot-field') ?? ''),
        ad: String(fd.get('ad')),
        telefon: String(fd.get('telefon')),
        'teslim-saati': pickup,
        urunler: lines
          .map(
            (l) =>
              `${l.qty}× ${l.name}${l.note ? ` (${l.note})` : ''} — ${formatTL(l.price * l.qty)}`,
          )
          .join('\n'),
        toplam: formatTL(total),
      })

      clear()
      setState('done')
    } catch {
      setState('error')
    }
  }

  const close = () => {
    setOpen(false)

    if (state === 'done') {
      setState('idle')
    }
  }

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-cocoa-900/45 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`metal fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col rounded-l-[2rem] border-l border-white/80 shadow-[-20px_0_50px_-35px_rgb(36_22_16/0.55)] transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-steel-300/80 px-6 py-5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-rose-600">
              Rosé & Co.
            </p>

            <div className="mt-1 flex items-center gap-2 font-display text-2xl text-cocoa-700">
              <ShoppingBag size={19} />
              Pickup Order
            </div>
          </div>

          <button
            onClick={close}
            className="btn-metal grid h-9 w-9 place-items-center rounded-full transition hover:-translate-y-0.5"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Success */}
        {state === 'done' ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="metal-rose grid h-20 w-20 place-items-center rounded-full text-white shadow-lg">
              <PackageCheck size={32} />
            </span>

            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-rose-600">
              Order confirmed
            </p>

            <h3 className="mt-2 font-display text-3xl text-cocoa-700">
              Your order is brewing!
            </h3>

            <p className="mt-3 max-w-xs text-sm leading-6 text-cocoa-500">
              It will be ready at the counter {pickup.toLowerCase()}. Enjoy!
            </p>

            <button
              onClick={close}
              className="btn-metal mt-8 rounded-full px-7 py-3 font-bold text-cocoa-700"
            >
              Done
            </button>
          </div>
        ) : count === 0 ? (
          /* Empty */
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center text-cocoa-500">
            <span className="metal grid h-16 w-16 place-items-center rounded-full text-steel-500">
              <ShoppingBag size={25} />
            </span>

            <h3 className="mt-6 font-display text-2xl text-cocoa-600">
              Your cup is empty.
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6">
              Add something from the menu or build your own coffee.
            </p>

            <a
              href="#menu"
              onClick={close}
              className="metal-rose mt-7 rounded-full px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:brightness-105"
            >
              Go to Menu
            </a>
          </div>
        ) : (
          <form
            name="siparis"
            onSubmit={onSubmit}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <input type="hidden" name="form-name" value="siparis" />

            <p className="hidden">
              <label>
                Do not fill this field:
                <input name="bot-field" />
              </label>
            </p>

            {/* Items */}
            <div className="flex items-center justify-between px-6 pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel-500">
                Your order
              </span>

              <span className="text-xs font-semibold text-cocoa-500">
                {count} item{count !== 1 ? 's' : ''}
              </span>
            </div>

            <ul className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
              {lines.map((l) => (
                <li
                  key={l.key}
                  className="metal shine rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-display text-lg leading-tight text-cocoa-700">
                        {l.name}
                      </div>

                      {l.note && (
                        <div className="mt-1 text-xs leading-5 text-cocoa-500">
                          {l.note}
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 font-mono text-sm font-medium text-cocoa-600">
                      {formatTL(l.price * l.qty)}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => change(l.key, -1)}
                      className="btn-metal grid h-8 w-8 place-items-center rounded-full"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-7 text-center font-mono text-sm font-medium text-cocoa-700">
                      {l.qty}
                    </span>

                    <button
                      type="button"
                      onClick={() => change(l.key, 1)}
                      className="btn-metal grid h-8 w-8 place-items-center rounded-full"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Checkout */}
            <div className="border-t border-steel-300/80 bg-white/25 px-6 py-5">
              <div className="mb-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel-500">
                  Pickup details
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  name="ad"
                  required
                  placeholder="Your name"
                  className={field}
                />

                <input
                  name="telefon"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="05[0-9]{9}"
                  maxLength={11}
                  placeholder="Phone"
                  className={field}
                />
              </div>

              <div className="mt-3">
                <p className="mb-2 text-xs font-semibold text-cocoa-600">
                  Pickup time
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {pickupTimes.map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPickup(p)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition duration-200 ${
                        pickup === p
                          ? 'metal-cocoa text-white'
                          : 'btn-metal text-cocoa-600 hover:-translate-y-0.5'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {state === 'error' && (
                <p className="mt-3 text-sm text-rose-600">
                  We couldn&apos;t submit your order. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={state === 'sending'}
                className="metal-rose mt-4 flex w-full items-center justify-between rounded-full px-6 py-4 font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex items-center gap-2">
                  {state === 'sending' && (
                    <Loader2 size={18} className="animate-spin" />
                  )}

                  {state === 'sending' ? 'Placing Order…' : 'Place Order'}
                </span>

                <span className="font-mono">{formatTL(total)}</span>
              </button>
            </div>
          </form>
        )}
      </aside>
    </>
  )
}