import { useState } from 'react'
import { Link } from 'react-router'
import {
  CalendarCheck, Siren, Search, FileText, ArrowRight, Ambulance, Droplet, Microscope, Pill,
  Quote, MapPin, Clock, Car, Landmark, Award, Building2, Wallet, Users, MessageCircle,
} from 'lucide-react'
import { hospital, specialities, doctors, testimonials, gallery, whyUs, faqs, photo } from '../data'
import { useT } from '../i18n'
import { SectionHead, SpecialityCard, DoctorCard, Counter, Carousel, Faq, Sent, Heartbeat, waLink } from '../ui'

export function Hero() {
  const { t } = useT()
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div aria-hidden className="absolute -left-40 top-20 size-[28rem] rounded-full bg-brand-100/60 blur-3xl" />
      {/* Sits in the empty band below the hero content and above the quick-action cards, so it never crosses text. */}
      <Heartbeat className="absolute inset-x-0 bottom-[4.5rem] h-14 w-full text-brand-600 lg:bottom-[5rem] lg:h-20" />
      <div className="container-x relative grid items-center gap-12 pb-36 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-44 lg:pt-20">
        <div>
          <p className="eyebrow mb-5">{t('heroEyebrow')}</p>
          <h1 className="text-[2.6rem] font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">{t('heroText')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" className="btn-primary"><CalendarCheck className="size-5" /> {t('book')}</Link>
            <a href={`tel:${hospital.emergency.replace(/\s/g, '')}`} className="btn-outline !border-er-600/30 !text-er-600 hover:!bg-er-600/5 hover:!border-er-600"><Siren className="size-5" /> {t('emergency')}</a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {[[Ambulance, '24×7 Emergency'], [Microscope, 'In-house Lab'], [Pill, '24×7 Pharmacy'], [Droplet, 'Blood Bank']].map(([I, l]) => (
              <li key={l} className="chip bg-white shadow-sm shadow-brand-900/5"><I className="size-4" strokeWidth={1.75} /> {l}</li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <img src={photo('hero', 1000, 1100)} alt="Doctor speaking with a patient (placeholder photo)" fetchPriority="high"
            className="aspect-[10/11] w-full rounded-[2rem] object-cover shadow-2xl shadow-brand-900/15" />
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
    [Search, t('findDoctor'), 'Search by name or department', '/doctors'],
    [Siren, t('emergency'), 'Call our 24×7 emergency line', `tel:${hospital.emergency.replace(/\s/g, '')}`],
    [FileText, t('labReports'), 'Ask about reports on WhatsApp', waLink('Hello, I would like to receive my lab report.')],
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

// Only figures the site itself can back up: counted from data.js, never typed in.
// Add patient counts, beds or ratings here once the hospital supplies verified numbers.
const facts = [
  { value: specialities.filter((s) => s.group === 'clinical').length, label: 'Clinical departments' },
  { value: specialities.filter((s) => s.group === 'diagnostics').length, label: 'In-house diagnostic services' },
  { value: doctors.length, label: 'Specialist doctors' },
]

function Stats() {
  return (
    <section className="container-x pt-20 lg:pt-28">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8 [&>*]:min-w-0">
        {facts.map((s) => (
          <div key={s.label} className="reveal border-l-2 border-brand-100 pl-5">
            <dd className="font-display text-[clamp(1.9rem,3.2vw,2.75rem)] font-bold leading-tight text-brand-700"><Counter value={s.value} /></dd>
            <dt className="mt-1 text-muted">{s.label}</dt>
          </div>
        ))}
        <div className="reveal border-l-2 border-brand-100 pl-5">
          <dd className="font-display text-[clamp(1.9rem,3.2vw,2.75rem)] font-bold leading-tight text-brand-700">24×7</dd>
          <dt className="mt-1 text-muted">Emergency care</dt>
        </div>
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
          <img src={photo('about', 900, 700)} alt="Hospital reception area (placeholder photo)" loading="lazy" className="aspect-[9/7] w-full rounded-[2rem] object-cover" />
          <div className="absolute -bottom-8 right-6 rounded-2xl bg-brand-700 p-6 text-white shadow-xl sm:right-10">
            <p className="font-display text-4xl font-bold">{specialities.length}</p>
            <p className="text-sm text-white/80">services under one roof</p>
          </div>
        </div>
        <div className="reveal">
          <p className="eyebrow mb-3">{t('about')}</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">A neighbourhood hospital with specialist depth</h2>
          <p className="mt-5 text-lg text-muted">Families come to us for deliveries, surgeries, dialysis and everyday illness. Specialists, the lab, imaging, pharmacy and blood bank work in the same building near Old Ramlila, so most visits need only one trip.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[[Award, 'Qualified specialists'], [Building2, 'Operation theatres & NICU'], [Wallet, 'In-house pharmacy'], [Users, 'Caring nursing staff']].map(([I, l]) => (
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
      <div className="container-x">
        <SectionHead eyebrow={t('specialities')} title={t('secSpecialities')}
          text="From your first pregnancy check-up to joint replacement, our departments work together so you get the right care in one place."
          action={<Link to="/specialities" className="btn-outline">{t('viewAll')} 15 <ArrowRight className="size-4" /></Link>} />
        <div className="reveal grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {specialities.filter((s) => s.group === 'clinical').concat(specialities.find((s) => s.slug === 'pathology-lab')).map((s) => <SpecialityCard key={s.slug} s={s} />)}
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

function Diagnostics() {
  const { t } = useT()
  const list = specialities.filter((s) => s.group !== 'clinical')
  return (
    <section className="bg-brand-800 py-16 text-white lg:py-20">
      <div className="container-x">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold-400">{t('facilities')}</p>
            <h2 className="text-3xl font-semibold tracking-tight !text-white sm:text-4xl">{t('secFacilities')}</h2>
          </div>
          <Link to="/specialities" className="btn-ghost-light">{t('viewAll')} <ArrowRight className="size-4" /></Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8 [&>*]:min-w-0">
          {list.map((s) => (
            <li key={s.slug}>
              <Link to={`/specialities/${s.slug}`} className="flex h-full flex-col items-start gap-4 rounded-2xl border border-white/10 p-5 transition hover:border-white/30 hover:bg-white/5">
                <s.icon className="size-7 text-gold-400" strokeWidth={1.5} />
                <span className="text-base font-medium leading-snug">{s.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Doctors() {
  const { t } = useT()
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead eyebrow={t('doctors')} title={t('secDoctors')} text="Experienced doctors with fixed OPD days, so you can plan your visit."
          action={<Link to="/doctors" className="btn-outline">{t('viewAll')} <ArrowRight className="size-4" /></Link>} />
        <Carousel label="Doctors">
          {doctors.map((d) => <div key={d.slug} className="w-[72%] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"><DoctorCard d={d} /></div>)}
        </Carousel>
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
          <p className="mt-6 rounded-xl border border-gold-500/40 bg-white px-4 py-3 text-sm text-muted">
            <b className="text-ink">Sample text.</b> These are not real patient reviews. Replace them with real feedback, shared with the patient’s consent, before launch.
          </p>
        </div>
        <Carousel label="Patient reviews">
          {testimonials.map((r) => (
            <figure key={r.name} className="w-[85%] sm:w-[calc(50%-10px)]">
              <Quote className="size-10 text-brand-200" fill="currentColor" strokeWidth={0} />
              <blockquote className="mt-4 text-lg leading-relaxed text-ink sm:text-xl">{r.text}</blockquote>
              <figcaption className="mt-6"><span className="font-semibold">{r.name}</span> <span className="text-muted">· {r.place} · sample</span></figcaption>
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
            <Link key={g.src} to="/gallery" className="block overflow-hidden rounded-2xl">
              <img src={g.src} alt={g.alt} loading="lazy" className="w-full transition duration-500 hover:scale-[1.03]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// There is no backend or database, so this form books nothing and checks no availability.
// It writes a WhatsApp message to the front desk; staff reply to confirm a real time by hand.
export function AppointmentForm({ initialDept = '', initialDoctor = '' }) {
  const { t } = useT()
  const [sent, setSent] = useState(false)
  const [dept, setDept] = useState(initialDept)
  if (sent) return <Sent>{t('callbackDone')}</Sent>
  const today = new Date().toISOString().slice(0, 10)
  const deptDocs = doctors.filter((d) => d.dept === dept)
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const v = Object.fromEntries(new FormData(e.currentTarget))
      const lines = [
        'Appointment request (please confirm)',
        `Name: ${v.name}`,
        `Mobile: ${v.phone}`,
        `Department: ${specialities.find((s) => s.slug === v.dept)?.name}`,
        v.doctor && `Preferred doctor: ${doctors.find((d) => d.slug === v.doctor)?.name}`,
        v.date && `Preferred date: ${new Date(v.date + 'T00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`,
      ]
      window.open(waLink(lines.filter(Boolean).join('\n')), '_blank', 'noopener')
      setSent(true)
    }} className="grid gap-5 sm:grid-cols-2">
      <div className="grid gap-1.5"><label htmlFor="ap-name">{t('name')}</label><input id="ap-name" name="name" required minLength={2} autoComplete="name" /></div>
      <div className="grid gap-1.5"><label htmlFor="ap-phone">{t('phone')}</label><input id="ap-phone" name="phone" type="tel" required pattern="[6-9][0-9]{9}" inputMode="numeric" maxLength={10} placeholder="10-digit number" title="Enter a valid 10-digit Indian mobile number" autoComplete="tel-national" /></div>
      <div className="grid gap-1.5"><label htmlFor="ap-dept">{t('dept')}</label>
        <select id="ap-dept" name="dept" required value={dept} onChange={(e) => setDept(e.target.value)}>
          <option value="" disabled>Select department</option>{specialities.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select></div>
      <div className="grid gap-1.5"><label htmlFor="ap-doctor">Preferred doctor <span className="font-normal text-muted">(optional)</span></label>
        <select id="ap-doctor" name="doctor" key={dept} defaultValue={deptDocs.some((d) => d.slug === initialDoctor) ? initialDoctor : ''} disabled={!deptDocs.length}>
          <option value="">{deptDocs.length ? 'Any doctor' : 'No specific doctor'}</option>{deptDocs.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
        </select></div>
      <div className="grid gap-1.5 sm:col-span-2"><label htmlFor="ap-date">{t('date')} <span className="font-normal text-muted">(optional)</span></label><input id="ap-date" name="date" type="date" min={today} /></div>
      <button className="btn-primary sm:col-span-2 sm:justify-self-start"><MessageCircle className="size-5" /> {t('submit')}</button>
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
        <Heartbeat className="absolute inset-x-0 bottom-1 h-9 w-full text-er-500 lg:h-12" />
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
      <WhyUs />
      <Diagnostics />
      <Doctors />
      <Reviews />
      <GalleryPreview />
      <Callback />
      <FaqSection />
      <EmergencyBand />
    </>
  )
}
