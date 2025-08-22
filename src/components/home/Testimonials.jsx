// path: src/components/home/Testimonials.jsx
import React, { useState, useEffect } from "react";
import { getFeaturedTestimonials } from "../../lib/dataApi";
import Container from "../layout/Container";
import Loading from "../ui/Loading";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const featuredTestimonials = await getFeaturedTestimonials();
        setTestimonials(featuredTestimonials);
      } catch (err) {
        console.error("Error loading testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000); // Auto-advance every 5 seconds

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="text-center">
            <Loading text="Loading testimonials..." />
          </div>
        </Container>
      </section>
    );
  }

  if (!testimonials.length) {
    return null;
  }

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-gradient">Students Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our students have
            achieved through FluentStart's live interactive English courses.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
              <svg
                className="w-full h-full text-primary-50"
                fill="currentColor"
                viewBox="0 0 144 144"
              >
                <path d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z" />
              </svg>
            </div>

            <div className="relative">
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </div>
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-xl transition-all duration-200 group"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-6 h-6 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-xl transition-all duration-200 group"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-6 h-6 group-hover:scale-110 transition-transform"
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
              </button>
            </>
          )}

          {/* Dots Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-primary-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Additional Testimonials Grid */}
        {testimonials.length > 3 && (
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <TestimonialCardCompact testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Join Thousands of Successful Students
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  5,000+
                </div>
                <div className="text-sm text-gray-600">Students Taught</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  98%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  4.9/5
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  50+
                </div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Full testimonial card component
 */
function TestimonialCard({ testimonial }) {
  return (
    <div className="text-center">
      {/* Stars */}
      <div className="flex justify-center mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg
            key={i}
            className="w-6 h-6 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-xl md:text-2xl text-gray-900 font-medium leading-relaxed mb-8">
        "{testimonial.testimonial}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {testimonial.name.charAt(0)}
        </div>
        <div className="text-left">
          <div className="font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-gray-600">{testimonial.role}</div>
          <div className="text-sm text-gray-500">{testimonial.company}</div>
          {testimonial.achievement && (
            <div className="text-sm text-primary-600 font-medium mt-1">
              ✨ {testimonial.achievement}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Compact testimonial card component
 */
function TestimonialCardCompact({ testimonial }) {
  return (
    <div>
      {/* Stars */}
      <div className="flex mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-900 mb-4 line-clamp-3">
        "{testimonial.testimonial}"
      </p>

      {/* Author */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-medium">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-gray-900 text-sm">
            {testimonial.name}
          </div>
          <div className="text-gray-600 text-xs">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
