import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ContactCTA = () => {
  return (
    <section className='bg-white py-16 sm:py-17'>
      <div className='mx-auto max-w-7xl px-5 sm:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className='relative isolate overflow-hidden rounded-2xl bg-[#0b2a5b] px-6 py-12 text-white sm:px-12 sm:py-14'
        >
          {/* Background design */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
          >
            <div className='absolute -top-10 left-[18%] h-[140%] w-24 skew-x-[-28deg] bg-linear-to-b from-white/[0.07] to-transparent' />
            <div className='absolute -top-10 left-[62%] h-[140%] w-28 skew-x-[-28deg] bg-linear-to-b from-white/6 to-transparent' />
            <div className='absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10 bg-linear-to-br from-blue-500/25 to-transparent' />
            <div className='absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-white/10 bg-linear-to-tr from-sky-400/15 to-transparent' />
          </div>

          <div className='flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center'>
            <div className='max-w-2xl'>
              <p className='text-sm font-semibold uppercase tracking-wider text-sky-300'>
                Need more information?
              </p>

              <h2 className='mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl'>
                Still Have Questions?{' '}
                <span className='text-sky-300'>We&rsquo;ve Got You.</span>
              </h2>

              <p className='mt-4 text-base leading-7 text-blue-100/90'>
                Browse our frequently asked questions for helpful information
                about courses, admissions, fees and learning at EphorX.
              </p>
            </div>

            <Link
              to='/faq'
              className='inline-flex shrink-0 items-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2a5b]'
            >
              Visit FAQ page
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactCTA
