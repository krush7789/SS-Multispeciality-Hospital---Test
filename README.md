# SS Multispeciality Hospital — website (frontend)

React + Vite + Tailwind CSS v4 + React Router.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## Where things live
- `src/data.js` — **all content**: hospital info, departments, ICU/NICU, TPA desk, gallery, reviews, FAQs. Stock photos and sample reviews are placeholders; replace here before launch.
- `src/i18n.jsx` — English / Hindi interface text.
- `src/ui.jsx` — layout (header, footer, mobile action bar) and shared components.
- `src/pages/` — Home, Book (appointment *request* via WhatsApp), Catalog (departments, gallery), Info (about, insurance & TPA, contact).
- `src/index.css` — design tokens (colours, fonts) and shared styles.

## Before launch
- Replace stock photos and sample reviews in `src/data.js`. Add the list of insurers/TPAs to `tpa` once the hospital confirms its empanelments.
- Replace `https://example.com` in `public/sitemap.xml` with the real domain.
- There is no backend or database. The appointment form books nothing and checks no availability: it opens WhatsApp pre-filled to `hospital.whatsapp`, the patient taps Send, and front-desk staff confirm a time manually. Real slot booking needs a backend + database.
- Add ratings, patient counts, beds, history or insurance tie-ups only once the hospital verifies them.
- `public/_redirects` handles page routes on Netlify; on other hosts, route all paths to `index.html`.
