// path: src/components/home/HowItWorks.jsx
import React from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Take Your Level Test",
      description:
        "Complete our free 10-minute assessment to determine your current English level and get personalized course recommendations.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      action: "Start Free Test",
      link: "/test",
      color: "primary",
    },
    {
      id: 2,
      title: "Choose Your Course",
      description:
        "Select the perfect course based on your level, goals, and schedule. From beginner fundamentals to advanced business English.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      action: "Browse Courses",
      link: "#courses",
      color: "accent",
    },
    {
      id: 3,
      title: "Join Live Classes",
      description:
        "Attend interactive live sessions with expert instructors and fellow students. Practice speaking, get feedback, and build confidence.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      action: "Learn More",
      link: "/about",
      color: "green",
    },
    {
      id: 4,
      title: "Achieve Fluency",
      description:
        "Graduate with confidence, certification, and the English skills to succeed in your personal and professional goals.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      action: "See Success Stories",
      link: "#testimonials",
      color: "yellow",
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-gradient">FluentStart</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple, proven 4-step process takes you from assessment to
            fluency. Join thousands of students who have transformed their
            English skills.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <StepCard key={step.id} step={step} index={index} />
              ))}
            </div>

            {/* Connecting Line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-accent-200 to-green-200 -z-10"></div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <StepCard step={step} index={index} />
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-8 bg-gradient-to-b from-primary-200 to-accent-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Take the first step towards English fluency. Our free assessment
              takes less than 10 minutes and gives you personalized
              recommendations.
            </p>
            <Link
              to="/test"
              className="btn-primary inline-flex items-center group"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Start Free Assessment
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Individual step card component
 */
function StepCard({ step, index }) {
  const colorClasses = {
    primary: "bg-primary-500 text-white",
    accent: "bg-accent-500 text-white",
    green: "bg-green-500 text-white",
    yellow: "bg-yellow-500 text-white",
  };

  const handleActionClick = (e) => {
    if (step.link.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(step.link.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="relative bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Step Number */}
      <div
        className={`absolute -top-4 left-8 w-8 h-8 rounded-full ${
          colorClasses[step.color]
        } flex items-center justify-center text-sm font-bold shadow-lg`}
      >
        {step.id}
      </div>

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
          colorClasses[step.color]
        }`}
      >
        {step.icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>

      <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>

      {/* Action Button */}
      {step.link.startsWith("#") ? (
        <a
          href={step.link}
          onClick={handleActionClick}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center group"
        >
          {step.action}
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      ) : (
        <Link
          to={step.link}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center group"
        >
          {step.action}
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}

export default HowItWorks;
