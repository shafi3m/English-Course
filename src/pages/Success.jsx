// path: src/pages/Success.jsx
import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Container from "../components/layout/Container";

function Success() {
  return (
    <>
      <SEO
        title="Success - Thank You | FluentStart"
        description="Thank you for your interest in FluentStart English courses. We'll be in touch soon with more information."
      />

      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
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
              </div>

              {/* Main Content */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Thank You!
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                We've received your information and will be in touch soon with
                details about your English learning journey.
              </p>

              {/* What's Next */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  What happens next?
                </h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <p className="text-gray-600">
                      Our team will review your information and course
                      preferences
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </div>
                    <p className="text-gray-600">
                      You'll receive personalized course recommendations within
                      24 hours
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </div>
                    <p className="text-gray-600">
                      Schedule a free consultation to discuss your learning
                      goals
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-4">
                  Questions? We're here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                  <div className="flex items-center justify-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    hello@fluentstart.com
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2"
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
                    Response within 24 hours
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="btn-primary">
                  Back to Home
                </Link>

                <Link to="/test" className="btn-secondary">
                  Take Level Assessment
                </Link>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  Follow us for English learning tips:
                </p>
                <div className="flex justify-center space-x-4">
                  <SocialLink
                    platform="Facebook"
                    href="https://facebook.com/fluentstart"
                  />
                  <SocialLink
                    platform="Twitter"
                    href="https://twitter.com/fluentstart"
                  />
                  <SocialLink
                    platform="Instagram"
                    href="https://instagram.com/fluentstart"
                  />
                  <SocialLink
                    platform="LinkedIn"
                    href="https://linkedin.com/company/fluentstart"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

/**
 * Social media link component
 */
function SocialLink({ platform, href }) {
  const icons = {
    Facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
    Twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    Instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.534-.568-.703-.568-1.634 0-2.337.757-.938 1.908-1.534 3.205-1.534 1.297 0 2.448.596 3.205 1.534.568.703.568 1.634 0 2.337-.757.938-1.908 1.534-3.205 1.534zm7.718 0c-1.297 0-2.448-.596-3.205-1.534-.568-.703-.568-1.634 0-2.337.757-.938 1.908-1.534 3.205-1.534 1.297 0 2.448.596 3.205 1.534.568.703.568 1.634 0 2.337-.757.938-1.908 1.534-3.205 1.534z"
          clipRule="evenodd"
        />
      </svg>
    ),
    LinkedIn: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200"
      aria-label={`Follow us on ${platform}`}
    >
      {icons[platform]}
    </a>
  );
}

export default Success;
