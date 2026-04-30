import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
import './Hero.css';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  
  // Safely resolve Lottie component for different build environments
  const LottieComponent = Lottie.default || Lottie;
  
  // Public Lottie URLs
  const robotMainUrl = "https://lottie.host/62657e3c-f446-4a41-805c-3083321586b5/WvXUvQ2V5m.json";

  const playSound = () => {
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-rocket-launcher-ignition-1662.mp3");
    audio.volume = 0.4;
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 1.2 }}
        >
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            Hey There
          </motion.p>
          <h1 className="hero-title">
            I'm <span className="gradient-text">Gautam Makwana</span>
          </h1>
          <p className="hero-description">
            I design and develop high-performance digital experiences, elegant websites, and modern interfaces crafted for ambitious brands and startups.
          </p>
          
          <div className="hero-actions">
            <motion.button 
              className="btn btn-primary"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 15px 30px rgba(50, 180, 74, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Let's Talk
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "var(--accent-color)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              View Work
            </motion.button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">20+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">3+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">15+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 1.5 }}
        >
          <div className="lottie-container" onClick={playSound}>
            <LottieComponent 
              path={robotMainUrl}
              loop={true} 
              autoplay={true}
              className="main-robot-lottie"
            />
            <div className="lottie-glow-effect"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Background Blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
    </section>
  );
};

export default Hero;
