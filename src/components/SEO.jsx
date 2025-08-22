// path: src/components/SEO.jsx
import { useEffect } from "react";

/**
 * SEO component for managing page meta tags and structured data
 * @param {Object} props - SEO configuration
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords
 * @param {string} props.image - Social media image URL
 * @param {string} props.url - Canonical URL
 * @param {string} props.type - Page type (website, article, etc.)
 * @param {Object} props.structuredData - JSON-LD structured data
 */
function SEO({
  title = "FluentStart - Master English Live",
  description = "Master English with live interactive classes. Join our expert-led courses for all levels. Take our free assessment test and start your fluency journey today.",
  keywords = "English course, learn English online, English classes, fluency training, speaking practice",
  image = "/og-image.png",
  url = window.location.href,
  type = "website",
  structuredData = null,
}) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      const existingTag = document.querySelector(
        `meta[${attribute}="${name}"]`
      );

      if (existingTag) {
        existingTag.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };

    // Update basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Update Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", "FluentStart", true);

    // Update Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image", true);
    updateMetaTag("twitter:title", title, true);
    updateMetaTag("twitter:description", description, true);
    updateMetaTag("twitter:image", image, true);

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", url);
    } else {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      canonicalLink.setAttribute("href", url);
      document.head.appendChild(canonicalLink);
    }

    // Add structured data if provided
    if (structuredData) {
      const existingScript = document.querySelector("#structured-data");
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.id = "structured-data";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Remove structured data when component unmounts
      const structuredDataScript = document.querySelector("#structured-data");
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, [title, description, keywords, image, url, type, structuredData]);

  return null; // This component doesn't render anything
}

/**
 * Generate organization structured data
 */
export function getOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FluentStart",
    description:
      "Online English learning platform with live interactive classes",
    url: "https://fluentstart.netlify.app",
    logo: "https://fluentstart.netlify.app/logo.png",
    sameAs: [
      "https://facebook.com/fluentstart",
      "https://twitter.com/fluentstart",
      "https://instagram.com/fluentstart",
      "https://linkedin.com/company/fluentstart",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: [
        "English",
        "Spanish",
        "Portuguese",
        "Arabic",
        "Chinese",
      ],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Education Avenue",
      addressLocality: "Learning City",
      addressRegion: "Knowledge State",
      postalCode: "12345",
      addressCountry: "US",
    },
  };
}

/**
 * Generate course structured data
 * @param {Object} course - Course data
 */
export function getCourseStructuredData(course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "FluentStart",
      url: "https://fluentstart.netlify.app",
    },
    courseCode: course.slug,
    educationalLevel: course.level,
    timeRequired: course.duration,
    totalTime: course.totalHours,
    courseMode: "online",
    deliveryMode: "live",
    instructor: {
      "@type": "Person",
      name: course.instructor,
      description: course.instructorBio,
    },
    offers: {
      "@type": "Offer",
      price: course.price.replace("$", ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
      category: "Education",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
      bestRating: "5",
    },
    coursePrerequisites: course.prerequisites || "None",
    educationalCredentialAwarded: course.certificate
      ? "Certificate of Completion"
      : "None",
  };
}

/**
 * Generate FAQ structured data
 * @param {Array} faqs - FAQ data array
 */
export function getFAQStructuredData(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate WebSite structured data for homepage
 */
export function getWebSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FluentStart",
    description: "Master English with live interactive classes",
    url: "https://fluentstart.netlify.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://fluentstart.netlify.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "FluentStart",
      logo: {
        "@type": "ImageObject",
        url: "https://fluentstart.netlify.app/logo.png",
      },
    },
  };
}

export default SEO;
