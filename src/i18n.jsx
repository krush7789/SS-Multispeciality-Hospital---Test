import { createContext, useContext, useEffect, useState } from 'react'

// ponytail: only interface text is translated; page body content stays English.
// Add `hi` fields to data.js entries when real Hindi copy is ready.
const dict = {
  en: {
    home: 'Home', about: 'About', specialities: 'Departments', tpa: 'Insurance & TPA', criticalCare: 'Critical care',
    gallery: 'Gallery', contact: 'Contact',
    book: 'Request Appointment', emergency: 'Emergency', emergency247: 'Emergency 24×7', call: 'Call', whatsapp: 'WhatsApp',
    opd: 'OPD', viewAll: 'View all', knowMore: 'Know more',
    heroEyebrow: 'Multispeciality care in Rampur',
    heroTitle: 'Expert care, close to home.',
    heroText: 'Six specialist departments, ICU and NICU care, and a 24×7 emergency team, in the heart of Rampur.',
    ambulanceReady: 'Ambulance ready, day and night',
    secSpecialities: 'Care for every stage of life', secWhy: 'Why families choose us', secCritical: 'ICU and NICU, on site',
    secTpa: 'Cashless treatment with your health insurance', secReviews: 'What patients say', secGallery: 'Inside the hospital',
    secCallback: 'Request an appointment', secFaq: 'Common questions', secVisit: 'Visiting us?',
    ctaTitle: 'In an emergency, every minute counts.', ctaText: 'Our emergency team and ambulance are ready 24 hours a day.',
    name: 'Full name', phone: 'Mobile number', dept: 'Department', date: 'Preferred date', submit: 'Send on WhatsApp',
    callbackDone: 'WhatsApp opened with your request. Tap Send there. Your appointment is confirmed only when our front desk replies.',
    directions: 'Get directions', quickLinks: 'Quick links', topSpecialities: 'Departments', reachUs: 'Reach us',
    rights: 'All rights reserved.', menu: 'Menu', close: 'Close',
  },
  hi: {
    home: 'होम', about: 'हमारे बारे में', specialities: 'विभाग', tpa: 'बीमा और TPA', criticalCare: 'गहन चिकित्सा',
    gallery: 'गैलरी', contact: 'संपर्क',
    book: 'अपॉइंटमेंट का अनुरोध', emergency: 'इमरजेंसी', emergency247: 'इमरजेंसी 24×7', call: 'कॉल', whatsapp: 'व्हाट्सऐप',
    opd: 'ओपीडी', viewAll: 'सभी देखें', knowMore: 'और जानें',
    heroEyebrow: 'रामपुर में मल्टीस्पेशलिटी इलाज',
    heroTitle: 'बेहतरीन इलाज, आपके पास।',
    heroText: 'छह विशेषज्ञ विभाग, ICU और NICU की सुविधा, और 24×7 इमरजेंसी टीम, रामपुर के बीचों-बीच।',
    ambulanceReady: 'एम्बुलेंस दिन-रात तैयार',
    secSpecialities: 'हर उम्र के लिए इलाज', secWhy: 'परिवार हमें क्यों चुनते हैं', secCritical: 'ICU और NICU, अस्पताल में ही',
    secTpa: 'हेल्थ इंश्योरेंस से कैशलेस इलाज', secReviews: 'मरीज़ों की राय', secGallery: 'अस्पताल की झलक',
    secCallback: 'अपॉइंटमेंट के लिए अनुरोध करें', secFaq: 'अक्सर पूछे जाने वाले सवाल', secVisit: 'अस्पताल आ रहे हैं?',
    ctaTitle: 'इमरजेंसी में हर मिनट कीमती है।', ctaText: 'हमारी इमरजेंसी टीम और एम्बुलेंस 24 घंटे तैयार हैं।',
    name: 'पूरा नाम', phone: 'मोबाइल नंबर', dept: 'विभाग', date: 'पसंदीदा तारीख', submit: 'व्हाट्सऐप पर भेजें',
    callbackDone: 'आपका अनुरोध व्हाट्सऐप में खुल गया है। वहां भेजें दबाएं। फ्रंट डेस्क के जवाब के बाद ही अपॉइंटमेंट पक्का होगा।',
    directions: 'रास्ता देखें', quickLinks: 'उपयोगी लिंक', topSpecialities: 'विभाग', reachUs: 'संपर्क करें',
    rights: 'सर्वाधिकार सुरक्षित।', menu: 'मेनू', close: 'बंद करें',
  },
}

const Ctx = createContext(null)

const saved = () => { try { return localStorage.getItem('lang') === 'hi' ? 'hi' : 'en' } catch { return 'en' } }

export function LangProvider({ children }) {
  const [lang, setLang] = useState(saved)
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch { /* storage blocked: language just won't persist */ }
  }, [lang])
  const t = (k) => dict[lang][k] ?? dict.en[k] ?? k
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export const useT = () => useContext(Ctx)
