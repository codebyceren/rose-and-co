import { useMemo, useState } from 'react'
import { Minus, Plus, Search } from 'lucide-react'
import { categories, formatTL, menu, type Category } from '@/data/menu'
import { useCart } from '@/lib/cart'
import { trackShine } from '@/lib/useReveal'
import { cdn } from '@/lib/img'

const tagLabel = {
  imza: 'Signature',
  vegan: 'Vegan',
  yeni: 'New',
} as const

const categoryImage: Record<Category, string> = {
  kahve: 'latte.png',
  soguk: 'hero.png',
  tatli: 'dessert.png',
  kahvalti: 'interior.png',
}

export default function MenuSection() {
  const [active, setActive] = useState<Category>('kahve')
  const [query, setQuery] = useState('')
  const { lines, add, change } = useCart()

  const items = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr')

    if (q) {
      return menu.filter((m) =>
        `${m.name} ${m.description}`.toLocaleLowerCase('tr').includes(q),
      )
    }

    return menu.filter((m) => m.category === active)
  }, [active, query])

  const handleAdd = (id: string, name: string, price: number) => {
    add({ key: id, name, price })
  }

  return (
    <section id="menu" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-rose-600">
              01 — Menu
            </p>

            <h2 className="mt-3 font-display text-4xl font-light tracking-[-0.02em] text-cocoa-700 sm:text-5xl lg:text-6xl">
              Fresh from the{' '}
              <span className="italic text-cocoa-500">counter</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-cocoa-500">
              Specialty coffee, refreshing drinks, and handmade treats
              prepared throughout the day.
            </p>
          </div>

          <label className="metal flex w-full items-center gap-2.5 rounded-full px-4 py-3 md:w-80">
            <Search size={15} className="shrink-0 text-steel-500" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the menu…"
              className="w-full bg-transparent text-sm text-cocoa-700 outline-none placeholder:text-steel-400"
            />
          </label>
        </div>

        <div className="reveal mt-12 grid gap-8 lg:grid-cols-[250px_1fr] lg:gap-10">
          <aside className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            <div className="flex gap-2 lg:flex-col">
              {categories.map((c) => {
                const on = !query && c.id === active

                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActive(c.id)
                      setQuery('')
                    }}
                    className={`group shrink-0 rounded-2xl px-5 py-4 text-left transition duration-200 ${
                      on
                        ? 'metal-cocoa text-white shadow-lg'
                        : 'btn-metal text-cocoa-600 hover:-translate-y-0.5'
                    }`}
                  >
                    <span className="block font-display text-lg">
                      {c.label}
                    </span>

                    <span
                      className={`mt-0.5 block text-[11px] ${
                        on ? 'text-rose-300' : 'text-steel-500'
                      }`}
                    >
                      {menu.filter((m) => m.category === c.id).length} items
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              className="metal shine mt-2 hidden rounded-2xl p-2 lg:block"
              onPointerMove={trackShine}
            >
              <img
                key={active}
                src={cdn(categoryImage[active], 520)}
                alt=""
                className="aspect-[4/3] w-full rounded-xl object-cover"
                loading="lazy"
              />

              <div className="metal-cocoa mt-3 rounded-xl px-4 py-3 text-white">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose-300">
                  Rosé & Co.
                </span>

                <p className="mt-0.5 font-display text-sm">
                  Made for slow moments.
                </p>
              </div>
            </div>
          </aside>

          <div className="grid content-start gap-4 sm:grid-cols-2">
            {items.length === 0 && (
              <p className="metal rounded-2xl p-10 text-center text-sm text-cocoa-500 sm:col-span-2">
                We couldn&apos;t find anything for “{query}”. How about a Rose
                Latte?
              </p>
            )}

            {items.map((item) => {
              const quantity =
                lines.find((line) => line.key === item.id)?.qty ?? 0

              return (
                <article
                  key={item.id}
                  onPointerMove={trackShine}
                  className="metal shine group flex min-h-[205px] flex-col rounded-[1.4rem] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="max-w-[75%] font-display text-xl font-medium leading-tight text-cocoa-700">
                      {item.name}
                    </h3>

                    <span className="shrink-0 pt-0.5 font-mono text-sm font-medium text-cocoa-500">
                      {formatTL(item.price)}
                    </span>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-6 text-cocoa-500">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags?.map((t) => (
                        <span
                          key={t}
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                            t === 'imza'
                              ? 'metal-rose text-white'
                              : 'bg-white/70 text-cocoa-500 ring-1 ring-steel-300'
                          }`}
                        >
                          {tagLabel[t]}
                        </span>
                      ))}
                    </div>

                    {quantity > 0 ? (
                      <div className="metal-rose flex shrink-0 items-center gap-1 rounded-full px-1.5 py-1 text-white shadow-sm">
                        <button
                          type="button"
                          onClick={() => change(item.id, -1)}
                          className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white/20"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={14} />
                        </button>

                        <span className="min-w-5 text-center font-mono text-sm font-bold">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleAdd(item.id, item.name, item.price)
                          }
                          className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white/20"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          handleAdd(item.id, item.name, item.price)
                        }
                        className="btn-metal flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold text-cocoa-700 transition duration-200 hover:-translate-y-0.5"
                        aria-label={`Add ${item.name} to your order`}
                      >
                        <Plus size={15} />
                        Add
                      </button>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}