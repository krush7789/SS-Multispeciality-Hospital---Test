import { useCallback, useState } from 'react'
import { flushSync } from 'react-dom'
import { Link, useParams } from 'react-router'
import { ArrowRight, CalendarCheck, Check } from 'lucide-react'
import { specialities, specialityBySlug, gallery, galleryCats, hospital } from '../data'
import { PageHeader, SpecialityCard, Faq, IconBadge, Lightbox } from '../ui'
import { CriticalCare, EmergencyBand } from './Home'
import NotFound from './NotFound'
import { useT } from '../i18n'

export function Specialities() {
  const { t } = useT()
  return (
    <>
      <PageHeader title={t('specialities')} intro="Six specialist departments, supported by an ICU, NICU, PICU, HDU and a 24×7 emergency." />
      <section className="container-x py-14 lg:py-20">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {specialities.map((s) => <SpecialityCard key={s.slug} s={s} />)}
        </div>
      </section>
      <CriticalCare />
      <div className="pt-16 lg:pt-24"><EmergencyBand /></div>
    </>
  )
}

export function SpecialityDetail() {
  const { t } = useT()
  const s = specialityBySlug[useParams().slug]
  if (!s) return <NotFound />
  const faq = [
    { q: `Do I need a referral for ${s.name}?`, a: 'No. You can send a request on WhatsApp, call the front desk, or walk in during OPD hours.' },
    { q: 'What should I bring to my first visit?', a: 'A photo ID, any previous prescriptions and test reports, and a list of medicines you take.' },
    { q: 'Is this covered by insurance?', a: 'If your policy covers it, our TPA desk can request cashless approval from your insurer or give you the papers for a reimbursement claim.' },
  ]
  return (
    <>
      <PageHeader title={s.name} intro={s.summary} crumbs={[[t('specialities'), '/specialities']]} />
      <section className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_340px] lg:py-20">
        <div className="min-w-0 space-y-14">
          <div className="flex items-start gap-5">
            <IconBadge icon={s.icon} className="size-16 shrink-0" />
            <p className="text-lg text-muted">Our {s.name.replace(/^Department of /, '').toLowerCase()} team works alongside the hospital’s ICU, NICU, PICU, HDU and 24×7 emergency, so patients who need closer care stay in {hospital.short} without a transfer.</p>
          </div>
          <div>
            <h2 className="mb-5 text-2xl font-semibold">Conditions we treat</h2>
            <ul className="grid gap-3 sm:grid-cols-2">{s.conditions.map((c) => <li key={c} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-brand-600" />{c}</li>)}</ul>
          </div>
          <div>
            <h2 className="mb-5 text-2xl font-semibold">Services</h2>
            <ul className="grid gap-3 sm:grid-cols-2">{s.procedures.map((c) => <li key={c} className="rounded-xl bg-soft px-5 py-4 font-medium">{c}</li>)}</ul>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Questions</h2>
            <Faq items={faq} />
          </div>
        </div>
        <aside className="h-fit space-y-4 lg:sticky lg:top-28">
          <div className="rounded-3xl bg-brand-800 p-7 text-white">
            <h2 className="text-xl font-semibold !text-white">Request a consultation</h2>
            <p className="mt-2 text-white/75">Send a request to the front desk on WhatsApp. They reply to confirm a time.</p>
            <Link to={`/book?dept=${s.slug}`} className="btn-ghost-light mt-6 w-full"><CalendarCheck className="size-5" /> {t('book')}</Link>
          </div>
          <div className="rounded-3xl border border-line p-7">
            <h2 className="mb-3 text-lg font-semibold">Other departments</h2>
            <ul className="space-y-1">{specialities.filter((x) => x.slug !== s.slug).map((x) => (
              <li key={x.slug}><Link to={`/specialities/${x.slug}`} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-brand-50 hover:text-brand-700">{x.name}<ArrowRight className="size-4 shrink-0" /></Link></li>
            ))}</ul>
          </div>
        </aside>
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
  // Thumbnail grows into the lightbox. Waits up to 300ms for the large photo so the "after" snapshot isn't blank;
  // on a slow connection it just opens without the effect.
  const open = async (i, el) => {
    if (!document.startViewTransition) return setIdx(i)
    const big = new Image()
    big.src = list[i].full ?? list[i].src
    const ready = await Promise.race([big.decode().then(() => true, () => false), new Promise((r) => setTimeout(r, 300, false))])
    if (!ready) return setIdx(i)
    el.style.viewTransitionName = 'photo'
    document.startViewTransition(() => { el.style.viewTransitionName = ''; flushSync(() => setIdx(i)) })
  }
  return (
    <>
      <PageHeader title={t('gallery')} intro="Our building, plus stock photos of wards and theatres until the hospital’s own photos are ready." />
      <section className="container-x py-12 lg:py-16">
        <div role="tablist" aria-label="Photo categories" className="mb-8 flex flex-wrap gap-2">
          {['All', ...galleryCats].map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-base font-medium transition ${cat === c ? 'bg-brand-700 text-white' : 'bg-soft text-ink hover:bg-brand-50'}`}>{c}</button>
          ))}
        </div>
        <div className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {list.map((g, i) => (
            <button key={g.src} onClick={(e) => open(i, e.currentTarget.firstChild)} className="gal group block w-full overflow-hidden rounded-2xl" aria-label={`Open ${g.alt}`}>
              <img src={g.src} alt={g.alt} loading="lazy" className="w-full scale-[1.06] transition duration-700 group-hover:scale-100" />
              <span aria-hidden className="gal-cap">{g.alt.replace(' (stock photo)', '')}</span>
            </button>
          ))}
        </div>
      </section>
      <Lightbox images={list} index={idx} onClose={() => setIdx(null)} onMove={move} />
    </>
  )
}
