import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import contactImage from '../../assets/contactImage.png'

const steps = [
  {
    number: '01',
    title: 'Tell us what you need',
    description: 'Courses, admissions, fees or career guidance.'
  },
  {
    number: '02',
    title: 'Get the right guidance',
    description: 'Our team will help you plan your next step.'
  }
]

const ContactHero = () => {
  return (
    <section className='relative isolate overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white pb-20 pt-8 sm:pt-10'>
      {/* Background design */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-10 left-[16%] h-[60%] w-24 -skew-x-[28deg] bg-gradient-to-b from-white/70 to-white/0' />
        <div className='absolute -top-10 left-[46%] h-[60%] w-14 -skew-x-[28deg] bg-gradient-to-b from-white/60 to-white/0' />
        <div className='absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/70 bg-gradient-to-br from-blue-200/50 to-sky-100/10' />
        <div className='absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/70 bg-gradient-to-tr from-sky-200/40 to-white/10' />
        <div className='absolute left-[6%] top-1/2 h-10 w-10 rounded-full bg-blue-200/40' />
      </div>

      <div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14'>
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='min-w-0'
        >
          <span className='inline-block rounded-full border border-blue-100 bg-white px-4 py-1.5 text-sm font-medium text-blue-800 shadow-sm'>
            Let&rsquo;s connect
          </span>

          <h1 className='mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl'>
            Let&rsquo;s start a{' '}
            <span className='text-blue-700'>conversation.</span>
          </h1>

          <p className='mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8'>
            Have questions about courses, admissions or your career? Connect
            with EphorX and get the guidance you need to take your next step
            with confidence.
          </p>

          <div className='mt-8 flex flex-wrap items-center gap-3'>
            <button
              type='button'
              onClick={() =>
                document
                  .getElementById('ask-question-section')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className='rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
            >
              Contact our team
            </button>

            <Link
              to='/faq'
              className='rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-700 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
            >
              Explore FAQs
            </Link>
          </div>

          <div className='mt-8 border-t border-slate-200 pt-6'>
            <p className='text-sm font-semibold text-slate-900'>
              Need a little guidance?
            </p>
            <p className='mt-1 text-sm text-slate-600'>
              We&rsquo;re just a conversation away.
            </p>
          </div>
        </motion.div>

        {/* Right image with steps */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className='relative mx-auto w-full max-w-xl min-w-0 pb-24 lg:max-w-none'
        >
          <div className='absolute -right-3 -top-4 h-32 w-32 rounded-[38%_62%_54%_46%] bg-blue-100 sm:h-44 sm:w-44' />

          <div className='relative aspect-[4/3] overflow-hidden rounded-2xl border border-white bg-slate-100 shadow-2xl shadow-blue-950/15'>
            <img
              src={contactImage}
              alt='EphorX support and guidance'
              className='h-full w-full object-cover'
            />
          </div>

          {/* Steps card */}
          <div className='absolute bottom-0 left-4 right-4 z-10 rounded-xl border border-slate-100 bg-white p-4 shadow-xl shadow-blue-950/10 sm:left-8 sm:right-8'>
            <ul className='grid gap-4 sm:grid-cols-2'>
              {steps.map(step => (
                <li key={step.number} className='flex items-start gap-3'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-xs font-bold text-white'>
                    {step.number}
                  </span>
                  <div className='min-w-0'>
                    <p className='text-sm font-semibold text-slate-900'>
                      {step.title}
                    </p>
                    <p className='mt-0.5 text-xs leading-5 text-slate-600'>
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactHero
