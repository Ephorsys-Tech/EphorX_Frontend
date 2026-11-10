
const CertificateModal = ({ certificate }) => {
  if (!certificate) return null;

  return (
    <div className="w-full">
      <div className="flex max-h-[75vh] items-center justify-center overflow-auto rounded-xl bg-gray-50 p-2 sm:p-4">
        <img
          src={certificate.image}
          alt={certificate.title}
          className="h-auto max-h-[70vh] w-full object-contain"
        />
      </div>

      
    </div>
  );
};

export default CertificateModal;
