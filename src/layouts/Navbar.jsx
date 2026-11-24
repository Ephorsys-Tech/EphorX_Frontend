import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Phone, Mail, Menu, X, Clock, Sparkles } from 'lucide-react'
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

const PHONE = '+91 95564 73002'
const EMAIL = 'info@ephorx.com'
const PARENT = 'Ephorsys Private Limited'
const WORKING_HOURS = 'Mon – Sat: 10:00 – 19:00'

/* Moving strip ke messages — yahan se text badal sakte ho */
const TICKER_ITEMS = [
  { lead: 'Admissions are open', rest: 'for the new batch' },
  { lead: 'EphorX', rest: `– A Unit of ${PARENT}` },
  { lead: 'Learn skills', rest: 'that get you hired' },
  { lead: 'Free counselling', rest: `call ${PHONE}` }
]

function Logo () {
  return (
    <Link
      to='/'
      aria-label={`EphorX Home – A Unit of ${PARENT}`}
      className='flex shrink-0 items-center gap-3 -ml-7 lg:-ml-8'
    >
      <img
        src={image}
        alt='EphorX logo'
        loading='eager'
        fetchPriority='high'
        decoding='async'
        className='h-16 w-auto sm:h-15 lg:h-16 xl:h-18'
      />

      {/* Divider + parent company line (sirf bade screen par) */}
      <span className='hidden h-9 w-px bg-slate-300 2xl:block' />
      <span className='hidden leading-tight 2xl:block'>
        <span className='block text-[11px] text-slate-500'>A Unit of</span>
        <span className='block text-[13px] font-semibold text-[#0b2a5b]'>
          {PARENT}
        </span>
      </span>
    </Link>
  )
}

function TickerRow () {
  return (
    <>
      {TICKER_ITEMS.map(item => (
        <span
          key={item.lead}
          className='flex shrink-0 items-center gap-2 whitespace-nowrap px-8'
        >
          <Sparkles size={14} className='text-amber-300' aria-hidden='true' />
          <span>
            <b className='font-bold text-amber-300'>{item.lead}</b>{' '}
            <span className='text-white/90'>{item.rest}</span>
          </span>
          <span className='ml-8 text-amber-300/60' aria-hidden='true'>
            ✦
          </span>
        </span>
      ))}
    </>
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
      {/* Marquee animation (continuous, left se right ki taraf scroll) */}
      <style>{`
        @keyframes ephorx-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ephorx-marquee-track {
          display: flex;
          width: max-content;
          animation: ephorx-marquee 32s linear infinite;
        }
        .ephorx-marquee:hover .ephorx-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ephorx-marquee-track { animation-duration: 120s; }
        }
      `}</style>

      {/* ───────── Main bar ───────── */}
      <div
        className={`bg-white/95 backdrop-blur transition-shadow duration-300 ${
          scrolled
            ? 'shadow-[0_6px_24px_-12px_rgba(11,42,91,0.35)]'
            : 'border-b border-slate-200'
        }`}
      >
        <nav className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-2 px-5 sm:px-8 lg:h-[72px] lg:gap-3 lg:px-8'>
          <Logo />

          {/* Desktop links */}
          <ul className='hidden shrink-0 items-center gap-0 lg:flex xl:gap-1'>
            {LINKS.map(link => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `group relative block whitespace-nowrap px-2 py-2 text-sm font-semibold transition-colors xl:px-3 xl:text-[15px] ${
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
                        className={`absolute inset-x-2 -bottom-0.5 h-0.5 origin-left rounded-full bg-blue-600 transition-transform duration-200 xl:inset-x-3 ${
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
          <div className='hidden shrink-0 items-center lg:flex'>
            <button
              type='button'
              onClick={openContact}
              className='flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-amber-400 px-3 py-2.5 text-sm font-bold text-[#0b2a5b] shadow-sm transition hover:bg-amber-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 xl:px-5'
            >
              <Phone size={16} />
              Book Consultation
            </button>
          </div>

          {/* Mobile actions */}
          <div className='flex shrink-0 items-center gap-2 lg:hidden'>
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
              className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white transition hover:bg-[#0f3a7d]'
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
                className='flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-base font-bold text-[#0b2a5b] transition hover:bg-amber-300'
              >
                <Phone size={18} />
                Book Consultation
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
                <p className='mt-1 flex items-center gap-2'>
                  <Clock size={15} className='text-blue-700' />
                  {WORKING_HOURS}
                </p>
                <p className='text-xs text-slate-500'>
                  EphorX – A Unit of {PARENT}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── Info row + moving strip (scroll par collapse hoti hain) ───────── */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          scrolled ? 'max-h-0' : 'max-h-[100px]'
        }`}
      >
        {/* Working hours + contact (desktop only) */}
        <div className='hidden border-b border-slate-200 bg-slate-50 lg:block'>
          <div className='mx-auto flex h-12 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-8'>
            <div className='flex items-center gap-3'>
              <span className='flex h-8 w-8 items-center justify-center rounded-full border border-amber-400 text-amber-500'>
                <Clock size={15} />
              </span>
              <div className='leading-tight'>
                <p className='text-[11px] text-slate-500'>Working hours</p>
                <p className='text-[13px] font-semibold text-[#0b2a5b]'>
                  {WORKING_HOURS}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-6 text-[13px] text-slate-700'>
              <a
                href={`tel:${PHONE.replace(/\s/g, '')}`}
                className='flex items-center gap-2 transition hover:text-blue-700'
              >
                <Phone size={14} className='text-blue-700' />
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className='flex items-center gap-2 transition hover:text-blue-700'
              >
                <Mail size={14} className='text-blue-700' />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* Continuously moving strip */}
        <div
          className='ephorx-marquee overflow-hidden bg-[#0b2a5b] text-[13px] text-white'
          aria-label={`EphorX – A Unit of ${PARENT}`}
        >
          <div className='ephorx-marquee-track h-9 items-center'>
            {/* Do baar render — taaki -50% par loop seamless ho */}
            <TickerRow />
            <TickerRow />
            <TickerRow />
            <TickerRow />
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
