import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import {
  Phone, CalendarCheck, Menu, X, ChevronDown, ChevronLeft, ChevronRight,
  MapPin, Clock, Mail, ArrowUp, ArrowRight, Languages, Siren,
} from 'lucide-react'
import { hospital, specialities } from './data'
import { useT } from './i18n'

const tel = (n) => `tel:${n.replace(/\s/g, '')}`
export const waLink = (msg = 'Hello, I would like to request an appointment.', to = hospital.whatsapp) =>
  `https://wa.me/${to}?text=${encodeURIComponent(msg)}`
export const emergencyLink = waLink('EMERGENCY: I need urgent help.', hospital.emergency.replace(/\D/g, ''))
// Pointer position (0–1) for the .holo card effects in index.css.
export const trackPointer = (e) => {
  const el = e.currentTarget, r = el.getBoundingClientRect()
  el.style.setProperty('--x', ((e.clientX - r.left) / r.width).toFixed(3))
  el.style.setProperty('--y', ((e.clientY - r.top) / r.height).toFixed(3))
}

// Official WhatsApp glyph (Simple Icons path); brand green #25D366. Keep it unaltered per WhatsApp brand guidelines.
export const WhatsAppIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

/* ---------- small building blocks ---------- */

// ECG trace: a faint static line with bright pulses travelling along it (CSS .ecg-pulse).
// Each beat is 240 units wide; `beats` sets the length so the viewBox matches wide or narrow strips
// without distorting the trace (uniform "slice" scaling keeps dash lengths true).
const beat = 'h60 l10 -8 l10 8 h16 l8 14 l12 -64 l12 76 l8 -26 h24 l14 -10 l14 10 h52 '
export function Heartbeat({ className = '', beats = 5 }) {
  const d = 'M0 60 h40 ' + beat.repeat(beats) + 'h40'
  return (
    <svg aria-hidden viewBox={`0 0 ${80 + beats * 240} 100`} preserveAspectRatio="xMidYMid slice" className={`pointer-events-none ${className}`}>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity=".1" />
      <path d={d} className="ecg-pulse" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

export function SectionHead({ eyebrow, title, text, action, center }) {
  return (
    <div className={`mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14 ${center ? 'flex-col items-center text-center' : ''}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">{title}</h2>
        {text && <p className="mt-4 text-lg text-muted">{text}</p>}
      </div>
      {action}
    </div>
  )
}

export function PageHeader({ title, intro, crumbs = [] }) {
  const { t } = useT()
  return (
    <section className="relative overflow-hidden bg-brand-50">
      <title>{`${title} | ${hospital.name}`}</title>
      <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-brand-100/70" />
      <div className="container-x relative py-14 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
          <Link to="/" className="hover:text-brand-700">{t('home')}</Link>
          {crumbs.map(([label, to]) => (
            <span key={label}> <span aria-hidden>/</span> {to ? <Link to={to} className="hover:text-brand-700">{label}</Link> : label}</span>
          ))}
          <span> <span aria-hidden>/</span> <span className="text-ink">{title}</span></span>
        </nav>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}
      </div>
    </section>
  )
}

export function IconBadge({ icon: Icon, className = '' }) {
  return (
    <span className={`grid size-14 place-items-center rounded-full bg-brand-50 text-brand-700 transition duration-200 ${className}`}>
      <Icon className="size-6" strokeWidth={1.75} />
    </span>
  )
}

export function SpecialityCard({ s }) {
  return (
    <Link to={`/specialities/${s.slug}`} onPointerMove={trackPointer}
      className="holo holo-lift group flex flex-col gap-4 rounded-2xl p-6 transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-brand-900/8">
      <IconBadge icon={s.icon} className="group-hover:scale-110 group-hover:bg-brand-700 group-hover:text-white" />
      <div>
        <h3 className="text-lg font-semibold">{s.name}</h3>
        <p className="mt-1.5 text-base leading-relaxed text-muted line-clamp-2">{s.summary}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
        Learn more <ArrowRight className="size-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(value) // final value by default, so it is correct without JS/motion
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - start) / 1400)
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    setN(0)
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value])
  return <span ref={ref} className="tabular-nums">{n.toLocaleString('en-IN')}{suffix}</span>
}

export function Carousel({ children, label }) {
  const ref = useRef(null)
  const go = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <div>
      <div ref={ref} className="snap-row" role="region" aria-label={label} tabIndex={0}>{children}</div>
      <div className="mt-6 flex gap-3">
        <button onClick={() => go(-1)} aria-label="Previous" className="grid size-11 place-items-center rounded-full border border-line text-ink transition hover:border-brand-700 hover:text-brand-700"><ChevronLeft className="size-5" /></button>
        <button onClick={() => go(1)} aria-label="Next" className="grid size-11 place-items-center rounded-full border border-line text-ink transition hover:border-brand-700 hover:text-brand-700"><ChevronRight className="size-5" /></button>
      </div>
    </div>
  )
}

export function Faq({ items }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown className="size-5 shrink-0 text-brand-700 transition group-open:rotate-180" />
          </summary>
          <p className="mt-3 max-w-3xl text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export function Lightbox({ images, index, onClose, onMove }) {
  const ref = useRef(null)
  // Layout effect: the dialog must be open by the time a view transition takes its "after" snapshot.
  useLayoutEffect(() => {
    const d = ref.current
    if (index == null) { d?.open && d.close(); return }
    if (!d.open) d.showModal()
    const key = (e) => { if (e.key === 'ArrowRight') onMove(1); if (e.key === 'ArrowLeft') onMove(-1) }
    d.addEventListener('keydown', key)
    return () => d.removeEventListener('keydown', key)
  }, [index, onMove])
  const img = index != null ? images[index] : null
  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && ref.current.close()}
      className="m-auto max-h-[92vh] max-w-[min(1100px,94vw)] bg-transparent p-0 text-white">
      {img && (
        <figure className="relative">
          <img src={img.full ?? img.src} alt={img.alt} className="max-h-[82vh] w-auto rounded-xl" style={{ viewTransitionName: 'photo' }} />
          <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-white/80">
            <span>{img.alt} · {index + 1} / {images.length}</span>
            <span className="flex gap-2">
              <button onClick={() => onMove(-1)} aria-label="Previous photo" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"><ChevronLeft className="size-5" /></button>
              <button onClick={() => onMove(1)} aria-label="Next photo" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"><ChevronRight className="size-5" /></button>
              <button onClick={() => ref.current.close()} aria-label="Close" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"><X className="size-5" /></button>
            </span>
          </figcaption>
        </figure>
      )}
    </dialog>
  )
}

export function Sent({ children }) {
  return (
    <div role="status" className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-brand-800">
      <p className="font-semibold">✓ {children}</p>
    </div>
  )
}

/* ---------- shell ---------- */

const Fb = (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8Z" /></svg>
const Ig = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
const Yt = (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8ZM10 15V9l5.2 3L10 15Z" /></svg>

function UtilityBar() {
  const { t, lang, setLang } = useT()
  return (
    <div className="bg-brand-900 text-sm text-white/85">
      <div className="container-x flex h-10 items-center justify-between gap-4">
        <a href={tel(hospital.emergency)} className="inline-flex items-center gap-2 font-semibold text-white">
          <span className="pulse-dot size-2 rounded-full bg-er-500" />
          {t('emergency247')}: <span className="tabular-nums">{hospital.emergency}</span>
        </a>
        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-1.5 md:inline-flex"><Clock className="size-3.5" /> {t('opd')}: {hospital.opd}</span>
          <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-0.5 hover:bg-white/10"
            aria-label={lang === 'en' ? 'हिंदी में देखें' : 'View in English'}>
            <Languages className="size-3.5" /> {lang === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>
      </div>
    </div>
  )
}

const navCls = ({ isActive }) =>
  `ecg-link relative whitespace-nowrap py-2 text-base font-medium transition hover:text-brand-700 ${isActive ? 'text-brand-700' : 'text-ink'}`

function Dropdown({ label, to, children }) {
  return (
    <div className="group relative">
      <NavLink to={to} className={(s) => `${navCls(s)} inline-flex items-center gap-1`}>
        {label} <ChevronDown className="size-4 transition group-hover:rotate-180 group-focus-within:rotate-180" />
      </NavLink>
      <div className={`invisible absolute left-1/2 top-full z-40 -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 w-80`}>
        <div className="rounded-2xl border border-line bg-white p-3 shadow-2xl shadow-brand-900/10">{children}</div>
      </div>
    </div>
  )
}

const dropItem = 'block rounded-lg px-3 py-2 text-base text-ink hover:bg-brand-50 hover:text-brand-700'

function Header() {
  const { t } = useT()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <>
    <header className="scroll-line sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-md">
      <div className="container-x flex h-[72px] items-center justify-between gap-3 sm:gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label={`${hospital.name}, home`}>
          <img src="/favicon.svg" alt="" className="size-10" />
          <span className="whitespace-nowrap leading-tight">
            <span className="block font-display text-base font-bold tracking-tight text-brand-800 min-[360px]:text-lg">SS Multispeciality</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-muted">Hospital · Rampur</span>
          </span>
        </Link>

        {/* Full menu only from xl (1280px): below that the links plus "Request Appointment" don't fit on one line. */}
        <nav aria-label="Main" className="hidden items-center gap-6 xl:flex">
          <NavLink to="/" end className={navCls}>{t('home')}</NavLink>
          <NavLink to="/about" className={navCls}>{t('about')}</NavLink>
          <Dropdown label={t('specialities')} to="/specialities">
            {specialities.map((s) => (
              <Link key={s.slug} to={`/specialities/${s.slug}`} className={`${dropItem} flex items-center gap-2`}>
                <s.icon className="size-4 shrink-0 text-brand-600" strokeWidth={1.75} /> {s.name}
              </Link>
            ))}
          </Dropdown>
          <NavLink to="/tpa" className={navCls}>{t('tpa')}</NavLink>
          <NavLink to="/gallery" className={navCls}>{t('gallery')}</NavLink>
          <NavLink to="/contact" className={navCls}>{t('contact')}</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/book" className="btn-primary hidden whitespace-nowrap leading-tight !min-h-11 !px-5 sm:inline-flex"><CalendarCheck className="size-4" /> {t('book')}</Link>
          <button onClick={() => setOpen(true)} className="grid size-11 place-items-center rounded-full hover:bg-brand-50 xl:hidden" aria-label={t('menu')} aria-expanded={open}>
            <Menu className="size-6" />
          </button>
        </div>
      </div>
    </header>

      {/* mobile drawer: kept outside <header>, whose backdrop-filter would trap position:fixed */}
      <div className={`fixed inset-0 z-[55] overflow-hidden xl:hidden ${open ? '' : 'pointer-events-none'}`}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-brand-900/50 transition ${open ? 'opacity-100' : 'opacity-0'}`} />
        <aside className={`absolute right-0 top-0 flex h-dvh w-[86%] max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl transition duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
          aria-hidden={!open} inert={!open}>
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-lg font-bold text-brand-800">{t('menu')}</span>
            <button onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full hover:bg-brand-50" aria-label={t('close')}><X className="size-6" /></button>
          </div>
          <nav className="flex flex-col text-lg" aria-label="Mobile">
            {[['/', 'home'], ['/about', 'about'], ['/specialities', 'specialities'], ['/tpa', 'tpa'],
              ['/gallery', 'gallery'], ['/contact', 'contact']].map(([to, k]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `border-b border-line py-3.5 font-medium ${isActive ? 'text-brand-700' : ''}`}>{t(k)}</NavLink>
            ))}
          </nav>
          <div className="mt-8 grid gap-3">
            <Link to="/book" className="btn-primary"><CalendarCheck className="size-5" /> {t('book')}</Link>
            <a href={emergencyLink} target="_blank" rel="noreferrer" className="btn-er"><Siren className="size-5" /> {t('emergency')}</a>
          </div>
        </aside>
      </div>
    </>
  )
}

function Footer() {
  const { t } = useT()
  return (
    <footer className="relative overflow-hidden bg-brand-900 pb-24 text-white/75 lg:pb-0">
      <svg aria-hidden viewBox="0 0 1200 40" preserveAspectRatio="xMidYMid slice" className="footer-ecg pointer-events-none absolute left-0 top-2.5 h-10 w-full">
        {['base', 'run'].map((c) => <path key={c} className={c} pathLength="1000" d={'M0 22' + 'h112 l4 -3 l4 3 h6 l3 5 l5 -19 l5 23 l3 -9 h9 l6 -4 l6 4 h137'.repeat(4)} />)}
      </svg>
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:py-20 [&>*]:min-w-0">
        <div>
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="" className="size-10" />
            <span className="font-display text-lg font-bold text-white">{hospital.name}</span>
          </div>
          <p className="mt-4 max-w-xs">Six specialist departments, ICU, NICU, PICU, HDU and a 24×7 emergency, close to home in Rampur.</p>
          <div className="mt-6 flex gap-3">
            {[[Fb, 'Facebook', hospital.socials.facebook], [Ig, 'Instagram', hospital.socials.instagram], [Yt, 'YouTube', hospital.socials.youtube]].map(([I, l, h]) => (
              <a key={l} href={h} aria-label={l} className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-brand-900"><I className="size-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white">{t('quickLinks')}</h3>
          <ul className="space-y-2.5">
            {[['/about', 'about'], ['/specialities', 'specialities'], ['/tpa', 'tpa'], ['/book', 'book'], ['/gallery', 'gallery'], ['/contact', 'contact']].map(([to, k]) => (
              <li key={to}><Link to={to} className="hover:text-white">{t(k)}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white">{t('topSpecialities')}</h3>
          <ul className="space-y-2.5">
            {specialities.slice(0, 7).map((s) => <li key={s.slug}><Link to={`/specialities/${s.slug}`} className="hover:text-white">{s.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white">{t('reachUs')}</h3>
          <ul className="space-y-4">
            <li className="flex gap-3"><MapPin className="mt-1 size-5 shrink-0 text-gold-400" /><span>{hospital.address}</span></li>
            <li className="flex gap-3"><Phone className="mt-1 size-5 shrink-0 text-gold-400" /><span><a href={tel(hospital.phone)} className="hover:text-white">{hospital.phone}</a><br /><span className="text-sm">{t('emergency')}: {hospital.emergency}</span></span></li>
            <li className="flex gap-3"><Mail className="mt-1 size-5 shrink-0 text-gold-400" /><a href={`mailto:${hospital.email}`} className="min-w-0 wrap-anywhere hover:text-white">{hospital.email}</a></li>
          </ul>
          <a href={hospital.mapUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 font-semibold text-gold-400 hover:underline">{t('directions')} <ArrowRight className="size-4" /></a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-6 text-sm">
          <p>© {new Date().getFullYear()} {hospital.name}. {t('rights')}</p>
        </div>
      </div>
    </footer>
  )
}

function Floating() {
  const { t } = useT()
  const [hidden, setHidden] = useState(false)
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    let last = scrollY
    const on = () => {
      setHidden(scrollY > last && scrollY > 200)
      setShowTop(scrollY > 800)
      last = scrollY
    }
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <>
      {/* mobile action bar: hides on scroll down, returns on scroll up */}
      <nav aria-label="Quick actions" className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur transition duration-300 lg:hidden ${hidden ? 'translate-y-full' : ''}`}>
        <a href={tel(hospital.emergency)} className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-er-600"><Phone className="size-5" />{t('call')}</a>
        <a href={waLink()} target="_blank" rel="noreferrer" className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-[#128c4a]"><WhatsAppIcon className="size-5 text-[#25D366]" />{t('whatsapp')}</a>
        <Link to="/book" className="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-brand-700 text-xs font-semibold text-white"><CalendarCheck className="size-5" />{t('book')}</Link>
      </nav>
      <a href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        className="wa-pulse fixed bottom-6 right-6 z-40 hidden size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 transition hover:scale-105 lg:grid">
        <WhatsAppIcon className="size-7" />
      </a>
      <button onClick={() => scrollTo({ top: 0 })} aria-label="Back to top"
        className={`fixed bottom-24 right-6 z-40 hidden size-11 place-items-center rounded-full border border-line bg-white text-brand-700 shadow-md transition lg:grid ${showTop ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <ArrowUp className="size-5" />
      </button>
    </>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  // Layout effect: scroll before the View Transition takes its "after" snapshot, so the jump is hidden in the fade.
  useLayoutEffect(() => { scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <UtilityBar />
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <Floating />
    </>
  )
}
