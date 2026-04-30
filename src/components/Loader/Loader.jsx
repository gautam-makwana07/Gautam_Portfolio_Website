/* src/components/Loader/Loader.jsx */
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import './Loader.css';

const Loader = ({ onFinished }) => {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const countValue = useMotionValue(0);
  
  // Create an array for particles
  const particles = Array.from({ length: 15 });

  useEffect(() => {
    // Smooth counting animation using easeInOutExpo
    const controls = animate(countValue, 98, {
      duration: 2.5,
      ease: [0.19, 1, 0.22, 1], // easeInOutExpo approximation
      onUpdate: (latest) => {
        setCount(Math.floor(latest));
      },
      onComplete: () => {
        // Hold for 300ms then exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onFinished) onFinished();
          }, 800); // Wait for exit animation
        }, 300);
      }
    });

    return () => controls.stop();
  }, []);

  // Motion values for visual effects
  const blurEffect = useTransform(countValue, (v) => {
    const progress = v % 1;
    const blur = Math.sin(progress * Math.PI) * 4;
    return `blur(${blur}px)`;
  });

  const scaleEffect = useTransform(countValue, (v) => {
    const progress = v % 1;
    return 1 - (Math.sin(progress * Math.PI) * 0.04);
  });

  const yEffect = useTransform(countValue, (v) => {
    const progress = v % 1;
    return Math.sin(progress * Math.PI) * -10;
  });

  const lineWidth = useTransform(countValue, [0, 98], ['0%', '100%']);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="loader-container"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Premium Background Effects */}
          <div className="bg-gradient" />
          <div className="noise" />
          
          <div className="particles">
            {particles.map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{ 
                  x: Math.random() * 100 + 'vw', 
                  y: Math.random() * 100 + 'vh',
                  width: Math.random() * 4 + 1 + 'px',
                  height: Math.random() * 4 + 1 + 'px',
                  opacity: Math.random() * 0.3
                }}
                animate={{ 
                  y: [null, '-100vh'],
                  opacity: [null, 0]
                }}
                transition={{ 
                  duration: Math.random() * 10 + 10, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="counter-wrapper">
            <motion.div
              className="counter-number"
              style={{
                filter: blurEffect,
                scale: scaleEffect,
                y: yEffect
              }}
            >
              {count}
            </motion.div>

            {/* Progress Line */}
            <div className="line-wrapper">
              <motion.div 
                className="progress-line"
                style={{ width: lineWidth }}
              />
            </div>

            {/* Branding Text */}
            <motion.div 
              className="branding-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            >
              GAUTAM'S PORTFOLIO
            </motion.div>
          </div>

          {/* Edge Vignette */}
          <div className="vignette" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
