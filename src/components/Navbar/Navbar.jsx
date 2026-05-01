/* src/components/Navbar/Navbar.jsx */
import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import "./Navbar.css";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Creative", href: "#creative-moments" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = ["home", "about", "skills", "projects", "creative-moments", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC key support
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        className={`navbar-wrapper ${isScrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
      >
        <div className="nav-container">
          <div
            className="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="logo-bold">Gautam's</span>
            <span className="logo-light"> Portfolio</span>
          </div>

          <div className="nav-pill desktop-nav">
            {navItems.map((item, idx) => (
              <MagneticLink 
                key={idx} 
                onClick={() => scrollToSection(item.href.slice(1))}
                isActive={activeSection === item.href.slice(1)}
              >
                {item.name}
              </MagneticLink>
            ))}
          </div>

          <button
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <motion.span
              className="line top"
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.span
              className="line middle"
              animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="line bottom"
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="mobile-menu-content"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="mobile-nav-items">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className={`mobile-nav-item ${activeSection === item.href.slice(1) ? "active" : ""}`}
                    initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.1 * idx + 0.2, duration: 0.6 }}
                    onClick={() => scrollToSection(item.href.slice(1))}
                    whileHover={{ scale: 1.1, color: "#32b44a" }}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.name}
                    <div className="mobile-item-glow"></div>
                  </motion.div>
                ))}
              </div>

              <div className="mobile-menu-footer">
                <p>© 2025 Gautam Makwana</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const MagneticLink = ({ children, onClick, isActive }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`nav-item ${isActive ? "active" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {children}
      <motion.span 
        className="nav-underline" 
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {isActive && (
        <motion.div 
          layoutId="navActivePill"
          className="nav-active-pill"
          initial={false}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.div>
  );
};

export default Navbar;
