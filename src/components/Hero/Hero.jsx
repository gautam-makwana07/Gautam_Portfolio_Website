/* src/components/Hero/Hero.jsx */
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import './Hero.css';

// Typewriter Component
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timeout);
    }
    
    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    
    const speed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);
    
    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  return (
    <span className="typewriter-text">
      {words[index].substring(0, subIndex)}
      <span className="cursor">|</span>
    </span>
  );
};

const badges = [
  { text: "React", icon: "⚛️" },
  { text: "Node.js", icon: "🟢" },
  { text: "JavaScript", icon: "⚡" },
  { text: "Figma", icon: "🎨" },
  { text: "GitHub", icon: "🐙" },
  { text: "AI Tools", icon: "🧠" },
];

const Hero = () => {
  // Mouse Parallax for Avatar
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
    animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        
        {/* Left Side: Text Content */}
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div 
            className="hero-label"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="status-dot"></span> Available for freelance projects
          </motion.div>
          
          <h1 className="hero-title">
            I'm <span className="gradient-text">Gautam Makwana</span>
          </h1>
          
          <div className="typewriter-wrapper">
            <Typewriter words={[
              "Creative Designer", 
              "UI/UX Builder", 
              "AI Enthusiast"
            ]} />
          </div>
          
          <p className="hero-description">
            I architect and develop high-end, scalable digital experiences. With a deep focus on exceptional design, clean code, and seamless interactions, I build modern software for ambitious brands.
          </p>
          
          <div className="hero-actions">
            <button 
              className="btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </button>
            <button 
              className="btn-secondary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </button>
          </div>

          <div className="hero-stats">
            <motion.div className="stat-card" whileHover={{ y: -5 }}>
              <span className="stat-num">25+</span>
              <span className="stat-label">Projects Built</span>
            </motion.div>
            <motion.div className="stat-card" whileHover={{ y: -5 }}>
              <span className="stat-num">3+</span>
              <span className="stat-label">Years Experience</span>
            </motion.div>
            <motion.div className="stat-card" whileHover={{ y: -5 }}>
              <span className="stat-num">15+</span>
              <span className="stat-label">Happy Clients</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Premium Interactive Section */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        >
          <div 
            className="visual-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background Effects */}
            <div className="visual-aura"></div>
            <div className="animated-grid"></div>

            {/* Glowing Rings */}
            <div className="glowing-ring ring-inner"></div>
            <div className="glowing-ring ring-outer"></div>

            {/* Orbiting Badges */}
            <div className="orbit-system">
              {badges.map((badge, i) => {
                const angle = (i * 60 * Math.PI) / 180;
                const radius = 220;
                const left = `calc(50% + ${Math.cos(angle) * radius}px)`;
                const top = `calc(50% + ${Math.sin(angle) * radius}px)`;
                return (
                  <div 
                    key={i} 
                    className="orbit-badge"
                    style={{ left, top }}
                  >
                    <span className="badge-icon">{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Centerpiece Avatar */}
            <motion.div 
              className="avatar-frame"
              style={{ rotateX, rotateY }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src="../assets/avatar.png"
                className="avatar-img" 
              />
            </motion.div>

          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Hero;
