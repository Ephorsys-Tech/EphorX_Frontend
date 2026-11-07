
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";

import Modal from "../../ui/Modal";
import campaignApi from "../../admin/api/campaignApi";

const getCampaignList = (response) => {
  const candidates = [
    response?.data?.campaigns,
    response?.data?.data,
    response?.data,
    response?.campaigns,
    response,
  ];

  return candidates.find(Array.isArray) || [];
};

const CampaignPopup = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await campaignApi.getActive();
        const activeCampaigns = getCampaignList(response);

        setCampaigns(activeCampaigns);

        if (activeCampaigns.length > 0) {
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Failed to fetch active campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  // Auto carousel
  useEffect(() => {
    if (!isOpen || campaigns.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen, campaigns.length]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % campaigns.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + campaigns.length) % campaigns.length
    );
  };

  if (!campaigns.length) return null;

  const campaign = campaigns[currentIndex];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="xl"
      theme="white"
      showHeader={false}
      showCloseButton={false}
      hideScrollbar
    >
      <div className="relative overflow-hidden bg-[#f0dfc3]">

        {/* Floating Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close campaign"
          className="absolute right-3 top-3 z-30 rounded-full bg-white p-2 text-gray-800 shadow-md transition hover:rotate-90 hover:bg-gray-100"
        >
          <X size={19} />
        </button>

        {/* Campaign Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={campaign._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid min-h-100 md:grid-cols-2"
          >
            {/* Left Image Section */}
            <div className="relative flex min-h-65 items-center justify-center overflow-hidden bg-[#e8e1d5] sm:min-h-[350px] md:min-h-[500px]">
              {campaign.campaignImage && (
                <motion.img
                  src={campaign.campaignImage}
                  alt={campaign.title}
                  initial={{ scale: 1.04 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              <div className="absolute bottom-5 left-5 rounded-full bg-black/30 px-4 py-2 text-xs font-semibold tracking-wider text-white backdrop-blur-md">
                {/* <Sparkles size={13} className="mr-2 inline" /> */}
                EXCLUSIVE OFFER
              </div>
            </div>

            {/* Right Content Section */}
            <div className="relative flex flex-col items-center justify-center  px-7 py-12 text-center sm:px-10 md:px-12 md:py-16">

              <span className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#6cae9f]">
                Special Announcement
              </span>

              <h2 className="max-w-md text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#171717] sm:text-4xl lg:text-[42px]">
                {campaign.title}
              </h2>

              <div className="my-5 h-1 w-14 rounded-full bg-[#6cae9f]" />

              {campaign.description && (
                <p className="max-w-sm text-sm leading-7 text-[#55504a] sm:text-base">
                  {campaign.description}
                </p>
              )}

              {/* Carousel Controls */}
              {campaigns.length > 1 && (
                <div className="mt-10 flex items-center justify-center gap-5">

                  <button
                    type="button"
                    onClick={handlePrevious}
                    aria-label="Previous campaign"
                    className="rounded-full border border-[#6cae9f]/60 p-2.5 text-[#343434] transition hover:bg-[#6cae9f] hover:text-white"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <div className="flex items-center gap-2">
                    {campaigns.map((item, index) => (
                      <button
                        key={item._id}
                        type="button"
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to campaign ${index + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentIndex === index
                            ? "w-8 bg-[#6cae9f]"
                            : "w-2 bg-[#b9b1a5]"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next campaign"
                    className="rounded-full bg-[#6cae9f] p-2.5 text-white transition hover:bg-[#4e9887]"
                  >
                    <ChevronRight size={19} />
                  </button>

                </div>
              )}

              {campaigns.length > 1 && (
                <p className="mt-4 text-[10px] font-semibold tracking-[0.2em] text-[#777067]">
                  {String(currentIndex + 1).padStart(2, "0")} /{" "}
                  {String(campaigns.length).padStart(2, "0")}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default CampaignPopup;
