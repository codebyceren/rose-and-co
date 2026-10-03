import { useEffect, useState } from 'react'

// Opening hours per weekday (0 = Sunday), in Istanbul local time
export const hours: Record<number, [number, number]> = {
  0: [9, 22],
  1: [7.5, 22],
  2: [7.5, 22],
  3: [7.5, 22],
  4: [7.5, 22],
  5: [7.5, 23.5],
  6: [9, 23.5],
}

function istanbulNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Istanbul',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date())

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? '0'

  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(
    get('weekday'),
  )

  return {
    day,
    time: (Number(get('hour')) % 24) + Number(get('minute')) / 60,
  }
}

const fmt = (h: number) =>
  `${String(Math.floor(h)).padStart(2, '0')}:${h % 1 ? '30' : '00'}`

export default function OpenBadge() {
  const [status, setStatus] = useState<{
    open: boolean
    text: string
  } | null>(null)

  useEffect(() => {
    const update = () => {
      const { day, time } = istanbulNow()
      const [openTime, closeTime] = hours[day]

      if (time >= openTime && time < closeTime) {
        setStatus({
          open: true,
          text: `Open now · until ${fmt(closeTime)}`,
        })
      } else {
        setStatus({
          open: false,
          text: `Closed now · opening at ${fmt(
            time < openTime ? openTime : hours[(day + 1) % 7][0],
          )}`,
        })
      }
    }

    update()

    const timer = window.setInterval(update, 60_000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div
      className="metal relative z-0 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold text-cocoa-600"
      aria-live="polite"
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {status?.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}

        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            status?.open
              ? 'bg-emerald-500'
              : status
                ? 'bg-rose-500'
                : 'bg-steel-400'
          }`}
        />
      </span>

      <span className="whitespace-nowrap">
        {status?.text ?? 'Loading opening hours…'}
      </span>
    </div>
  )
}