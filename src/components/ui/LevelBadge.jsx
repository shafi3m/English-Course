// path: src/components/ui/LevelBadge.jsx
import React from "react";

/**
 * Level badge component for displaying course difficulty levels
 * @param {Object} props
 * @param {string} props.level - Level name (beginner, intermediate, advanced)
 * @param {string} props.size - Badge size ('sm', 'md', 'lg')
 * @param {string} props.className - Additional CSS classes
 */
function LevelBadge({ level, size = "md", className = "" }) {
  // Level configurations
  const levelConfig = {
    beginner: {
      label: "Beginner",
      classes: "level-beginner",
      icon: "🟢",
    },
    intermediate: {
      label: "Intermediate",
      classes: "level-intermediate",
      icon: "🟡",
    },
    advanced: {
      label: "Advanced",
      classes: "level-advanced",
      icon: "🔴",
    },
  };

  // Size classes
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const config = levelConfig[level?.toLowerCase()] || levelConfig.beginner;

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${config.classes}
        ${sizeClasses[size]}
        ${className}
      `.trim()}
      aria-label={`Course level: ${config.label}`}
    >
      <span className="mr-1" aria-hidden="true">
        {config.icon}
      </span>
      {config.label}
    </span>
  );
}

export default LevelBadge;
