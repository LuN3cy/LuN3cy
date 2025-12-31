import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

interface NewYearCelebrationProps {
  onClose: () => void;
}

export const NewYearCelebration: React.FC<NewYearCelebrationProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-close after 10 seconds if not closed manually
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); // Wait for exit animation
  };

  // Generate random particles
  const particles = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    color: ['#FFD700', '#FF4500', '#FF1493', '#00BFFF', '#ADFF2F', '#FFFFFF'][Math.floor(Math.random() * 6)],
    duration: Math.random() * 10 + 10,
    delay: Math.random() * -20, // Negative delay to start mid-animation
    drift: (Math.random() - 0.5) * 20 // Horizontal drift
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto"
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleClose} />

          {/* Fullscreen Floating Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ 
                  x: `${p.x}vw`, 
                  y: `-10vh`, 
                  opacity: 0, 
                  rotate: 0 
                }}
                animate={{ 
                  y: '110vh', 
                  opacity: [0, 1, 1, 0],
                  rotate: 720,
                  x: [`${p.x}vw`, `${p.x + p.drift}vw`]
                }}
                transition={{ 
                  duration: p.duration, 
                  repeat: Infinity, 
                  delay: p.delay,
                  ease: "linear"
                }}
                className="absolute rounded-full"
                style={{ 
                  width: p.size, 
                  height: p.size, 
                  backgroundColor: p.color,
                  boxShadow: `0 0 12px ${p.color}`,
                  filter: 'blur(0.5px)'
                }}
              />
            ))}
          </div>

          {/* Content Card */}
          <motion.div
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            className="relative z-10 bg-white/10 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl max-w-lg w-full mx-4 text-center group"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
            </motion.div>

            <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 tracking-tight">
              Happy New Year
            </h2>
            
            <motion.div 
              className="text-7xl md:text-8xl font-black mb-6 tracking-tighter italic"
              style={{
                background: 'linear-gradient(to bottom, #fff, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))'
              }}
            >
              2026
            </motion.div>

            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8">
              感谢你在过去一年的陪伴。<br />
              愿新的一年，我们都能继续在热爱的领域闪闪发光。<br />
              Happy New Year!
            </p>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-white text-zinc-900 font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
            >
              再见了👋所有的2025
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
