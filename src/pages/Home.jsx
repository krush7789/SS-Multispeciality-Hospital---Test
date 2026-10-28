import { Fragment, useState } from 'react'
import { Link } from 'react-router'
import {
  CalendarCheck, Siren, LayoutGrid, ShieldCheck, ArrowRight, Ambulance, BedDouble, Baby, Check,
  Quote, MapPin, Clock, Car, Landmark, Award, Scissors, Users,
} from 'lucide-react'
import { hospital, specialities, criticalCare, tpa, testimonials, gallery, whyUs, faqs, photo, stock, own } from '../data'
import { useT } from '../i18n'
import { Helix, BedsideMonitor } from '../fx'
import { SectionHead, SpecialityCard, Counter, Carousel, Faq, Sent, Heartbeat, WhatsAppIcon, waLink, emergencyLink, trackPointer } from '../ui'

export function Hero() {
  const { t } = useT()
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div aria-hidden className="absolute -left-40 top-20 size-[28rem] rounded-full bg-brand-100/60 blur-3xl" />
      <div className="container-x relative grid items-center gap-12 pb-24 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-32 lg:pt-20">
        <div>
          <p className="eyebrow mb-5">{t('heroEyebrow')}</p>
          <h1 className="text-[2.6rem] font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            {t('heroTitle').split(' ').map((w, i) => <Fragment key={i}>{i > 0 && ' '}<span className="word-in" style={{ '--i': i }}>{w}</span></Fragment>)}
          </h1>
          {/* The heartbeat gets its own row in the layout, so text flows around it and can never sit under it.
              It bleeds to both screen edges and passes behind the photo (z-10); the section's overflow-hidden clips it. */}
          <div aria-hidden className="relative my-5 h-14 lg:my-6 lg:h-16">
            <Heartbeat beats={18} className="absolute inset-y-0 -left-[50vw] h-full w-[200vw] max-w-none text-brand-600" />
          </div>
          <p className="max-w-xl text-lg text-muted sm:text-xl">{t('heroText')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" className="btn-primary"><CalendarCheck className="size-5" /> {t('book')}</Link>
            <a href={emergencyLink} target="_blank" rel="noreferrer" className="btn-outline !border-er-600/30 !text-er-600 hover:!bg-er-600/5 hover:!border-er-600"><Siren className="size-5" /> {t('emergency')}</a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {[[Ambulance, '24×7 Emergency'], [BedDouble, 'ICU'], [Baby, 'NICU'], [ShieldCheck, 'TPA / Insurance desk']].map(([I, l]) => (
              <li key={l} className="chip bg-white shadow-sm shadow-brand-900/5"><I className="size-4" strokeWidth={1.75} /> {l}</li>
            ))}
          </ul>
        </div>

        <div className="relative z-10">
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-900/15">
            <img src={own.front} alt="SS Multispeciality Hospital building with its Emergency 24×7 entrance" fetchPriority="high"
              className="hero-zoom aspect-[10/11] w-full object-cover object-top" />
            <div aria-hidden className="hud">
              {['tl', 'tr', 'bl', 'br'].map((c) => <i key={c} className={`hud-c hud-${c}`} />)}
              <i className="hud-scan" /><i className="hud-reticle" />
              <span className="hud-tags">
                {[['ER 24×7', 'ACTIVE'], ['ICU', 'ONLINE'], ['NICU', 'ONLINE'], ['OT', 'READY']].map(([a, b], k) => (
                  <span key={a} className="hud-tag" style={{ '--k': k }}><i />{a}<em>{b}</em></span>
                ))}
              </span>
            </div>
          </div>
          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white p-4 pr-6 shadow-xl shadow-brand-900/15 sm:-left-8">
            <span className="grid size-12 place-items-center rounded-full bg-er-600/10 text-er-600"><Ambulance className="size-6" /></span>
            <span>
              <span className="flex items-center gap-2 font-display font-semibold"><span className="pulse-dot size-2 rounded-full bg-er-500" /> {t('emergency247')}</span>
              <span className="text-sm text-muted">{t('ambulanceReady')}</span>
            </span>
          </div>        </div>
      </div>
    </section>
  )
}

