import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const faqData = [
  {
    id: 1,
    category: 'General',
    question: 'What is EphorX?',
    answer:
      'EphorX is an educational and IT training company focused on helping students develop practical, industry-relevant technical skills.'
  },
  {
    id: 2,
    category: 'General',
    question: 'Who can join EphorX courses?',
    answer:
      'College students, freshers, graduates, and working professionals who want to learn new technical skills can explore our courses.'
  },
  {
    id: 3,
    category: 'Courses',
    question: 'What courses are available at EphorX?',
    answer:
      'EphorX offers learning opportunities in Web Development, MERN Stack Development, Python Programming, Data Analytics, Artificial Intelligence and Machine Learning, Node.js, React.js and other technology-related fields.'
  },
  {
    id: 4,
    category: 'Courses',
    question: 'Do I need prior programming knowledge?',
    answer:
      'Not necessarily. Beginners can start with foundational concepts and gradually develop their programming skills.'
  },
  {
    id: 5,
    category: 'Courses',
    question: 'Will I work on real-world projects?',
    answer:
      'Practical exercises and project-based learning can help you apply concepts and understand how technical skills are used in real-world situations.'
  },
  {
    id: 6,
    category: 'Admissions',
    question: 'How can I enroll in a course?',
    answer:
      'You can contact the EphorX team through the website to enquire about available courses, admission procedures, and upcoming batches.'
  },
  {
    id: 7,
    category: 'Admissions',
    question: 'Can I get information about upcoming batches?',
    answer:
      'Yes. Contact the team to enquire about upcoming batches, course schedules, and available learning options.'
  },
  {
    id: 8,
    category: 'Fees',
    question: 'How can I know the course fees?',
    answer:
      'Course fees may vary depending on the selected program. Contact the EphorX team for the latest fee details.'
  },
  {
    id: 9,
    category: 'Fees',
    question: 'Are installment payment options available?',
    answer:
      'Please contact the EphorX team to confirm the available payment methods and whether installment options are offered for your selected course.'
  },
  {
    id: 10,
    category: 'Learning',
    question: 'How are the courses taught?',
    answer:
      'The learning process can include concept explanations, practical exercises, coding practice, and project-based activities, depending on the course.'
  },
  {
    id: 11,
    category: 'Career',
    question: 'Will these courses help me prepare for a job?',
    answer:
      'Learning technical concepts, practising projects, and strengthening problem-solving skills can help you prepare for technical roles. Career outcomes depend on your skills, practice, and preparation.'
  },
  {
    id: 12,
    category: 'Career',
    question: 'Can beginners prepare for a technical career?',
    answer:
      'Yes. Beginners can build their foundation step by step through consistent practice, projects, and continued learning.'
  }
]

const categories = [
  'All Questions',
  'General',
  'Courses',
  'Admissions',
  'Fees',
  'Learning',
  'Career'
]

