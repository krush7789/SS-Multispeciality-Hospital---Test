import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import { LangProvider } from './i18n'
import { Layout } from './ui'
import Home from './pages/Home'
import Book from './pages/Book'
import NotFound from './pages/NotFound'
import { Specialities, SpecialityDetail, Gallery } from './pages/Catalog'
import { About, Contact, Tpa } from './pages/Info'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <BrowserRouter>
        <Routes>
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
      </BrowserRouter>
    </LangProvider>
  </StrictMode>,
)
