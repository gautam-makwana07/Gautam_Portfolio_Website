/* src/components/Projects/Projects.jsx */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    title: "E-Commerce Hub",
    category: "Full Stack Development",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "#"
  },
  {
    title: "Creative Portfolio",
    category: "Web Design & Dev",
    tags: ["React", "Framer Motion", "Three.js"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "#"
  },
  {
    title: "Brand Identity Design",
    category: "Graphic Design",
    tags: ["Photoshop", "Illustrator", "Figma"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    link: "#",
    github: "#"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            My Projects 
          </motion.h2>
          <p className="section-desc">Selected projects crafted with focus on detail and performance.</p>
        </div>

        <motion.div 
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isComingSoon, setIsComingSoon] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsComingSoon(true);
    setTimeout(() => setIsComingSoon(false), 2000);
  };

  return (
    <motion.div 
      className="project-card"
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
        }
      }}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.title} className="project-image" />
        
        <AnimatePresence>
          {isComingSoon ? (
            <motion.div 
              className="coming-soon-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="cinematic-text-wrapper">
                {"COMING SOON".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ 
                      delay: i * 0.05, 
                      duration: 0.5, 
                      ease: [0.19, 1, 0.22, 1] 
                    }}
                    className="cinematic-letter"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
              <motion.div 
                className="cinematic-line"
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.div>
          ) : (
            <div className="project-overlay">
              <div className="project-buttons">
                <span className="btn-icon">🔗</span>
                <span className="btn-icon">📁</span>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="project-info">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        <div className="project-tags">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
