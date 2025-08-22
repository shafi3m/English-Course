// path: src/components/home/FeaturedCourses.jsx
import React, { useState, useEffect } from "react";
import { getFeaturedCourses } from "../../lib/dataApi";
import Container from "../layout/Container";
import CourseCard from "../course/CourseCard";
import Loading, { CardSkeleton } from "../ui/Loading";

function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const featuredCourses = await getFeaturedCourses(3);
        setCourses(featuredCourses);
      } catch (err) {
        console.error("Error loading courses:", err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <section id="courses" className="section-padding bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-gradient">English Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Whether you're starting from scratch or advancing your skills, we
            have the perfect course to match your level and goals.
          </p>

          {/* Level Guide */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center bg-green-50 text-green-700 px-3 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Beginner: A1-A2 Level
            </div>
            <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-2 rounded-full">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Intermediate: B1-B2 Level
            </div>
            <div className="flex items-center bg-red-50 text-red-700 px-3 py-2 rounded-full">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Advanced: C1-C2 Level
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Unable to Load Courses
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                featured={index === 1} // Make middle course featured
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && courses.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Courses Available
              </h3>
              <p className="text-gray-600">
                We're currently updating our course catalog. Please check back
                soon!
              </p>
            </div>
          </div>
        )}

        {/* Course Comparison */}
        {!loading && !error && courses.length > 0 && (
          <div className="mt-16">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Not Sure Which Course is Right for You?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Take Our Free Test
                  </h4>
                  <p className="text-sm text-gray-600">
                    Get personalized course recommendations based on your
                    current level
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Schedule a Consultation
                  </h4>
                  <p className="text-sm text-gray-600">
                    Speak with our education advisor for personalized guidance
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Ask Questions
                  </h4>
                  <p className="text-sm text-gray-600">
                    Get instant answers about courses, schedule, and enrollment
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/test" className="btn-primary">
                  Take Free Assessment
                </a>
                <a href="/about" className="btn-secondary">
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export default FeaturedCourses;
