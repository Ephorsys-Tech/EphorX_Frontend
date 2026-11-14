import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import Modal from '../../ui/Modal'
import CertificateModal from '../modal/CertificateModal'

import certificate1 from '../../assets/faqImage.png'
import certificate2 from '../../assets/faqImage.png'
import certificate3 from '../../assets/faqImage.png'

const certificates = [
  {
    id: 1,
    title: 'Web Development',
    description:
      'Recognizing practical skills in building modern, responsive web applications.',
    image: certificate1
  },
  {
    id: 2,
    title: 'MERN Stack Development',
    description:
      'Celebrating expertise in developing full-stack applications using the MERN stack.',
    image: certificate2
  },
  {
    id: 3,
    title: 'Programming Excellence',
    description:
      'Recognizing technical knowledge, problem-solving, and programming skills.',
    image: certificate3
  }
]

const CertificatesSection = () => {
  const scrollRef = useRef(null)
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  const scrollCertificates = direction => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({
      left:
        direction === 'right' ? el.clientWidth * 0.75 : -el.clientWidth * 0.75,
      behavior: 'smooth'
    })
  }

  const arrowClass =
    'flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2a5b] cursor-pointer'

  return (
    <>
      <section
        id='certificates'
        className='relative isolate overflow-hidden bg-[#0b2a5b] py-16 text-white sm:py-13'
      >
        {/* Background design: bubbles and soft diagonal streaks */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
        >
          <div className='absolute -top-10 left-[14%] h-[130%] w-28 -skew-x-[28deg] bg-gradient-to-b from-white/[0.07] to-transparent' />
          <div className='absolute -top-10 left-[40%] h-[130%] w-14 -skew-x-[28deg] bg-gradient-to-b from-white/[0.06] to-transparent' />
          <div className='absolute -top-10 left-[68%] h-[130%] w-32 -skew-x-[28deg] bg-gradient-to-b from-white/[0.06] to-transparent' />

          <div className='absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10 bg-gradient-to-br from-blue-500/25 to-transparent' />
          <div className='absolute -bottom-28 -left-20 h-96 w-96 rounded-full border border-white/10 bg-gradient-to-tr from-sky-400/15 to-transparent' />
          <div className='absolute bottom-20 right-[10%] h-24 w-24 rounded-full border border-white/10 bg-blue-400/10' />
          <div className='absolute left-[30%] top-16 h-6 w-6 rounded-full bg-sky-300/25' />
          <div className='absolute right-[30%] top-1/2 h-8 w-8 rounded-full bg-blue-300/20' />
        </div>

        <div className='mx-auto max-w-7xl px-5 sm:px-8'>
          {/* Heading */}
          <div className='mb-10 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end'>
            <div className='max-w-2xl'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
                Certificates We <span className='text-sky-300'>Provide</span>
              </h2>

              <p className='mt-4 text-base leading-7 text-blue-100/90'>
                Every achievement tells a story of learning, dedication, and
                growth. Explore the certificates our students can earn through
                their learning journey with EphorX.
              </p>
            </div>

            {/* Scroll controls */}
            <div className='flex shrink-0 items-center gap-3'>
              <button
                type='button'
                onClick={() => scrollCertificates('left')}
                aria-label='Scroll certificates left'
                className={arrowClass}
              >
                <ArrowLeft size={19} />
              </button>
              <button
                type='button'
                onClick={() => scrollCertificates('right')}
                aria-label='Scroll certificates right'
                className={arrowClass}
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>

          {/* Certificate cards */}
          <div
            ref={scrollRef}
            className='-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-5 pb-4 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          >
            {certificates.map((certificate, index) => (
              <motion.article
                key={certificate.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className='group flex w-[82vw] min-w-[260px] max-w-[350px] shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-white text-slate-900 shadow-xl shadow-black/10 sm:w-[320px] lg:w-[340px]'
              >
                {/* Certificate preview */}
                <div className='border-b border-slate-100 bg-slate-50 p-5'>
                  <div className='aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'>
                    <img
                      src={certificate.image}
                      alt={`${certificate.title} certificate`}
                      loading='lazy'
                      className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>
                </div>

                {/* Card details */}
                <div className='flex flex-1 flex-col p-5'>
                  <h3 className='text-lg font-semibold text-slate-900'>
                    {certificate.title}
                  </h3>

                  <p className='mt-2 text-sm leading-6 text-slate-600'>
                    {certificate.description}
                  </p>

                  <button
                    type='button'
                    onClick={() => setSelectedCertificate(certificate)}
                    className='cursor-pointer mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
                  >
                    View certificate
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <p className='mt-3 text-center text-xs text-blue-200/80 sm:hidden'>
            Swipe left or right to explore certificates
          </p>
        </div>
      </section>

      {/* Selected certificate modal */}
      <Modal
        isOpen={Boolean(selectedCertificate)}
        onClose={() => setSelectedCertificate(null)}
        title={selectedCertificate?.title || 'Certificate'}
        size='xl'
        theme='white'
      >
        {selectedCertificate && (
          <CertificateModal certificate={selectedCertificate} />
        )}
      </Modal>
    </>
  )
}

export default CertificatesSection