function QuickActions() {
  const { t } = useT()
  const items = [
    [CalendarCheck, t('book'), 'Send a request on WhatsApp', '/book'],
    [LayoutGrid, t('specialities'), 'Our six specialist departments', '/specialities'],
    [Siren, t('emergency'), 'Message our 24×7 emergency team', emergencyLink],
    [ShieldCheck, t('tpa'), 'Cashless and reimbursement help', '/tpa'],
  ]
  return (
    <section className="container-x relative z-10 -mt-14">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-xl shadow-brand-900/8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([I, title, sub, to], i) => {
          const er = i === 2
          const inner = (
            <>
              <span className={`grid size-12 place-items-center rounded-full transition ${er ? 'bg-er-600/10 text-er-600 group-hover:bg-er-600 group-hover:text-white' : 'bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white'}`}><I className="size-5" /></span>
              <span><span className="block font-display font-semibold">{title}</span><span className="text-sm text-muted">{sub}</span></span>
            </>
          )
          const cls = 'group flex items-center gap-4 bg-white p-6 transition hover:bg-brand-50/50'
          return to.startsWith('/') ? <Link key={title} to={to} className={cls}>{inner}</Link>
            : <a key={title} href={to} className={cls} {...(to.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{inner}</a>
        })}
      </div>
    </section>
  )
}

// Only facts the hospital has confirmed. Add patient counts, beds or ratings once verified numbers exist.
const facts = [
  { value: specialities.length, label: 'Specialist departments' },
  { value: '24×7', label: 'Emergency care' },
  ...criticalCare.map((u) => ({ value: u.name, label: u.full })),
]

