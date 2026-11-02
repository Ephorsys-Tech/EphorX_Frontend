
import { useState } from "react";
import { Phone, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "../ui/Modal";
import BookDemoModal from "../components/modal/BookDemoModal";

const FloatingContactButtons = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  const phoneNumber = "+91XXXXXXXXXX";

  return (
    <>
      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-7 sm:right-7 sm:flex-row">

        {/* Book a Demo */}
        <button
          type="button"
          onClick={() => setDemoOpen(true)}
          aria-label="Book a Demo"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#071927] text-white shadow-lg shadow-slate-900/20 transition duration-300 hover:-translate-y-1 hover:bg-sky-600 sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3.5"
        >
          <CalendarDays
            size={20}
            className="shrink-0 transition-transform duration-300 group-hover:rotate-12"
          />

          <span className="absolute right-14 whitespace-nowrap rounded-md bg-[#071927] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:static sm:opacity-100 sm:bg-transparent sm:p-0 sm:text-sm sm:shadow-none">
            Book a Demo
          </span>
        </button>

        {/* Call Us */}
        <Link
          to={`tel:${phoneNumber}`}
          aria-label="Call Us"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-1 hover:bg-sky-600 sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3.5"
        >
          <Phone size={20} strokeWidth={2.2} />

          <span className="absolute right-14 whitespace-nowrap rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:static sm:opacity-100 sm:bg-transparent sm:p-0 sm:text-sm sm:shadow-none">
            Call Us
          </span>
        </Link>
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
