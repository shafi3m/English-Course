// path: src/components/ui/Button.jsx
import React from "react";

/**
 * Reusable button component with multiple variants
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button style variant
 * @param {string} props.size - Button size
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {string} props.href - Link href (renders as anchor)
 * @param {boolean} props.external - External link (opens in new tab)
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  type = "button",
  href,
  external = false,
  ...props
}) {
  // Base classes for all buttons
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant classes
  const variantClasses = {
    primary:
      "bg-primary-600 hover:bg-primary-700 focus:bg-primary-700 text-white focus:ring-primary-500",
    secondary:
      "bg-white hover:bg-gray-50 focus:bg-gray-50 text-primary-600 border border-primary-200 focus:ring-primary-500",
    whatsapp:
      "bg-green-500 hover:bg-green-600 focus:bg-green-600 text-white focus:ring-green-500",
    outline:
      "border border-gray-300 hover:border-gray-400 focus:border-gray-400 text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:ring-gray-500",
    ghost:
      "text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:ring-gray-500",
    danger:
      "bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white focus:ring-red-500",
  };

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${className}
  `.trim();

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-3 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  // Render as link if href is provided
  if (href) {
    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <a
        href={href}
        className={buttonClasses}
        onClick={onClick}
        {...linkProps}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {children}
      </a>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
}

export default Button;
