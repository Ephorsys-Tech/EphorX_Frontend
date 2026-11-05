import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Phone, Mail, Menu, X, GraduationCap } from 'lucide-react'
import image from '../assets/Logo.png'
import Modal from '../ui/Modal'
import ContactModal from '../components/modal/ContactModal'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/Courses' },
  { label: 'About', to: '/about' },
  { label: 'Process', to: '/process' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' }
]

// TODO: replace with your real contact details
const PHONE = '+91 00000 00000'
const EMAIL = 'info@ephorx.com'

function Logo () {
  return (
    <Link
      to='/'
      aria-label='EphorX Home'
      className='flex shrink-0 items-center'
    >
      <img
        src={image}
        alt='EphorX logo'
        className='h-10 w-auto object-contain sm:h-11 lg:h-12'
      />
    </Link>
  )
}

export default function Navbar () {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu with Escape
  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleContactSubmit = async formData => {
    console.log('Contact enquiry:', formData)
  }

  const openContact = () => {
    setOpen(false)
    setContactOpen(true)
  }

  return (
    <header id='top' className='fixed inset-x-0 top-0 z-50'>
      {/* Top info bar (desktop only, collapses on scroll) */}
      <div
        className={`hidden overflow-hidden bg-[#0b2a5b] text-white transition-all duration-300 lg:block ${
          scrolled ? 'max-h-0' : 'max-h-10'
        }`}
      >
        <div className='mx-auto flex h-10 max-w-7xl items-center justify-between px-8 text-[13px]'>
          <p className='flex items-center gap-2 text-white/90'>
            <GraduationCap size={16} className='text-amber-300' />
            Admissions are open for the new batch
          </p>
          <div className='flex items-center gap-6 text-white/90'>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className='flex items-center gap-2 transition hover:text-white'
            >
              <Phone size={14} />
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className='flex items-center gap-2 transition hover:text-white'
            >
              <Mail size={14} />
              {EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`bg-white/95 backdrop-blur transition-shadow duration-300 ${
          scrolled
            ? 'shadow-[0_6px_24px_-12px_rgba(11,42,91,0.35)]'
            : 'border-b border-slate-200'
        }`}
      >
        <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8'>
          <Logo />

          {/* Desktop links */}
          <ul className='hidden items-center gap-1 lg:flex xl:gap-2'>
            {LINKS.map(link => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `group relative block px-3 py-2 text-[15px] font-semibold transition-colors xl:px-4 ${
                      isActive
                        ? 'text-blue-700'
                        : 'text-slate-700 hover:text-blue-700'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-blue-600 transition-transform duration-200 xl:inset-x-4 ${
                          isActive
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className='hidden items-center gap-3 lg:flex'>
            <button
              type='button'
              onClick={openContact}
              className='flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
            >
              <Phone size={16} />
              Contact us
            </button>
          </div>

          {/* Mobile actions */}
          <div className='flex items-center gap-2 lg:hidden'>
            <button
              type='button'
              onClick={openContact}
              aria-label='Contact us'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition hover:bg-blue-100'
            >
              <Phone size={18} />
            </button>
            <button
              type='button'
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className='flex h-10 w-10 items-center justify-center rounded-full bg-[#0b2a5b] text-white transition hover:bg-[#0f3a7d]'
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`grid border-slate-200 bg-white transition-all duration-300 lg:hidden ${
            open ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr] border-t-0'
          }`}
        >
          <div className='overflow-hidden'>
            <ul className='px-4 py-3 sm:px-6'>
              {LINKS.map(link => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    end
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className='border-t border-slate-100 px-4 pb-5 pt-4 sm:px-6'>
              <button
                type='button'
                tabIndex={open ? 0 : -1}
                onClick={openContact}
                className='flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 text-base font-semibold text-white transition hover:bg-blue-800'
              >
                <Phone size={18} />
                Contact us
              </button>
              <div className='mt-4 flex flex-col gap-2 text-sm text-slate-600'>
                <a
                  href={`tel:${PHONE.replace(/\s/g, '')}`}
                  tabIndex={open ? 0 : -1}
                  className='flex items-center gap-2'
                >
                  <Phone size={15} className='text-blue-700' />
                  {PHONE}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  tabIndex={open ? 0 : -1}
                  className='flex items-center gap-2'
                >
                  <Mail size={15} className='text-blue-700' />
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Contact Modal */}
      <Modal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        title='Contact Us'
        size='lg'
        theme='white'
      >
        <ContactModal
          onClose={() => setContactOpen(false)}
          onSubmit={handleContactSubmit}
        />
      </Modal>
    </header>
  )
}
