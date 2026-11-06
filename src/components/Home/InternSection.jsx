
import { motion } from "framer-motion";
import intern from "../../assets/intern.png"
const internsRow1 = [
  {
    name: "Aarushi Sharma",
    college: "KIIT University",
    photo: intern,
  },
  {
    name: "Rohan Mehta",
    college: "NIT Rourkela",
    photo: intern,
  },
  {
    name: "Diya Patel",
    college: "IIT Bhubaneswar",
    photo: intern,
  },
  {
    name: "Arjun Verma",
    college: "VIT Bhopal",
    photo: intern,
  },
];

const internsRow2 = [
  {
    name: "Kunal Das",
    college: "GCE Bhubaneswar",
    photo: intern,
  },
  {
    name: "Sneha Reddy",
    college: "Osmania University",
    photo: intern,
  },
  {
    name: "Aditya Singh",
    college: "IIT Kharagpur",
    photo: intern,
  },
  {
    name: "Priya Nair",
    college: "NIT Trichy",
    photo: intern,
  },
];

const InternCard = ({ intern }) => {
  return (
    <div className="flex w-64 shrink-0 flex-col items-center text-center">

      {/* Round Photo */}
      <div className="h-44 w-44 overflow-hidden rounded-full border-4 border-blue-100 bg-blue-50 shadow-md transition-all duration-300 hover:border-blue-700 hover:shadow-lg sm:h-52 sm:w-52">
        <img
          src={intern.photo}
          alt={intern.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Name */}
      <h3 className="mt-4 text-base font-bold text-blue-800">
        {intern.name}
      </h3>

      {/* College Name */}
      <p className="mt-1 max-w-56 text-sm leading-6 text-gray-600">
        {intern.college}
      </p>

    </div>
  );
};

const InternRow = ({ interns, direction }) => {
  const repeatedInterns = [...interns, ...interns];

  return (
    <div className="overflow-hidden py-6">
      <motion.div
        className="flex w-max gap-8"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {repeatedInterns.map((intern, index) => (
          <InternCard
            key={`${intern.name}-${index}`}
            intern={intern}
          />
        ))}
      </motion.div>
    </div>
  );
};

const InternSection = () => {
  return (
    <section className="overflow-hidden bg-white px-5 py-5 sm:px-8 md:px-10 lg:px-38">

      {/* Heading */}
        <div className="mb-1">

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-700">
            Our Growing Community
          </p>

          <h2 className="text-4xl font-bold text-gray-900 sm:text-[38px]">
            Meet Our
            <span className="pl-3 text-blue-700">
              Interns
            </span>
          </h2>
        </div>
        
       <p className="mx-auto mt-1 text-sm leading-7 text-gray-500 sm:text-base">
          Meet the talented students who are learning, growing, and gaining
          practical experience with EphorX.
        </p>
      
      </div>

      <div className="mb-0 text-center">
      
        
      </div>

      {/* First Row */}
      <InternRow interns={internsRow1} direction="right" />

      {/* Second Row */}
      <InternRow interns={internsRow2} direction="left" />

    </section>
  );
};

export default InternSection;
