import { motion } from 'framer-motion'

// TODO: replace the placeholder values with your real details
const contactItems = [
  {
    number: '01',
    title: 'Email Address',
    description: 'Have a question? Send us a message.',
    value: 'hello@ephorx.com',
    link: 'mailto:hello@ephorx.com'
  },
  {
    number: '02',
    title: 'Phone Number',
    description: 'Talk directly with our team.',
    value: '+91 XXXXX XXXXX',
    link: null
  },
  {
    number: '03',
    title: 'Our Location',
    description: 'Come and connect with us in person.',
    value: 'Add your office address',
    link: null
  },
  {
    number: '04',
    title: 'Working Hours',
    description: "We're here to help you move forward.",
    value: 'Add your working hours',
    link: null
  }
]

const ContactInfo = () => {
  return (
    <section id='contact-info' className='bg-white py-16 sm:py-20'>
      <div className='mx-auto max-w-7xl px-5 sm:px-8'>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className='mx-auto mb-12 max-w-2xl text-center'
        >
          <h2 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl'>
            Let&rsquo;s Make Something{' '}
            <span className='text-blue-700'>Happen.</span>
          </h2>
          <p className='mt-4 text-base leading-7 text-slate-600'>
            Have a question or an idea? Choose the best way to connect with our
            team. We&rsquo;d love to hear from you.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
          {contactItems.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className='group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:border-blue-600 hover:bg-white hover:shadow-lg hover:shadow-blue-900/10'
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

              <div className='mt-auto border-t border-slate-200 pt-4'>
                {item.link ? (
                  <a
                    href={item.link}
                    className='break-all text-sm font-semibold text-blue-700 transition hover:text-blue-900 hover:underline'
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className='break-words text-sm font-semibold text-slate-800'>
                    {item.value}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactInfo
