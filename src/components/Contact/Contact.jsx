/* src/components/Contact/Contact.jsx */
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import './Contact.css';

const socialLinks = [
  { id: 1, name: 'LinkedIn', icon: <FaLinkedinIn />, url: 'https://linkedin.com/', color: '#32b44a' },
  { id: 2, name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/', color: '#32b44a' },
  { id: 3, name: 'Email', icon: <MdEmail />, url: 'mailto:gautam@example.com', color: '#32b44a' },
  { id: 4, name: 'WhatsApp', icon: <FaWhatsapp />, url: 'https://wa.me/', color: '#32b44a' },
];

const Contact = () => {
  const [focused, setFocused] = useState(null);

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-card">
          <div className="contact-info">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="contact-title"
            >
              Let's build something <span className="gradient-text">exceptional.</span>
            </motion.h2>
            <p className="contact-desc">
              Professional, clean, minimal. reach out to me for collaborations or just to say hi.
            </p>
            
            <div className="social-links-container">
              {socialLinks.map((link, index) => (
                <SocialIcon key={link.id} link={link} index={index} />
              ))}
            </div>
          </div>

          <motion.form 
            className="contact-form"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={`form-group ${focused === 'name' ? 'focused' : ''}`}>
              <label>Full Name</label>
              <input 
                type="text" 
                onFocus={() => setFocused('name')} 
                onBlur={() => setFocused(null)} 
                placeholder="John Doe"
              />
            </div>
            <div className={`form-group ${focused === 'email' ? 'focused' : ''}`}>
              <label>Email Address</label>
              <input 
                type="email" 
                onFocus={() => setFocused('email')} 
                onBlur={() => setFocused(null)} 
                placeholder="john@example.com"
              />
            </div>
            <div className={`form-group ${focused === 'message' ? 'focused' : ''}`}>
              <label>Your Message</label>
              <textarea 
                rows="4" 
                onFocus={() => setFocused('message')} 
                onBlur={() => setFocused(null)} 
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            <motion.button 
              className="btn btn-primary submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const SocialIcon = ({ link, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const iconRef = useRef(null);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = iconRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="social-icon-wrapper">
      <motion.a
        ref={iconRef}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="premium-social-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 * index, type: 'spring', stiffness: 260, damping: 20 }}
        onMouseMove={handleMouse}
        onMouseLeave={resetPosition}
        onMouseEnter={() => setIsHovered(true)}
        animate={{ x: position.x, y: position.y }}
        whileHover={{ 
          y: -10, 
          rotate: 5, 
          scale: 1.1,
          backgroundColor: '#32b44a',
          boxShadow: '0 10px 30px rgba(50, 180, 74, 0.4)'
        }}
      >
        <motion.div 
          className="icon-inner"
          animate={{ color: isHovered ? '#ffffff' : '#111' }}
        >
          {link.icon}
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="social-tooltip"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -45, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {link.name}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>
    </div>
  );
};

export default Contact;
