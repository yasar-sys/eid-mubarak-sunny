import { motion } from "framer-motion";
import { useState } from "react";

/** Interactive 3D Envelope Component */
const InteractiveEnvelope = ({
  onOpen,
}: {
  onOpen: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(onOpen, 2000); // Trigger next scene after animation
    }
  };

  return (
    <div 
      className="relative w-72 h-48 md:w-[450px] md:h-[300px] cursor-pointer group"
      onClick={handleOpen}
    >
      {/* Shadow */}
      <div className="absolute inset-0 bg-black/40 blur-3xl scale-110 pointer-events-none translate-y-8" />

      {/* Back Envelope Layer */}
      <div className="absolute inset-0 bg-gold-dark rounded-lg shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20" />
      </div>

      {/* Inner Card (The actual greeting content) */}
      <motion.div
        className="absolute inset-2 top-4 bg-[#fff9ea] rounded-md shadow-inner flex flex-col items-center justify-center p-6 border-l-4 border-gold/20"
        initial={{ y: 0 }}
        animate={isOpen ? { y: -180 } : { y: 0 }}
        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
      >
        <div className="w-12 h-12 md:w-16 md:h-16 mb-4 opacity-70">
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-gold-dark">
            <path d="M12 2L4.5 9.5V19.5H19.5V9.5L12 2Z" />
          </svg>
        </div>
        <p className="font-display text-night-deep text-center text-sm md:text-lg italic opacity-80">
          "A special blessing for you..."
        </p>
      </motion.div>

      {/* Front Fold (Bottom/Sides) */}
      <div className="absolute inset-0 z-20">
        <svg viewBox="0 0 450 300" className="w-full h-full drop-shadow-xl">
          <defs>
            <linearGradient id="foldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(43, 100%, 65%)" />
              <stop offset="100%" stopColor="hsl(43, 100%, 45%)" />
            </linearGradient>
            <filter id="innerShadow">
              <feOffset dx="0" dy="2" />
              <feGaussianBlur stdDeviation="2" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="black" floodOpacity="0.3" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            </filter>
          </defs>
          
          {/* Side triangles */}
          <path d="M0 0 L225 150 L0 300 Z" fill="hsl(43, 100%, 55%)" />
          <path d="M450 0 L225 150 L450 300 Z" fill="hsl(43, 100%, 55%)" />
          
          {/* Bottom triangle */}
          <path d="M0 300 L225 130 L450 300 Z" fill="url(#foldGrad)" />
          
          {/* Intricate Pattern on bottom fold */}
          <path 
            d="M180 280 Q225 240 270 280 M190 270 Q225 245 260 270" 
            fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" 
          />
        </svg>
      </div>

      {/* Top Flap */}
      <motion.div
        className="absolute inset-0 z-30 origin-top"
        initial={{ rotateX: 0 }}
        animate={isOpen ? { rotateX: 160 } : { rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ perspective: "1000px" }}
      >
        <svg viewBox="0 0 450 300" className="w-full h-full drop-shadow-2xl">
          <path 
            d="M0 0 L225 155 L450 0 Z" 
            fill="hsl(43, 100%, 60%)" 
            stroke="hsl(43, 100%, 40%)" 
            strokeWidth="0.5"
          />
          {/* Decorative Seal */}
          <circle cx="225" cy="155" r="15" fill="hsl(43, 100%, 45%)" stroke="white" strokeWidth="0.5" opacity="0.8" />
          <path d="M220 150 L230 160 M230 150 L220 160" stroke="white" strokeWidth="1" opacity="0.5" />
        </svg>
      </motion.div>

      {/* "Open Me" Indicator */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="px-4 py-2 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/40 text-white text-xs tracking-[0.3em] uppercase">
            Tap to Open
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveEnvelope;
