// path: src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

function NotFound() {
  const suggestions = [
    { label: "Home", href: "/", description: "Return to our homepage" },
    {
      label: "Course Catalog",
      href: "/#courses",
      description: "Browse our English courses",
    },
    {
      label: "Free Level Test",
      href: "/test",
      description: "Take our assessment",
    },
    {
      label: "About Us",
      href: "/about",
      description: "Learn about FluentStart",
    },
  ];

  return (
    <>
      <SEO
        title="Page Not Found (404) | FluentStart"
        description="The page you're looking for doesn't exist. Explore our English courses and level assessment instead."
      />

      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
              {/* 404 Illustration */}
              <div className="mb-8">
                <div className="relative mx-auto w-64 h-40">
                  {/* Large 404 */}
                  <div className="text-8xl font-bold text-primary-100 select-none">
                    404
                  </div>

                  {/* Cute character overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center transform -rotate-12">
                      <div className="text-white text-2xl">😅</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Oops! Page Not Found
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                The page you're looking for seems to have wandered off. Let's
                help you find your way back to learning English!
              </p>

              {/* Search suggestion */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Were you looking for one of these?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {suggestions.map((suggestion, index) => (
                    <SuggestionCard key={index} {...suggestion} />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link to="/" className="btn-primary">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Go Home
                </Link>

                <Button
                  onClick={() => window.history.back()}
                  variant="secondary"
                >
                  <svg
                    className="w-5 h-5 mr-2"
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
                  Go Back
                </Button>
              </div>

              {/* Help Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Need Help Finding Something?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our team is here to help you navigate our courses and find the
                  perfect English learning solution.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      // This would trigger the WhatsApp floating button functionality
                      const event = new CustomEvent("openWhatsApp", {
                        detail: {
                          message:
                            "Hi! I'm having trouble finding something on the FluentStart website. Can you help me?",
                        },
                      });
                      window.dispatchEvent(event);
                    }}
                    className="btn-whatsapp inline-flex items-center text-sm"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    Chat with Support
                  </a>

                  <a
                    href="mailto:hello@fluentstart.com"
                    className="btn-secondary inline-flex items-center text-sm"
                  >
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
                    Email Us
                  </a>
                </div>
              </div>

              {/* Fun fact */}
              <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-700">
                  <strong>Fun fact:</strong> While you're here, did you know
                  that FluentStart has helped over 5,000 students achieve
                  English fluency? Take our free assessment to join them!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

/**
 * Suggestion card component
 */
function SuggestionCard({ label, href, description }) {
  const handleClick = (e) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className="group block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
    >
      <div className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
        {label}
      </div>
      <div className="text-sm text-gray-600 mt-1">{description}</div>
    </Link>
  );
}

export default NotFound;
