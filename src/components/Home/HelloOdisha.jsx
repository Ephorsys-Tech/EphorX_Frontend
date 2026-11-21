import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Languages,
  Hammer,
  Users,
  Smartphone,
  MapPin,
  Play
} from 'lucide-react'

// Add this once in index.html <head> for proper Odia rendering:
// <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Oriya:wght@400;600;700&display=swap" rel="stylesheet">
const ODIA_FONT = "'Noto Sans Oriya', 'Kalinga', sans-serif"
const CODE_FONT =
  "ui-monospace, SFMono-Regular, Menlo, 'Noto Sans Oriya', monospace"

const content = {
  or: {
    badge: 'ଓଡ଼ିଶା ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ',
    title: 'ଓଡ଼ିଆରେ କୋଡିଂ ଶିଖନ୍ତୁ,',
    subtitle: 'ଓଡ଼ିଶାର ଭବିଷ୍ୟତ ଗଢ଼ନ୍ତୁ',
    description:
      'HTML ଠାରୁ Python ଏବଂ Artificial Intelligence (AI) ପର୍ଯ୍ୟନ୍ତ, ସବୁକିଛି ଆପଣଙ୍କ ମାତୃଭାଷା ଓଡ଼ିଆରେ ଶିଖନ୍ତୁ। ଘରେ ବସି ନିଜ ଗତିରେ Coding, AI ଏବଂ ଆଧୁନିକ Technology ଶିଖି ନିଜର ପ୍ରଥମ ପ୍ରୋଜେକ୍ଟ ତିଆରି କରନ୍ତୁ।',
    apply: 'ଏବେ ଆବେଦନ କରନ୍ତୁ',
    more: 'ଅଧିକ ଜାଣନ୍ତୁ',
    learnLabel: 'ଆପଣ ଯାହା ଶିଖିବେ',
    regionLabel: 'ଓଡ଼ିଶାର ପ୍ରତ୍ୟେକ କୋଣ ପାଇଁ',
    asmitaLabel: 'ଓଡ଼ିଆ ଅସ୍ମିତା',
    prideTitle: 'ଆମ ଓଡ଼ିଶା, ଆମ ଗର୍ବ',
    prideSlogan: 'ବନ୍ଦେ ଉତ୍କଳ ଜନନୀ',
    prideText: 'ଆମ ଭାଷା, ଆମ ସଂସ୍କୃତି, ଆମ ଐତିହ୍ୟ—ଆମ ପରିଚୟ ଓ ଆମର ଗର୍ବ।',
    run: 'ଚଲାନ୍ତୁ',
    outputLabel: 'ଆଉଟପୁଟ୍',
    comment: '// ମୋର ପ୍ରଥମ କୋଡ୍',
    greeting: 'ନମସ୍କାର, ',
    place: 'ଓଡ଼ିଶା',
    features: [
      {
        title: 'ମାତୃଭାଷାରେ କୋଡିଂ',
        text: 'Variable, loop, function: ସବୁ ସହଜ ଓଡ଼ିଆରେ ବୁଝନ୍ତୁ।'
      },
      {
        title: 'ନିଜ ହାତରେ ପ୍ରୋଜେକ୍ଟ',
        text: 'ପ୍ରତ୍ୟେକ ପାଠ ପରେ ଏକ ଛୋଟ ପ୍ରୋଜେକ୍ଟ ବନାନ୍ତୁ।'
      },
      {
        title: 'ଓଡ଼ିଶାର ମେଣ୍ଟର',
        text: 'ଆପଣଙ୍କ ଭାଷା ବୁଝୁଥିବା ମେଣ୍ଟରଙ୍କ ସହାୟତା।'
      },
      { title: 'ଫୋନରେ ସହଜ', text: 'ଯେକୌଣସି ସମୟରେ, ଯେକୌଣସି ସ୍ଥାନରୁ ଶିଖନ୍ତୁ।' }
    ],
    districts: [
      'ଭୁବନେଶ୍ୱର',
      'କଟକ',
      'ପୁରୀ',
      'ବ୍ରହ୍ମପୁର',
      'ସମ୍ବଲପୁର',
      'ରାଉରକେଲା',
      'ବାଲେଶ୍ୱର',
      'କୋରାପୁଟ'
    ]
  },
  en: {
    badge: 'Made for Odisha students',
    title: 'Learn coding in Odia,',
    subtitle: 'build Odisha’s future',
    description:
      'Learn everything from HTML to Python and Artificial Intelligence (AI) in your mother tongue, Odia. Learn coding, AI and modern technologies at your own pace and build your own projects from anywhere.',
    apply: 'Apply now',
    more: 'Learn more',
    learnLabel: 'What you’ll learn',
    regionLabel: 'For every corner of Odisha',
    asmitaLabel: 'ODIA ASMITA',
    prideTitle: 'Our Odisha, Our Pride',
    prideSlogan: 'Bande Utkala Janani',
    prideText:
      'Our language, culture and heritage are our identity—and our pride.',
    run: 'Run',
    outputLabel: 'Output',
    comment: '// My first code',
    greeting: 'Namaskar, ',
    place: 'Odisha',
    features: [
      {
        title: 'Coding in Odia',
        text: 'Variables, loops, functions: understood in simple Odia.'
      },
      {
        title: 'Build as you learn',
        text: 'A small project after every lesson.'
      },
      {
        title: 'Odisha mentors',
        text: 'Support from mentors who speak your language.'
      },
      { title: 'Easy on your phone', text: 'Learn anytime, from anywhere.' }
    ],
    districts: [
      'Bhubaneswar',
      'Cuttack',
      'Puri',
      'Berhampur',
      'Sambalpur',
      'Rourkela',
      'Balasore',
      'Koraput'
    ]
  }
}

