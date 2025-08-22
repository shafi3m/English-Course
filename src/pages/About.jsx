// path: src/pages/About.jsx
import React, { useState, useEffect } from "react";
import { getSiteConfig, getWhatsAppURL } from "../lib/dataApi";
import SEO from "../components/SEO";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

function About() {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    const loadSiteConfig = async () => {
      const config = await getSiteConfig();
      setSiteConfig(config);
    };
    loadSiteConfig();
  }, []);

  const handleContactClick = () => {
    if (siteConfig?.whatsappNumber) {
      const message =
        siteConfig.contact?.whatsappMessage ||
        "Hi! I'd like to learn more about FluentStart and your English courses. Can you help me?";
      const whatsappUrl = getWhatsAppURL(message, siteConfig.whatsappNumber);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <SEO
        title="About FluentStart - Our Mission, Method & Team | English Learning Experts"
        description="Learn about FluentStart's mission to transform English education through live interactive classes. Meet our expert instructors and discover our proven methodology."
        keywords="about FluentStart, English teaching methodology, expert instructors, live English classes, language learning mission"
      />

      <div className="min-h-screen pt-16 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-16">
          <Container>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                About <span className="text-gradient">FluentStart</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We're on a mission to make English fluency accessible, engaging,
                and achievable for learners worldwide through our innovative
                live interactive methodology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  5,000+
                </div>
                <div className="text-gray-600">Students Taught</div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  50+
                </div>
                <div className="text-gray-600">Countries Reached</div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  98%
                </div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Mission Section */}
        <section id="mission" className="section-padding bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    At FluentStart, we believe that language learning should be
                    engaging, practical, and transformative. Our mission is to
                    break down the barriers that prevent people from achieving
                    English fluency.
                  </p>
                  <p>
                    We've reimagined English education by combining the power of
                    live instruction with small group dynamics, creating an
                    environment where every student receives personalized
                    attention and builds real confidence.
                  </p>
                  <p>
                    Our goal isn't just to teach English—it's to empower our
                    students to achieve their personal and professional dreams
                    through improved communication skills.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-8 text-center">
                  <div className="space-y-6">
                    <div>
                      <div className="text-4xl mb-4">🎯</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Purpose-Driven
                      </h3>
                      <p className="text-gray-600">
                        Every lesson designed with your real-world goals in mind
                      </p>
                    </div>

                    <div>
                      <div className="text-4xl mb-4">🌍</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Globally Accessible
                      </h3>
                      <p className="text-gray-600">
                        Quality English education available worldwide
                      </p>
                    </div>

                    <div>
                      <div className="text-4xl mb-4">💪</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Confidence Building
                      </h3>
                      <p className="text-gray-600">
                        Focus on practical skills that boost your confidence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Methodology Section */}
        <section id="methodology" className="section-padding bg-gray-50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Teaching Methodology
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our proven approach combines the best of traditional language
                teaching with modern interactive techniques for accelerated
                learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <MethodologyCard
                icon="🎯"
                title="Communicative Approach"
                description="Focus on real-world communication skills rather than just grammar rules. Practice speaking from day one."
              />

              <MethodologyCard
                icon="👥"
                title="Small Group Learning"
                description="Maximum 15 students per class ensures personalized attention and active participation for everyone."
              />

              <MethodologyCard
                icon="📱"
                title="Interactive Technology"
                description="Use modern tools and platforms to create engaging, multimedia learning experiences."
              />

              <MethodologyCard
                icon="🔄"
                title="Continuous Feedback"
                description="Regular assessment and personalized feedback help you track progress and improve quickly."
              />
            </div>

            <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                The FluentStart Method: LIVE Learning
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    L
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Live Interaction
                  </h4>
                  <p className="text-sm text-gray-600">
                    Real-time conversations with instructors and peers
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    I
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Immersive Experience
                  </h4>
                  <p className="text-sm text-gray-600">
                    Complete English environment during class time
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    V
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Visual Learning
                  </h4>
                  <p className="text-sm text-gray-600">
                    Multimedia content and visual aids enhance understanding
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    E
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Engaging Activities
                  </h4>
                  <p className="text-sm text-gray-600">
                    Interactive exercises keep you motivated and focused
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Team Section */}
        <section id="team" className="section-padding bg-white">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Our Expert Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our instructors are certified professionals with years of
                experience teaching English to international students from
                diverse backgrounds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <InstructorCard
                name="Sarah Johnson"
                title="Lead Instructor - Fundamentals"
                credentials="TESOL Certified, 8+ years experience"
                description="Specializes in helping beginners build confidence and strong foundations in English grammar, vocabulary, and pronunciation."
                achievements={[
                  "Taught 1,000+ students",
                  "95% student satisfaction rate",
                  "Expert in beginner pedagogy",
                ]}
              />

              <InstructorCard
                name="Michael Chen"
                title="Business English Specialist"
                credentials="MBA, 10+ years corporate training"
                description="Expert in professional communication, business writing, and workplace English for career advancement."
                achievements={[
                  "Former Fortune 500 trainer",
                  "Business communication expert",
                  "International experience",
                ]}
              />

              <InstructorCard
                name="Dr. Emma Watson"
                title="Advanced English & Literature"
                credentials="PhD Applied Linguistics, 15+ years"
                description="Focuses on advanced fluency, academic writing, and sophisticated communication for high-level learners."
                achievements={[
                  "Published language researcher",
                  "Former Cambridge examiner",
                  "Academic writing specialist",
                ]}
              />
            </div>
          </Container>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-padding bg-gray-50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose FluentStart?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <WhyChooseItem
                  icon="✅"
                  title="Proven Track Record"
                  description="98% of our students report significant improvement within 4 weeks. Our methods work."
                />

                <WhyChooseItem
                  icon="🎓"
                  title="Expert Instructors"
                  description="All instructors are certified professionals with extensive experience teaching international students."
                />

                <WhyChooseItem
                  icon="💡"
                  title="Innovative Approach"
                  description="We combine traditional teaching methods with modern technology for an optimal learning experience."
                />

                <WhyChooseItem
                  icon="🌟"
                  title="Personalized Learning"
                  description="Small class sizes mean individual attention and customized feedback for every student."
                />
              </div>

              <div className="space-y-6">
                <WhyChooseItem
                  icon="🌍"
                  title="Global Community"
                  description="Join students from 50+ countries in our supportive, multicultural learning environment."
                />

                <WhyChooseItem
                  icon="🔄"
                  title="Flexible Schedule"
                  description="Multiple time slots and recorded sessions accommodate your busy lifestyle."
                />

                <WhyChooseItem
                  icon="💰"
                  title="Great Value"
                  description="Premium quality education at competitive prices with money-back guarantee."
                />

                <WhyChooseItem
                  icon="🏆"
                  title="Recognized Certification"
                  description="Earn certificates that are recognized by employers and institutions worldwide."
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Impact & Milestones */}
        <section className="section-padding bg-white">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Impact & Milestones
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Since our founding, we've been dedicated to transforming lives
                through English education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  2019
                </div>
                <div className="text-gray-600">Founded with a vision</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  5,000+
                </div>
                <div className="text-gray-600">Students graduated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  50+
                </div>
                <div className="text-gray-600">Countries served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  4.9★
                </div>
                <div className="text-gray-600">Average rating</div>
              </div>
            </div>

            <div className="mt-16 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Your English Journey?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have transformed their lives
                through FluentStart. Take the first step towards English fluency
                today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleContactClick}
                  variant="whatsapp"
                  size="lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Contact Us
                </Button>

                <a href="/test" className="btn-primary">
                  Take Free Assessment
                </a>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}

/**
 * Methodology card component
 */
function MethodologyCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

/**
 * Instructor card component
 */
function InstructorCard({
  name,
  title,
  credentials,
  description,
  achievements,
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {name.charAt(0)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-primary-600 font-medium">{title}</p>
        <p className="text-sm text-gray-500">{credentials}</p>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

      <div>
        <h4 className="font-medium text-gray-900 mb-2">Key Achievements:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Why choose us item component
 */
function WhyChooseItem({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default About;
