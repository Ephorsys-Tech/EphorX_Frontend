
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

const modalSizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-6xl',
}

const modalThemes = {
  white: {
    panel: 'bg-white text-gray-900',
    header: 'border-gray-100',
    close: 'text-gray-500 hover:bg-gray-100 hover:text-black',
  },
  sky: {
    panel: 'bg-sky-50 text-slate-900',
    header: 'border-sky-100',
    close: 'text-slate-500 hover:bg-sky-100 hover:text-sky-700',
  },
  black: {
    panel: 'bg-gray-950 text-white',
    header: 'border-gray-800',
    close: 'text-gray-400 hover:bg-gray-800 hover:text-white',
  },
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  theme = 'white',
  showCloseButton = true,
  closeOnBackdrop = true,
}) => {
  const currentTheme = modalThemes[theme] || modalThemes.white

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (closeOnBackdrop) onClose?.()
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`my-auto flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-2xl shadow-2xl shadow-slate-950/15 ring-1 ring-black/5 sm:rounded-3xl ${
              modalSizes[size] || modalSizes.md
            } ${currentTheme.panel}`}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.42, ease: 'easeInOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Reusable header */}
            <div
              className={`flex shrink-0 items-center justify-between border-b px-5 py-4 sm:px-6 ${currentTheme.header}`}
            >
              <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                {title}
              </h2>

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className={`rounded-xl p-2 transition-colors duration-200 ${currentTheme.close}`}
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Reusable body */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Modal
