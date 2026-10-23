import { useSearchParams } from 'react-router'
import { Phone } from 'lucide-react'
import { hospital, doctorBySlug } from '../data'
import { PageHeader } from '../ui'
import { AppointmentForm, VisitCard } from './Home'
import { useT } from '../i18n'

const steps = [
  'Fill in your details and the department you need.',
  'WhatsApp opens with your request written out. Tap Send.',
  'Our front desk replies with an available date and time.',
]

export default function Book() {
  const { t } = useT()
  const [params] = useSearchParams()
  return (
    <>
      <PageHeader title={t('book')} intro="Send a request to our front desk. Nothing is booked until they reply to confirm your date and time." />
      <section className="container-x grid gap-10 py-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:py-16">
        <div className="card min-w-0 p-8 lg:p-12">
          <h2 className="mb-6 text-2xl font-semibold">How it works</h2>
          <ol className="mb-10 grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-3 sm:flex-col">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 font-semibold text-brand-700">{i + 1}</span>
                <span className="text-muted">{s}</span>
              </li>
            ))}
          </ol>
          <AppointmentForm initialDept={params.get('dept') ?? doctorBySlug[params.get('doctor')]?.dept ?? ''} initialDoctor={params.get('doctor') ?? ''} />
        </div>
        <div className="grid h-fit gap-6">
          <div className="rounded-3xl border border-line p-8">
            <h2 className="text-xl font-semibold">Prefer to call?</h2>
            <p className="mt-2 text-muted">Call the front desk during OPD hours ({hospital.opd}).</p>
            <p className="mt-4 flex items-center gap-2 font-display text-xl font-semibold"><Phone className="size-5 text-brand-700" /> <span className="select-all tabular-nums">{hospital.phone}</span></p>
          </div>
          <VisitCard />
        </div>
      </section>
    </>
  )
}
