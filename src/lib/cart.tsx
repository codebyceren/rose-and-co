import { createContext, useContext, useMemo, useState } from 'react'

export interface CartLine {
  key: string
  name: string
  price: number
  qty: number
  note?: string
}

interface CartState {
  lines: CartLine[]
  open: boolean
  setOpen: (open: boolean) => void
  add: (line: Omit<CartLine, 'qty'>) => void
  change: (key: string, delta: number) => void
  clear: () => void
  count: number
  total: number
}

const CartContext = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [open, setOpen] = useState(false)

  const value = useMemo<CartState>(() => {
    const add: CartState['add'] = (line) =>
      setLines((prev) => {
        const found = prev.find((l) => l.key === line.key)
        if (found) return prev.map((l) => (l.key === line.key ? { ...l, qty: l.qty + 1 } : l))
        return [...prev, { ...line, qty: 1 }]
      })
    const change: CartState['change'] = (key, delta) =>
      setLines((prev) =>
        prev.map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0),
      )
    return {
      lines,
      open,
      setOpen,
      add,
      change,
      clear: () => setLines([]),
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * l.price, 0),
    }
  }, [lines, open])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
