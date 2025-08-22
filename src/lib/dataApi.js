// path: src/lib/dataApi.js

/**
 * Data API for fetching static JSON data with memory caching
 * Handles loading states and error scenarios gracefully
 *
 * ⚠️ THIS FILE SHOULD CONTAIN NO JSX - ONLY JAVASCRIPT FUNCTIONS
 */

// In-memory cache to avoid repeated fetches
const cache = new Map();

/**
 * Generic fetch function with caching and error handling
 * @param {string} endpoint - The API endpoint (e.g., 'courses', 'testimonials')
 * @returns {Promise<any>} The fetched data
 */
async function fetchData(endpoint) {
  // Return cached data if available
  if (cache.has(endpoint)) {
    return cache.get(endpoint);
  }

  try {
    const response = await fetch(`/data/${endpoint}.json`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Cache the successful response
    cache.set(endpoint, data);

    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);

    // Return appropriate fallback data based on endpoint
    const fallbackData = getFallbackData(endpoint);
    cache.set(endpoint, fallbackData);

    return fallbackData;
  }
}

/**
 * Get fallback data when fetch fails
 * @param {string} endpoint - The endpoint that failed
 * @returns {any} Fallback data structure
 */
function getFallbackData(endpoint) {
  const fallbacks = {
    courses: [],
    testimonials: [],
    faqs: [],
    site: {
      brandName: "FluentStart",
      tagline: "Master English Live",
      whatsappNumber: "",
      socialLinks: {},
      navigation: [],
      footer: {},
    },
  };

  return fallbacks[endpoint] || {};
}

/**
 * Fetch all courses
 * @returns {Promise<Array>} Array of course objects
 */
export async function getCourses() {
  return await fetchData("courses");
}

/**
 * Fetch a specific course by slug
 * @param {string} slug - Course slug identifier
 * @returns {Promise<Object|null>} Course object or null if not found
 */
export async function getCourse(slug) {
  const courses = await getCourses();
  return courses.find((course) => course.slug === slug) || null;
}

/**
 * Get featured courses (limit to specified number)
 * @param {number} limit - Maximum number of courses to return
 * @returns {Promise<Array>} Array of featured course objects
 */
export async function getFeaturedCourses(limit = 3) {
  const courses = await getCourses();
  return courses.slice(0, limit);
}

/**
 * Fetch all testimonials
 * @returns {Promise<Array>} Array of testimonial objects
 */
export async function getTestimonials() {
  return await fetchData("testimonials");
}

/**
 * Fetch featured testimonials (limit to specified number)
 * @param {number} limit - Maximum number of testimonials to return
 * @returns {Promise<Array>} Array of featured testimonial objects
 */
export async function getFeaturedTestimonials(limit = 3) {
  const testimonials = await getTestimonials();
  return testimonials.slice(0, limit);
}

/**
 * Fetch all FAQs
 * @returns {Promise<Array>} Array of FAQ objects
 */
export async function getFAQs() {
  return await fetchData("faqs");
}

/**
 * Fetch site configuration
 * @returns {Promise<Object>} Site configuration object
 */
export async function getSiteConfig() {
  return await fetchData("site");
}

/**
 * Get quiz questions for level assessment
 * @returns {Promise<Array>} Array of quiz question objects
 */
export async function getQuizQuestions() {
  // For simplicity, questions are defined here
  // In a real app, this could be another JSON file
  return [
    {
      id: 1,
      question: "What is the correct form of the verb 'to be' for 'I'?",
      options: ["am", "is", "are", "be"],
      correct: 0,
      level: "beginner",
    },
    {
      id: 2,
      question: "Choose the correct sentence:",
      options: [
        "She don't like coffee",
        "She doesn't likes coffee",
        "She doesn't like coffee",
        "She not like coffee",
      ],
      correct: 2,
      level: "beginner",
    },
    {
      id: 3,
      question: "What's the past tense of 'go'?",
      options: ["goed", "went", "gone", "going"],
      correct: 1,
      level: "beginner",
    },
    {
      id: 4,
      question: "If I _____ you, I would study harder.",
      options: ["was", "were", "am", "will be"],
      correct: 1,
      level: "intermediate",
    },
    {
      id: 5,
      question: "She _____ working here for five years.",
      options: ["has been", "have been", "is", "was"],
      correct: 0,
      level: "intermediate",
    },
    {
      id: 6,
      question: "Choose the correct passive voice:",
      options: [
        "The book was wrote by him",
        "The book was written by him",
        "The book is wrote by him",
        "The book written by him",
      ],
      correct: 1,
      level: "intermediate",
    },
    {
      id: 7,
      question: "By the time you arrive, I _____ the work.",
      options: [
        "will finish",
        "will have finished",
        "am finishing",
        "have finished",
      ],
      correct: 1,
      level: "intermediate",
    },
    {
      id: 8,
      question: "_____ he studies hard, he won't pass the exam.",
      options: ["Unless", "If", "Although", "Because"],
      correct: 0,
      level: "advanced",
    },
    {
      id: 9,
      question: "The proposal _____ by the committee yesterday.",
      options: [
        "was rejected",
        "rejected",
        "has rejected",
        "had been rejected",
      ],
      correct: 0,
      level: "advanced",
    },
    {
      id: 10,
      question: "Choose the sentence with correct subjunctive mood:",
      options: [
        "I wish I was taller",
        "I wish I were taller",
        "I wish I am taller",
        "I wish I will be taller",
      ],
      correct: 1,
      level: "advanced",
    },
  ];
}

/**
 * Calculate quiz score and determine level
 * @param {Array} answers - Array of user answers (indices)
 * @param {Array} questions - Array of quiz questions
 * @returns {Object} Score object with level recommendation
 */
export function calculateQuizScore(answers, questions) {
  let correct = 0;
  let beginnerCorrect = 0;
  let intermediateCorrect = 0;
  let advancedCorrect = 0;

  answers.forEach((answer, index) => {
    if (answer === questions[index].correct) {
      correct++;

      const level = questions[index].level;
      if (level === "beginner") beginnerCorrect++;
      else if (level === "intermediate") intermediateCorrect++;
      else if (level === "advanced") advancedCorrect++;
    }
  });

  const percentage = Math.round((correct / questions.length) * 100);

  // Determine recommended level based on performance
  let recommendedLevel = "beginner";
  let recommendedCourse = "english-fundamentals";

  if (percentage >= 80 && advancedCorrect >= 2) {
    recommendedLevel = "advanced";
    recommendedCourse = "advanced-mastery";
  } else if (percentage >= 60 && intermediateCorrect >= 3) {
    recommendedLevel = "intermediate";
    recommendedCourse = "business-english";
  }

  return {
    totalQuestions: questions.length,
    correctAnswers: correct,
    percentage,
    recommendedLevel,
    recommendedCourse,
    breakdown: {
      beginner: beginnerCorrect,
      intermediate: intermediateCorrect,
      advanced: advancedCorrect,
    },
  };
}

/**
 * Generate WhatsApp URL with pre-filled message
 * @param {string} message - Pre-filled message
 * @param {string} whatsappNumber - WhatsApp number from config
 * @returns {string} WhatsApp URL
 */
export function getWhatsAppURL(message, whatsappNumber) {
  if (!whatsappNumber) {
    console.warn("WhatsApp number not configured");
    return "#";
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Clear the data cache (useful for development/testing)
 */
export function clearCache() {
  cache.clear();
}
