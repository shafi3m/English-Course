// path: src/pages/Home.jsx
import React, { useEffect } from "react";
import SEO, {
  getOrganizationStructuredData,
  getWebSiteStructuredData,
} from "../components/SEO";
import Hero from "../components/home/Hero";
import Benefits from "../components/home/Benefits";
import HowItWorks from "../components/home/HowItWorks";
import FeaturedCourses from "../components/home/FeaturedCourses";
import Testimonials from "../components/home/Testimonials";
import FAQSection from "../components/home/FAQSection";

function Home() {
  useEffect(() => {
    // Smooth scroll handling for anchor links
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Combine organization and website structured data
  const combinedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [getOrganizationStructuredData(), getWebSiteStructuredData()],
  };

  return (
    <>
      <SEO
        title="FluentStart - Master English Live | Interactive Online English Classes"
        description="Transform your English skills with expert-led live classes. Join thousands of students who achieved fluency through our proven interactive methodology. Take our free assessment test today!"
        keywords="English course, learn English online, live English classes, English fluency, speaking practice, grammar lessons, vocabulary building, business English, interactive learning"
        structuredData={combinedStructuredData}
      />

      <main className="pt-16">
        {" "}
        {/* Account for fixed navbar */}
        <Hero />
        <Benefits />
        <HowItWorks />
        <FeaturedCourses />
        <Testimonials />
        <FAQSection />
      </main>
    </>
  );
}

export default Home;
