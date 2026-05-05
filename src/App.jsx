import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import GalaxyBackground from './components/GalaxyBackground/GalaxyBackground';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onFinished={() => setIsLoading(false)} />
        ) : (
          <div key="website-root">
            <Navbar />
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ 
                duration: 1.5, 
                ease: [0.19, 1, 0.22, 1],
                delay: 0.2 
              }}
            >
              {/* Global Visual Layers */}
              <GalaxyBackground />
              <div className="noise-overlay"></div>
              <div ref={cursorRef} className="cursor-glow"></div>
              
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
              </main>
              
              <Footer />
              <ScrollToTop />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