const featureIcons = [Languages, Hammer, Users, Smartphone]
const stack = [
  // Frontend Development
  'HTML5',
  'CSS3',
  'JavaScript',
  'React.js',
  'Next.js',
  'Tailwind CSS',

  // Backend Development
  'Node.js',
  'Express.js',
  'Python',
  'Django',
  'FastAPI',
  'REST API',

  // Database
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Firebase',

  // Mobile App Development
  'React Native',
  'Expo',
  'Android Development',

  // AI & Machine Learning
  'Artificial Intelligence',
  'Generative AI',
  'Machine Learning',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'LLMs',
  'Prompt Engineering',
  'AI Agents',

  // Data Science
  'Data Science',
  'Data Analytics',
  'NumPy',
  'Pandas',
  'Matplotlib',
  'Seaborn',
  'Power BI',
  'Data Visualization',

  // Tools & DevOps
  'Git',
  'GitHub',
  'Docker',
  'AWS',
  'Vercel',
  'Postman',
  'VS Code'
]

const spokes = Array.from({ length: 8 }, (_, i) => i * 45)
const beads = Array.from({ length: 32 }, (_, i) => i * (360 / 32))

// Konark Sun Wheel, decorative
const KonarkWheel = ({ spin }) => (
  <motion.svg
    viewBox='0 0 200 200'
    aria-hidden='true'
    className='h-full w-full text-amber-300'
    style={{ transformOrigin: '50% 50%' }}
    animate={spin ? { rotate: 360 } : undefined}
    transition={
      spin ? { duration: 120, ease: 'linear', repeat: Infinity } : undefined
    }
  >
    <circle
      cx='100'
      cy='100'
      r='96'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
    />
    <circle
      cx='100'
      cy='100'
      r='82'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    {beads.map(a => (
      <circle
        key={a}
        cx='100'
        cy='89'
        r='2'
        fill='currentColor'
        transform={`rotate(${a} 100 100)`}
      />
    ))}
    {spokes.map(a => (
      <g key={a} transform={`rotate(${a} 100 100)`} fill='currentColor'>
        <rect x='97' y='22' width='6' height='64' rx='3' />
        <circle
          cx='100'
          cy='46'
          r='5'
          stroke='currentColor'
          strokeWidth='2'
          fill='#172554'
        />
      </g>
    ))}
    <circle cx='100' cy='100' r='16' fill='currentColor' />
    <circle cx='100' cy='100' r='8' fill='#172554' />
  </motion.svg>
)

