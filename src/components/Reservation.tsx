import { useMemo, useState } from 'react'
import { CalendarCheck, Clock3, Loader2, Users } from 'lucide-react'
import { submitNetlifyForm } from '@/lib/forms'

const areas = ['Lounge', 'Window Seat', 'Bar Counter', 'Terrace']

const slots = [
  '09:00',
  '10:30',
  '12:00',
  '13:30',
  '15:00',
  '16:30',
  '18:00',
  '19:30',
  '21:00',
]

const field =
  'w-full rounded-2xl border border-steel-300 bg-white/75 px-4 py-3.5 text-sm text-cocoa-700 shadow-[inset_0_2px_5px_rgb(0_0_0/0.05)] outline-none transition placeholder:text-steel-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-300/30'

const namePattern =
  "^[A-Za-zÀ-ÖØ-öø-ÿÇçĞğİıÖöŞşÜü]+(?:[\\s'-]+[A-Za-zÀ-ÖØ-öø-ÿÇçĞğİıÖöŞşÜü]+)+$"

const phonePattern = '05[0-9]{9}'

const emailPattern = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'

function getIstanbulDate() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export default function Reservation() {
  const todayIso = useMemo(() => getIstanbulDate(), [])

  const [people, setPeople] = useState(2)
  const [slot, setSlot] = useState('')
  const [area, setArea] = useState(areas[0])
  const [state, setState] = useState<
    'idle' | 'sending' | 'done' | 'error'
  >('idle')
  const [name, setName] = useState('')

  const clearCustomValidity = (
    e: React.FormEvent<HTMLInputElement>,
  ) => {
    e.currentTarget.setCustomValidity('')
  }

  const handlePhoneInput = (
    e: React.FormEvent<HTMLInputElement>,
  ) => {
    const input = e.currentTarget

    input.value = input.value.replace(/\D/g, '').slice(0, 11)
    input.setCustomValidity('')
  }

  const validateForm = (form: HTMLFormElement) => {
    const nameInput = form.elements.namedItem('ad') as HTMLInputElement
    const phoneInput = form.elements.namedItem(
      'telefon',
    ) as HTMLInputElement
    const emailInput = form.elements.namedItem(
      'eposta',
    ) as HTMLInputElement
    const dateInput = form.elements.namedItem(
      'tarih',
    ) as HTMLInputElement

    const fullName = nameInput.value.trim().replace(/\s+/g, ' ')
    const phone = phoneInput.value.trim()
    const email = emailInput.value.trim()
    const date = dateInput.value

    nameInput.value = fullName
    phoneInput.value = phone
    emailInput.value = email

    nameInput.setCustomValidity('')
    phoneInput.setCustomValidity('')
    emailInput.setCustomValidity('')
    dateInput.setCustomValidity('')

    const nameParts = fullName.split(' ').filter(Boolean)

    if (
      nameParts.length < 2 ||
      !new RegExp(namePattern, 'u').test(fullName)
    ) {
      nameInput.setCustomValidity(
        'Please enter your first and last name.',
      )
      nameInput.reportValidity()
      return false
    }

    if (!new RegExp(`^${phonePattern}$`).test(phone)) {
      phoneInput.setCustomValidity(
        'Please enter an 11-digit Turkish mobile number starting with 05.',
      )
      phoneInput.reportValidity()
      return false
    }

    if (
      !new RegExp(emailPattern).test(email)
    ) {
      emailInput.setCustomValidity(
        'Please enter a valid email address.',
      )
      emailInput.reportValidity()
      return false
    }

    if (!date || date < todayIso) {
      dateInput.setCustomValidity(
        'Please choose today or a future date.',
      )
      dateInput.reportValidity()
      return false
    }

    if (!slot || !slots.includes(slot)) {
      return false
    }

    if (!areas.includes(area)) {
      return false
    }

    if (people < 1 || people > 10) {
      return false
    }

    return true
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (state === 'sending') return

    const form = e.currentTarget

    if (!form.reportValidity()) {
      return
    }

    if (!validateForm(form)) {
      return
    }

    const fd = new FormData(form)

    const fullName = String(fd.get('ad') ?? '').trim()
    const phone = String(fd.get('telefon') ?? '').trim()
    const email = String(fd.get('eposta') ?? '').trim()
    const date = String(fd.get('tarih') ?? '').trim()
    const note = String(fd.get('not') ?? '').trim()

    setState('sending')

    try {
      await submitNetlifyForm('rezervasyon', {
        'bot-field': String(fd.get('bot-field') ?? ''),
        ad: fullName,
        telefon: phone,
        eposta: email,
        tarih: date,
        saat: slot,
        kisi: String(people),
        alan: area,
        not: note,
      })

      setName(fullName)
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <section
      id="rezervasyon"
      className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.5fr] lg:gap-16">
          {/* Intro */}
          <div className="reveal flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-rose-600">
                04 — Reservations
              </p>

              <h2 className="mt-3 font-display text-4xl font-light leading-[1.02] tracking-[-0.025em] text-cocoa-700 sm:text-5xl lg:text-6xl">
                Your table is{' '}
                <span className="text-rose-metal font-semibold italic">
                  waiting.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-cocoa-500">
                A birthday, a business coffee, or a quiet Sunday. Choose your
                date and time, and our team will call you to confirm your
                reservation.
              </p>
            </div>

            <div className="metal-cocoa mt-10 hidden overflow-hidden rounded-[1.75rem] p-6 text-white lg:block">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-rose-300">
                Good to know
              </div>

              <p className="mt-3 font-display text-xl leading-snug">
                Reservations are confirmed personally by our team.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs text-white/55">
                <Clock3 size={14} />
                <span>We&apos;ll call you shortly after your request.</span>
              </div>
            </div>
          </div>

          {/* Reservation Card */}
          <div className="metal rivets reveal rounded-[2rem] p-6 sm:p-8 lg:p-10">
            {state === 'done' ? (
              <div className="flex min-h-[560px] flex-col items-center justify-center py-12 text-center">
                <span className="metal-rose grid h-20 w-20 place-items-center rounded-full text-white shadow-lg">
                  <CalendarCheck size={32} />
                </span>

                <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.25em] text-rose-600">
                  Reservation request received
                </p>

                <h3 className="mt-3 font-display text-4xl text-cocoa-700">
                  Thank you, {name}!
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-cocoa-500">
                  We received your request for {people} guests at the{' '}
                  {area.toLowerCase()} for {slot}. We&apos;ll call you shortly
                  to confirm your reservation.
                </p>

                <div className="metal mt-7 rounded-2xl px-5 py-4 text-sm text-cocoa-600">
                  <span className="font-semibold">{people} guests</span>
                  <span className="mx-2 text-steel-400">·</span>
                  <span>{slot}</span>
                  <span className="mx-2 text-steel-400">·</span>
                  <span>{area}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setState('idle')
                    setSlot('')
                  }}
                  className="btn-metal mt-8 rounded-full px-6 py-3 font-bold text-cocoa-700"
                >
                  Make Another Reservation
                </button>
              </div>
            ) : (
              <form
                name="rezervasyon"
                onSubmit={onSubmit}
                className="grid gap-6 sm:grid-cols-2"
                noValidate={false}
              >
                <input
                  type="hidden"
                  name="form-name"
                  value="rezervasyon"
                />

                <p className="hidden">
                  <label>
                    Do not fill this field:
                    <input name="bot-field" />
                  </label>
                </p>

                <div className="sm:col-span-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel-500">
                    Tell us about your visit
                  </p>

                  <div className="mt-2 h-px bg-steel-200" />
                </div>

                {/* Full Name */}
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-cocoa-600">
                    Full Name
                  </span>

                  <input
                    name="ad"
                    type="text"
                    required
                    minLength={3}
                    pattern={namePattern}
                    title="Please enter your first and last name."
                    autoComplete="name"
                    className={field}
                    placeholder="Emma Wilson"
                    onInput={clearCustomValidity}
                  />
                </label>

                {/* Phone */}
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-cocoa-600">
                    Phone
                  </span>

                  <input
                    name="telefon"
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern={phonePattern}
                    minLength={11}
                    maxLength={11}
                    title="Enter an 11-digit Turkish mobile number starting with 05."
                    autoComplete="tel"
                    className={field}
                    placeholder="05551234567"
                    onInput={handlePhoneInput}
                  />
                </label>

                {/* Email */}
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-cocoa-600">
                    Email
                  </span>

                  <input
                    name="eposta"
                    type="email"
                    required
                    pattern={emailPattern}
                    title="Please enter a valid email address."
                    autoComplete="email"
                    className={field}
                    placeholder="emma@example.com"
                    onInput={clearCustomValidity}
                  />
                </label>

                {/* Date */}
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-cocoa-600">
                    Date
                  </span>

                  <input
                    name="tarih"
                    type="date"
                    required
                    min={todayIso}
                    defaultValue={todayIso}
                    className={field}
                  />
                </label>

                {/* Time */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-cocoa-600">
                      Time
                    </span>

                    {slot && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-rose-600">
                        {slot} selected
                      </span>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {slots.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSlot(s)}
                        className={`rounded-xl px-3 py-2.5 font-mono text-xs transition duration-200 ${
                          slot === s
                            ? 'metal-cocoa text-white shadow-md'
                            : 'btn-metal text-cocoa-600 hover:-translate-y-0.5'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <span className="text-sm font-semibold text-cocoa-600">
                    Number of Guests
                  </span>

                  <div className="mt-3 flex items-center gap-3">
                    <Users size={18} className="shrink-0 text-steel-500" />

                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={people}
                      onChange={(e) => setPeople(Number(e.target.value))}
                      className="w-full accent-rose-500"
                      aria-label="Number of guests"
                    />

                    <span className="metal-rose grid h-10 w-10 shrink-0 place-items-center rounded-full font-mono text-sm font-bold text-white">
                      {people}
                    </span>
                  </div>
                </div>

                {/* Area */}
                <div>
                  <span className="text-sm font-semibold text-cocoa-600">
                    Seating Area
                  </span>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {areas.map((a) => (
                      <button
                        type="button"
                        key={a}
                        onClick={() => setArea(a)}
                        className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition duration-200 ${
                          area === a
                            ? 'metal-rose text-white shadow-sm'
                            : 'btn-metal text-cocoa-600 hover:-translate-y-0.5'
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-cocoa-600">
                    Note{' '}
                    <span className="font-normal text-steel-500">
                      (optional)
                    </span>
                  </span>

                  <textarea
                    name="not"
                    rows={3}
                    maxLength={500}
                    className={`${field} resize-none`}
                    placeholder="Birthday surprise, high chair, special request…"
                  />
                </label>

                {/* Submit */}
                <div className="sm:col-span-2">
                  <div className="flex flex-col gap-5 border-t border-steel-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-cocoa-500">
                        {slot
                          ? `${people} guest${people > 1 ? 's' : ''} · ${slot} · ${area}`
                          : 'Please select a time.'}
                      </p>

                      {state === 'error' && (
                        <p className="mt-1 text-sm text-rose-600">
                          Something went wrong. Please try again.
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!slot || state === 'sending'}
                      className="metal-cocoa flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {state === 'sending' && (
                        <Loader2 size={18} className="animate-spin" />
                      )}

                      {state === 'sending'
                        ? 'Sending…'
                        : 'Request a Reservation'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}