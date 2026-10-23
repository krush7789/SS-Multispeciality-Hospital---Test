import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowRight, Search, CalendarCheck, Clock, Languages, GraduationCap, Check } from 'lucide-react'
import {
  specialities, specialityBySlug, groups, doctors, doctorBySlug, gallery, galleryCats, hospital,
} from '../data'
import { PageHeader, SpecialityCard, DoctorCard, Faq, IconBadge, Lightbox } from '../ui'
import { EmergencyBand } from './Home'
import NotFound from './NotFound'
import { useT } from '../i18n'

export function Specialities() {
  const { t } = useT()
  return (
    <>
      <PageHeader title={t('specialities')} intro="Fifteen departments and services, grouped by what you need: treatment, tests, or support." />
      {groups.map((g, i) => (
        <section key={g.id} className={i % 2 ? 'bg-soft' : ''}>
          <div className="container-x py-14 lg:py-20">
            <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">{g.label}</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {specialities.filter((s) => s.group === g.id).map((s) => <SpecialityCard key={s.slug} s={s} />)}
            </div>
          </div>
        </section>
      ))}
      <EmergencyBand />
    </>
  )
}

export function SpecialityDetail() {
  const { t } = useT()
  const s = specialityBySlug[useParams().slug]
  if (!s) return <NotFound />
  const docs = doctors.filter((d) => d.dept === s.slug)
  const faq = [
    { q: `Do I need a referral for ${s.name}?`, a: 'No. You can book directly online, by phone, or walk in during OPD hours.' },
    { q: 'What should I bring to my first visit?', a: 'A photo ID, any previous prescriptions and test reports, and a list of medicines you take.' },
    { q: 'Is this covered by insurance?', a: 'Ask the front desk which insurance plans and government schemes apply to your treatment.' },
  ]
  return (
    <>
      <PageHeader title={s.name} intro={s.summary} crumbs={[[t('specialities'), '/specialities']]} />
      <section className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_340px] lg:py-20">
        <div className="min-w-0 space-y-14">
          <div className="flex items-start gap-5">
            <IconBadge icon={s.icon} className="size-16 shrink-0" />
            <p className="text-lg text-muted">Our {s.name.toLowerCase()} team works with the lab, imaging and pharmacy in the same building, so tests and treatment happen without delays. {hospital.short} keeps your records in one place across visits.</p>
          </div>
          {s.conditions.length > 0 && (
            <div>
              <h2 className="mb-5 text-2xl font-semibold">Conditions we treat</h2>
              <ul className="grid gap-3 sm:grid-cols-2">{s.conditions.map((c) => <li key={c} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-brand-600" />{c}</li>)}</ul>
            </div>
          )}
          <div>
            <h2 className="mb-5 text-2xl font-semibold">Services &amp; procedures</h2>
            <ul className="grid gap-3 sm:grid-cols-2">{s.procedures.map((c) => <li key={c} className="rounded-xl bg-soft px-5 py-4 font-medium">{c}</li>)}</ul>
          </div>
          {docs.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold">Doctors in this department</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{docs.map((d) => <DoctorCard key={d.slug} d={d} />)}</div>
            </div>
          )}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Questions</h2>
            <Faq items={faq} />
          </div>
        </div>
        <aside className="h-fit space-y-4 lg:sticky lg:top-28">
          <div className="rounded-3xl bg-brand-800 p-7 text-white">
            <h2 className="text-xl font-semibold !text-white">Request a consultation</h2>
            <p className="mt-2 text-white/75">Send a request to the front desk on WhatsApp. They reply to confirm a time.</p>
            <Link to={docs.length ? `/book?dept=${s.slug}` : '/book'} className="btn-ghost-light mt-6 w-full"><CalendarCheck className="size-5" /> {t('book')}</Link>
          </div>
          <div className="rounded-3xl border border-line p-7">
            <h2 className="mb-3 text-lg font-semibold">Other specialities</h2>
            <ul className="space-y-1">{specialities.filter((x) => x.group === s.group && x.slug !== s.slug).map((x) => (
              <li key={x.slug}><Link to={`/specialities/${x.slug}`} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-brand-50 hover:text-brand-700">{x.name}<ArrowRight className="size-4" /></Link></li>
            ))}</ul>
          </div>
        </aside>
      </section>
    </>
  )
}

