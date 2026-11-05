import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BookOpen, Award, Users, PlayCircle } from 'lucide-react'
import HeroImage from '../../assets/HeroImage.png'

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube
} from 'react-icons/fa6'

// Hero slides
const slides = [
  {
    heading: 'Learn Smarter',
    subtitle: 'at your home',
    description:
      'Discover a smarter way to learn. Explore new skills, study at your own pace, and make learning a part of your everyday life.'
  },
  {
    heading: 'Think Larger',
    subtitle: 'every single day',
    description:
      'Explore interactive lessons and useful learning resources designed to make your learning journey simple and enjoyable.'
  },
  {
    heading: 'Dream Bigger',
    subtitle: 'and achieve more',
    description:
      'Build your skills, grow your confidence, and take the next step toward achieving your educational goals.'
  }
]


const socialLinks = [
  { label: 'Facebook', icon: FaFacebookF, url: 'https://www.facebook.com/' },
  { label: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/' },
  { label: 'LinkedIn', icon: FaLinkedinIn, url: 'https://www.linkedin.com/' },
  { label: 'X', icon: FaXTwitter, url: 'https://x.com/' },
  { label: 'YouTube', icon: FaYoutube, url: 'https://www.youtube.com/' }
]

// Reusable button
const HeroButton = ({ to, children, variant = 'primary' }) => {
  const styles = {
    primary:
      'bg-blue-700 text-white shadow-lg shadow-blue-700/25 hover:bg-blue-800',
    secondary:
      'border border-slate-300 bg-white text-slate-900 hover:border-blue-700 hover:text-blue-700'
  }

  return (
    <Link
      to={to}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${styles[variant]}`}
    >
      {children}
    </Link>
  )
}

// Slide indicators
const SlideIndicators = ({ activeSlide, onChange }) => (
  <div className='mt-8 flex items-center gap-2'>
    {slides.map((slide, index) => (
      <button
        key={slide.heading}
        type='button'
        aria-label={`Show slide ${index + 1}`}
        aria-pressed={activeSlide === index}
        onClick={() => onChange(index)}
        className={`h-1.5 rounded-full transition-all duration-300 ${
          activeSlide === index
            ? 'w-8 bg-blue-700'
            : 'w-3 bg-blue-200 hover:bg-blue-400'
        }`}
      />
    ))}
  </div>
)

export default function HeroSection () {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(current => (current + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const slide = slides[activeSlide]

  return (
    <section
      id='home'
      className='relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white text-slate-900'
    >
      {/* Soft background glow */}
      <div className='pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-100/80 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-16 left-[30%] h-56 w-56 rounded-full bg-sky-100/80 blur-3xl' />

      <div className='relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-28 sm:px-8 lg:min-h-screen lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-20 lg:pt-40'>
        {/* Left content */}
        <div className='relative z-10 flex flex-col items-start'>


          <p className='mt-6 text-xl font-semibold text-slate-600 sm:text-2xl'>
            Let&rsquo;s
          </p>

          {/* Animated headline: fixed height prevents layout jump */}
          <div className='w-full'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              >
                <h1 className='text-5xl font-extrabold leading-[1.05] tracking-tight text-blue-800 sm:text-6xl lg:text-7xl'>
                  {slide.heading}
                </h1>
                <h2 className='mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]'>
                  {slide.subtitle}
                </h2>
                <p className='mt-6 min-h-[84px] max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:min-h-[96px]'>
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Buttons */}
          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <HeroButton to='/Courses'>
              Apply now
              <ArrowRight
                size={17}
                aria-hidden='true'
                className='transition-transform duration-300 group-hover:translate-x-1'
              />
            </HeroButton>

            <HeroButton to='/about' variant='secondary'>
              <PlayCircle size={18} aria-hidden='true' />
              Learn more
            </HeroButton>
          </div>

          <SlideIndicators
            activeSlide={activeSlide}
            onChange={setActiveSlide}
          />


          {/* Social links */}
          <div className='mt-8 flex items-center gap-3'>
            <span className='text-sm font-medium text-slate-500'>
              Follow us
            </span>
            <div className='flex gap-2'>
              {socialLinks.map(({ label, icon: Icon, url }) => (
                <a
                  key={label}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  title={label}
                  className='flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600'
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className='relative mx-auto w-full max-w-[540px] lg:ml-auto'>
          {/* Decorative shapes */}
          <div className='absolute -right-3 -top-5 h-36 w-36 rounded-[38%_62%_54%_46%] bg-blue-100 sm:h-52 sm:w-52' />
          <div className='absolute -bottom-5 -left-4 h-24 w-24 rounded-[35%_65%_42%_58%] bg-sky-200 sm:h-32 sm:w-32' />
          <div className='absolute -right-2 bottom-[30%] h-7 w-7 rounded-full bg-blue-700 sm:-right-4 sm:h-9 sm:w-9' />

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='relative z-10 aspect-[1.08/1] overflow-hidden shadow-2xl shadow-blue-950/15'
            style={{ borderRadius: '38% 62% 48% 52% / 37% 38% 62% 63%' }}
          >
            <img
              src={HeroImage}
              alt='Student enjoying a learning experience'
              className='h-full w-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-blue-950/25 via-transparent to-transparent' />
          </motion.div>

          {/* Floating cards */}
          <div className='absolute -left-2 top-[14%] z-20 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl shadow-blue-950/10 sm:-left-8'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white'>
              <BookOpen size={20} />
            </div>
            <div>
              <p className='text-sm font-bold text-slate-900'>Self-paced</p>
              <p className='text-xs text-slate-500'>Learn on your schedule</p>
            </div>
          </div>

          <div className='absolute -bottom-3 right-2 z-20 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl shadow-blue-950/10 sm:-right-6 sm:bottom-8'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-slate-900'>
              <Award size={20} />
            </div>
            <div>
              <p className='text-sm font-bold text-slate-900'>Certified</p>
              <p className='text-xs text-slate-500'>Recognised courses</p>
            </div>
          </div>

          <div className='absolute -bottom-6 left-6 z-20 hidden items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 shadow-lg shadow-blue-950/10 sm:flex'>
            <Users size={16} className='text-blue-700' />
            <span className='text-xs font-semibold text-slate-700'>
              Mentor support included
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
