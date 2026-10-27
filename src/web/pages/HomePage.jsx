import CoursesByCategory from "../../components/Home/CoursesByCategory"
import HeroSection from "../../components/Home/HeroSection"
import StatsSection from "../../components/Home/StatsSection"
import WebinarsSection from "../../components/Home/WebinarsSection";
import ReviewsSection from "../../components/Home/ReviewsSection";
import IndustryExperts from "../../components/Home/IndustryExperts";
const HomePage = () => {

  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <CoursesByCategory
        eyebrow="LEARN BY INTEREST"
        title="Courses by"
        highlight="Category."
        description="Discover your next skill with expert-led courses designed to help you learn, grow, and move forward."
        buttonText="Explore All Courses"
        buttonTo="/Course"
        columns={3}
      />

      <WebinarsSection
        title="Upcoming Sessions"
        highlight="Learn From Experts."
        description="Join interactive sessions led by experienced industry professionals."
        // webinars={yourWebinarData}
        columns={3}
        buttonText="View All Sessions"
        buttonTo="/webinars"
      />
      <IndustryExperts/>
      <ReviewsSection/>
    </div>
  )

}

export default HomePage
