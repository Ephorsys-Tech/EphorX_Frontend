
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroImage from "../../assets/HeroImage.png"

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"

// Hero slides
const slides = [
  {
    title: 'Learn Smarter',
    subtitle: 'at your home',
    description:
      'Discover a smarter way to learn. Explore new skills, study at your own pace, and make learning a part of your everyday life.',
  },
  {
    title: 'Think Larger',
    subtitle: 'every single day',
    description:
      'Explore interactive lessons and useful learning resources designed to make your learning journey simple and enjoyable.',
  },
  {
    title: 'Dream Bigger',
    subtitle: 'achieve more',
    description:
      'Build your skills, grow your confidence, and take the next step toward achieving your educational goals.',
  },
]

// Reusable button
const HeroButton = ({ to, children, variant = 'primary' }) => {
  const styles = {
    primary:
      'bg-blue-700 text-white shadow-lg shadow-blue-700/25 hover:bg-blue-800',
    secondary:
      'border-2 border-blue-700 text-gray-900 hover:bg-blue-700 hover:text-white',
  }

  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${styles[variant]}`}
    >
      {children}
    </Link>
  )
}

// Reusable slide indicators
const SlideIndicators = ({ slides, activeSlide, onChange }) => (
  <div className="mt-6 flex items-center gap-2">
    {slides.map((slide, index) => (
      <button
        key={slide.title}
        type="button"
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

// Social media links
const socialLinks = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/",
    color: "hover:bg-[#1877F2]",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/",
    color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/",
    color: "hover:bg-[#0A66C2]",
  },
  {
    label: "X",
    icon: FaXTwitter,
    url: "https://x.com/",
    color: "hover:bg-black",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    url: "https://www.youtube.com/",
    color: "hover:bg-[#FF0000]",
  },
]

// Reusable social links
function SocialLinks() {
  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      {socialLinks.map(({ label, icon: Icon, url, color }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`group flex h-10 w-10 items-center justify-center rounded-xl
            border border-blue-200 bg-white text-blue-700
            transition-all duration-300 hover:-translate-y-1
            hover:border-transparent hover:text-white ${color}`}
        >
          <Icon size={17} />
        </a>
      ))}
    </div>
  )
}

// Main component
const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [])

  const currentSlide = slides[activeSlide]

  return (
    <section
      id="home"
      className="relative min-h-[100vh] overflow-hidden bg-sky-300 text-black"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-[32%] h-40 w-40 rounded-full bg-sky-100/80 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] items-center gap-22 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:px-41 lg:py-16">
        {/* Left content */}
        <div className="relative z-10 mt-10 flex flex-col items-start">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-3 text-2xl font-semibold tracking-wide text-gray-700 sm:text-3xl"
          >
            Let's
          </motion.p>

          {/* Animated text */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                }}
              >
                <h1 className="break-words text-6xl font-extrabold leading-[1.05] tracking-tight text-blue-800 sm:text-7xl lg:text-8xl">
                  {currentSlide.title}
                </h1>

                <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                  {currentSlide.subtitle}
                </h2>

                <p className="mt-6 max-w-lg text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
                  {currentSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Reusable buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <HeroButton to="/apply">
              Apply Now
              <ArrowRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </HeroButton>

            <HeroButton to="/about" variant="secondary">
              Read More
            </HeroButton>
          </div>

          {/* Slide controls */}
          <SlideIndicators
            slides={slides}
            activeSlide={activeSlide}
            onChange={setActiveSlide}
          />

          {/* Social links */}
          <SocialLinks />
        </div>

        {/* Right image */}
        <div className="relative mx-auto w-full max-w-[550px] lg:ml-30">
          {/* Decorative shapes */}
          <div className="absolute -right-3 -top-5 h-36 w-36 rounded-[38%_62%_54%_46%] bg-blue-100 sm:h-52 sm:w-52" />

          <div className="absolute -bottom-5 -left-4 h-24 w-24 rounded-[35%_65%_42%_58%] bg-sky-200 sm:h-32 sm:w-32" />

          <div className="absolute -left-5 top-[42%] h-12 w-12 rotate-12 rounded-xl bg-blue-200/80" />

          <div className="absolute -right-3 bottom-[22%] h-7 w-7 rounded-full bg-blue-700 sm:-right-5 sm:h-10 sm:w-10" />

          {/* Main image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative z-10 aspect-[1.08/1] overflow-hidden shadow-2xl shadow-blue-950/15"
            style={{
              borderRadius: '38% 62% 48% 52% / 37% 38% 62% 63%',
            }}
          >
            <img
              src={HeroImage}
              alt="Student enjoying a learning experience"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/25 via-transparent to-transparent" />
          </motion.div>

          {/* Floating information card */}
          {/* 
          <div className="absolute -bottom-4 left-3 z-20 flex items-center gap-3 rounded-2xl border border-blue-50 bg-white p-3 shadow-xl shadow-blue-950/10 sm:bottom-5 sm:-left-8 sm:p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md shadow-blue-700/20">
              <ArrowRight size={23} />
            </div>

            <div>
              <p className="text-sm font-bold text-gray-950">
                Learn Without Limits
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Your journey starts here
              </p>
            </div>
          </div>
          */}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
