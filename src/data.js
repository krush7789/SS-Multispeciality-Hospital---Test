// All site content lives here. Every name, photo, number and review below is a PLACEHOLDER:
// swap in real, verified data before launch. Nothing here is copied from any other hospital.
import {
  Stethoscope, HeartHandshake, Baby, Scissors, Bone, Bean, Droplets, Microscope,
  ScanLine, AudioWaveform, HeartPulse, Activity, Pill, Droplet, Ambulance,
} from 'lucide-react'

export const hospital = {
  name: 'SS Multispeciality Hospital',
  short: 'SS Hospital',
  address: 'Near Topkhana Rd, Old Ramlila, Pranpur, Rampur, Uttar Pradesh 244901',
  landmark: 'Next to the Old Ramlila ground, off Topkhana Road',
  parking: 'Free two-wheeler and car parking inside the campus',
  phone: '+91 00000 00000',
  emergency: '+91 00000 00001',
  whatsapp: '910000000000',
  email: 'info@sshospital.example',
  opd: 'Mon–Sat, 9:00 AM – 7:00 PM',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Topkhana Rd, Old Ramlila, Pranpur, Rampur, Uttar Pradesh 244901'),
  socials: { facebook: '#', instagram: '#', youtube: '#' },
}

// Stock photos from Unsplash (free licence, images.unsplash.com only — never plus.unsplash.com).
// Placeholders until the hospital's own photos are available.
export const photo = (id, w = 800, h = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=70&auto=format`
export const stock = {
  hero: '1532938911079-1b06ac7ceec7',
  heroCare: '1666214277730-e9c7e755e5a3',
  reception: '1519494026892-80bbd2d6fd0d',
  building: '1586773860418-d37222d8fce3',
}

export const groups = [
  { id: 'clinical', label: 'Clinical care' },
  { id: 'diagnostics', label: 'Diagnostics' },
  { id: 'support', label: 'Support services' },
]

export const specialities = [
  { slug: 'internal-medicine', name: 'Internal Medicine', group: 'clinical', icon: Stethoscope,
    summary: 'Diagnosis and long-term care for fever, diabetes, blood pressure, thyroid and other adult illnesses.',
    conditions: ['Diabetes and thyroid disorders', 'High blood pressure', 'Fever, typhoid, dengue and malaria', 'Asthma and chest infections'],
    procedures: ['Health check-up packages', 'Chronic disease management plans', 'Inpatient medical care'] },
  { slug: 'obstetrics-gynaecology', name: 'Obstetrics & Gynaecology', group: 'clinical', icon: HeartHandshake,
    summary: 'Pregnancy care from the first visit to delivery, plus treatment for women’s health at every age.',
    conditions: ['High-risk pregnancy', 'Irregular periods and PCOS', 'Infertility evaluation', 'Menopause care'],
    procedures: ['Normal and caesarean delivery', 'Laparoscopic gynae surgery', 'Antenatal and postnatal check-ups'] },
  { slug: 'paediatrics-neonatology', name: 'Paediatrics & Neonatology', group: 'clinical', icon: Baby,
    summary: 'Care for newborns, infants and children, with a NICU for babies who need extra support.',
    conditions: ['Premature and low-birth-weight babies', 'Newborn jaundice', 'Childhood infections', 'Growth and nutrition concerns'],
    procedures: ['NICU care', 'Vaccination schedule', 'Well-baby check-ups'] },
  { slug: 'general-surgery', name: 'General Surgery', group: 'clinical', icon: Scissors,
    summary: 'Planned and emergency operations, including keyhole surgery for faster recovery.',
    conditions: ['Gallbladder stones', 'Hernia', 'Appendicitis', 'Piles, fissure and fistula'],
    procedures: ['Laparoscopic surgery', 'Emergency surgery', 'Wound and burn care'] },
  { slug: 'orthopaedics', name: 'Orthopaedics', group: 'clinical', icon: Bone,
    summary: 'Treatment for fractures, joint pain and spine problems, from plaster to surgery.',
    conditions: ['Fractures and dislocations', 'Knee and hip arthritis', 'Back and neck pain', 'Sports injuries'],
    procedures: ['Fracture fixation with C-Arm guidance', 'Joint replacement', 'Physiotherapy plans'] },
  { slug: 'nephrology', name: 'Nephrology', group: 'clinical', icon: Bean,
    summary: 'Diagnosis and care for kidney disease, from early stages to dialysis planning.',
    conditions: ['Chronic kidney disease', 'Kidney stones', 'Urinary infections', 'Swelling and fluid imbalance'],
    procedures: ['Kidney function evaluation', 'Dialysis planning', 'Diet and medicine guidance'] },
  { slug: 'dialysis', name: 'Dialysis', group: 'clinical', icon: Droplets,
    summary: 'A dedicated dialysis unit with scheduled and emergency sessions.',
    conditions: ['Kidney failure', 'Acute kidney injury'],
    procedures: ['Haemodialysis', 'Scheduled weekly sessions', 'Emergency dialysis'] },
  { slug: 'pathology-lab', name: 'Pathology & Lab', group: 'diagnostics', icon: Microscope,
    summary: 'An on-site lab for blood, urine and other tests, so samples don’t travel to another centre.',
    conditions: ['Routine blood tests', 'Hormone and thyroid profiles', 'Infection screening'],
    procedures: ['Blood and urine tests', 'Hormone and thyroid profiles', 'Health check packages'] },
  { slug: 'digital-xray-c-arm', name: 'Digital X-Ray & C-Arm', group: 'diagnostics', icon: ScanLine,
    summary: 'Clear digital X-rays and live C-Arm imaging during orthopaedic and surgical procedures.',
    conditions: ['Fractures', 'Chest conditions', 'Joint problems'],
    procedures: ['Digital X-ray', 'C-Arm guided procedures'] },
  { slug: 'ultrasound', name: 'Ultrasound', group: 'diagnostics', icon: AudioWaveform,
    summary: 'Abdominal, pelvic and pregnancy scans by trained sonologists.',
    conditions: ['Pregnancy monitoring', 'Abdominal pain', 'Kidney and gallbladder stones'],
    procedures: ['Whole abdomen scan', 'Obstetric scan', 'Pelvic scan'] },
  { slug: 'echo', name: 'ECHO (Echocardiogram)', group: 'diagnostics', icon: HeartPulse,
    summary: 'An ultrasound of the heart that shows how well it pumps and how its valves work.',
    conditions: ['Breathlessness', 'Heart murmurs', 'Heart failure follow-up'],
    procedures: ['2D echocardiography', 'Colour Doppler study'] },
  { slug: 'tmt', name: 'TMT (Stress Test)', group: 'diagnostics', icon: Activity,
    summary: 'A treadmill test that checks how your heart responds to exercise.',
    conditions: ['Chest pain on exertion', 'Pre-surgery fitness checks'],
    procedures: ['Treadmill stress test', 'ECG monitoring'] },
  { slug: 'pharmacy', name: 'Pharmacy', group: 'support', icon: Pill,
    summary: 'An in-house pharmacy open 24 hours, so prescriptions are filled before you leave.',
    conditions: [], procedures: ['24×7 dispensing', 'Inpatient medicine supply'] },
  { slug: 'blood-bank', name: 'Blood Bank', group: 'support', icon: Droplet,
    summary: 'A licensed blood bank for surgeries, deliveries and emergencies.',
    conditions: [], procedures: ['Blood grouping and cross-matching', 'Component supply', 'Donation camps'] },
  { slug: 'ambulance', name: 'Ambulance Service', group: 'support', icon: Ambulance,
    summary: 'Ambulances on call around the clock for emergencies and patient transfers.',
    conditions: [], procedures: ['24×7 emergency pickup', 'Inter-hospital transfers'] },
]

export const specialityBySlug = Object.fromEntries(specialities.map((s) => [s.slug, s]))

const portrait = (g, n) => `https://randomuser.me/api/portraits/${g}/${n}.jpg`
const morning = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30']
const evening = ['16:00', '16:30', '17:00', '17:30', '18:00']

export const doctors = [
  { slug: 'dr-ananya-verma', name: 'Dr. Ananya Verma', photo: portrait('women', 44), dept: 'obstetrics-gynaecology',
    qual: 'MBBS, MS (Obstetrics & Gynaecology)', exp: 14, langs: ['Hindi', 'English'], days: ['Mon', 'Tue', 'Thu', 'Sat'], slots: morning,
    bio: 'Handles high-risk pregnancies and laparoscopic gynae surgery. Known for explaining every step to mothers-to-be.' },
  { slug: 'dr-rohit-saxena', name: 'Dr. Rohit Saxena', photo: portrait('men', 32), dept: 'internal-medicine',
    qual: 'MBBS, MD (Medicine)', exp: 18, langs: ['Hindi', 'English', 'Urdu'], days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], slots: morning,
    bio: 'Focuses on diabetes, blood pressure and fever management, with long-term follow-up plans.' },
  { slug: 'dr-meera-kulkarni', name: 'Dr. Meera Kulkarni', photo: portrait('women', 68), dept: 'paediatrics-neonatology',
    qual: 'MBBS, MD (Paediatrics)', exp: 11, langs: ['Hindi', 'English'], days: ['Mon', 'Wed', 'Fri', 'Sat'], slots: morning,
    bio: 'Leads the NICU and child OPD. Special interest in premature babies and childhood nutrition.' },
  { slug: 'dr-imran-qureshi', name: 'Dr. Imran Qureshi', photo: portrait('men', 52), dept: 'general-surgery',
    qual: 'MBBS, MS (General Surgery)', exp: 16, langs: ['Hindi', 'Urdu', 'English'], days: ['Tue', 'Thu', 'Sat'], slots: evening,
    bio: 'Performs laparoscopic gallbladder, hernia and appendix surgery, and leads emergency surgical care.' },
  { slug: 'dr-kavita-rawat', name: 'Dr. Kavita Rawat', photo: portrait('women', 26), dept: 'pathology-lab',
    qual: 'MBBS, MD (Pathology)', exp: 9, langs: ['Hindi', 'English'], days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], slots: morning,
    bio: 'Oversees lab testing and reporting.' },
  { slug: 'dr-sandeep-bhatia', name: 'Dr. Sandeep Bhatia', photo: portrait('men', 75), dept: 'orthopaedics',
    qual: 'MBBS, MS (Orthopaedics)', exp: 20, langs: ['Hindi', 'Punjabi', 'English'], days: ['Mon', 'Wed', 'Fri'], slots: evening,
    bio: 'Treats fractures, arthritis and spine pain, and performs knee and hip replacements.' },
  { slug: 'dr-nisha-agarwal', name: 'Dr. Nisha Agarwal', photo: portrait('women', 90), dept: 'ultrasound',
    qual: 'MBBS, MD (Radiodiagnosis)', exp: 8, langs: ['Hindi', 'English'], days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], slots: morning,
    bio: 'Performs pregnancy, abdominal and pelvic scans with clear, patient-friendly reports.' },
  { slug: 'dr-arjun-mehta', name: 'Dr. Arjun Mehta', photo: portrait('men', 11), dept: 'nephrology',
    qual: 'MBBS, MD, DM (Nephrology)', exp: 12, langs: ['Hindi', 'English'], days: ['Tue', 'Fri'], slots: evening,
    bio: 'Manages kidney disease and the dialysis unit, with a focus on slowing disease progression.' },
  { slug: 'dr-farah-siddiqui', name: 'Dr. Farah Siddiqui', photo: portrait('women', 12), dept: 'echo',
    qual: 'MBBS, MD (Medicine), DNB (Cardiology)', exp: 10, langs: ['Hindi', 'Urdu', 'English'], days: ['Wed', 'Sat'], slots: morning,
    bio: 'Performs ECHO and TMT studies and reviews heart patients referred from the medicine OPD.' },
  { slug: 'dr-vikram-chauhan', name: 'Dr. Vikram Chauhan', photo: portrait('men', 41), dept: 'dialysis',
    qual: 'MBBS, MD (Medicine)', exp: 7, langs: ['Hindi', 'English'], days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], slots: morning,
    bio: 'Supervises daily dialysis sessions and emergency dialysis.' },
]