function Stats() {
  return (
    <section className="container-x pt-20 lg:pt-28">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8 [&>*]:min-w-0">
        {facts.map((s) => (
          <div key={s.label} className="reveal border-l-2 border-brand-100 pl-5">
            <dd className="font-display text-[clamp(1.9rem,3.2vw,2.75rem)] font-bold leading-tight text-brand-700">
              {typeof s.value === 'number' ? <Counter value={s.value} /> : s.value}
            </dd>
            <dt className="mt-1 text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}

function About() {
  const { t } = useT()
  return (
    <section className="section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative order-last lg:order-first">
          <img src={photo(stock.reception, 900, 700)} alt="Hospital reception area (stock photo)" loading="lazy" className="aspect-[9/7] w-full rounded-[2rem] object-cover" />
          <div className="absolute -bottom-8 right-6 rounded-2xl bg-brand-700 p-6 text-white shadow-xl sm:right-10">
            <p className="font-display text-4xl font-bold">{specialities.length}</p>
            <p className="text-sm text-white/80">specialist departments</p>
          </div>
        </div>
        <div className="reveal">
          <p className="eyebrow mb-3">{t('about')}</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">A neighbourhood hospital with specialist depth</h2>
          <p className="mt-5 text-lg text-muted">Families come to us for deliveries, surgeries, fractures and everyday illness. Six specialist departments work alongside an ICU, a NICU and a 24×7 emergency near Old Ramlila, so patients who need closer care stay in one place.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[[Award, 'Qualified specialists'], [Scissors, 'Operation theatre'], [BedDouble, 'ICU & NICU'], [Users, 'Caring nursing staff']].map(([I, l]) => (
              <li key={l} className="flex items-center gap-3 font-medium"><I className="size-5 text-gold-600" /> {l}</li>
            ))}
          </ul>
          <Link to="/about" className="btn-outline mt-10">{t('knowMore')} <ArrowRight className="size-4" /></Link>
        </div>
      </div>
    </section>
  )
}

function Specialities() {
  const { t } = useT()
  return (
    <section className="section bg-soft">
      <div className="container-x relative">
        <Helix className="helix-canvas" />
        <SectionHead eyebrow={t('specialities')} title={t('secSpecialities')}
          text="From pregnancy care to fracture treatment, our departments work together so you get the right care in one place." />
        <div className="reveal grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {specialities.map((s) => <SpecialityCard key={s.slug} s={s} />)}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  const { t } = useT()
  return (
    <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead eyebrow="Why SS Hospital" title={t('secWhy')} text="Good care is more than a diagnosis. It is being seen on time, understanding your bill, and knowing someone will pick up the phone at 2 AM." />
        </div>
        <ol className="grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2">
          {whyUs.map((w, i) => (
            <li key={w.title} className="reveal bg-white p-8">
              <span className="font-display text-sm font-semibold text-gold-600">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 text-muted">{w.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function CriticalCare() {
  const { t } = useT()
  return (
    <section className="monitor-bg bg-brand-800 py-16 text-white lg:py-24">
      <div className="container-x relative">
        <BedsideMonitor className="bedside-canvas" />
        <div className="mb-10 max-w-2xl lg:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold-400">{t('criticalCare')}</p>
          <h2 className="text-3xl font-semibold tracking-tight !text-white sm:text-4xl">{t('secCritical')}</h2>
          <p className="mt-4 text-lg text-white/75">When a patient needs more than a ward bed, they are cared for here, without a transfer to another city.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {criticalCare.map((u) => (
            <article key={u.id} onPointerMove={trackPointer}
              className="holo holo-dark reveal rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors duration-400 hover:border-gold-400/20 hover:bg-white/[.075] lg:p-10">
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-400"><u.icon className="size-7" strokeWidth={1.5} /></span>
                <h3 className="!text-white"><span className="block font-display text-3xl font-bold">{u.name}</span><span className="text-base font-medium text-white/70">{u.full}</span></h3>
              </div>
              <p className="mt-6 text-lg text-white/85">{u.text}</p>
              <ul className="mt-6 grid gap-3">
                {u.points.map((p) => <li key={p} className="flex gap-3 text-white/85"><Check className="mt-1 size-5 shrink-0 text-gold-400" />{p}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TpaTeaser() {
  const { t } = useT()
  return (
    <section className="section bg-soft">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20 [&>*]:min-w-0">
        <div>
          <SectionHead eyebrow={t('tpa')} title={t('secTpa')}
            text="Have health insurance? Our TPA (Third-Party Administrator) desk deals with your insurer, so you can focus on getting better." />
          <div className="-mt-4 flex flex-wrap gap-3">
            <Link to="/tpa" className="btn-primary"><ShieldCheck className="size-5" /> {t('knowMore')}</Link>
            <a href={waLink('Hello, I would like to check whether my health insurance is accepted. Insurer: ')} target="_blank" rel="noreferrer" className="btn-outline">
              <WhatsAppIcon className="size-5 text-[#25D366]" /> Check my insurance
            </a>
          </div>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2">
          {tpa.cashless.map(([h, p], i) => (
            <li key={h} className="reveal bg-white p-7">
              <span className="font-display text-sm font-semibold text-gold-600">Step {i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold">{h}</h3>
              <p className="mt-2 text-muted">{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Reviews() {
  const { t } = useT()
  return (
    <section className="section bg-brand-50">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16 [&>*]:min-w-0">
        <div>
          <p className="eyebrow mb-3">Reviews</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('secReviews')}</h2>
        </div>
        <Carousel label="Patient reviews">
          {testimonials.map((r) => (
            <figure key={r.name} className="w-[85%] sm:w-[calc(50%-10px)]">
              <Quote className="size-10 text-brand-200" fill="currentColor" strokeWidth={0} />
              <blockquote className="mt-4 text-lg leading-relaxed text-ink sm:text-xl">{r.text}</blockquote>
              <figcaption className="mt-6"><span className="font-semibold">{r.name}</span> <span className="text-muted">· {r.place} </span></figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

function GalleryPreview() {
  const { t } = useT()
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead eyebrow={t('gallery')} title={t('secGallery')}
          action={<Link to="/gallery" className="btn-outline">{t('viewAll')} <ArrowRight className="size-4" /></Link>} />
        <div className="reveal columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {gallery.slice(0, 6).map((g) => (
            <Link key={g.src} to="/gallery" className="gal group block overflow-hidden rounded-2xl">
              <img src={g.src} alt={g.alt} loading="lazy" className="w-full scale-[1.06] transition duration-700 group-hover:scale-100" />
              <span aria-hidden className="gal-cap">{g.alt.replace(' (stock photo)', '')}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// There is no backend or database, so this form books nothing and checks no availability.
// It writes a WhatsApp message to the front desk; staff reply to confirm a real time by hand.
export function AppointmentForm({ initialDept = '' }) {
  const { t } = useT()
  const [sent, setSent] = useState(false)
  if (sent) return <Sent>{t('callbackDone')}</Sent>
  const today = new Date().toISOString().slice(0, 10)
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const v = Object.fromEntries(new FormData(e.currentTarget))
      const lines = [
        'Appointment request (please confirm)',
        `Name: ${v.name}`,
        `Mobile: ${v.phone}`,
        `Department: ${specialities.find((s) => s.slug === v.dept)?.name}`,
        v.date && `Preferred date: ${new Date(v.date + 'T00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`,
      ]
      window.open(waLink(lines.filter(Boolean).join('\n')), '_blank', 'noopener')
      setSent(true)
    }} className="grid gap-5 sm:grid-cols-2">
      <div className="grid gap-1.5"><label htmlFor="ap-name">{t('name')}</label><input id="ap-name" name="name" required minLength={2} autoComplete="name" /></div>
      <div className="grid gap-1.5"><label htmlFor="ap-phone">{t('phone')}</label><input id="ap-phone" name="phone" type="tel" required pattern="[6-9][0-9]{9}" inputMode="numeric" maxLength={10} placeholder="10-digit number" title="Enter a valid 10-digit Indian mobile number" autoComplete="tel-national" /></div>
      <div className="grid gap-1.5"><label htmlFor="ap-dept">{t('dept')}</label>
        <select id="ap-dept" name="dept" required defaultValue={specialities.some((s) => s.slug === initialDept) ? initialDept : ''}>
          <option value="" disabled>Select department</option>{specialities.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select></div>
      <div className="grid gap-1.5"><label htmlFor="ap-date">{t('date')} <span className="font-normal text-muted">(optional)</span></label><input id="ap-date" name="date" type="date" min={today} /></div>
      <button className="btn-primary sm:col-span-2 sm:justify-self-start"><WhatsAppIcon className="size-5" /> {t('submit')}</button>
      <p className="text-sm text-muted sm:col-span-2">This sends a WhatsApp message to our front desk. <b className="font-semibold text-ink">Your appointment is confirmed only when they reply.</b> This website does not store your details.</p>
    </form>
  )
}

export function VisitCard() {
  const { t } = useT()
  return (
    <div className="rounded-3xl bg-brand-800 p-8 text-white">
      <h3 className="text-2xl font-semibold !text-white">{t('secVisit')}</h3>
      <ul className="mt-6 space-y-5 text-white/85">
        <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-gold-400" />{hospital.address}</li>
        <li className="flex gap-3"><Landmark className="mt-0.5 size-5 shrink-0 text-gold-400" />{hospital.landmark}</li>
        <li className="flex gap-3"><Car className="mt-0.5 size-5 shrink-0 text-gold-400" />{hospital.parking}</li>
        <li className="flex gap-3"><Clock className="mt-0.5 size-5 shrink-0 text-gold-400" /><span>{t('opd')}: {hospital.opd}<br />{t('emergency')}: 24×7, all days</span></li>
      </ul>
      <a href={hospital.mapUrl} target="_blank" rel="noreferrer" className="btn-ghost-light mt-8">{t('directions')} <ArrowRight className="size-4" /></a>
    </div>
  )
}

function Callback() {
  const { t } = useT()
  return (
    <section className="section bg-soft">
      <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <div className="card p-8 lg:p-12">
          <p className="eyebrow mb-3">{t('book')}</p>
          <h2 className="text-3xl font-semibold tracking-tight">{t('secCallback')}</h2>
          <p className="mb-8 mt-3 text-muted">Send your details to our front desk on WhatsApp. They will reply with an available date and time.</p>
          <AppointmentForm />
        </div>
        <VisitCard />
      </div>
    </section>
  )
}

function FaqSection() {
  const { t } = useT()
  return (
    <section className="section">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <SectionHead eyebrow="FAQ" title={t('secFaq')} text="Can’t find your answer? Call the front desk and we’ll help." />
        <Faq items={faqs} />
      </div>
    </section>
  )
}

export function EmergencyBand() {
  const { t } = useT()
  return (
    <section className="container-x pb-16 lg:pb-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-900 px-8 py-12 text-white lg:px-16 lg:py-16">
        <div aria-hidden className="absolute -right-16 -top-16 size-72 rounded-full bg-er-600/20 blur-2xl" />
        <Heartbeat beats={9} className="absolute inset-x-0 bottom-1 h-9 w-full text-er-500 lg:h-12" />
        <div className="relative flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight !text-white sm:text-4xl">{t('ctaTitle')}</h2>
            <p className="mt-3 text-lg text-white/75">{t('ctaText')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${hospital.emergency.replace(/\s/g, '')}`} className="btn-er"><Siren className="size-5" /> {hospital.emergency}</a>
            <Link to="/book" className="btn-ghost-light">{t('book')}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <title>{`${hospital.name} | Hospital in Rampur, Uttar Pradesh`}</title>
      <Hero />
      <QuickActions />
      <Stats />
      <About />
      <Specialities />
      <CriticalCare />
      <WhyUs />
      <TpaTeaser />
      <Reviews />
      <GalleryPreview />
      <Callback />
      <FaqSection />
      <EmergencyBand />
    </>
  )
}