const FaqAccordion = () => {
  const [activeCategory, setActiveCategory] = useState('All Questions')
  const [searchTerm, setSearchTerm] = useState('')
  const [openQuestion, setOpenQuestion] = useState(null)

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory =
      activeCategory === 'All Questions' || faq.category === activeCategory

    const matchesSearch =
      !normalizedSearch ||
      faq.question.toLowerCase().includes(normalizedSearch) ||
      faq.answer.toLowerCase().includes(normalizedSearch) ||
      faq.category.toLowerCase().includes(normalizedSearch)

    return matchesCategory && matchesSearch
  })

  const handleCategoryChange = category => {
    setActiveCategory(category)
    setOpenQuestion(null)
  }

  const handleSearchChange = value => {
    setSearchTerm(value)
    setOpenQuestion(null)
  }

  const resetFilters = () => {
    setActiveCategory('All Questions')
    setSearchTerm('')
    setOpenQuestion(null)
  }

  return (
    <section
      id='faq-questions'
      className='relative isolate scroll-mt-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-sky-50 py-16 sm:py-20'
    >
      {/* Background design */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-10 left-[18%] h-[130%] w-24 -skew-x-[28deg] bg-gradient-to-b from-white/70 to-white/0' />
        <div className='absolute -top-10 left-[64%] h-[130%] w-28 -skew-x-[28deg] bg-gradient-to-b from-white/60 to-white/0' />
        <div className='absolute -left-24 top-20 h-72 w-72 rounded-full border border-white/70 bg-gradient-to-br from-blue-200/50 to-sky-100/10' />
        <div className='absolute -bottom-28 -right-20 h-80 w-80 rounded-full border border-white/70 bg-gradient-to-tl from-blue-200/50 to-sky-100/10' />
      </div>

      <div className='mx-auto max-w-4xl px-5 sm:px-8'>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className='text-center'
        >
          <h2 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
            Frequently <span className='text-blue-700'>Asked Questions</span>
          </h2>
          <p className='mt-3 text-base leading-7 text-slate-600'>
            Search for an answer or browse by topic.
          </p>
        </motion.div>

        {/* Search */}
        <div className='relative mt-8'>
          <input
            type='text'
            value={searchTerm}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder='Search your question'
            aria-label='Search frequently asked questions'
            className='w-full rounded-full border border-slate-300 bg-white py-3 pl-6 pr-20 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:text-base'
          />
          {searchTerm && (
            <button
              type='button'
              onClick={() => handleSearchChange('')}
              aria-label='Clear search'
              className='absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 transition hover:text-blue-700'
            >
              Clear
            </button>
          )}
        </div>

        {/* Category filters */}
        <div
          className='mt-5 flex flex-wrap justify-center gap-2'
          role='tablist'
          aria-label='Filter questions by category'
        >
          {categories.map(category => {
            const isActive = activeCategory === category

            return (
              <button
                key={category}
                type='button'
                role='tab'
                aria-selected={isActive}
                onClick={() => handleCategoryChange(category)}
                className={`cursor-pointer rounded-full border px-4 py-1.5 text-[13px] font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-blue-700 bg-blue-700 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-blue-700 hover:text-blue-700'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* Results count */}
        <div className='mb-4 mt-8 flex items-center justify-between gap-3'>
          <p className='text-sm text-slate-600'>
            Showing{' '}
            <span className='font-semibold text-slate-900'>
              {filteredFaqs.length}
            </span>{' '}
            {filteredFaqs.length === 1 ? 'question' : 'questions'}
          </p>

          {(activeCategory !== 'All Questions' || searchTerm) && (
            <button
              type='button'
              onClick={resetFilters}
              className='text-sm font-semibold text-blue-700 transition hover:text-blue-900'
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Accordion */}
        <div className='space-y-3'>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openQuestion === faq.id

              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-xl border bg-white transition duration-300 ${
                    isOpen
                      ? 'border-blue-600 shadow-lg shadow-blue-900/5'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <button
                    type='button'
                    onClick={() => setOpenQuestion(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className='cursor-pointer flex w-full items-center gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 sm:px-6'
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors duration-300 ${
                        isOpen
                          ? 'bg-blue-700 text-white'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className='min-w-0 flex-1 text-[15px] font-semibold leading-6 text-slate-900 sm:text-base'>
                      {faq.question}
                    </span>

                    <span
                      aria-hidden='true'
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg leading-none transition-colors duration-300 ${
                        isOpen
                          ? 'border-blue-700 bg-blue-700 text-white'
                          : 'border-slate-300 text-slate-500'
                      }`}
                    >
                      {isOpen ? '\u2212' : '+'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease: 'easeInOut' },
                          opacity: { duration: 0.2 }
                        }}
                        className='overflow-hidden'
                      >
                        <div className='mx-5 border-t border-slate-100 pb-5 pt-4 sm:mx-6 sm:pl-[3.25rem]'>
                          <p className='text-sm leading-7 text-slate-600 sm:text-base'>
                            {faq.answer}
                          </p>
                          <span className='mt-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700'>
                            {faq.category}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })
          ) : (
            <div className='rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center'>
              <h3 className='text-lg font-semibold text-slate-900'>
                No questions found
              </h3>
              <p className='mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600'>
                We couldn&rsquo;t find any questions matching your search. Try
                another keyword or select a different category.
              </p>
              <button
                type='button'
                onClick={resetFilters}
                className='mt-5 rounded-full bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800'
              >
                Show all questions
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FaqAccordion
