/* src/components/Loader/Loader.jsx */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

const Loader = ({ onFinished }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = [
      { delay: 400, stage: 1 },  // Flicker/Spark
      { delay: 1200, stage: 2 }, // Text Reveal
      { delay: 3500, stage: 3 }, // Subtitle
      { delay: 5000, stage: 4 }, // Exit
    ];

    sequence.forEach(step => {
      setTimeout(() => setStage(step.stage), step.delay);
    });

    const finishTimer = setTimeout(() => {
      if (onFinished) onFinished();
    }, 6200);

    return () => clearTimeout(finishTimer);
  }, [onFinished]);

  const name = "GAUTAM MAKWANA";

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          className="loader-container cinematic-pro"
          initial={{ opacity: 1 }}
          exit={{ 
            scale: 1.2,
            opacity: 0,
            filter: 'brightness(2) blur(20px)',
            transition: { duration: 1.5, ease: [0.7, 0, 0.3, 1] } 
          }}
        >
          {/* Volumetric Lighting & Background */}
          <div className="cinematic-backdrop">
            <div className="volumetric-rays" />
            <div className="deep-gradient" />
            <div className="grain-overlay" />
          </div>

          <div className="cinematic-content">
            {/* Stage 1: Initial Pulse */}
            <AnimatePresence>
              {stage === 1 && (
                <motion.div 
                  className="initial-pulse"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </AnimatePresence>

            {/* Stage 2: Professional Text Reveal */}
            <div className="text-reveal-area">
              {stage >= 2 && (
                <div className="name-container">
                  {name.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      className={`char ${char === " " ? "space" : ""}`}
                      initial={{ 
                        opacity: 0, 
                        y: 20, 
                        filter: "blur(15px)",
                        scale: 1.5 
                      }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        filter: "blur(0px)",
                        scale: 1 
                      }}
                      transition={{ 
                        delay: i * 0.08, 
                        duration: 1.5, 
                        ease: [0.19, 1, 0.22, 1] 
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.div 
                    className="pro-sweep"
                    initial={{ left: "-100%" }}
                    animate={{ left: "200%" }}
                    transition={{ delay: 2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </div>
              )}

              {/* Stage 3: Subtitle */}
              <AnimatePresence>
                {stage >= 3 && (
                  <motion.div 
                    className="pro-subtitle"
                    initial={{ opacity: 0, letterSpacing: "2em" }}
                    animate={{ opacity: 0.4, letterSpacing: "1em" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  >
                    CREATIVE DEVELOPER & DESIGNER
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="corner-vignette" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
