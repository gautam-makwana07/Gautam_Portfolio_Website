/* src/components/About/About.jsx */
import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../../assets/Profile_img.png';
import './About.css';

const stats = [
  { label: 'Projects', value: '15+', icon: '🚀' },
  { label: 'Technologies', value: '10+', icon: '⚛️' },
  { label: 'Learning', value: 'Daily', icon: '📚' },
  { label: 'Creativity', value: 'Unlimited', icon: '🎨' },
];

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container about-grid">
        {/* Left Side: Premium Profile Image (Static) */}
        <motion.div 
          className="about-left"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="profile-image-container">
            <div className="avatar-halo"></div>
            <div className="avatar-ring-outer"></div>
            
            <div className="image-static-wrapper">
              <div className="avatar-ring-inner"></div>
              <div className="avatar-glass-reflection"></div>
              
              <motion.img 
                src={profileImg} 
                alt="Gautam Makwana" 
                className="about-profile-image"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                style={{ borderRadius: '50%' }}
              />
              <div className="glow-border"></div>
              <div className="vignette-overlay"></div>
            </div>
            
            {/* Floating Badges (Slow stable drift only) */}
            <motion.div 
              className="floating-badge badge-1"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              Frontend Developer
            </motion.div>
            <motion.div 
              className="floating-badge badge-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              UI Designer
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Content & Stats */}
        <div className="about-right">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="section-label">ABOUT ME</span>
            <h2 className="section-heading">
              Hi, I'm <span className="highlight">Gautam Makwana</span> — crafting elegant digital experiences through design and development.
            </h2>
          </motion.div>

          <div className="about-content-text">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              I’m passionate about creating visually refined, high-performance digital experiences that combine clean design, intuitive interaction, and modern frontend development. I enjoy building interfaces that not only look premium but feel smooth, meaningful, and user-focused.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              My work focuses on UI design, frontend development, motion interactions, responsive systems, and thoughtful digital storytelling—turning ideas into polished web experiences.
            </motion.p>
          </div>

          {/* Mini Stats Row */}
          <div className="about-stats-grid">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="mini-stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="stat-card-inner">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-details">
                    <h4 className="stat-value">{stat.value}</h4>
                    <p className="stat-label-text">{stat.label}</p>
                  </div>
                </div>
                <div className="card-accent-line"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
