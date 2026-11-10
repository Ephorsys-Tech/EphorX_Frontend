
import LegalPageLayout from "../LegalPageLayout";

const sections = [
  {
    id: "introduction",
    heading: "Introduction",
    content: [
      "Welcome to EphorX. We respect your privacy and are committed to handling your personal information responsibly when you visit our website, enquire about our courses, or use our educational services.",
      "This policy explains what information may be collected, why it is used, and the choices available to you."
    ]
  },
  {
    id: "information",
    heading: "Information We Collect",
    content: [
      "When you submit a contact, course enquiry, enrollment, or syllabus request form, we may collect information such as your name, email address, phone number, WhatsApp number, educational qualification, and the course you are interested in.",
      "We may also collect information you voluntarily provide when communicating with our team, along with basic technical information generated when you use the website."
    ]
  },
  {
    id: "usage",
    heading: "How We Use Your Information",
    content: [
      "We may use the information you provide to respond to enquiries, process course or webinar registrations, provide syllabus information, communicate course updates, and offer support.",
      "We may also use relevant information to improve our website, educational services, and user experience."
    ]
  },
  {
    id: "sharing",
    heading: "Information Sharing",
    content: [
      "We do not make your personal information publicly available. Information may be shared with service providers or other parties where necessary to operate our services, process requests, comply with applicable law, or protect our legitimate interests.",
      "The exact providers and circumstances depend on the services and systems EphorX uses."
    ]
  },
  {
    id: "security",
    heading: "Data Security",
    content: [
      "We take reasonable measures intended to protect personal information against unauthorized access, loss, misuse, or disclosure.",
      "However, no website or electronic transmission can be guaranteed to be completely secure."
    ]
  },
  {
    id: "retention",
    heading: "Data Retention",
    content: [
      "Personal information is retained for as long as reasonably necessary for the purpose for which it was collected, including responding to enquiries, maintaining relevant records, and meeting applicable legal requirements."
    ]
  },
  {
    id: "cookies",
    heading: "Cookies and Website Technologies",
    content: [
      "Our website may use cookies or similar technologies to support website functionality, understand website usage, and improve user experience. The specific technologies used should be described here once your website analytics and cookie tools are finalized."
    ]
  },
  {
    id: "rights",
    heading: "Your Choices and Requests",
    content: [
      "You may contact us to ask about the personal information you have provided, request corrections, or raise a concern about how your information is handled. Requests will be handled subject to applicable law and legitimate record-keeping requirements."
    ]
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. Any revised version will be published on this page with an updated revision date."
    ]
  },
  {
    id: "contact",
    heading: "Contact Us",
    content: [
      "For questions or requests relating to this Privacy Policy, contact EphorX at hello@ephorx.com."
    ]
  }
];

const PrivacyPolicy = () => (
  <LegalPageLayout
    type="Privacy Policy"
    title="Your Privacy Matters."
    subtitle="We believe trust begins with transparency. Learn how EphorX handles the information you share with us."
    updated="November 3, 2026"
    sections={sections}
  />
);

export default PrivacyPolicy;