export const doctorBySlug = Object.fromEntries(doctors.map((d) => [d.slug, d]))

export const leadership = [
  { name: 'Dr. S. K. Sharma', role: 'Founder & Medical Director', photo: portrait('men', 85) },
  { name: 'Mrs. Shalini Singh', role: 'Hospital Administrator', photo: portrait('women', 50) },
  { name: 'Dr. Rakesh Tiwari', role: 'Head, Emergency Services', photo: portrait('men', 62) },
]

export const testimonials = [
  { text: 'My mother was admitted at night with high fever. The emergency team started treatment within minutes and kept us informed the whole time.', name: 'Rahul K.', place: 'Rampur' },
  { text: 'The delivery went smoothly and the nurses in the NICU took care of my baby like family. Clean rooms and caring staff.', name: 'Pooja S.', place: 'Bilaspur' },
  { text: 'Got my X-ray, blood tests and doctor consultation done in one morning. No running around to different centres.', name: 'Mohd. Arif', place: 'Swar' },
  { text: 'Dialysis sessions are always on time and the staff are patient with elderly people like my father.', name: 'Sunita D.', place: 'Milak' },
]

export const galleryCats = ['Building', 'Wards', 'Operation theatre', 'Diagnostics', 'Patient care']
const shot = (id, cat, alt, h = 600) => ({ src: photo(id, 800, h), full: photo(id, 1600, h * 2), cat, alt: `${alt} (stock photo)` })
// Ordered so neighbouring tiles differ in category and height in the masonry grid.
export const gallery = [
  shot('1519494026892-80bbd2d6fd0d', 'Building', 'Reception and help desk'),
  shot('1775947933085-30050ddad6b3', 'Operation theatre', 'Surgical team in the operating room', 1000),
  shot('1538108149393-fbbd81895907', 'Wards', 'Private patient room'),
  shot('1582719471384-894fbb16e074', 'Diagnostics', 'Pathologist at the microscope', 800),
  shot('1758691462863-9e1b8a863140', 'Patient care', 'Doctor talking with a patient', 1000),
  shot('1778151270757-f3793f65e2de', 'Wards', 'General ward with monitored beds'),
  shot('1586773860418-d37222d8fce3', 'Building', 'Hospital building exterior', 800),
  shot('1640876777002-badf6aee5bcc', 'Operation theatre', 'Surgeons during an operation'),
  shot('1606206591513-adbfbdd7a177', 'Diagnostics', 'Blood sample tubes in the lab', 1000),
  shot('1517120026326-d87759a7b63b', 'Wards', 'Newborn incubator being moved to the NICU', 800),
  shot('1758691461990-03b49d969495', 'Patient care', 'Doctor writing on a patient chart'),
  shot('1551076805-e1869033e561', 'Operation theatre', 'Prepared operating theatre', 1000),
  shot('1512678080530-7760d81faba6', 'Wards', 'Recovery room with bed and seating'),
  shot('1518152006812-edab29b069ac', 'Diagnostics', 'Laboratory microscopes', 800),
  shot('1769488718464-882e6c1adfd9', 'Building', 'Hospital corridor', 1000),
  shot('1516574187841-cb9cc2ca948b', 'Wards', 'IV drip stand', 800),
  shot('1551190822-a9333d879b1f', 'Operation theatre', 'Surgeon at work'),
  shot('1579154204601-01588f351e67', 'Diagnostics', 'Lab with analysers', 1000),
  shot('1758691462878-6edc3d3da1be', 'Patient care', 'Doctor consulting a patient', 800),
  shot('1778151270902-cb0ca572f2ee', 'Wards', 'Patient room with adjustable bed'),
]

