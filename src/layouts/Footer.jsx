import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube
} from 'react-icons/fa6'
import image from '../assets/Logo.png'
import Modal from '../ui/Modal'
import CompanyMapModal from '../components/modal/CompanyMapModal'

// TODO: replace with your real contact details
const PHONE = '+91 00000 00000'
const EMAIL = 'info@ephorx.com'
const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/Courses' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Process', to: '/process' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQs', to: '/faq' }
]

const courses = ['Full Stack Development', 'Programming', 'Database Management']

const socialLinks = [
  {
    label: 'Facebook',
    icon: FaFacebookF,
    url: 'https://www.facebook.com/',
    hover: 'bg-[#1877F2] hover:border-[#1877F2]',
  },
  {
    label: 'Instagram',
    icon: FaInstagram,
    url: 'https://www.instagram.com/',
    hover:
      'bg-gradient-to-tr from-[#FEDA75] via-[#FA7E1E] via-[#D62976] to-[#962FBF]',
  },
  {
    label: 'LinkedIn',
    icon: FaLinkedinIn,
    url: 'https://www.linkedin.com/',
    hover: 'bg-[#0A66C2] hover:border-[#0A66C2]',
  },
  {
    label: 'X',
    icon: FaXTwitter,
    url: 'https://x.com/',
    hover: 'bg-black hover:border-black',
  },
  {
    label: 'YouTube',
    icon: FaYoutube,
    url: 'https://www.youtube.com/',
    hover: 'bg-[#FF0000] hover:border-[#FF0000]',
  },
]

function FooterHeading({ children }) {
  return (
    <h3 className='mb-5 text-base font-semibold text-[#0b2a5b]'>{children}</h3>
  )
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className='w-fit py-1 text-sm text-slate-600 transition-colors hover:text-blue-700 focus:outline-none focus-visible:text-blue-700 focus-visible:underline'
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const [mapOpen, setMapOpen] = useState(false)

  const contactRow =
    'group flex items-start gap-3 text-sm text-slate-600 transition-colors hover:text-blue-700'
  const contactIcon =
    'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white'
  const navigate = useNavigate();

  return (
    <footer className='border-t border-slate-200 bg-slate-50 text-slate-700'>
      <div className='mx-auto max-w-7xl px-5 sm:px-8'>
        <div className='grid grid-cols-1 gap-x-10 gap-y-12 py-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr] lg:py-16'>
          {/* Brand */}
          <div>
        <Link
  to='/'
  aria-label='EphorX Home'
  className='inline-block -ml-7 lg:-ml-8'
>
  <img
    src={image}
    alt='EphorX logo'
    className='h-17 w-auto object-contain'
  />
</Link>

            <p className='-mt-2 max-w-sm text-sm leading-7 text-slate-600'>
              Empowering learners with practical technology education, hands-on
              projects, and skills to grow with confidence in a changing digital
              world.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {socialLinks.map(({ label, icon: Icon, url, hover }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-300  text-slate-100 transition-all duration-300 hover:text-white ${hover} focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <FooterHeading>Explore</FooterHeading>
            <nav aria-label='Footer navigation' className='flex flex-col'>
              {quickLinks.map(link => (
                <FooterLink key={link.to} to={link.to}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* both */}
          <div>
            {/* Top courses */}
            <div>
              <FooterHeading>Top Courses</FooterHeading>
              <div className='flex flex-col'>
                {courses.map(course => (
                  <FooterLink key={course} to='/Courses'>
                    {course}
                  </FooterLink>
                ))}
              </div>

              <Link
                to='/Courses'
                className='group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900'
              >
                Explore all courses
                <ArrowRight
                  size={15}
                  className='transition-transform duration-300 group-hover:translate-x-1'
                />
              </Link>
            </div>

            <button onClick={() => navigate("/gallery")} className='bg-blue-700 text-white px-3 py-2 mt-4 rounded-2xl cursor-pointer'>Gallery</button>
          </div>


          {/* Contact */}
          <div>
            <FooterHeading>Get in Touch</FooterHeading>

            <div className='flex flex-col gap-4'>
              <a
                href={`tel:${PHONE.replace(/\s/g, '')}`}
                className={contactRow}
              >
                <span className={contactIcon}>
                  <Phone size={16} />
                </span>
                <span className='pt-2'>{PHONE}</span>
              </a>

              <a href={`mailto:${EMAIL}`} className={contactRow}>
                <span className={contactIcon}>
                  <Mail size={16} />
                </span>
                <span className='pt-2'>{EMAIL}</span>
              </a>

              <button
                type='button'
                onClick={() => setMapOpen(true)}
                className={`${contactRow} text-left cursor-pointer`}
              >
                <span className={contactIcon}>
                  <MapPin size={16} />
                </span>
                <span className='pt-2'>View our location</span>
              </button>
            </div>

            <Link
              to='/contact'
              className='mt-6 inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
            >
              Send an enquiry
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='bg-[#0b2a5b]'>
        <div className='mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between'>
          <p className='text-xs text-blue-100/90'>
            &copy; {year}{' '}
            <span className='font-semibold text-white'>EphorX</span>. All rights
            reserved.
          </p>

          <div className='flex flex-wrap items-center gap-x-6 gap-y-2'>
            <Link
              to='/privacy-policy'
              className='text-xs text-blue-100/90 transition-colors hover:text-white'
            >
              Privacy Policy
            </Link>
            <Link
              to='/terms'
              className='text-xs text-blue-100/90 transition-colors hover:text-white'
            >
              Terms &amp; Conditions
            </Link>
            <button
              type='button'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label='Back to top'
              className='cursor-pointer flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Company map modal */}
      <Modal
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        title='Our Location'
        size='lg'
        theme='white'
      >
        <CompanyMapModal />
      </Modal>
    </footer>
  )
}
