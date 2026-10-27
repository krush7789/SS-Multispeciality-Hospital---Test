import { StrictMode, useLayoutEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import './index.css'
import { LangProvider } from './i18n'
import { Layout } from './ui'
import Home from './pages/Home'
import Book from './pages/Book'
import NotFound from './pages/NotFound'
import { Specialities, SpecialityDetail, Gallery } from './pages/Catalog'
import { About, Contact, Tpa } from './pages/Info'

// Keeps showing the old page until the browser has snapshotted it, then swaps inside a View Transition,
// so a route change is one cross-fade (see .vt-page in index.css) instead of a blank frame and a scroll jump.
// Browsers without View Transitions just swap instantly.
function AppRoutes() {
  const location = useLocation()
  const [shown, setShown] = useState(location)
  useLayoutEffect(() => {
    if (location.key === shown.key) return
    if (!document.startViewTransition) return setShown(location)
    const html = document.documentElement
    html.classList.add('vt-page')
    document.startViewTransition(() => flushSync(() => setShown(location)))
      .finished.finally(() => html.classList.remove('vt-page'))
  }, [location, shown.key])
  return (
    <Routes location={shown}>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="specialities" element={<Specialities />} />
        <Route path="specialities/:slug" element={<SpecialityDetail />} />
        <Route path="tpa" element={<Tpa />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="book" element={<Book />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LangProvider>
  </StrictMode>,
)
