// path: src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/ui/FloatingWhatsApp";


// Page components
import Home from "./pages/Home";
import CourseDetails from "./pages/CourseDetails";
import Test from "./pages/Test";
import About from "./pages/About";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:slug" element={<CourseDetails />} />
          <Route path="/test" element={<Test />} />
          <Route path="/about" element={<About />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