export function Doctors() {
  const { t } = useT()
  const [q, setQ] = useState('')
  const [dept, setDept] = useState('')
  const list = doctors.filter((d) => (!dept || d.dept === dept) &&
    (d.name + ' ' + specialityBySlug[d.dept].name).toLowerCase().includes(q.trim().toLowerCase()))
  const depts = specialities.filter((s) => doctors.some((d) => d.dept === s.slug))
  return (
    <>
      <PageHeader title={t('doctors')} intro="Find a specialist by name or department, check their OPD days and book a slot." />
      <section className="container-x py-12 lg:py-16">
        <div className="mb-10 grid gap-3 sm:grid-cols-[1fr_280px]">
          <label className="relative"><span className="sr-only">Search doctors</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
            <input id="doc-search" type="search" placeholder="Search by name or department" value={q} onChange={(e) => setQ(e.target.value)} className="!pl-12 !py-3" />
          </label>
          <label><span className="sr-only">Department</span>
            <select id="doc-dept" value={dept} onChange={(e) => setDept(e.target.value)} className="!py-3">
              <option value="">All departments</option>{depts.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>
          </label>
        </div>
        <p className="mb-6 text-sm text-muted" aria-live="polite">{list.length} doctor{list.length === 1 ? '' : 's'} found</p>
        {list.length
          ? <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{list.map((d) => <DoctorCard key={d.slug} d={d} />)}</div>
          : <p className="rounded-2xl bg-soft p-8 text-center text-muted">No doctors match your search. Try another name or department.</p>}
      </section>
    </>
  )
}

export function DoctorProfile() {
  const { t } = useT()
  const d = doctorBySlug[useParams().slug]
  if (!d) return <NotFound />
  const s = specialityBySlug[d.dept]
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <>
      <title>{`${d.name}, ${s.name} | ${hospital.name}`}</title>
      <section className="bg-brand-50">
        <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-[380px_1fr] lg:gap-16 lg:py-16">
          <img src={d.photo} alt={`Portrait of ${d.name} (placeholder)`} className="aspect-[4/5] w-full max-w-sm rounded-[2rem] bg-brand-100 object-cover" />
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted"><Link to="/doctors" className="hover:text-brand-700">{t('doctors')}</Link> / {d.name}</nav>
            <Link to={`/specialities/${s.slug}`} className="chip">{s.name}</Link>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{d.name}</h1>
            <p className="mt-4 max-w-xl text-lg text-muted">{d.bio}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              <li className="flex gap-3"><GraduationCap className="size-5 shrink-0 text-brand-600" />{d.qual}</li>
              <li className="flex gap-3"><Clock className="size-5 shrink-0 text-brand-600" />{d.exp} years of experience</li>
              <li className="flex gap-3"><Languages className="size-5 shrink-0 text-brand-600" />{d.langs.join(', ')}</li>
            </ul>
            <Link to={`/book?doctor=${d.slug}`} className="btn-primary mt-8"><CalendarCheck className="size-5" /> Request an appointment</Link>
          </div>
        </div>
      </section>
      <section className="container-x py-14 lg:py-20">
        <h2 className="mb-6 text-2xl font-semibold">OPD schedule</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-separate border-spacing-2 text-center">
            <thead><tr>{week.map((w) => <th key={w} className="text-sm font-semibold text-muted">{w}</th>)}</tr></thead>
            <tbody><tr>{week.map((w) => (
              <td key={w} className={`rounded-xl px-2 py-4 text-sm ${d.days.includes(w) ? 'bg-brand-700 font-semibold text-white' : 'bg-soft text-muted'}`}>
                {d.days.includes(w) ? `${d.slots[0] < '13' ? 'Morning' : 'Evening'}` : 'Off'}
              </td>
            ))}</tr></tbody>
          </table>
        </div>
        <p className="mt-4 text-muted">OPD hours start at {d.slots[0]}. Timings may change on holidays; call the front desk to check before you come.</p>
      </section>
    </>
  )
}

export function Gallery() {
  const { t } = useT()
  const [cat, setCat] = useState('All')
  const [idx, setIdx] = useState(null)
  const list = cat === 'All' ? gallery : gallery.filter((g) => g.cat === cat)
  const move = useCallback((dir) => setIdx((i) => (i + dir + list.length) % list.length), [list.length])
  return (
    <>
      <PageHeader title={t('gallery')} intro="A look inside our wards, theatres and diagnostics. Photos shown are placeholders." />
      <section className="container-x py-12 lg:py-16">
        <div role="tablist" aria-label="Photo categories" className="mb-8 flex flex-wrap gap-2">
          {['All', ...galleryCats].map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-base font-medium transition ${cat === c ? 'bg-brand-700 text-white' : 'bg-soft text-ink hover:bg-brand-50'}`}>{c}</button>
          ))}
        </div>
        <div className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {list.map((g, i) => (
            <button key={g.src} onClick={() => setIdx(i)} className="group block w-full overflow-hidden rounded-2xl" aria-label={`Open ${g.alt}`}>
              <img src={g.src} alt={g.alt} loading="lazy" className="w-full transition duration-500 group-hover:scale-[1.03]" />
            </button>
          ))}
        </div>
      </section>
      <Lightbox images={list} index={idx} onClose={() => setIdx(null)} onMove={move} />
    </>
  )
}
