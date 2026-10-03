import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CartProvider } from '@/lib/cart'
import { useReveal } from '@/lib/useReveal'
import SiteHeader from '@/components/SiteHeader'
import Hero from '@/components/Hero'
import MenuSection from '@/components/MenuSection'
import CoffeeBuilder from '@/components/CoffeeBuilder'
import Venue from '@/components/Venue'
import Reservation from '@/components/Reservation'
import CartDrawer from '@/components/CartDrawer'
import SiteFooter from '@/components/SiteFooter'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  useReveal()

  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })
    }

    resetScroll()

    const frame = requestAnimationFrame(() => {
      resetScroll()
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <CartProvider>
      <SiteHeader />

      <main>
        <Hero />
        <MenuSection />
        <CoffeeBuilder />
        <Venue />
        <Reservation />
      </main>

      <SiteFooter />
      <CartDrawer />
    </CartProvider>
  )
}