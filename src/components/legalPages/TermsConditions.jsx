
import LegalPageLayout from "../LegalPageLayout";

const sections = [
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    content: [
      "Welcome to EphorX. By accessing or using our website and services, you agree to these Terms & Conditions. If you do not agree with these terms, please do not use the website or services.",
      "These terms apply to visitors, prospective students, enrolled learners, and other users of the website."
    ]
  },
  {
    id: "services",
    heading: "Our Services",
    content: [
      "EphorX provides information about educational and professional training programs, courses, webinars, and related learning opportunities.",
      "Course descriptions, schedules, curriculum, duration, delivery format, and availability may be updated from time to time. Please confirm the latest details with our team before enrolling."
    ]
  },
  {
    id: "registration",
    heading: "Registration and Student Information",
    content: [
      "When submitting an enquiry, syllabus request, or enrollment form, you agree to provide accurate and complete information.",
      "You are responsible for keeping your contact information accurate so that our team can communicate important course-related updates."
    ]
  },
  {
    id: "fees",
    heading: "Course Fees and Payments",
    content: [
      "Course fees, booking amounts, payment schedules, and applicable charges will be communicated through the relevant course information or directly by the EphorX team.",
      "Please confirm the applicable fee and payment terms before making a payment. Do not rely on outdated promotional information."
    ]
  },
  {
    id: "refunds",
    heading: "Cancellations and Refunds",
    content: [
      "Any cancellation, rescheduling, or refund request will be handled according to the refund and cancellation policy communicated by EphorX at the time of enrollment.",
      "Please obtain and review the applicable written policy before paying any course or booking fee. Contact our team if the policy has not been provided."
    ]
  },
  {
    id: "conduct",
    heading: "Student Responsibilities",
    content: [
      "Students are expected to communicate respectfully with instructors, staff, and other learners and to follow the rules communicated for classes, learning platforms, and training activities.",
      "Users must not misuse the website, disrupt its operation, or submit false, misleading, unlawful, or harmful information."
    ]
  },
  {
    id: "intellectual",
    heading: "Intellectual Property",
    content: [
      "Website content, branding, logos, course materials, graphics, text, and other resources may be protected by intellectual property laws.",
      "Unless permission is provided, you must not reproduce, distribute, sell, publish, or commercially use EphorX materials without prior written authorization."
    ]
  },
  {
    id: "availability",
    heading: "Website Availability",
    content: [
      "We aim to keep our website and services accessible, but uninterrupted availability cannot be guaranteed. Maintenance, technical issues, or circumstances beyond our control may temporarily affect access."
    ]
  },
  {
    id: "liability",
    heading: "Limitation of Liability",
    content: [
      "To the extent permitted by applicable law, EphorX will not be responsible for indirect or consequential losses arising from the use of the website or temporary service interruptions.",
      "Nothing in these terms excludes liability that cannot legally be excluded under applicable law."
    ]
  },
  {
    id: "changes",
    heading: "Changes to These Terms",
    content: [
      "EphorX may revise these Terms & Conditions when necessary. Updated terms will be published on this page with a revised date. Continued use of the website after changes are published indicates acceptance of the revised terms, to the extent permitted by law."
    ]
  },
  {
    id: "law",
    heading: "Applicable Law",
    content: [
      "These terms are subject to the applicable laws of India. Any dispute will be handled by the competent courts having jurisdiction, subject to applicable law."
    ]
  },
  {
    id: "contact",
    heading: "Contact Us",
    content: [
      "If you have questions about these Terms & Conditions, please contact EphorX at hello@ephorx.com."
    ]
  }
];

const TermsConditions = () => (
  <LegalPageLayout
    type="Terms & Conditions"
    title="Clear Terms. Better Learning."
    subtitle="Please review the terms that guide your use of the EphorX website, courses, and educational services."
    updated="November 3, 2026"
    sections={sections}
  />
);

export default TermsConditions;

