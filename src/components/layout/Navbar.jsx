// path: src/components/layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSiteConfig } from "../../lib/dataApi";
import Container from "./Container";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loadSiteConfig = async () => {
      const config = await getSiteConfig();
      setSiteConfig(config);
    };
    loadSiteConfig();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".navbar-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  if (!siteConfig) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <Container>
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </Container>
      </nav>
    );
  }

  const navLinks = siteConfig.navigation || [];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
          : "bg-white shadow-sm border-b border-gray-100"
      }`}
    >
      <Container>
        <div className="navbar-container flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
              aria-label="FluentStart Home"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">
                  {siteConfig.brandName}
                </span>
                <span className="text-xs text-gray-500 leading-none">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} />
            ))}
            <Link
              to="/test"
              className="btn-primary text-sm"
              aria-label="Take free level assessment test"
            >
              Free Level Test
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
            {navLinks.map((link, index) => (
              <MobileNavLink key={index} {...link} />
            ))}
            <div className="pt-2">
              <Link
                to="/test"
                className="block w-full text-center btn-primary text-sm"
                aria-label="Take free level assessment test"
              >
                Free Level Test
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}

/**
 * Desktop navigation link component
 */
function NavLink({ label, href, isExternal = false }) {
  const location = useLocation();
  const isActive =
    location.pathname === href ||
    (href.includes("#") && location.pathname + location.hash === href);

  const commonClasses =
    "text-sm font-medium transition-colors duration-200 hover:text-primary-600 focus:outline-none focus:text-primary-600";
  const activeClasses = isActive ? "text-primary-600" : "text-gray-700";

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${commonClasses} ${activeClasses}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  // Handle anchor links
  if (href.includes("#")) {
    return (
      <a
        href={href}
        className={`${commonClasses} ${activeClasses}`}
        onClick={(e) => {
          const [path, hash] = href.split("#");
          if (path === "" || path === location.pathname) {
            e.preventDefault();
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={href} className={`${commonClasses} ${activeClasses}`}>
      {label}
    </Link>
  );
}

/**
 * Mobile navigation link component
 */
function MobileNavLink({ label, href, isExternal = false }) {
  const location = useLocation();
  const isActive = location.pathname === href;

  const commonClasses =
    "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:text-primary-600 focus:bg-primary-50";
  const activeClasses = isActive
    ? "text-primary-600 bg-primary-50"
    : "text-gray-700";

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${commonClasses} ${activeClasses}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  // Handle anchor links
  if (href.includes("#")) {
    return (
      <a
        href={href}
        className={`${commonClasses} ${activeClasses}`}
        onClick={(e) => {
          const [path, hash] = href.split("#");
          if (path === "" || path === location.pathname) {
            e.preventDefault();
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={href} className={`${commonClasses} ${activeClasses}`}>
      {label}
    </Link>
  );
}

export default Navbar;
