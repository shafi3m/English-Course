// path: src/components/home/FAQSection.jsx
import React, { useState, useEffect } from "react";
import { getFAQs } from "../../lib/dataApi";
import Container from "../layout/Container";
import Loading from "../ui/Loading";

function FAQSection() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const allFaqs = await getFAQs();
        // Show featured FAQs first, then others
        const sortedFaqs = allFaqs.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        setFaqs(sortedFaqs);
      } catch (err) {
        console.error("Error loading FAQs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const openAll = () => {
    setOpenItems(new Set(faqs.map((_, index) => index)));
  };

  const closeAll = () => {
    setOpenItems(new Set());
  };

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center">
            <Loading text="Loading frequently asked questions..." />
          </div>
        </Container>
      </section>
    );
  }

  if (!faqs.length) {
    return null;
  }

  return (
    <section id="faq" className="section-padding bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Have questions about our courses? We've got answers! Find everything
            you need to know about FluentStart's live English classes.
          </p>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={openAll}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Expand All
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={closeAll}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={index}
                isOpen={openItems.has(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our friendly team is here to help! Get instant answers to your
              questions about courses, schedules, enrollment, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // This would trigger the WhatsApp floating button functionality
                  const event = new CustomEvent("openWhatsApp", {
                    detail: {
                      message:
                        "Hi! I have some questions about FluentStart courses. Can you help me?",
                    },
                  });
                  window.dispatchEvent(event);
                }}
                className="btn-whatsapp inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Chat with Us
              </a>

              <a href="/about" className="btn-secondary">
                Learn More About Us
              </a>
            </div>

            {/* Contact Info */}
            <div className="mt-6 text-sm text-gray-600">
              <p>Available Monday-Friday, 9 AM - 6 PM EST</p>
              <p>Average response time: Under 5 minutes</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Individual FAQ item component
 */
function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 ${
        isOpen ? "shadow-md ring-1 ring-primary-100" : "hover:shadow-sm"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>

        <div
          className={`flex-shrink-0 w-5 h-5 text-primary-600 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        id={`faq-answer-${index}`}
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 pb-4">
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>

            {/* Category badge for organization */}
            {faq.category && (
              <div className="mt-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {faq.category}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
