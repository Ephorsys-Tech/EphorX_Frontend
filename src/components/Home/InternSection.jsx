
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useRef } from "react";
import { internsRow1, internsRow2 } from "../../assets/data/internData";

const InternCard = ({ intern }) => {
  return (
    <div className="flex w-64 shrink-0 flex-col items-center text-center">

      {/* Round Photo */}
      <div className="h-44 w-44 overflow-hidden rounded-full border-4 border-blue-100 bg-blue-50 shadow-md transition-all duration-300 hover:border-blue-700 hover:shadow-lg sm:h-52 sm:w-52">
        <img
          src={intern.photo}
          alt={intern.name}
          loading="lazy"
          decoding="async"
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
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const isPaused = useRef(false);
  const distanceRef = useRef(0);

  // Set the starting position for each row
  useEffect(() => {
    if (!trackRef.current) return;

    distanceRef.current = trackRef.current.scrollWidth / 2;

    const initialPosition =
      direction === "right" ? -distanceRef.current : 0;

    positionRef.current = initialPosition;
    x.set(initialPosition);
  }, [direction, x]);

  // Smooth continuous movement
  useAnimationFrame((time, delta) => {
    if (isPaused.current || !trackRef.current) return;

    const distance = trackRef.current.scrollWidth / 2;

    if (!distance) return;

    distanceRef.current = distance;

    // Same speed as the original 35-second animation
    const speed = distance / 40;
    let nextPosition = positionRef.current;

    if (direction === "left") {
      nextPosition -= speed * (delta / 1000);

      if (nextPosition <= -distance) {
        nextPosition += distance;
      }
    } else {
      nextPosition += speed * (delta / 1000);

      if (nextPosition >= 0) {
        nextPosition -= distance;
      }
    }

    positionRef.current = nextPosition;
    x.set(nextPosition);
  });

  const handleMouseEnter = () => {
    isPaused.current = true;
  };

  const handleMouseLeave = () => {
    isPaused.current = false;
  };

  return (
    <div
      className="overflow-hidden py-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={trackRef}
        className="flex w-max"
        style={{ x }}
      >
        {/* First set */}
        <div className="flex gap-3 pr-3">
          {interns.map((intern, index) => (
            <InternCard
              key={`${intern.name}-first-${index}`}
              intern={intern}
            />
          ))}
        </div>

        {/* Duplicate set for seamless movement */}
        <div className="flex gap-3 pr-3" aria-hidden="true">
          {interns.map((intern, index) => (
            <InternCard
              key={`${intern.name}-second-${index}`}
              intern={intern}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const InternSection = () => {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-8">

      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Heading */}
        <div className="mb-1">

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-700">
              Our Growing Community
            </p>

            <h2 className="text-4xl font-bold text-gray-900 sm:text-[38px]">
              Meet Our
              <span className="pl-3 text-blue-700">
                Students
              </span>
            </h2>
          </div>

          <p className="mx-auto mt-1 text-sm leading-7 text-gray-500 sm:text-base">
            Meet the talented students who are learning, growing, and gaining
            practical experience with EphorX.
          </p>

        </div>

        {/* First Row */}
        <InternRow interns={internsRow1} direction="right" />

        {/* Second Row */}
        <InternRow interns={internsRow2} direction="left" />

      </div>
    </section>
  );
};

export default InternSection;
