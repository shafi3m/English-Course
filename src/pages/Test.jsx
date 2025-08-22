// path: src/pages/Test.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getQuizQuestions,
  calculateQuizScore,
  getCourses,
  getSiteConfig,
  getWhatsAppURL,
} from "../lib/dataApi";
import SEO from "../components/SEO";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";
import LevelBadge from "../components/ui/LevelBadge";

function Test() {
  const [questions, setQuestions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [siteConfig, setSiteConfig] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [questionsData, coursesData, configData] = await Promise.all([
          getQuizQuestions(),
          getCourses(),
          getSiteConfig(),
        ]);
        setQuestions(questionsData);
        setCourses(coursesData);
        setSiteConfig(configData);
        setAnswers(new Array(questionsData.length).fill(null));
      } catch (err) {
        console.error("Error loading test data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const startTest = () => {
    setStartTime(Date.now());
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setResults(null);
  };

  const selectAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishTest = () => {
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000 / 60); // minutes
    const testResults = calculateQuizScore(answers, questions);

    setResults({
      ...testResults,
      timeTaken,
    });
    setShowResults(true);
  };

  const getRecommendedCourse = () => {
    if (!results || !courses.length) return null;
    return courses.find((course) => course.slug === results.recommendedCourse);
  };

  const handleEnrollClick = () => {
    const course = getRecommendedCourse();
    if (siteConfig?.whatsappNumber && course) {
      const message = `Hi! I just completed the FluentStart level assessment and got a ${results.recommendedLevel} level recommendation. I'm interested in the "${course.title}" course. Please share enrollment details and next steps.`;
      const whatsappUrl = getWhatsAppURL(message, siteConfig.whatsappNumber);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <Loading size="lg" text="Loading your English level assessment..." />
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Assessment Unavailable
          </h1>
          <p className="text-gray-600 mb-6">
            We're currently updating our assessment questions. Please try again
            later.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Free English Level Assessment Test | FluentStart"
        description="Take our free 10-minute English level assessment to determine your current proficiency and get personalized course recommendations. Start your journey to English fluency today!"
        keywords="English level test, English assessment, proficiency test, free English test, language evaluation, course placement test"
      />

      <div className="min-h-screen pt-16 bg-gray-50">
        <Container>
          <div className="py-8">
            {!startTime ? (
              <TestIntro onStart={startTest} />
            ) : !showResults ? (
              <QuizInterface
                question={questions[currentQuestion]}
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                selectedAnswer={answers[currentQuestion]}
                onSelectAnswer={selectAnswer}
                onNext={nextQuestion}
                onPrev={prevQuestion}
                canGoNext={answers[currentQuestion] !== null}
                canGoPrev={currentQuestion > 0}
              />
            ) : (
              <TestResults
                results={results}
                recommendedCourse={getRecommendedCourse()}
                onEnroll={handleEnrollClick}
                onRetake={startTest}
              />
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

/**
 * Test introduction component
 */
function TestIntro({ onStart }) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Free English Level Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your current English proficiency and get personalized
            course recommendations in just 10 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6"
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
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">10 Questions</h3>
            <p className="text-sm text-gray-600">
              Quick assessment covering grammar, vocabulary, and comprehension
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Instant Results
            </h3>
            <p className="text-sm text-gray-600">
              Get your level and personalized course recommendations immediately
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">100% Free</h3>
            <p className="text-sm text-gray-600">
              No registration required, completely anonymous and secure
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What You'll Get:
          </h3>
          <ul className="text-left max-w-md mx-auto space-y-2">
            <li className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Your English proficiency level (Beginner, Intermediate, Advanced)
            </li>
            <li className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Personalized course recommendation based on your results
            </li>
            <li className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Detailed breakdown of your strengths and areas for improvement
            </li>
            <li className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Direct enrollment option with personalized guidance
            </li>
          </ul>
        </div>

        <Button onClick={onStart} variant="primary" size="lg" className="group">
          <svg
            className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Start Assessment
        </Button>

        <p className="text-sm text-gray-500 mt-4">
          Takes approximately 5-10 minutes to complete
        </p>
      </div>
    </div>
  );
}

/**
 * Quiz interface component
 */
function QuizInterface({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
}) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              className={`quiz-option ${
                selectedAnswer === index ? "selected" : ""
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                    selectedAnswer === index
                      ? "bg-primary-500 border-primary-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedAnswer === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="flex-1 text-left">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button onClick={onPrev} variant="outline" disabled={!canGoPrev}>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </Button>

          <Button onClick={onNext} variant="primary" disabled={!canGoNext}>
            {currentQuestion === totalQuestions - 1
              ? "Finish Test"
              : "Next Question"}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Test results component
 */
function TestResults({ results, recommendedCourse, onEnroll, onRetake }) {
  const getLevelColor = (level) => {
    switch (level) {
      case "beginner":
        return "text-green-600 bg-green-100";
      case "intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getLevelMessage = (level, percentage) => {
    if (level === "beginner") {
      return "You're ready to build a strong foundation in English fundamentals.";
    } else if (level === "intermediate") {
      return "You have a good grasp of English basics and are ready to advance your skills.";
    } else {
      return "You have strong English skills and are ready for advanced concepts.";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Assessment Complete!
        </h1>
        <p className="text-xl text-gray-600">
          Here are your personalized results and recommendations.
        </p>
      </div>

      {/* Score Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-gray-900 mb-2">
            {results.percentage}%
          </div>
          <div className="text-lg text-gray-600 mb-4">
            {results.correctAnswers} out of {results.totalQuestions} correct
          </div>

          <div className="inline-flex items-center justify-center">
            <LevelBadge level={results.recommendedLevel} size="lg" />
          </div>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {getLevelMessage(results.recommendedLevel, results.percentage)}
          </p>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {results.breakdown.beginner}/3
            </div>
            <div className="text-sm text-gray-600">Beginner Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">
              {results.breakdown.intermediate}/4
            </div>
            <div className="text-sm text-gray-600">Intermediate Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">
              {results.breakdown.advanced}/3
            </div>
            <div className="text-sm text-gray-600">Advanced Questions</div>
          </div>
        </div>

        {/* Time Taken */}
        <div className="text-center text-sm text-gray-600 mb-8">
          Completed in {results.timeTaken} minute
          {results.timeTaken !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Course Recommendation */}
      {recommendedCourse && (
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Recommended Course for You
          </h2>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {recommendedCourse.title}
                </h3>
                <LevelBadge level={recommendedCourse.level} />
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-2xl font-bold text-gray-900">
                  {recommendedCourse.price}
                </div>
                {recommendedCourse.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    {recommendedCourse.originalPrice}
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-600 mb-6">{recommendedCourse.summary}</p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
              <div>Duration: {recommendedCourse.duration}</div>
              <div>Schedule: {recommendedCourse.schedule}</div>
              <div>Instructor: {recommendedCourse.instructor}</div>
              <div>Next Start: {recommendedCourse.nextCohort}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onEnroll} variant="whatsapp" className="flex-1">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Enroll in This Course
              </Button>

              <Link
                to={`/courses/${recommendedCourse.slug}`}
                className="btn-secondary flex-1 text-center"
              >
                View Course Details
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h3>
          <p className="text-gray-600 mb-6">
            Ready to start your English learning journey with FluentStart?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#courses" className="btn-primary">
              View All Courses
            </Link>
            <Link to="/about" className="btn-secondary">
              Learn About Our Method
            </Link>
            <Button onClick={onRetake} variant="outline">
              Retake Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
