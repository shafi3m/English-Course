// path: src/components/layout/Container.jsx
import React from "react";

/**
 * Container component for consistent page width and padding
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.size - Container size ('sm', 'md', 'lg', 'xl', 'full')
 * @param {string} props.className - Additional CSS classes
 */
function Container({ children, size = "lg", className = "" }) {
  const sizeClasses = {
    sm: "max-w-4xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  const containerClass = `
    ${sizeClasses[size]} 
    mx-auto 
    px-4 
    sm:px-6 
    lg:px-8 
    ${className}
  `.trim();

  return <div className={containerClass}>{children}</div>;
}

export default Container;
