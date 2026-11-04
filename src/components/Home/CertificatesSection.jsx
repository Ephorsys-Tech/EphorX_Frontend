
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
} from "lucide-react";

import Modal from "../../ui/Modal";
import CertificateModal from "../modal/CertificateModal";

import certificate1 from "../../assets/faqImage.png";
import certificate2 from "../../assets/faqImage.png";
import certificate3 from "../../assets/faqImage.png";

const certificates = [
    {
        id: 1,
        title: "Web Development",
        description:
            "Recognizing practical skills in building modern, responsive web applications.",
        image: certificate1,
    },
    {
        id: 2,
        title: "MERN Stack Development",
        description:
            "Celebrating expertise in developing full-stack applications using the MERN stack.",
        image: certificate2,
    },
    {
        id: 3,
        title: "Programming Excellence",
        description:
            "Recognizing technical knowledge, problem-solving, and programming skills.",
        image: certificate3,
    },
];

const CertificatesSection = () => {
    const scrollRef = useRef(null);
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const scrollCertificates = (direction) => {
        if (!scrollRef.current) return;

        scrollRef.current.scrollBy({
            left:
                direction === "right"
                    ? scrollRef.current.clientWidth * 0.75
                    : -scrollRef.current.clientWidth * 0.75,
            behavior: "smooth",
        });
    };

    return (
        <>
            <section
                id="certificates"
                className="relative isolate overflow-hidden bg-blue-600 px-4 py-16 sm:px-6 sm:py-2 md:px-8 lg:px-41"
            >
                {/* Background decoration */}
                <div className="pointer-events-none absolute -right-20 top-10 -z-10 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />
                <div className="pointer-events-none absolute -left-20 bottom-0 -z-10 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

                {/* Heading */}
                <div className="mb-7 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                       

                        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-black sm:text-4xl lg:text-5xl">
                            Certificates We{" "}
                            <span className="text-white">Provide</span>
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
                            Every achievement tells a story of learning, dedication,
                            and growth. Explore the certificates our students can earn
                            through their learning journey with EphorX.
                        </p>
                    </div>

                    {/* Horizontal scroll controls */}
                    <div className="flex shrink-0 items-center gap-3">
                        <button
                            type="button"
                            onClick={() => scrollCertificates("left")}
                            aria-label="Scroll certificates left"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#071927] transition-colors duration-300 hover:border-sky-600 hover:bg-sky-600 hover:text-white"
                        >
                            <ArrowLeft size={19} />
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollCertificates("right")}
                            aria-label="Scroll certificates right"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#071927] transition-colors duration-300 hover:border-sky-600 hover:bg-sky-600 hover:text-white"
                        >
                            <ArrowRight size={19} />
                        </button>
                    </div>
                </div>

                {/* Scrollable certificate cards */}
                <div
                    ref={scrollRef}
                    className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6"
                >
                    {certificates.map((certificate, index) => (
                        <motion.article
                            key={certificate.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            className="group w-[82vw] min-w-[260px] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-2xl  bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-b-sky-300 hover:shadow-xl sm:w-[310px] lg:w-[330px]"
                        >
                            {/* Certificate preview */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-[#071927] via-[#18384d] to-sky-700 ">
                                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-white/10" />
                                <div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full border border-white/10" />
                                <img
                                    src={certificate.image}
                                    alt={certificate.title}
                                    className="h-full w-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
                                />

                                <span className="absolute right-7 top-7 rounded-full bg-[#071927]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                    Certificate
                                </span>
                            </div>

                            {/* Card details */}
                            <div className="p-5 sm:p-6">
                                <h3 className="text-lg font-extrabold text-[#071927] transition-colors duration-300 group-hover:text-sky-700">
                                    {certificate.title}
                                </h3>

                                <p className="mt-2 min-h-[72px] text-sm leading-6 text-gray-600">
                                    {certificate.description}
                                </p>

                                <div className="my-1 h-px bg-gray-100 transition-colors duration-300 group-hover:bg-sky-100" />

                                <button
                                    type="button"
                                    onClick={() => setSelectedCertificate(certificate)}
                                    className="group/button flex w-full items-center justify-between rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#071927] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                                >
                                    <span>View Certificate</span>

                                    <ArrowUpRight
                                        size={18}
                                        className="transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1"
                                    />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <p className="mt-2 text-center text-xs text-gray-500 sm:hidden">
                    Swipe left or right to explore certificates
                </p>
            </section>

            {/* Selected certificate modal */}
            <Modal
                isOpen={Boolean(selectedCertificate)}
                onClose={() => setSelectedCertificate(null)}
                title={selectedCertificate?.title || "Certificate"}
                size="xl"
                theme="white"
            >
                {selectedCertificate && (
                    <CertificateModal certificate={selectedCertificate} />
                )}
            </Modal>
        </>
    );
};

export default CertificatesSection;
