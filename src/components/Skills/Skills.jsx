/* src/components/Skills/Skills.jsx */
import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skillCategories = [
  {
    title: "Development",
    description: "Building robust and scalable web applications.",
    type: "progress",
    items: [
      { name: 'HTML5', level: 95, icon: 'HTML' },
      { name: 'CSS3', level: 90, icon: 'CSS' },
      { name: 'JavaScript', level: 92, icon: 'JS' },
      { name: 'React JS', level: 95, icon: '⚛️' },
      { name: 'Node JS', level: 85, icon: '🟢' },
      { name: 'MongoDB', level: 80, icon: '🍃' }
    ]
  },
  {
    title: "Designing",
    description: "Crafting visually stunning and user-centric designs.",
    type: "icon-grid",
    items: [
      { name: 'Figma', icon: 'Fi' },
      { name: 'Canva', icon: 'Cv' },
      { name: 'Photoshop', icon: 'Ps' },
      { name: 'Illustrator', icon: 'Ai' },
      { name: 'Adobe XD', icon: 'Xd' },
      { name: 'UI Wireframing', icon: '✏️' }
    ]
  },
  {
    title: "Tools & Workflow",
    description: "Modern tools that streamline the development process.",
    type: "badges",
    items: [
      { name: 'VS Code', icon: '💻' },
      { name: 'GitHub', icon: 'GH' },
      { name: 'Antigravity', icon: '🚀' },
      { name: 'DevTools', icon: '🛠️' },
      { name: 'npm / Yarn', icon: '📦' }
    ]
  },
  {
    title: "Interests",
    description: "Creative fields that inspire my daily work.",
    type: "chips",
    items: [
      { name: '3D Animation' },
      { name: 'AI Tools' },
      { name: 'UI/UX Trends' },
      { name: 'Motion Graphics' },
      { name: 'Web Experiences' },
      { name: 'Automation' },
      { name: 'Digital Art' }
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container center-layout">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-subtitle">Expertise</span>
          <h2 className="section-title">Skill & Expertise</h2>
          <p className="section-desc">
            A blend of development, design, modern tools, and creative interests that shape my digital work.
          </p>
          <div className="section-line"></div>
        </motion.div>

        <div className="skills-grid-modern">
          {skillCategories.map((category, idx) => (
            <SkillCategoryCard key={idx} category={category} index={idx} />
          ))}
        </div>
      </div>

      {/* Floating Particles Background */}
      <div className="skills-bg-elements">
        <div className="radial-glow"></div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-dot"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 1
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </section>
  );
};

const SkillCategoryCard = ({ category, index }) => {
  return (
    <motion.div 
      className="expertise-card"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -10 }}
    >
      <div className="card-inner">
        <h3 className="category-title">{category.title}</h3>
        <p className="category-desc">{category.description}</p>
        
        <div className="category-content">
          {category.type === 'progress' && (
            <div className="progress-list">
              {category.items.map((item, i) => (
                <div key={i} className="progress-item">
                  <div className="progress-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-percent">{item.level}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <motion.div 
                      className="progress-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + (i * 0.1) }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {category.type === 'icon-grid' && (
            <div className="icon-grid">
              {category.items.map((item, i) => (
                <motion.div 
                  key={i} 
                  className="icon-box"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="icon-text">{item.icon}</span>
                  <span className="icon-label">{item.name}</span>
                </motion.div>
              ))}
            </div>
          )}

          {category.type === 'badges' && (
            <div className="badges-list">
              {category.items.map((item, i) => (
                <motion.div 
                  key={i} 
                  className="tool-badge"
                  whileHover={{ backgroundColor: "rgba(50, 180, 74, 0.1)", color: "var(--accent-color)" }}
                >
                  <span className="badge-icon">{item.icon}</span>
                  {item.name}
                </motion.div>
              ))}
            </div>
          )}

          {category.type === 'chips' && (
            <div className="chips-cloud">
              {category.items.map((item, i) => (
                <motion.span 
                  key={i} 
                  className="interest-chip"
                  whileHover={{ y: -5, boxShadow: "0 5px 15px rgba(50, 180, 74, 0.2)" }}
                >
                  {item.name}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="card-glow"></div>
    </motion.div>
  );
};

export default Skills;
