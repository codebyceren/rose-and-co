import { useEffect } from 'react'

/** Reveal `.reveal` elements when they enter the viewport. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')

    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.05,
      },
    )

    els.forEach((el) => {
      el.classList.add('is-visible')
      io.unobserve(el)
    })

    return () => io.disconnect()
  }, [])
}

/** Track pointer position on an element for the `.shine` light sweep. */
export function trackShine(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()

  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}