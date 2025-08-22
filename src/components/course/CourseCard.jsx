// path: src/components/course/CourseCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getSiteConfig, getWhatsAppURL } from "../../lib/dataApi";
import LevelBadge from "../ui/LevelBadge";
import Button from "../ui/Button";

function CourseCard({ course, featured = false }) {
  const [siteConfig, setSiteConfig] = useState(null);

  React.useEffect(() => {
    const loadSiteConfig = async () => {
      const config = await getSiteConfig();
      setSiteConfig(config);
    };
    loadSiteConfig();
  }, []);

  const handleEnrollClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (siteConfig?.whatsappNumber) {
      const message = `Hi! I'm interested in the "${course.title}" live class. Please share the next steps for enrollment.`;
      const whatsappUrl = getWhatsAppURL(message, siteConfig.whatsappNumber);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Calculate seats remaining
  const seatsRemaining = course.seatsAvailable || 0;
  const isLowSeats = seatsRemaining <= 3;
  const isSoldOut = seatsRemaining === 0;

  return (
    <div
      className={`group card hover:shadow-xl transition-all duration-300 overflow-hidden ${
        featured ? "ring-2 ring-primary-200 relative" : ""
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
          Popular
        </div>
      )}

      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10"></div>

        {/* Placeholder for course image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <LevelBadge level={course.level} />
          </div>
        </div>

        {/* Discount Badge */}
        {course.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            {course.discount}
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <LevelBadge level={course.level} size="sm" />
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {course.price}
              </div>
              {course.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  {course.originalPrice}
                </div>
              )}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            <Link to={`/courses/${course.slug}`} className="hover:underline">
              {course.title}
            </Link>
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">{course.summary}</p>

        {/* Course Details */}
        <div className="space-y-2 mb-6 text-sm text-gray-500">
          <div className="flex items-center">
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
            {course.duration} • {course.totalHours}
          </div>

          <div className="flex items-center">
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
                d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m0 4V7a2 2 0 00-2-2H10a2 2 0 00-2 2v4m0 0V19a2 2 0 002 2h4a2 2 0 002 2v-8M8 11h8"
              />
            </svg>
            {course.instructor}
          </div>

          <div className="flex items-center">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {course.seats}
          </div>

          {/* Next cohort */}
          <div className="flex items-center">
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
                d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-4 8V9a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h4"
              />
            </svg>
            Starts {course.nextCohort}
          </div>
        </div>

        {/* Seats Status */}
        {!isSoldOut && isLowSeats && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center text-orange-700">
              <svg
                className="w-4 h-4 mr-2"
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to={`/courses/${course.slug}`}
            className="flex-1 btn-secondary text-center"
          >
            Course Details
          </Link>

          <Button
            variant="whatsapp"
            onClick={handleEnrollClick}
            disabled={isSoldOut}
            className="flex-1"
          >
            {isSoldOut ? "Sold Out" : "Enroll Now"}
          </Button>
        </div>

        {/* Course Highlights */}
        {course.outcomes && course.outcomes.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              You'll Learn:
            </h4>
            <ul className="space-y-1">
              {course.outcomes.slice(0, 3).map((outcome, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-gray-600"
                >
                  <svg
                    className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {outcome}
                </li>
              ))}
              {course.outcomes.length > 3 && (
                <li className="text-sm text-primary-600 font-medium">
                  +{course.outcomes.length - 3} more skills...
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
