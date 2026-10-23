import { Link } from 'react-router'
import { hospital } from '../data'

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
      <title>{`Page not found | ${hospital.name}`}</title>
      <div>
        <p className="font-display text-7xl font-bold text-brand-200">404</p>
        <h1 className="mt-4 text-3xl font-semibold">We couldn’t find that page</h1>
        <p className="mt-3 text-muted">The link may be old or mistyped. In an emergency, call {hospital.emergency}.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">Go to home</Link>
          <Link to="/doctors" className="btn-outline">Find a doctor</Link>
        </div>
      </div>
    </section>
  )
}
