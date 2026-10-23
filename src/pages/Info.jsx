import { Link } from 'react-router'
import { Phone, Mail, Siren, Check, Target, Eye, CalendarCheck } from 'lucide-react'
import { hospital, leadership, whyUs, specialities, groups, photo, stock } from '../data'
import { PageHeader, WhatsAppIcon, waLink } from '../ui'
import { VisitCard, EmergencyBand } from './Home'
import { useT } from '../i18n'

const tel = (n) => `tel:${n.replace(/\s/g, '')}`

export function About() {
  const { t } = useT()
  return (
    <>
      <PageHeader title={t('about')} intro="A multispeciality hospital built for Rampur, with specialist doctors, diagnostics and emergency care under one roof." />
      <section className="container-x grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <div>
          <p className="eyebrow mb-3">Who we are</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Specialist care without leaving Rampur</h2>
          <div className="prose-ss mt-6">
            <p>{hospital.name} brings {specialities.length} services together in one building near Old Ramlila: clinical departments, in-house diagnostics, a pharmacy, a blood bank and an ambulance service.</p>
            <p>Because the doctors, lab and imaging work side by side, most patients can get tests, treatment and medicines in a single visit.</p>
          </div>
        </div>
        <img src={photo(stock.building, 900, 1000)} alt="Hospital building (stock photo)" loading="lazy" className="aspect-[9/10] w-full rounded-[2rem] object-cover" />
      </section>

      <section className="bg-brand-800 text-white">
        <div className="container-x grid gap-px py-14 sm:grid-cols-2 lg:py-20">
          {[[Target, 'Mission', 'Give every patient timely, honest and affordable care, with the same attention we would give our own family.'],
            [Eye, 'Vision', 'Be the hospital western Uttar Pradesh trusts first, for emergencies and for everyday health.']].map(([I, h, p]) => (
            <div key={h} className="p-6 lg:p-10">
              <I className="size-8 text-gold-400" strokeWidth={1.5} />
              <h2 className="mt-4 text-2xl font-semibold !text-white">{h}</h2>
              <p className="mt-3 max-w-md text-lg text-white/80">{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <p className="eyebrow mb-3">Leadership</p>
          <h2 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">The people who run the hospital</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {leadership.map((p) => (
              <figure key={p.name}>
                <img src={p.photo} alt={`Portrait of ${p.name} (placeholder)`} loading="lazy" className="aspect-[4/5] w-full rounded-2xl bg-brand-100 object-cover" />
                <figcaption className="mt-4"><span className="block font-display text-lg font-semibold">{p.name}</span><span className="text-muted">{p.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow mb-3">Under one roof</p>
            <h2 className="mb-8 text-3xl font-semibold tracking-tight">What you’ll find here</h2>
            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {groups.map((g) => (
                <div key={g.id}>
                  <h3 className="mb-2 text-lg font-semibold">{g.label}</h3>
                  <p className="text-muted">{specialities.filter((s) => s.group === g.id).map((s) => s.name).join(' · ')}</p>
                </div>
              ))}
            </div>
            <Link to="/specialities" className="btn-outline mt-8">{t('specialities')}</Link>
          </div>
          <div>
            <p className="eyebrow mb-3">Our approach</p>
            <h2 className="mb-8 text-3xl font-semibold tracking-tight">{t('secWhy')}</h2>
            <ul className="grid gap-4">{whyUs.map((w) => <li key={w.title} className="flex gap-3 rounded-xl bg-white p-5"><Check className="mt-1 size-5 shrink-0 text-brand-600" /><span><b className="font-semibold">{w.title}.</b> <span className="text-muted">{w.text}</span></span></li>)}</ul>
          </div>
        </div>
      </section>
      <div className="pt-16 lg:pt-24"><EmergencyBand /></div>
    </>
  )
}

export function Contact() {
  const { t } = useT()
  return (
    <>
      <PageHeader title={t('contact')} intro="Call, message or visit us. For emergencies, call the 24×7 line directly." />
      <section className="container-x grid gap-4 pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
        {[[Siren, t('emergency247'), hospital.emergency, tel(hospital.emergency), true], [Phone, 'Front desk', hospital.phone, tel(hospital.phone)],
          [({ className }) => <WhatsAppIcon className={`${className} !text-[#25D366]`} />, t('whatsapp'), 'Chat with us', waLink()], [Mail, 'Email', hospital.email, `mailto:${hospital.email}`]].map(([I, l, v, h, er]) => (
          <a key={l} href={h} {...(h.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            className={`group rounded-2xl border p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${er ? 'border-er-600/30 bg-er-600/5' : 'border-line'}`}>
            <I className={`size-6 ${er ? 'text-er-600' : 'text-brand-700'}`} />
            <p className="mt-4 text-sm text-muted">{l}</p>
            <p className="break-words font-display font-semibold">{v}</p>
          </a>
        ))}
      </section>
      <section className="container-x grid gap-10 py-12 lg:grid-cols-[1.3fr_1fr] lg:py-16">
        <div className="card flex flex-col justify-center p-8 lg:p-12">
          <h2 className="text-3xl font-semibold tracking-tight">Want to see a doctor?</h2>
          <p className="mt-3 max-w-lg text-lg text-muted">Send your details to our front desk on WhatsApp. They reply with an available date and time.</p>
          <Link to="/book" className="btn-primary mt-8 self-start"><CalendarCheck className="size-5" /> {t('book')}</Link>
        </div>
        <VisitCard />
      </section>
    </>
  )
}