export const whyUs = [
  { title: 'Experienced specialists', text: 'Senior doctors across 15 specialities, with OPD timings you can plan around.' },
  { title: 'Everything under one roof', text: 'Lab, X-ray, ultrasound, ECHO, pharmacy and blood bank in the same building.' },
  { title: 'Clear communication', text: 'Doctors explain your diagnosis and treatment options before any procedure.' },
  { title: 'Easy to reach', text: 'In the heart of Rampur near Old Ramlila, with parking and 24×7 ambulance pickup.' },
]

export const faqs = [
  { q: 'What are the OPD timings?', a: 'OPD runs Monday to Saturday, 9:00 AM to 7:00 PM. Each doctor’s days and slots are listed on their profile. Emergency is open 24×7, all days.' },
  { q: 'Do I need an appointment?', a: 'Walk-ins are welcome, but booking an appointment online or by phone reduces your waiting time.' },
  { q: 'Do you accept health insurance?', a: 'Please ask the front desk which insurance plans and government health schemes are accepted. Bring your card and a photo ID at admission.' },
  { q: 'How do I get my lab reports?', a: 'The lab counter will tell you when your report will be ready. You can collect it there or ask for it on WhatsApp.' },
  { q: 'Is the pharmacy open at night?', a: 'Yes, the in-house pharmacy is open 24 hours, every day.' },
  { q: 'How do I call an ambulance?', a: `Call the emergency number ${hospital.emergency}. Our ambulance is available around the clock.` },
]


