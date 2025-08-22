// path: src/pages/CourseDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourse, getSiteConfig, getWhatsAppURL } from "../lib/dataApi";
import SEO, { getCourseStructuredData } from "../components/SEO";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";
import LevelBadge from "../components/ui/LevelBadge";

function CourseDetails() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [siteConfig, setSiteConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        const [courseData, configData] = await Promise.all([
          getCourse(slug),
          getSiteConfig(),
        ]);

        if (!courseData) {
          setError("Course not found");
          return;
        }

        setCourse(courseData);
        setSiteConfig(configData);
      } catch (err) {
        console.error("Error loading course:", err);
        setError("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [slug]);

  const handleEnrollClick = () => {
    if (siteConfig?.whatsappNumber && course) {
      const message = `Hi! I'm interested in the "${course.title}" live class. Please share the next steps for enrollment.`;
      const whatsappUrl = getWhatsAppURL(message, siteConfig.whatsappNumber);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <Loading size="lg" text="Loading course details..." />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Course Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "instructor", label: "Instructor" },
    { id: "details", label: "Details" },
  ];

  // Calculate seats remaining
  const seatsRemaining = course.seatsAvailable || 0;
  const isLowSeats = seatsRemaining <= 3;
  const isSoldOut = seatsRemaining === 0;

  return (
    <>
      <SEO
        title={`${course.title} - ${course.level} English Course | FluentStart`}
        description={course.description}
        keywords={`${course.title}, ${
          course.level
        } English, ${course.tags?.join(", ")}, live English classes`}
        structuredData={getCourseStructuredData(course)}
      />

      <div className="min-h-screen pt-16 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course Info */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <LevelBadge level={course.level} />
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>

                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {course.summary}
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-primary-600">
                      {course.duration}
                    </div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-primary-600">
                      {course.totalHours}
                    </div>
                    <div className="text-sm text-gray-600">Total Hours</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-primary-600">
                      {course.seats.split(" ")[0]}
                    </div>
                    <div className="text-sm text-gray-600">Max Students</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-primary-600">
                      {seatsRemaining}
                    </div>
                    <div className="text-sm text-gray-600">Seats Left</div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-primary-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-4 8V9a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h4"
                        />
                      </svg>
                      <span>
                        <strong>Schedule:</strong> {course.schedule}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-primary-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m0 4V7a2 2 0 00-2-2H10a2 2 0 00-2 2v4m0 0V19a2 2 0 002 2h4a2 2 0 002 2v-8M8 11h8"
                        />
                      </svg>
                      <span>
                        <strong>Instructor:</strong> {course.instructor}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-primary-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-4 8V9a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h4"
                        />
                      </svg>
                      <span>
                        <strong>Next Cohort:</strong> {course.nextCohort}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3 text-primary-500"
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
                      <span>
                        <strong>Platform:</strong> {course.meetingPlatform}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrollment Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <EnrollmentCard
                    course={course}
                    onEnroll={handleEnrollClick}
                    isLowSeats={isLowSeats}
                    isSoldOut={isSoldOut}
                    seatsRemaining={seatsRemaining}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Course Content */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="border-b border-gray-200">
                    <nav className="flex">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex-1 py-4 px-6 text-sm font-medium text-center border-b-2 transition-colors duration-200 ${
                            activeTab === tab.id
                              ? "border-primary-500 text-primary-600 bg-primary-50"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="p-8">
                    {activeTab === "overview" && (
                      <OverviewTab course={course} />
                    )}
                    {activeTab === "curriculum" && (
                      <CurriculumTab course={course} />
                    )}
                    {activeTab === "instructor" && (
                      <InstructorTab course={course} />
                    )}
                    {activeTab === "details" && <DetailsTab course={course} />}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <CourseFeatures course={course} />
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}

/**
 * Enrollment card component
 */
function EnrollmentCard({
  course,
  onEnroll,
  isLowSeats,
  isSoldOut,
  seatsRemaining,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      {/* Price */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {course.price}
        </div>
        {course.originalPrice && (
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg text-gray-500 line-through">
              {course.originalPrice}
            </span>
            {course.discount && (
              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded font-medium">
                {course.discount}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Urgency Message */}
      {!isSoldOut && isLowSeats && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center text-orange-700">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">
              Only {seatsRemaining} {seatsRemaining === 1 ? "seat" : "seats"}{" "}
              left!
            </span>
          </div>
        </div>
      )}

      {/* Enroll Button */}
      <Button
        onClick={onEnroll}
        variant="whatsapp"
        size="lg"
        disabled={isSoldOut}
        className="w-full mb-4"
      >
        {isSoldOut ? "Sold Out" : "Enroll Now via WhatsApp"}
      </Button>

      {/* Money Back Guarantee */}
      <div className="text-center text-sm text-gray-600 mb-4">
        <div className="flex items-center justify-center mb-2">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          30-day money-back guarantee
        </div>
        <p>Not satisfied? Get a full refund within 2 weeks.</p>
      </div>

      {/* What's Included */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center">
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
            {course.totalHours} of live instruction
          </li>
          <li className="flex items-center">
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
            All course materials & resources
          </li>
          {course.recordedSessions && (
            <li className="flex items-center">
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
              Recorded session access
            </li>
          )}
          {course.certificate && (
            <li className="flex items-center">
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
              Certificate of completion
            </li>
          )}
          <li className="flex items-center">
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
            Personalized feedback
          </li>
          {course.supportGroup && (
            <li className="flex items-center">
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
              Student community access
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

/**
 * Tab content components
 */
function OverviewTab({ course }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Course Description
        </h3>
        <p className="text-gray-600 leading-relaxed">{course.description}</p>
      </div>

      {course.outcomes && course.outcomes.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Learning Outcomes
          </h3>
          <p className="text-gray-600 mb-4">
            By the end of this course, you will be able to:
          </p>
          <ul className="space-y-3">
            {course.outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-600">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Prerequisites
        </h3>
        <p className="text-gray-600">{course.prerequisites}</p>
      </div>
    </div>
  );
}

function CurriculumTab({ course }) {
  if (!course.syllabus || course.syllabus.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          Curriculum details will be available soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Weekly Curriculum
      </h3>
      {course.syllabus.map((week, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
              {week.week}
            </div>
            <h4 className="text-lg font-semibold text-gray-900">
              {week.title}
            </h4>
          </div>
          <ul className="space-y-1">
            {week.topics.map((topic, topicIndex) => (
              <li key={topicIndex} className="flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 text-primary-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function InstructorTab({ course }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {course.instructor.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            {course.instructor}
          </h3>
          <p className="text-gray-600">Course Instructor</p>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          About the Instructor
        </h4>
        <p className="text-gray-600 leading-relaxed">{course.instructorBio}</p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          Teaching Approach
        </h4>
        <p className="text-gray-600 leading-relaxed">
          Our instructors use a communicative approach that emphasizes practical
          usage and real-world application. Through interactive exercises,
          personalized feedback, and engaging discussions, you'll develop
          confidence and fluency in English.
        </p>
      </div>
    </div>
  );
}

function DetailsTab({ course }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Course Format</h4>
          <p className="text-gray-600">{course.cohortType}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Platform</h4>
          <p className="text-gray-600">{course.meetingPlatform}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Language</h4>
          <p className="text-gray-600">{course.language}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Materials</h4>
          <p className="text-gray-600">{course.materials}</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Course Tags</h4>
        <div className="flex flex-wrap gap-2">
          {course.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Course features sidebar component
 */
function CourseFeatures({ course }) {
  const features = [
    {
      icon: "🎯",
      title: "Small Groups",
      description: "Maximum 15 students per class",
    },
    {
      icon: "📹",
      title: "Live Interactive",
      description: "Real-time classes with instant feedback",
    },
    {
      icon: "📚",
      title: "All Materials",
      description: "Comprehensive course resources included",
    },
    {
      icon: "🏆",
      title: "Certificate",
      description: "Verified completion certificate",
    },
    {
      icon: "💬",
      title: "Community",
      description: "Access to student support group",
    },
    {
      icon: "🔄",
      title: "Recordings",
      description: "Review sessions anytime, anywhere",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Course Features
        </h3>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="text-2xl">{feature.icon}</span>
              <div>
                <h4 className="font-medium text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Questions About This Course?
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Get instant answers about curriculum, schedule, and enrollment.
        </p>
        <Link to="/test" className="btn-secondary w-full text-center text-sm">
          Take Free Level Test
        </Link>
      </div>
    </div>
  );
}

export default CourseDetails;
