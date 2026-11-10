import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const CareerCTA = () => {
  return (
    <section className='bg-white pb-16 sm:pb-20'>
      <div className='mx-auto max-w-7xl px-5 sm:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='relative isolate overflow-hidden rounded-2xl bg-[#0b2a5b] px-6 py-12 text-center text-white sm:px-12 sm:py-14'
        >
          {/* Background design */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
          >
            <div className='absolute -top-10 left-[18%] h-[140%] w-24 -skew-x-[28deg] bg-gradient-to-b from-white/[0.07] to-transparent' />
            <div className='absolute -top-10 left-[62%] h-[140%] w-28 -skew-x-[28deg] bg-gradient-to-b from-white/[0.06] to-transparent' />
            <div className='absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10 bg-gradient-to-br from-blue-500/25 to-transparent' />
            <div className='absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-white/10 bg-gradient-to-tr from-sky-400/15 to-transparent' />
          </div>

          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Don&rsquo;t See the Right{' '}
            <span className='text-sky-300'>Role?</span>
          </h2>

          <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100/90'>
            We are always interested in connecting with talented and passionate
            people. Reach out to our team to discuss potential opportunities.
          </p>

          <Link
            to='/contact'
            className='mt-8 inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2a5b]'
          >
            Contact us
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CareerCTA
