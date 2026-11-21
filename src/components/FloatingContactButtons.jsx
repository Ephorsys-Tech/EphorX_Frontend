
import { useState } from "react";
import { Phone, CalendarDays } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import Modal from "../ui/Modal";
import BookDemoModal from "../components/modal/BookDemoModal";

const FloatingContactButtons = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  const phoneNumber = "9556473002";

  return (
    <>
      <div className="fixed bottom-9 right-4 z-40 flex flex-col items-center gap-3">

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-700"
        >
          <FaWhatsapp size={23} />

          <span className="absolute right-14 whitespace-nowrap rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            WhatsApp Us
          </span>
        </a>

        {/* Book a Demo */}
        <button
          type="button"
          onClick={() => setDemoOpen(true)}
          aria-label="Book a Demo"
          className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#071927] text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
        >
          <CalendarDays
            size={20}
            className="shrink-0 transition-transform duration-300 group-hover:rotate-12"
          />

          <span className="absolute right-14 whitespace-nowrap rounded-md bg-[#071927] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            Book a Demo
          </span>
        </button>

        {/* Call Us */}
        <a
          href={`tel:${phoneNumber}`}
          aria-label="Call Us"
          className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-700 text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600"
        >
          <Phone size={20} strokeWidth={2.2} />

          <span className="absolute right-14 whitespace-nowrap rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            Call Us
          </span>
        </a>
      </div>

      {/* Demo Modal */}
      <Modal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Book a Demo"
        size="lg"
        theme="white"
      >
        <BookDemoModal
          onClose={() => setDemoOpen(false)}
        />
      </Modal>
    </>
  );
};

export default FloatingContactButtons;
