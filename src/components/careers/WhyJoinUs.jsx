import { motion } from 'framer-motion'

const benefits = [
  {
    number: '01',
    title: 'Innovation & Ideas',
    description:
      'Bring your ideas to life and contribute to meaningful projects.'
  },
  {
    number: '02',
    title: 'Continuous Learning',
    description: 'Explore new technologies and keep improving your skills.'
  },
  {
    number: '03',
    title: 'Collaborative Team',
    description: 'Work together, exchange ideas and learn from others.'
  },
  {
    number: '04',
    title: 'Professional Growth',
    description: 'Take on new challenges and develop your career.'
  },
  {
    number: '05',
    title: 'Real-world Experience',
    description: 'Get opportunities to work on practical projects.'
  },
  {
    number: '06',
    title: 'Meaningful Work',
    description: 'Contribute your skills towards useful solutions.'
  }
]

const WhyJoinUs = () => {
  const scrollToPositions = () =>
    document.getElementById('open-positions')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })

  return (
    <section
      id='why-join-us'
      className='relative isolate overflow-hidden bg-linear-to-b from-sky-50 via-blue-50/40 to-white pb-16 pt-8 sm:pt-10 sm:pb-15'
    >
      {/* Background design */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-10 left-[16%] h-[60%] w-24 skew-x-[-28deg] bg-linear-to-b from-white/70 to-white/0' />
        <div className='absolute -top-10 left-[46%] h-[60%] w-14 skew-x-[-28deg] bg-linear-to-b from-white/60 to-white/0' />
        <div className='absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/70 bg-linear-to-br from-blue-200/50 to-sky-100/10' />
        <div className='absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/70 bg-linear-to-tr from-sky-200/40 to-white/10' />
        <div className='absolute left-[6%] top-1/2 h-10 w-10 rounded-full bg-blue-200/40' />
      </div>

      <div className='mx-auto grid max-w-7xl items-start gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14'>
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='min-w-0 lg:sticky lg:top-32'
        >

          <h1 className='mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl'>
            Your Next Chapter Starts Here.{' '}
            <span className='text-blue-700'>A Place to Grow.</span>
          </h1>

          <p className='mt-5 text-base leading-7 text-slate-600'>
            A great career is built through learning, collaboration and
            opportunities. At EphorX, we aim to create an environment where
            people can share ideas, develop their abilities and contribute to
            meaningful work. Whether you&rsquo;re beginning your professional
            journey or bringing valuable experience, we believe that curiosity
            and dedication make a difference.
          </p>

          <button
            type='button'
            onClick={scrollToPositions}
            className='cursor-pointer mt-7 inline-flex items-center rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
          >
            Explore open positions
          </button>
        </motion.div>

        {/* Benefits */}
        <div className='grid gap-5 sm:grid-cols-2'>
          {benefits.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: (index % 2) * 0.08 }}
              className='group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/10'
            >
              <p className='text-sm font-semibold text-blue-700'>
                {item.number}
              </p>

              <h3 className='mt-3 text-lg font-semibold text-slate-900'>
                {item.title}
              </h3>
              <p className='mt-2 text-sm leading-6 text-slate-600'>
                {item.description}
              </p>

              <div className='mt-5 h-0.5 w-8 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-16' />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyJoinUs
