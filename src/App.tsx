import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Specialized from "./components/sections/Specialized";
import Testimonials from "./components/sections/Testimonials";
import Process from "./components/sections/Process";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";
import ScrollToTop from "./components/ui/ScrollToTop";
import ServiceDetail from "./components/ServiceDetail";
import AdminDashboard from "./components/AdminDashboard";
import InquiryCheck from "./components/InquiryCheck";
import { motion, useScroll, useSpring } from "motion/react";

function ScrollToTopOnPathChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <main className="flex-grow">
      <Hero />
      <About />
      <Services />
      <Specialized />
      <Testimonials />
      <Process />
      <FAQ />
      <Contact />
    </main>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <ScrollToTopOnPathChange />
      <div className="min-h-screen flex flex-col selection:bg-secondary selection:text-white">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-secondary z-[60] origin-left"
          style={{ scaleX }}
        />

        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <HomePage />
              <Footer />
              <ScrollToTop />
            </>
          } />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/inquiry-check" element={<InquiryCheck />} />
        </Routes>

        {/* Quick Call Button (Mobile Only) */}
        <div className="md:hidden fixed bottom-6 right-6 z-40">
          <motion.a
            href="tel:010-8938-2540"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </motion.a>
        </div>
      </div>
    </Router>
  );
}
