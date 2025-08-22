// path: src/components/home/Benefits.jsx
import React from "react";
import Container from "../layout/Container";

function Benefits() {
  const benefits = [
    {
      id: 1,
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Small Group Classes",
      description:
        "Maximum 15 students per class ensures personalized attention and active participation. Every student gets to practice speaking and receive individual feedback.",
    },
    {
      id: 2,
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Live Interactive Sessions",
      description:
        "Real-time classes with instant feedback, interactive exercises, and speaking practice. No boring pre-recorded videos - engage with your instructor and classmates.",
    },
    {
      id: 3,
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      title: "Expert Instructors",
      description:
        "Learn from certified TESOL instructors with years of experience teaching English to international students. Get insights from true language experts.",
    },
    {
      id: 4,
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
      title: "Proven Results",
      description:
        "98% of our students report significant improvement within 4 weeks. Our structured curriculum and interactive approach deliver measurable progress.",
    },
    {
      id: 5,
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
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
          />
        </svg>
      ),
      title: "Flexible Scheduling",
      description:
        "Choose from multiple time slots that fit your schedule. All sessions are recorded so you can review material anytime, anywhere.",
    },
    {
      id: 6,
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
      title: "Certification",
      description:
        "Earn a verified certificate upon completion that you can add to your LinkedIn profile or resume. Recognized by employers worldwide.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-gradient">FluentStart</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven methodology combines live instruction, small group
            dynamics, and personalized feedback to accelerate your English
            learning journey.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary-50 rounded-2xl p-8 inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-gray-600 mb-6">
              Join our next cohort and see why students choose FluentStart for
              their English journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#courses"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("courses")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Courses
              </a>
              <a href="/test" className="btn-secondary">
                Take Free Assessment
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Individual benefit card component
 */
function BenefitCard({ benefit, index }) {
  return (
    <div
      className="group card p-8 text-center hover:shadow-lg transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
        {benefit.icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
        {benefit.title}
      </h3>

      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-primary-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}

export default Benefits;
