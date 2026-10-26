import ContactCTA from "../../components/contact/ContactCTA";
import ContactForm from "../../components/contact/ContactForm";
import ContactHero from "../../components/contact/ContactHero";
import ContactInfo from "../../components/contact/ContactInfo";

const Contact = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <ContactHero />

      <ContactInfo />

      <ContactForm />

      <ContactCTA />
    </main>
  );
};

export default Contact;