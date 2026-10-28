// All site content lives here. Hospital name, address, phones, email, departments and building photos are real;
// the stock photos and sample reviews below are PLACEHOLDERS: swap in the hospital's own before launch.
import {
  Stethoscope, Scissors, HeartHandshake, Bone, Baby, Droplets, BedDouble,
} from 'lucide-react'

export const hospital = {
  name: 'SS Multispeciality Hospital',
  short: 'SS Hospital',
  address: 'Near Topkhana Rd, Old Ramlila, Pranpur, Rampur, Uttar Pradesh 244901',
  landmark: 'Next to the Old Ramlila ground, off Topkhana Road',
  parking: 'Free two-wheeler and car parking inside the campus',
  phone: '+91 82183 44961',
  emergency: '+91 95487 30323',
  whatsapp: '918218344961',
  email: 'hospitalssmultispeciality@gmail.com',
  opd: 'Mon–Sat, 9:00 AM – 7:00 PM',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Topkhana Rd, Old Ramlila, Pranpur, Rampur, Uttar Pradesh 244901'),
  socials: { facebook: '#', instagram: '#', youtube: '#' },
}

// The hospital's own photos (served from /public).
export const own = {
  front: '/hospital-front.jpeg',
  street: '/hospital-street.jpeg',
}

// Stock photos from Unsplash (free licence, images.unsplash.com only — never plus.unsplash.com).
// Placeholders until the hospital's own photos are available.
export const photo = (id, w = 800, h = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=70&auto=format`
export const stock = {
  reception: '1519494026892-80bbd2d6fd0d',
}

export const specialities = [
  { slug: 'medicine', name: 'Department of Medicine', icon: Stethoscope,
    summary: 'Diagnosis and ongoing care for fever, infections, diabetes, blood pressure and other adult illnesses.',
    conditions: ['Fever, typhoid, dengue and malaria', 'Diabetes and thyroid disorders', 'High blood pressure', 'Asthma and chest infections'],
    procedures: ['OPD consultation', 'Inpatient medical care', 'Chronic disease follow-up'] },
  { slug: 'general-laparoscopic-surgery', name: 'General and Laparoscopic Surgery', icon: Scissors,
    summary: 'Planned and emergency operations, including keyhole (laparoscopic) surgery for a quicker recovery.',
    conditions: ['Gallbladder stones', 'Hernia', 'Appendicitis', 'Piles, fissure and fistula'],
    procedures: ['Laparoscopic surgery', 'Open surgery', 'Emergency surgery'] },
  { slug: 'gynaecology', name: 'Gynaecology', icon: HeartHandshake,
    summary: 'Pregnancy care, deliveries and treatment for women’s health at every age.',
    conditions: ['Pregnancy care', 'Irregular periods and PCOS', 'Fibroids and ovarian cysts', 'Menopause concerns'],
    procedures: ['Normal and caesarean delivery', 'Antenatal and postnatal check-ups', 'Gynaecological surgery'] },
  { slug: 'orthopaedics', name: 'Orthopaedics', icon: Bone,
    summary: 'Treatment for fractures, joint pain and back problems, from plaster to surgery.',
    conditions: ['Fractures and dislocations', 'Back and neck pain', 'Sports injuries'],
    procedures: ['Plaster and splinting', 'Fracture surgery', 'Joint pain management', 'Knee and hip replacement'] },
  { slug: 'paediatrics', name: 'Paediatrics', icon: Baby,
    summary: 'Care for newborns, infants and children, backed by the hospital’s NCU for babies who need extra support.',
    conditions: ['Childhood fever and infections', 'Newborn jaundice', 'Growth and nutrition concerns', 'Breathing problems'],
    procedures: ['Child OPD', 'Newborn care in the NCU', 'Vaccination advice'] },
  { slug: 'urology', name: 'Urology', icon: Droplets,
    summary: 'Care for kidney stones, prostate and urinary problems in men and women.',
    conditions: ['Kidney and ureter stones', 'Prostate enlargement', 'Urinary infections', 'Difficulty passing urine'],
    procedures: ['OPD consultation', 'Stone treatment', 'Urological surgery'] },
]

export const specialityBySlug = Object.fromEntries(specialities.map((s) => [s.slug, s]))

// Critical-care units the hospital has confirmed. Keep claims here to what the units actually offer.
export const criticalCare = [
  { id: 'icu', name: 'ICU', full: 'Intensive Care Unit', icon: BedDouble,
    text: 'For patients who need close, round-the-clock monitoring: after major surgery, serious infections, or any condition where things can change quickly.',
    points: ['Continuous monitoring, day and night', 'Nursing staff on every shift', 'Direct admission from the 24×7 emergency'] },
  { id: 'ncu', name: 'NCU', full: 'Newborn Care Unit', icon: Baby,
    text: 'For newborns who need extra care after birth, such as premature or low-birth-weight babies, jaundice, or trouble feeding or breathing.',
    points: ['Mother and baby in the same hospital', 'Close watch on warmth, feeding and breathing', 'Paediatric team on call'] },
]

// TPA (Third-Party Administrator) desk. No insurer list is shown on purpose:
// add one here only once the hospital confirms which insurers/TPAs it is empanelled with.
export const tpa = {
  cashless: [
    ['Show your card', 'At admission, give the TPA desk your health insurance card (or e-card) and a photo ID.'],
    ['We request approval', 'The desk sends a pre-authorisation request to your insurer or TPA with the doctor’s treatment plan.'],
    ['Treatment goes ahead', 'Once approved, the covered amount is settled directly between the hospital and your insurer.'],
    ['Discharge', 'You pay only for items your policy does not cover, such as non-medical consumables or amounts above your limit.'],
  ],
  documents: [
    'Health insurance card or e-card',
    'Policy copy (for individual or family policies)',
    'Photo ID: Aadhaar, PAN, voter ID or passport',
    'Employee ID, for a corporate or group policy',
    'Doctor’s advice for admission and earlier reports, if any',
  ],
  reimbursement: [
    'Discharge summary',
    'Final bill with itemised breakup and payment receipts',
    'Investigation reports and prescriptions',
    'Any other papers your insurer asks for',
  ],
  faqs: [
    { q: 'What is a TPA?', a: 'A Third-Party Administrator handles health insurance claims on behalf of your insurance company. It checks your policy, approves cashless treatment and settles the bill with the hospital.' },
    { q: 'Is my insurance accepted here?', a: 'Message or call the TPA desk with your insurer’s name and policy type before a planned admission. They will tell you whether cashless treatment is possible.' },
    { q: 'What if cashless approval is not given?', a: 'You can pay the bill and claim the money back from your insurer later. The TPA desk gives you the documents needed for that reimbursement claim.' },
    { q: 'What about emergency admissions?', a: 'Treatment starts first. Your family can bring the insurance card to the TPA desk, and the approval request is sent as soon as possible.' },
  ],
}

export const testimonials = [
  { text: 'My mother was admitted at night with high fever. The emergency team started treatment within minutes and kept us informed the whole time.', name: 'Rahul K.', place: 'Rampur' },
  { text: 'The delivery went smoothly and the nurses in the NCU took care of my baby like family. Clean rooms and caring staff.', name: 'Pooja S.', place: 'Bilaspur' },
  { text: 'I had keyhole surgery for gallbladder stones and was walking the next day. The doctor explained everything before the operation.', name: 'Mohd. Arif', place: 'Swar' },
  { text: 'The TPA desk handled our insurance papers, so we could focus on my father’s recovery instead of running around.', name: 'Sunita D.', place: 'Milak' },
]

export const galleryCats = ['Building', 'Wards', 'ICU & NCU', 'Operation theatre', 'Patient care']
const shot = (id, cat, alt, h = 600) => ({ src: photo(id, 800, h), full: photo(id, 1600, h * 2), cat, alt: `${alt} (stock photo)` })
// The hospital's own photos come first (the home page previews the first six).
// Ordered so neighbouring tiles differ in category and height in the masonry grid.
export const gallery = [
  { src: own.front, cat: 'Building', alt: 'SS Multispeciality Hospital front entrance' },
  shot('1775947933085-30050ddad6b3', 'Operation theatre', 'Surgical team in the operating room', 1000),
  shot('1517120026326-d87759a7b63b', 'ICU & NCU', 'Newborn incubator', 800),
  { src: own.street, cat: 'Building', alt: 'SS Multispeciality Hospital building, street view' },
  shot('1758691462863-9e1b8a863140', 'Patient care', 'Doctor talking with a patient', 1000),
  shot('1538108149393-fbbd81895907', 'Wards', 'Private patient room'),
  shot('1778151270757-f3793f65e2de', 'ICU & NCU', 'Monitored beds'),
  shot('1640876777002-badf6aee5bcc', 'Operation theatre', 'Surgeons during an operation'),
  shot('1519494026892-80bbd2d6fd0d', 'Building', 'Reception and help desk', 800),
  shot('1758691461990-03b49d969495', 'Patient care', 'Doctor writing on a patient chart'),
  shot('1551076805-e1869033e561', 'Operation theatre', 'Prepared operating theatre', 1000),
  shot('1512678080530-7760d81faba6', 'Wards', 'Recovery room with bed and seating'),
  shot('1769488718464-882e6c1adfd9', 'Building', 'Hospital corridor', 1000),
  shot('1516574187841-cb9cc2ca948b', 'Wards', 'IV drip stand', 800),
  shot('1551190822-a9333d879b1f', 'Operation theatre', 'Surgeon at work'),
  shot('1758691462878-6edc3d3da1be', 'Patient care', 'Doctor consulting a patient', 800),
  shot('1778151270902-cb0ca572f2ee', 'Wards', 'Patient room with adjustable bed'),
]

export const whyUs = [
  { title: 'Six specialist departments', text: 'Medicine, surgery, gynaecology, orthopaedics, paediatrics and urology in one hospital.' },
  { title: 'ICU and NCU on site', text: 'Critically ill adults and newborns who need extra care are looked after without a transfer.' },
  { title: 'Help with insurance', text: 'Our TPA desk handles cashless approvals and reimbursement papers for insured patients.' },
  { title: 'Easy to reach', text: 'In the heart of Rampur near Old Ramlila, with parking and a 24×7 emergency.' },
]

export const faqs = [
  { q: 'What are the OPD timings?', a: 'OPD runs Monday to Saturday, 9:00 AM to 7:00 PM. Emergency is open 24×7, all days.' },
  { q: 'Do I need an appointment?', a: 'Walk-ins are welcome, but sending an appointment request on WhatsApp or by phone reduces your waiting time.' },
  { q: 'Do you have an ICU and NCU?', a: 'Yes. The hospital has an ICU for critically ill patients and an NCU for newborns who need extra care.' },
  { q: 'Do you accept health insurance?', a: 'Yes, through our TPA desk. Share your insurer’s name before a planned admission to check whether cashless treatment is possible.' },
  { q: 'How do I call an ambulance?', a: `Call the emergency number ${hospital.emergency}. Our ambulance is available around the clock.` },
]
