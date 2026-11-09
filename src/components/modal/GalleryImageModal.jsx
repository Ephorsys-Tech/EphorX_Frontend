
const GalleryImageModal = ({ image }) => {
  if (!image) return null;

  return (
    <div className="flex items-center justify-center">
      <img
        src={image}
        alt="Gallery preview"
        className="max-h-[75vh] w-full rounded-xl object-contain"
      />
    </div>
  );
};

export default GalleryImageModal;
