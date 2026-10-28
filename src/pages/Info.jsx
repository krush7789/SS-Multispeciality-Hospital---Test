import { Link } from 'react-router'
import { Phone, Mail, Siren, Check, Target, Eye, CalendarCheck, ShieldCheck, FileText, Receipt } from 'lucide-react'
import { hospital, whyUs, specialities, criticalCare, tpa, own } from '../data'
import { PageHeader, Faq, WhatsAppIcon, waLink } from '../ui'
import { VisitCard, EmergencyBand } from './Home'
import { useT } from '../i18n'

const tel = (n) => `tel:${n.replace(/\s/g, '')}`

export function About() {
  const { t } = useT()
  return (
    <>
      <PageHeader title={t('about')} intro="A multispeciality hospital built for Rampur, with specialist departments, critical care and a 24×7 emergency under one roof." />
      <section className="container-x grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <div>
          <p className="eyebrow mb-3">Who we are</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Specialist care without leaving Rampur</h2>
          <div className="prose-ss mt-6">
            <p>{hospital.name} brings {specialities.length} specialist departments together in one building near Old Ramlila, with an ICU, NICU, PICU, HDU and an emergency that is open 24×7.</p>
            <p>Our TPA desk helps insured patients with cashless approvals and reimbursement papers, so families can focus on recovery.</p>
          </div>
        </div>
        <img src={own.street} alt="SS Multispeciality Hospital building" loading="lazy" className="aspect-[9/10] w-full rounded-[2rem] object-cover" />
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

      <section className="section bg-soft">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow mb-3">Under one roof</p>
            <h2 className="mb-8 text-3xl font-semibold tracking-tight">What you’ll find here</h2>
            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {[['Departments', specialities.map((s) => s.name)],
                ['Critical care', criticalCare.map((u) => `${u.name} (${u.full})`)],
                ['Emergency & insurance', ['24×7 emergency', 'TPA / insurance desk']]].map(([h, items]) => (
                <div key={h}>
                  <h3 className="mb-2 text-lg font-semibold">{h}</h3>
                  <p className="text-muted">{items.join(' · ')}</p>
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

export function Tpa() {
  const { t } = useT()
  const check = waLink('Hello, I would like to check whether my health insurance is accepted for treatment. Insurer: ')
  return (
    <>
      <PageHeader title={t('tpa')} intro="Our TPA (Third-Party Administrator) desk works with your health insurer, so you can get cashless treatment or claim your money back." />

      <section className="container-x grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-20 [&>*]:min-w-0">
        <div>
          <p className="eyebrow mb-3">Cashless treatment</p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
          <ol className="steps-line relative grid gap-4">
            {tpa.cashless.map(([h, p], i) => (
              <li key={h} className="flex gap-5 rounded-2xl border border-line p-6">
                <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 font-display font-semibold text-brand-700">{i + 1}</span>
                <span><span className="block text-lg font-semibold">{h}</span><span className="mt-1 block text-muted">{p}</span></span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="h-fit rounded-3xl bg-brand-800 p-8 text-white lg:sticky lg:top-28">
          <ShieldCheck className="size-9 text-gold-400" strokeWidth={1.5} />
          <h2 className="mt-4 text-2xl font-semibold !text-white">Is my insurance accepted?</h2>
          <p className="mt-3 text-white/80">Send your insurer’s name and policy type before a planned admission. The TPA desk will tell you whether cashless treatment is possible.</p>
          <div className="mt-6 grid gap-3">
            <a href={check} target="_blank" rel="noreferrer" className="btn-ghost-light"><WhatsAppIcon className="size-5 text-[#25D366]" /> Ask on WhatsApp</a>
            <a href={tel(hospital.phone)} className="btn-ghost-light"><Phone className="size-5" /> {hospital.phone}</a>
          </div>
        </aside>
      </section>

      <section className="section bg-soft">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {[[FileText, 'Documents to bring at admission', tpa.documents],
            [Receipt, 'Papers for a reimbursement claim', tpa.reimbursement]].map(([I, h, items]) => (
            <div key={h} className="rounded-3xl bg-white p-8 lg:p-10">
              <I className="size-8 text-brand-700" strokeWidth={1.5} />
              <h2 className="mt-4 text-2xl font-semibold">{h}</h2>
              <ul className="mt-6 grid gap-3">{items.map((d) => <li key={d} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-brand-600" />{d}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="container-x mt-8 text-muted">If cashless approval is not given, you pay the bill and claim it back from your insurer. The TPA desk gives you the reimbursement papers listed above at discharge.</p>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3">FAQ</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Insurance questions</h2>
          </div>
          <Faq items={tpa.faqs} />
        </div>
      </section>
      <EmergencyBand />
    </>
  )
}

export function Contact() {
  const { t } = useT()
  return (
    <>
      <PageHeader title={t('contact')} intro="Call, message or visit us. For emergencies, call the 24×7 line directly." />
      <section className="container-x grid gap-4 pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16 [&>*]:min-w-0">
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
