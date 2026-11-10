import { motion } from 'framer-motion'

const quickAnswers = [
  'Explore our courses',
  'Understand the admission process',
  'Learn about career opportunities'
]

const FaqHero = () => {
  return (
    <section className='relative isolate overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white pb-16 pt-8 sm:pt-10 lg:pb-20'>
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

      <div className='mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14'>
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='max-w-2xl'
        >
          <span className='inline-block rounded-full border border-blue-100 bg-white px-4 py-1.5 text-sm font-medium text-blue-800 shadow-sm'>
            Help centre
          </span>

          <h1 className='mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl'>
            Everything You Need to Know About{' '}
            <span className='text-blue-700'>EphorX.</span>
          </h1>

          <p className='mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8'>
            Got questions about our courses, learning process, or getting
            started? Find the answers you need and take your next step with
            confidence.
          </p>

          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <a
              href='#faq-questions'
              className='rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
            >
              Explore FAQs
            </a>

            <span className='text-sm text-slate-600'>
              We&rsquo;re here to help you learn.
            </span>
          </div>
        </motion.div>

        {/* Quick answers card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className='relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0'
        >
          <div className='absolute -right-3 -top-4 h-28 w-28 rounded-[38%_62%_54%_46%] bg-blue-100' />
          <div className='absolute -bottom-4 -left-4 h-20 w-20 rounded-[35%_65%_42%_58%] bg-sky-200' />

          <div className='relative rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-950/10 sm:p-8'>
            <p className='text-sm font-semibold uppercase tracking-wider text-blue-700'>
              Quick answers
            </p>
            <h2 className='mt-2 text-2xl font-bold text-slate-900'>
              How can we help?
            </h2>

            <ul className='mt-6 space-y-3'>
              {quickAnswers.map((item, index) => (
                <li
                  key={item}
                  className='flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:border-blue-600 hover:bg-white'
                >
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white'>
                    0{index + 1}
                  </span>
                  <span className='text-sm font-semibold text-slate-800'>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className='mt-6 rounded-xl bg-[#0b2a5b] px-5 py-4 text-sm text-blue-100'>
              Your learning journey starts here.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FaqHero