// Small code editor with a Run button: the centrepiece of the section
const CodeEditor = ({ t }) => {
  const [ran, setRan] = useState(false)
  const kw = 'text-amber-300'
  const str = 'text-emerald-300'
  const cm = 'text-blue-300'

  const lines = [
    [[t.comment, cm]],
    [
      ['const ', kw],
      ['naam = ', ''],
      [`'${t.place}'`, str]
    ],
    [],
    [
      ['function ', kw],
      ['namaskar(naam) {', '']
    ],
    [
      ['  return ', kw],
      [`'${t.greeting}'`, str],
      [' + naam + ', ''],
      ["'!'", str]
    ],
    [['}', '']],
    [],
    [
      ['console.', ''],
      ['log', kw],
      ['(namaskar(naam))', '']
    ]
  ]

  return (
    <div className='relative z-10 overflow-hidden rounded-xl border border-blue-600 bg-slate-950 shadow-2xl shadow-black/40'>
      <div className='flex items-center justify-between border-b border-blue-800 px-4 py-2.5'>
        <div className='flex items-center gap-2'>
          <span
            className='h-3 w-3 rounded-full bg-rose-500'
            aria-hidden='true'
          />
          <span
            className='h-3 w-3 rounded-full bg-amber-300'
            aria-hidden='true'
          />
          <span
            className='h-3 w-3 rounded-full bg-emerald-400'
            aria-hidden='true'
          />
          <span
            className='ml-3 text-xs text-blue-200'
            style={{ fontFamily: CODE_FONT }}
          >
            pratham-code.js
          </span>
        </div>
        <button
          type='button'
          onClick={() => setRan(true)}
          className='inline-flex items-center gap-1.5 rounded-md bg-emerald-400 px-3 py-1 text-xs font-bold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
        >
          <Play size={12} aria-hidden='true' />
          {t.run}
        </button>
      </div>

      <pre
        className='overflow-x-auto px-4 py-4 text-[13px] leading-7 text-blue-50 sm:text-sm'
        style={{ fontFamily: CODE_FONT }}
      >
        <code>
          {lines.map((parts, i) => (
            <div key={i} className='flex'>
              <span className='mr-4 w-4 select-none text-right text-blue-700'>
                {i + 1}
              </span>
              <span>
                {parts.length === 0
                  ? '\u00A0'
                  : parts.map(([text, cls], j) => (
                      <span key={j} className={cls}>
                        {text}
                      </span>
                    ))}
              </span>
            </div>
          ))}
        </code>
      </pre>

      <div
        className='min-h-[72px] border-t border-blue-800 bg-blue-950/70 px-4 py-3'
        aria-live='polite'
      >
        <p className='text-xs font-semibold text-blue-300'>{t.outputLabel}</p>
        {ran && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='mt-1 text-base font-semibold text-emerald-300'
            style={{ fontFamily: CODE_FONT }}
          >
            {t.greeting}
            {t.place}!
          </motion.p>
        )}
      </div>
    </div>
  )
}

