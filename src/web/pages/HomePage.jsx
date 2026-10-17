import CoursesByCategory from "../../components/Home/CoursesByCategory"
import HeroSection from "../../components/Home/HeroSection"
import StatsSection from "../../components/Home/StatsSection"
import {
  Code2,
  BriefcaseBusiness,
  BookOpen,
  Database,
  GraduationCap,
} from "lucide-react";
import WebinarsSection from "../../components/Home/WebinarsSection";
import ReviewsSection from "../../components/Home/ReviewsSection";
const HomePage = () => {
  const courseCategories = [
    {
      id: 1,
      title: "Summer Internship",
      description: "Gain practical experience and build real-world industry skills.",
      courses: 12,
      icon: Code2,
      featured: true,
      to: "/Course",
    },
    {
      id: 2,
      title: "Winter Internship",
      description: "Learn from industry projects and strengthen your professional skills.",
      courses: 10,
      icon: BriefcaseBusiness,
      to: "/Course",
    },
    {
      id: 3,
      title: "Short-Term Courses",
      description: "Master in-demand skills through focused, practical training.",
      courses: 18,
      icon: BookOpen,
      to: "/Course",
    },
    {
      id: 4,
      title: "Industrial Training",
      description: "Get hands-on experience with industry-oriented technical training.",
      courses: 8,
      icon: Database,
      to: "/Course",
    },
    {
      id: 5,
      title: "Web Development",
      description: "Build modern websites using the latest web technologies.",
      courses: 14,
      icon: Code2,
      to: "/Course",
    },
    {
      id: 6,
      title: "Professional Workshops",
      description: "Upgrade your skills through interactive sessions and expert guidance.",
      courses: 6,
      icon: GraduationCap,
      featured: true,
      to: "/Course",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <CoursesByCategory
        eyebrow="LEARN BY INTEREST"
        title="Courses by"
        highlight="Category."
        description="Discover your next skill with expert-led courses designed to help you learn, grow, and move forward."
        categories={courseCategories}
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
      <ReviewsSection/>
    </div>
  )

}

export default HomePage
