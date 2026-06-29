'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function HeroSection() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      window.scrollTo(0, 0);
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && visible) setVisible(false);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (visible && touchStartY - e.touches[0].clientY > 30) setVisible(false);
    };

    if (visible) {
      window.addEventListener('wheel', handleWheel);
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = 'auto';
    };
  }, [visible, mounted]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="hero"
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className={`${mounted ? 'fixed' : 'relative'} inset-0 z-50 flex flex-col items-center justify-center bg-white overflow-hidden cursor-pointer`}
          onClick={() => setVisible(false)}
        >
          {/* Split background */}
          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full bg-black" />
            <div className="w-1/2 h-full bg-white" />
          </div>

          {/* JONAS AGRA */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden mix-blend-difference z-0">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[18vw] font-black leading-none text-white tracking-tighter whitespace-nowrap text-center flex items-center justify-center h-full"
              style={{ fontFamily: '"Helvetica Now", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, sans-serif' }}
            >
              JONAS AGRA
            </motion.h1>
          </div>

          {/* SOFTWARE ENGINEER */}
          <div className="absolute inset-x-0 top-1/2 left-0 w-full flex justify-center pointer-events-none z-50 translate-y-[6vw] md:translate-y-[7vw] mix-blend-difference">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <h2
                className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase italic text-white"
                style={{ fontFamily: '"Helvetica Now", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, sans-serif' }}
              >
                SOFTWARE ENGINEER
              </h2>
              <p className="text-zinc-500 font-medium tracking-wide uppercase text-sm -mt-2">
                STUDENT
              </p>
            </motion.div>
          </div>

          {/* Photo */}
          <div className="absolute inset-0 z-10 flex items-end justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative z-20 shrink-0 w-[150vw] sm:w-[min(86vw,40rem)] md:w-[min(72vw,56rem)] lg:w-[min(64vw,64rem)] translate-x-[6vw] md:translate-x-0 pointer-events-auto"
            >
              <img
                src="/photo.png"
                alt="Jonas Agra"
                className="block w-full h-auto max-h-[130dvh] md:max-h-[90vh] object-contain brightness-110 contrast-125 hero-photo-mask translate-y-4"
              />
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
