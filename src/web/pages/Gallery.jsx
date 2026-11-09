
import { useState } from "react";
import { motion } from "framer-motion";

import Modal from "../../ui/Modal";
import GalleryImageModal from "../../components/modal/GalleryImageModal";

// Automatically import all photos
const inhousePhotos = Object.entries(
  import.meta.glob("../../assets/inhouse/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
)
  .filter(([path]) => /\.(png|jpe?g|webp|avif)$/i.test(path))
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, photo]) => ({ name: path.split("/").pop(), photo }));

const collegePhotos = Object.entries(
  import.meta.glob("../../assets/college/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
)
  .filter(([path]) => /\.(png|jpe?g|webp|avif)$/i.test(path))
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, photo]) => ({ name: path.split("/").pop(), photo }));

// Different photo sizes
const layouts = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
];

const GallerySection = ({
  title,
  subtitle,
  images,
  onImageClick,
}) => {
  return (
    <section className="mb-20">
      {/* Heading */}
      <p className="mb-2 text-sm font-bold uppercase tracking-[3px] text-blue-700">
        EphorX Gallery
      </p>

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
            <span className="ml-2 text-blue-700">.</span>
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          {images.length} Photos
        </div>
      </div>

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="grid grid-flow-dense auto-rows-[105px] grid-cols-2 gap-3 sm:auto-rows-[130px] sm:gap-4 md:grid-cols-4 lg:auto-rows-[150px] lg:grid-cols-6">
          {images.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.5,
                delay: (index % 4) * 0.08,
              }}
              onClick={() => onImageClick(item.photo)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-sm ${layouts[index % layouts.length]}`}
            >
              <img
                src={item.photo}
                alt={`${title} ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#061521]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute bottom-0 left-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-semibold text-white">
                  {title}
                </p>

                <p className="mt-1 text-xs text-white/70">
                  EphorX Moments
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-400">
          No photos available yet.
        </p>
      )}
    </section>
  );
};

const Galary = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <main className="overflow-hidden bg-white">
      {/* Gallery Sections */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-8">
        <GallerySection
          title="Inhouse Training"
          subtitle="Learning, building, collaborating, and growing together at EphorX."
          images={inhousePhotos}
          onImageClick={setSelectedPhoto}
        />

        <GallerySection
          title="College Training"
          subtitle="Taking knowledge beyond classrooms through practical learning and college collaborations."
          images={collegePhotos}
          onImageClick={setSelectedPhoto}
        />
      </div>

      {/* Gallery Image Modal */}
      <Modal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        title="Gallery Preview"
        size="lg"
        
      >
        <GalleryImageModal image={selectedPhoto} />
      </Modal>
    </main>
  );
};

export default Galary;
