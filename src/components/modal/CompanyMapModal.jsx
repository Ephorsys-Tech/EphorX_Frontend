
import { MapPin, ExternalLink } from "lucide-react";

const CompanyMapModal = () => {
  const companyAddress = "Ephorsys Private Limited";

  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.535436831208!2d85.7718368!3d20.2780928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2832cd512f60df0d%3A0x61d1ddff084be616!2sEphorsys%20Private%20Limited!5e0!3m2!1sen!2sin!4v1793001435322!5m2!1sen!2sin";

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    companyAddress
  )}`;

  return (
    <div className="bg-white p-4 sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
          <MapPin size={22} />
        </span>

        <div>
          <h3 className="text-lg font-extrabold text-blue-700">
            Visit Our Company
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Find our location on the map and plan your visit.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <iframe
          title="EphorX company location"
          src={mapUrl}
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full"
        />
      </div>

      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-sky-400 hover:text-slate-950"
      >
        Get Directions
        <ExternalLink size={17} />
      </a>
    </div>
  );
};

export default CompanyMapModal;
