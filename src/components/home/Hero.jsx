// path: src/components/home/Hero.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSiteConfig, getWhatsAppURL } from "../../lib/dataApi";
import Container from "../layout/Container";
import Button from "../ui/Button";

function Hero() {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    const loadSiteConfig = async () => {
      const config = await getSiteConfig();
      setSiteConfig(config);
    };
    loadSiteConfig();
  }, []);

  const handleEnrollClick = () => {
    if (siteConfig?.whatsappNumber) {
      const message =
        "Hi! I'm interested in enrolling in FluentStart courses. Please share details about available courses and next steps.";
      const whatsappUrl = getWhatsAppURL(message, siteConfig.whatsappNumber);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-primary-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                Live Interactive Classes
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master <span className="text-gradient">English</span> with Live
                Classes
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your English skills with expert-led live sessions.
                Join thousands of students who achieved fluency through our
                proven interactive methodology.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">
                    5,000+
                  </div>
                  <div className="text-sm text-gray-600">Students Taught</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">
                    98%
                  </div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">
                    4.9/5
                  </div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                <Button
                  variant="whatsapp"
                  size="lg"
                  onClick={handleEnrollClick}
                  className="group"
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Enroll Now
                </Button>

                <Button
                  as={Link}
                  to="/test"
                  variant="secondary"
                  size="lg"
                  className="group"
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Free Level Test
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="pt-8">
                <p className="text-sm text-gray-500 mb-4">
                  Trusted by students from
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-400">
                  <span>🇺🇸 USA</span>
                  <span>🇧🇷 Brazil</span>
                  <span>🇮🇳 India</span>
                  <span>🇪🇬 Egypt</span>
                  <span>🇨🇳 China</span>
                  <span>🇲🇽 Mexico</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main image placeholder */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">
                      Live Class Preview
                    </p>
                  </div>
                </div>

                {/* Mock interface elements */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Sarah Johnson
                        </div>
                        <div className="text-xs text-gray-500">Instructor</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500">Live</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-900 mb-2">
                      Today's Topic:
                    </div>
                    <div className="text-xs text-gray-600">
                      "Business Email Communication"
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-yellow-400 text-yellow-900 px-3 py-2 rounded-full text-sm font-medium transform -rotate-12 shadow-lg animate-bounce-gentle">
                Interactive!
              </div>

              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-medium transform rotate-12 shadow-lg animate-bounce-gentle animation-delay-1000">
                Small Groups
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-2xl transform scale-105 -rotate-6"></div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
