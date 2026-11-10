import AboutHero from "../../components/about/AboutHero";
import AboutHighlights from "../../components/about/AboutHighlights";
import AboutIntro from "../../components/about/AboutIntro";
import MissionVision from "../../components/about/MissionVision";
import WhyEphorX from "../../components/about/WhyEphorX";


const About = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <AboutHero />
      <AboutIntro />
      <MissionVision />
      <WhyEphorX />
      <AboutHighlights />
      
    </main>
  );
};

export default About;
