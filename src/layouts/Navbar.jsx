import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import image from "../assets/Logo.png";
import { Phone } from "lucide-react";
import Modal from "../ui/Modal";
import ContactModal from "../components/modal/ContactModal";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Course", to: "/Courses" },
  { label: "About", to: "/about" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

const pill =
  "rounded-3xl bg-[#fdfbf7] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.3)]";

function Logo() {
  return (
    <Link
      to="/"
      aria-label="EphorX Home"
      className="relative flex h-12 w-32 shrink-0 items-center sm:w-36 md:w-40 lg:w-40"
    >
      <img
        src={image}
        alt="EphorX logo"
        className="absolute -left-5 top-[37%] h-auto w-44 max-w-none -translate-y-1/2 object-contain sm:-left-7 sm:w-48 md:-left-8 md:w-52 lg:-left-12 lg:w-57"
      />
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = async (formData) => {
    console.log("Contact enquiry:", formData);
  };

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5 md:px-8 lg:px-40 xl:px-40 2xl:px-41 transition-all duration-300 ${
        scrolled
          ? "bg-gray-600/30 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Desktop Navbar */}
      <nav className="mb-2 hidden items-center justify-between gap-3 lg:flex xl:gap-4">
        {/* Logo */}
        <div className="flex min-w-0 shrink-0 items-center">
          <Logo />
        </div>

        {/* Navigation Links */}
        <div
          className={`${pill} mb-1 flex min-w-0 items-center gap-1 p-1.5 xl:gap-3 xl:p-2`}
        >
          <ul className="flex min-w-0 items-center gap-0.5 xl:gap-1">
            {LINKS.map((link) => (
              <li key={link.label} className="shrink-0">
                <NavLink
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `block rounded-full px-3 py-2 text-sm font-semibold transition xl:px-5 xl:text-md ${
                      isActive
                        ? "bg-sky-200/30 text-sky-500"
                        : "text-black hover:bg-black/5"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div
          className={`${pill} mb-2 flex shrink-0 items-center gap-1.5 px-3 py-3 text-sm font-medium text-black transition hover:-translate-y-0.5 xl:px-4 xl:text-md`}
        >
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="whitespace-nowrap text-sm xl:text-md"
          >
            Contact Us
          </button>

          <Phone
            size={19}
            className="shrink-0 text-blue-600 transition-transform duration-200 hover:scale-110"
          />
        </div>
      </nav>

      {/* Mobile and Tablet Navbar */}
      <div className="relative mb-1 lg:hidden">
        <nav
          className={`${pill} flex w-full items-center justify-between gap-2 p-1.5 pb-1`}
        >
          <Logo />

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

        {/* Mobile Dropdown */}
        <div
          className={`${pill} absolute right-0 mt-2 w-56 max-w-full overflow-hidden py-2 transition-all duration-200 ${
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 text-center font-semibold transition ${
                  isActive
                    ? "bg-sky-100 text-sky-400"
                    : "text-black hover:bg-black/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Shared Contact Modal */}
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
    </header>
  );
}