export default function HelloOdisha () {
  const [lang, setLang] = useState('or')
  const reduceMotion = useReducedMotion()
  const t = content[lang]
  const isOdia = lang === 'or'

  return (
    <section
      id='odisha'
      lang={isOdia ? 'or' : 'en'}
      className='relative overflow-hidden bg-blue-950 text-blue-50'
      style={isOdia ? { fontFamily: ODIA_FONT } : undefined}
    >
      {/* Pattachitra-style border */}
      <div
        aria-hidden='true'
        className='h-3 w-full'
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #fcd34d 0 14px, #e11d48 14px 28px, #f8fafc 28px 42px, #1d4ed8 42px 56px)'
        }}
      />

      <div className='mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24'>
        <div className='grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]'>
          {/* Left */}
          <div>
            <div className='flex flex-wrap items-center justify-between gap-4'>
              <p className='inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white'>
                <MapPin size={16} aria-hidden='true' />
                {t.badge}
              </p>

              <div
                className='inline-flex rounded-lg border border-blue-700 p-1'
                role='group'
                aria-label='Language'
              >
                {[
                  { id: 'or', label: 'ଓଡ଼ିଆ' },
                  { id: 'en', label: 'English' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type='button'
                    aria-pressed={lang === opt.id}
                    onClick={() => setLang(opt.id)}
                    className={`rounded-md px-3 py-1 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                      lang === opt.id
                        ? 'bg-amber-300 text-blue-950'
                        : 'text-blue-200 hover:text-white'
                    }`}
                    style={
                      opt.id === 'or' ? { fontFamily: ODIA_FONT } : undefined
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <h2
              className={`mt-8 text-4xl font-bold text-white sm:text-5xl lg:text-6xl ${
                isOdia
                  ? 'leading-[1.3]'
                  : 'font-serif leading-[1.1] tracking-tight'
              }`}
            >
              {t.title}
              <span className='block text-amber-300'>{t.subtitle}</span>
            </h2>

            <p
              className={`mt-6 max-w-xl text-base text-blue-100 sm:text-lg ${
                isOdia ? 'leading-8' : 'leading-7'
              }`}
            >
              {t.description}
            </p>

            <div className='mt-8 flex flex-wrap items-center gap-4'>
              <Link
                to='/Courses'
                className='group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-300 px-7 py-3 text-sm font-bold text-blue-950 transition hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950'
              >
                {t.apply}
                <ArrowRight
                  size={17}
                  aria-hidden='true'
                  className='transition-transform group-hover:translate-x-1'
                />
              </Link>
              <Link
                to='/about'
                className='inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-blue-300 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300'
              >
                {t.more}
              </Link>
            </div>

            {/* Tech stack */}
            <div className='mt-10'>
              <p className='text-sm font-semibold text-blue-200'>
                {t.learnLabel}
              </p>
              <ul className='mt-3 flex flex-wrap gap-2'>
                {stack.map(item => (
                  <li
                    key={item}
                    className='rounded-md border border-blue-700 bg-blue-900/60 px-3 py-1 text-sm font-medium text-white'
                    style={{ fontFamily: CODE_FONT }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: code editor over the Konark wheel */}
          <div className='relative mx-auto w-full max-w-[520px]'>
            <div
              aria-hidden='true'
              className='pointer-events-none absolute -right-16 -top-20 h-72 w-72 opacity-25 sm:h-80 sm:w-80'
            >
              <KonarkWheel spin={!reduceMotion} />
            </div>
            <div
              aria-hidden='true'
              className='pointer-events-none absolute -bottom-14 -left-12 h-40 w-40 opacity-15'
            >
              <KonarkWheel spin={false} />
            </div>
            <CodeEditor t={t} />
          </div>
        </div>

        {/* Features: divided columns, not cards */}
        <ul className='mt-16 grid gap-px overflow-hidden rounded-2xl border border-blue-800 bg-blue-800 sm:grid-cols-2 lg:grid-cols-4'>
          {t.features.map((f, i) => {
            const Icon = featureIcons[i]
            return (
              <li key={f.title} className='bg-blue-950 p-6'>
                <Icon size={24} className='text-amber-300' aria-hidden='true' />
                <h3
                  className={`mt-4 text-lg font-bold text-white ${
                    isOdia ? 'leading-8' : ''
                  }`}
                >
                  {f.title}
                </h3>
                <p
                  className={`mt-2 text-sm text-blue-200 ${
                    isOdia ? 'leading-7' : 'leading-6'
                  }`}
                >
                  {f.text}
                </p>
              </li>
            )
          })}
        </ul>

        {/* Odisha Asmita: celebrating our language, culture and heritage */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className='relative mt-12 overflow-hidden rounded-2xl border border-amber-300/40 bg-gradient-to-r from-rose-950 via-blue-950 to-emerald-950 px-6 py-10 text-center shadow-xl sm:px-10'
          aria-label={
            isOdia
              ? 'ଓଡ଼ିଆ ଅସ୍ମିତା ଓ ଓଡ଼ିଶାର ଗର୍ବ'
              : 'Odisha Asmita and Odisha pride'
          }
        >
          <div
            aria-hidden='true'
            className='pointer-events-none absolute -right-10 -top-16 h-44 w-44 opacity-15'
          >
            <KonarkWheel spin={false} />
          </div>
          <p className='relative text-xs font-bold tracking-[0.28em] text-amber-300 sm:text-sm'>
            {t.asmitaLabel}
          </p>
          <h3
            className={`relative mt-4 text-2xl font-extrabold text-white sm:text-4xl ${
              isOdia ? 'leading-relaxed' : 'tracking-tight'
            }`}
          >
            {t.prideTitle}
          </h3>
          <p
            className={`relative mt-3 text-xl font-bold text-amber-300 sm:text-2xl ${
              isOdia ? 'leading-relaxed' : ''
            }`}
          >
            {t.prideSlogan}
          </p>
          <p
            className={`relative mx-auto mt-4 max-w-2xl text-sm text-blue-100 sm:text-base ${
              isOdia ? 'leading-8' : 'leading-7'
            }`}
          >
            {t.prideText}
          </p>
          <div
            aria-hidden='true'
            className='relative mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-rose-500 via-amber-300 to-emerald-400'
          />
        </motion.div>

        {/* Places */}
        <div className='mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-blue-800 pt-6'>
          <p className='text-sm font-semibold text-amber-300'>
            {t.regionLabel}
          </p>
          <ul className='flex flex-wrap gap-x-5 gap-y-2 text-sm text-blue-100'>
            {t.districts.map(d => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
