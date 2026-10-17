import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/Logo.png";
import { Phone } from "lucide-react";
import Modal from "../ui/Modal";
import ContactModal from "../components/modal/ContactModal";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Course", to: "/Course" },
  { label: "About", to: "/about" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

const pill =
  "rounded-3xl bg-[#fdfbf7] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.3)]";


function Logo({ name = false }) {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-2"
    >
      {/* Logo Image */}
      <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
        <img
          src={image}
          alt="EphorX logo"
          className="h-full w-full object-contain"
        />
      </span>

      {/* Brand Name */}
      {name && (
        <span className="text-2xl font-extrabold tracking-tight">
          <span className="text-black">Ephor</span>
          <span className="text-blue-600">X</span>
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [contactOpen, setContactOpen] = useState(false)
  const handleContactSubmit = async (formData) => {
    console.log('Contact enquiry:', formData)
  }

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-15 sm:pt-5 lg:px-20 transition-all duration-300 ${scrolled ? "bg-gray-600/30 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      {/* Desktop Navbar */}
      <nav className="hidden items-center justify-between gap-4 lg:flex mb-2 px-19">
        {/* Availability */}
        <div className="hidden xl:flex">
          <span className={` flex items-center gap-2 text-sm mb-1`}>
            <Logo name />
          </span>
        </div>

        {/* Navigation Links */}
        <div className={`${pill} flex items-center gap-3 p-2 mb-1`}>
          <ul className="flex items-center gap-1">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="block rounded-full px-5 py-2 text-lg font-semibold text-black transition hover:bg-black/5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
      <div
  className={`${pill} mb-2 flex items-center gap-1.5 px-4 py-3 text-md font-medium text-black transition hover:-translate-y-0.5`}
>
  <button
    type="button"
    onClick={() => setContactOpen(true)}
    className="text-lg"
  >
    Contact Us
  </button>

  <button
    type="button"
    onClick={() => setContactOpen(true)}
    aria-label="Open contact form"
  >
    <Phone
      size={19}
      className=" text-blue-600 transition-transform duration-200 hover:scale-110"
    />
  </button>
</div>
      </nav>

      {/* Mobile and Tablet Navbar */}
      <div className="relative mx-auto max-w-2xl lg:hidden mb-1">
        <nav
          className={`${pill} flex items-center justify-between gap-2 p-1.5`}
        >
          <Logo name />

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              aria-label="Contact Us"
              className="flex items-center justify-center p-1"
            >
              <Phone
                size={25}
                className="text-blue-600 transition-transform duration-200 hover:scale-110"
              />
            </button>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xl text-white"
            >
              {open ? "×" : "☰"}
            </button>
          </div>
        </nav>

        {/* contact modal */}
        <Modal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
          title="Contact Us"
          size="lg"
          theme="white"
        >
          <ContactModal
            onClose={() => setContactOpen(false)}
            onSubmit={handleContactSubmit}
          />
        </Modal>
        {/* Mobile Dropdown */}
        <div
          className={`${pill} absolute right-0 mt-2 w-56 overflow-hidden py-2 transition-all duration-200 ${open
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
            }`}
        >
          {LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-center font-semibold text-black transition hover:bg-black/5"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
