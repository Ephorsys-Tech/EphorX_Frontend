
import {
  BookOpen,
  MessageCircle,
  Armchair,
  ClipboardCheck,
  FileText,
  CreditCard,
  CalendarCheck,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Your Course",
    description: "Explore our courses and select the one that matches your career goals.",
    highlight: "Find Your Course",
    icon: BookOpen,
    color: "blue",
  },
  {
    number: "02",
    title: "Enquiry & Counselling",
    description: "Connect with our team to discuss course details and clear your doubts.",
    highlight: "Get Guidance",
    icon: MessageCircle,
    color: "white",
  },
  {
    number: "03",
    title: "Reserve Your Seat",
    description: "Pay the booking amount to reserve your seat in your selected course.",
    highlight: "₹4,999",
    icon: Armchair,
    color: "black",
  },
  {
    number: "04",
    title: "Admission Confirmation",
    description: "Receive your admission confirmation and further joining instructions.",
    highlight: "Admission Confirmed",
    icon: ClipboardCheck,
    color: "white",
  },
  {
    number: "05",
    title: "Document Submission",
    description: "Submit the required documents to complete your admission formalities.",
    highlight: "Submit Documents",
    icon: FileText,
    color: "blue",
  },
  {
    number: "06",
    title: "Fee Payment",
    description: "Complete the applicable course fee payment as per the payment plan.",
    highlight: "Flexible Payment",
    icon: CreditCard,
    color: "black",
  },
  {
    number: "07",
    title: "Batch Allocation",
    description: "Receive your batch schedule and training commencement details.",
    highlight: "Get Your Schedule",
    icon: CalendarCheck,
    color: "white",
  },
  {
    number: "08",
    title: "Welcome to EphorX",
    description: "Your admission is complete. Get ready to begin your learning journey.",
    highlight: "Let's Get Started",
    icon: GraduationCap,
    color: "blue",
  },
];

const colorStyles = {
  blue: {
    card: "bg-sky-600 border-sky-300",
    number: "bg-sky-200/20",
    icon: "bg-sky-200 text-sky-800",
    highlight: "text-sky-200",
    description:"text-slate-300 ",
    title:"text-slate-950"

  },
  black: {
    card: "bg-black border-sky-300/30",
    number: "bg-gray-100/25",
    icon: "bg-sky-200 text-sky-800",
    highlight: "text-sky-700",
    description:"text-slate-400 ",
    title:"text-slate-100"

  },
  white: {
    card: "bg-white border-sky-300",
    number: "bg-sky-500/50 ",
    icon: "bg-sky-200 text-sky-800",
    highlight: "text-sky-800",
    description:"text-slate-600 ",
    title:"text-slate-950"

  },
  
};

// Individual small square card
function ProcessCard({ step }) {
  const Icon = step.icon;
  const styles = colorStyles[step.color];

  return (
    <div
      className={`flex h-[230px] w-[240px] flex-col rounded-xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${styles.card}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm font-extrabold text-white ${styles.number}`}
        >
          {step.number}
        </span>

        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${styles.icon}`}
        >
          <Icon size={17} strokeWidth={2} />
        </span>
      </div>

      <h3 className={`mt-3 text-[17px] font-extrabold leading-tight  ${styles.title} `}>
        {step.title}
      </h3>

      <p className={`mt-2 line-clamp-2 text-[14px] leading-relaxed  ${styles.description}`}>
        {step.description}
      </p>

      <p
        className={`mt-auto pt-2 text-xs font-extrabold leading-tight ${styles.highlight}`}
      >
        {step.highlight}
      </p>
    </div>
  );
}

function Process() {
  // Snake / zigzag order
  const rows = [
    {
      cards: [steps[0], steps[1], steps[2]],
      direction: "right",
      down: "right",
    },
    {
      cards: [steps[5], steps[4], steps[3]],
      direction: "left",
      down: "left",
    },
    {
      cards: [steps[6], steps[7]],
      direction: "right",
    },
  ];

  return (
    <section className="min-h-screen bg-white px-4 pb-10 pt-28 sm:px-6 md:px-8 lg:px-41">
      {/* Heading */}
      <div className="mb-17">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Admission <span className="text-sky-600">Process</span>
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Follow these simple steps to complete your admission at EphorX.
        </p>
      </div>

      {/* Desktop: Three small boxes with zigzag arrows */}
      <div className="hidden md:block">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex}>
            <div className="flex items-center justify-center gap-3">
              {row.cards.map((step, index) => (
                <div key={step.number} className="contents">
                  <ProcessCard step={step} />

                  {index < row.cards.length - 1 && (
                    <div className="flex w-7 shrink-0 justify-center text-sky-500">
                      {row.direction === "right" ? (
                        <ArrowRight size={27} strokeWidth={2.9} />
                      ) : (
                        <ArrowLeft size={27} strokeWidth={2.9} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Connect the end of one row to the next */}
            {row.down && (
              <div
                className={`flex h-8 items-center ${
                  row.down === "right"
                    ? "justify-end pr-[calc(50%-280px)]"
                    : "justify-start pl-[calc(50%-280px)]"
                }`}
              >
                <ArrowDown
                  size={27}
                  strokeWidth={2.9}
                  className="text-sky-500"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Vertical flow */}
      <div className="flex flex-col items-center gap-2 md:hidden">
        {steps.map((step, index) => (
          <div key={step.number} className="flex w-full flex-col items-center">
            <div className="w-full max-w-[170px]">
              <ProcessCard step={step} />
            </div>

            {index < steps.length - 1 && (
              <div className="flex h-8 items-center justify-center">
                <ArrowDown
                  size={27}
                  strokeWidth={2.9}
                  className="text-sky-500"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Process;
