/* src/components/Footer/Footer.jsx */
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-logo">
          <span className="logo-bold">Gautam's</span>
          <span className="logo-light"> Portfolio</span>
        </div>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Gautam Makwana — Crafted with passion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
