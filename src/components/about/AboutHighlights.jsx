import { motion } from 'framer-motion'
import {
  BrainCircuit,
  BriefcaseBusiness,
  CodeXml,
  UsersRound
} from 'lucide-react'

const highlights = [
  {
    number: '01',
    title: 'Technical Knowledge',
    subtitle:
      'Understand the fundamentals and build a strong foundation for your learning journey.',
    icon: BrainCircuit
  },
  {
    number: '02',
    title: 'Practical Projects',
    subtitle:
      'Turn your knowledge into practical projects and gain confidence through hands-on experience.',
    icon: CodeXml
  },
  {
    number: '03',
    title: 'Career Readiness',
    subtitle:
      'Develop problem-solving, communication, and technical skills for professional challenges.',
    icon: BriefcaseBusiness
  },
  {
    number: '04',
    title: 'Continuous Growth',
    subtitle:
      'Keep exploring, learning, and improving as technology and opportunities evolve.',
    icon: UsersRound
  }
]

const AboutHighlights = () => {
  return (
    <section className='bg-blue-900 text-white py-12 sm:py-15'>
      <div className='mx-auto grid max-w-7xl items-start gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14'>
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className='min-w-0 lg:sticky lg:top-32'
        >
          <span className='inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-800'>
            <span className='h-2 w-2 rounded-full bg-blue-600' />
            What we work toward
          </span>

          <h2 className='mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl'>
            Build Skills.{' '}
            <span className='text-sky-300'>Create Possibilities.</span>
          </h2>

          <p className='mt-5 text-base leading-7 text-white'>
            Education is about more than completing a course. It is about
            developing the knowledge, practical experience, and mindset to
            continue learning in a world that never stops changing.
          </p>

          <p className='mt-4 text-base leading-7 text-white'>
            At EphorX, our focus is on helping learners take meaningful steps
            toward their personal and professional goals.
          </p>
        </motion.div>

        {/* Highlights grid */}
        <div className='grid gap-5 sm:grid-cols-2'>
          {highlights.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: (index % 2) * 0.08 }}
                className='group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:border-blue-600 hover:bg-white hover:shadow-lg hover:shadow-blue-900/10'
              >
                <div className='flex items-start justify-between gap-3'>
                  <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white'>
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <span className='text-sm font-semibold text-slate-300'>
                    {item.number}
                  </span>
                </div>

                <h3 className='mt-6 text-lg font-semibold text-slate-900'>
                  {item.title}
                </h3>
                <p className='mt-2 text-sm leading-6 text-slate-600'>
                  {item.subtitle}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutHighlights
