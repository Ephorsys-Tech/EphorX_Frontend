import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const steps = [
  {
    number: '01',
    title: 'Choose Your Course',
    description:
      'Explore our courses and select the one that matches your career goals.',
    highlight: 'Find your course'
  },
  {
    number: '02',
    title: 'Enquiry & Counselling',
    description:
      'Connect with our team to discuss course details and clear your doubts.',
    highlight: 'Get guidance'
  },
  {
    number: '03',
    title: 'Reserve Your Seat',
    description:
      'Pay the booking amount to reserve your seat in your selected course.',
    highlight: 'Limited seats'
  },
  {
    number: '04',
    title: 'Admission Confirmation',
    description:
      'Receive your admission confirmation and further joining instructions.',
    highlight: 'Admission confirmed'
  },
  {
    number: '05',
    title: 'Document Submission',
    description:
      'Submit the required documents to complete your admission formalities.',
    highlight: 'Submit documents'
  },
  {
    number: '06',
    title: 'Fee Payment',
    description:
      'Complete the applicable course fee payment as per the payment plan.',
    highlight: 'Flexible payment'
  },
  {
    number: '07',
    title: 'Batch Allocation',
    description:
      'Receive your batch schedule and training commencement details.',
    highlight: 'Get your schedule'
  },
  {
    number: '08',
    title: 'Welcome to EphorX',
    description:
      'Your admission is complete. Get ready to begin your learning journey.',
    highlight: "Let's get started"
  }
]

function StepCard ({ step, isHighlighted }) {
  return (
    <div
      className={`rounded-2xl border p-5 transition duration-300 sm:p-6 ${
        isHighlighted
          ? 'border-[#0b2a5b] bg-[#0b2a5b] text-white shadow-xl shadow-blue-950/20'
          : 'border-slate-200 bg-white text-slate-900 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/10'
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-wider ${
          isHighlighted ? 'text-sky-300' : 'text-blue-700'
        }`}
      >
        Step {step.number}
      </p>

      <h3 className='mt-2 text-xl font-bold leading-snug'>
        {step.title}
      </h3>

      <p
        className={`mt-2 text-sm leading-6 ${
          isHighlighted ? 'text-blue-100/90' : 'text-slate-600'
        }`}
      >
        {step.description}
      </p>

      <span
        className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
          isHighlighted
            ? 'bg-white/15 text-white'
            : 'bg-blue-50 text-blue-700'
        }`}
      >
        {step.highlight}
      </span>
    </div>
  )
}

function Process () {
  return (
    <section className='relative isolate overflow-hidden bg-linear-to-b from-sky-50 via-blue-50/40 to-white pb-20 pt-8 sm:pt-10'>
      {/* Background design */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-10 left-[14%] h-[40%] w-24 skew-x-[-28deg] bg-linear-to-b from-white/70 to-white/0' />
        <div className='absolute -top-10 left-[60%] h-[40%] w-28 skew-x-[-28deg] bg-linear-to-b from-white/60 to-white/0' />
        <div className='absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/70 bg-linear-to-br from-blue-200/50 to-sky-100/10' />
        <div className='absolute -left-20 top-[45%] h-64 w-64 rounded-full border border-white/70 bg-linear-to-tr from-sky-200/40 to-white/10' />
        <div className='absolute -bottom-24 right-[8%] h-72 w-72 rounded-full border border-white/70 bg-linear-to-tl from-blue-200/40 to-white/10' />
      </div>

      <div className='mx-auto max-w-5xl px-5 sm:px-8'>
        {/* Heading */}
        <div className='mx-auto max-w-2xl text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl'>
            Admission <span className='text-blue-700'>Process</span>
          </h1>
          <p className='mt-4 text-base leading-7 text-slate-600'>
            Follow these simple steps to complete your admission at EphorX.
          </p>
        </div>

        {/* Timeline */}
        <ol className='relative mt-14 space-y-3 sm:mt-16'>
          {/* Vertical line */}
          <div
            aria-hidden='true'
            className='absolute bottom-5 left-5 top-5 w-px bg-linear-to-b from-blue-300 via-blue-200 to-blue-300 md:left-1/2 md:-translate-x-1/2'
          />

          {steps.map((step, index) => {
            // Highlight cards 02, 04, 06 and 08
            const isHighlighted = index % 2 === 1
            const onLeft = index % 2 === 0

            return (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
                className='relative pl-14 md:grid md:grid-cols-2 md:gap-x-20 md:pl-0'
              >
                {/* Number marker on the line */}
                <span
                  className={`absolute left-0 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ring-white md:left-1/2 md:-translate-x-1/2 ${
                    isHighlighted ? 'bg-[#0b2a5b]' : 'bg-blue-700'
                  }`}
                >
                  {step.number}
                </span>

                <div className={onLeft ? 'md:col-start-1' : 'md:col-start-2'}>
                  <StepCard
                    step={step}
                    isHighlighted={isHighlighted}
                  />
                </div>
              </motion.li>
            )
          })}
        </ol>

        {/* Call to action */}
        <div className='mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#0b2a5b] p-6 text-white sm:flex-row sm:items-center sm:p-8'>
          <div>
            <h2 className='text-xl font-bold sm:text-2xl'>
              Ready to start your admission?
            </h2>
            <p className='mt-1.5 text-sm text-blue-100/90'>
              Talk to our team and reserve your seat today.
            </p>
          </div>

          <div className='flex flex-wrap gap-3'>
            <Link
              to='/contact'
              className='rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2a5b]'
            >
              Contact us
            </Link>
            <Link
              to='/Courses'
              className='rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2a5b]'
            >
              Browse courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process