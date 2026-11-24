
import { useState } from 'react'
import { motion } from 'framer-motion'

import Modal from '../../ui/Modal'
import CertificateModal from '../modal/CertificateModal'

import certificate1 from '../../assets/certificate1.png'
import certificate2 from '../../assets/certificate2.png'
// import certificate3 from '../../assets/faqImage.png'

const certificates = [
  {
    id: 1,
    title: 'Certificate of Experience',
    description:
      'Recognizing successful internship completion, practical exposure, and hands-on experience with industry-relevant technologies and projects.',
    image: certificate1
  },
  {
    id: 2,
    title: 'Letter of Recommendation',
    description:
      'Appreciating a student’s dedication, professionalism, problem-solving abilities, teamwork, and contributions throughout the internship.',
    image: certificate2
  },
  // {
  //   id: 3,
  //   title: 'Course Completion Certificate',
  //   description:
  //     'Acknowledging the successful completion of an internship, practical learning, and the technical skills gained during the training journey at EphorX.',
  //   image: "",
  // }
]

const CertificatesSection = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null)

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
          <div className='mx-auto mb-10 max-w-2xl text-center sm:mb-12'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
              Certificates We <span className='text-sky-300'>Provide</span>
            </h2>

            <p className='mt-4 text-base leading-7 text-blue-100/90'>
              Every achievement tells a story of learning, dedication, and
              growth. Explore the certificates our students can earn through
              their learning journey with EphorX.
            </p>
          </div>

          {/* Certificate cards */}
          <div className='flex flex-col items-center justify-center gap-5 sm:flex-row sm:items-stretch sm:gap-6'>
            {certificates.map((certificate, index) => (
              <motion.article
                key={certificate.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className='group flex w-full max-w-[300px] flex-col overflow-hidden rounded-xl bg-white text-slate-900 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc(33.333%-16px)] sm:max-w-[320px]'
              >
                {/* Certificate preview */}
                <div className='group aspect-[4/3] w-full overflow-hidden bg-slate-50 p-4'>
                  <img
                    src={certificate.image}
                    alt={`${certificate.title} certificate`}
                    loading='lazy'
                    decoding='async'
                    className='h-full w-full rounded-lg border border-slate-200 bg-white object-contain shadow-sm transition-transform duration-500 group-hover:scale-105'
                  />
                </div>

                {/* Card details */}
                <div className='flex flex-1 flex-col p-4'>
                  <h3 className='text-base font-semibold text-slate-900'>
                    {certificate.title}
                  </h3>

                  <p className='mt-2 flex-1 text-sm leading-6 text-slate-600'>
                    {certificate.description}
                  </p>

                  <button
                    type='button'
                    onClick={() => setSelectedCertificate(certificate)}
                    className='mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
                  >
                    View certificate
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
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
