// path: src/components/ui/Loading.jsx
import React from "react";

/**
 * Loading spinner component
 * @param {Object} props
 * @param {string} props.size - Spinner size ('sm', 'md', 'lg')
 * @param {string} props.color - Spinner color
 * @param {string} props.text - Loading text
 * @param {boolean} props.fullPage - Full page loading overlay
 */
function Loading({
  size = "md",
  color = "primary",
  text = "Loading...",
  fullPage = false,
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const colorClasses = {
    primary: "text-primary-600",
    white: "text-white",
    gray: "text-gray-600",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <p className={`text-sm ${colorClasses[color]} animate-pulse`}>{text}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

/**
 * Skeleton loading component for content placeholders
 */
export function Skeleton({ className = "", children }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {children || <div className="bg-gray-200 rounded h-4 w-full"></div>}
    </div>
  );
}

/**
 * Card skeleton for course/testimonial cards
 */
export function CardSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="space-y-4">
        <div className="bg-gray-200 rounded h-48 w-full"></div>
        <div className="space-y-2">
          <div className="bg-gray-200 rounded h-4 w-3/4"></div>
          <div className="bg-gray-200 rounded h-4 w-1/2"></div>
        </div>
        <div className="bg-gray-200 rounded h-10 w-full"></div>
      </div>
    </div>
  );
}

export default Loading;
