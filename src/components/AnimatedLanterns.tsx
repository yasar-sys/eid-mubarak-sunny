import { motion } from "framer-motion";

/** A single interactive lantern component */
const Lantern = ({ 
  delay, 
  duration, 
  sizeClass = "w-16 h-32 md:w-24 md:h-48" 
}: { 
  delay: number; 
  duration: number; 
  sizeClass?: string;
}) => {
  return (
    <motion.div
      className={`relative origin-top flex flex-col items-center ${sizeClass}`}
      initial={{ rotate: -5, opacity: 0, y: -50 }}
      animate={{ 
        rotate: [8, -8, 8], // Smooth swing
        opacity: 1, 
        y: 0 
      }}
      transition={{
        rotate: { repeat: Infinity, duration, ease: "easeInOut", delay },
        opacity: { duration: 1.2, delay: delay * 0.3 },
        y: { duration: 1.2, type: "spring", bounce: 0.3, delay: delay * 0.3 }
      }}
      whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
    >
      {/* Lantern String - Elegant braided look */}
      <div className="w-[2px] h-12 md:h-20 bg-gradient-to-b from-transparent via-gold/40 to-gold shadow-[0_0_5px_rgba(250,204,21,0.3)]" />

      {/* Realistic 3D Lantern Body */}
      <div className="relative w-full h-full flex flex-col items-center -mt-1">
        
        {/* Top Dome - More detailed with cap */}
        <div className="w-2/3 h-5 md:h-7 bg-gold rounded-t-full shadow-[inset_0_-2px_6px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.3)] relative z-20">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-gold-light opacity-50" />
        </div>
        
        {/* Metal Frame Mid Section */}
        <div className="w-[75%] h-2 bg-gold-dark shadow-md z-20" />

        {/* Main Glass Body - Using SVG for complex realistic shape */}
        <div className="relative w-full h-3/4 flex items-center justify-center z-10 -mt-1">
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_0_15px_rgba(250,204,21,0.2)]">
            <defs>
              <linearGradient id={`glassGrad-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(20,20,30,0.9)" />
                <stop offset="50%" stopColor="rgba(40,40,50,0.6)" />
                <stop offset="100%" stopColor="rgba(20,20,30,0.9)" />
              </linearGradient>
              <radialGradient id={`glow-${delay}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(251,191,36,0.9)" />
                <stop offset="60%" stopColor="rgba(251,191,36,0.2)" />
                <stop offset="100%" stopColor="rgba(251,191,36,0)" />
              </radialGradient>
            </defs>
            
            {/* Glass Shape */}
            <path 
              d="M20 0 L80 0 L95 40 L80 120 L20 120 L5 40 Z" 
              fill={`url(#glassGrad-${delay})`} 
              className="stroke-gold/30 stroke-[0.5]"
            />
            
            {/* Elegant Arabesque Pattern (Simulated) */}
            <path 
              d="M30 20 Q50 10 70 20 M30 50 Q50 40 70 50 M30 80 Q50 70 70 80" 
              fill="none" 
              className="stroke-gold/10 stroke-[0.5]" 
            />

            {/* Light Source */}
            <motion.circle 
              cx="50" cy="55" r="25" 
              fill={`url(#glow-${delay})`}
              animate={{ opacity: [0.7, 1, 0.7], scale: [0.95, 1.1, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
            />
            
            {/* Frame Pillars (3D effect) */}
            <rect x="18" y="0" width="4" height="120" fill="url(#metalGrad)" className="opacity-80" />
            <rect x="78" y="0" width="4" height="120" fill="url(#metalGrad)" className="opacity-80" />
            <rect x="48" y="0" width="4" height="120" fill="url(#metalGrad)" className="opacity-40" />
            
            <defs>
              <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(43, 80%, 30%)" />
                <stop offset="50%" stopColor="hsl(43, 90%, 60%)" />
                <stop offset="100%" stopColor="hsl(43, 80%, 30%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Bottom Base - Weighted look */}
        <div className="w-[85%] h-3 md:h-5 bg-gold-dark rounded-b shadow-[0_-2px_6px_rgba(0,0,0,0.5)] z-20" />
        <div className="w-1/3 h-4 bg-gold rounded-full opacity-40 blur-sm -mt-2 animate-pulse" />
      </div>

      {/* Realistic Environment Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[150%] bg-gold/5 blur-[80px] pointer-events-none rounded-full" />
    </motion.div>
  );
};

const AnimatedLanterns = () => {
  return (
    <div className="absolute top-0 w-full flex justify-between px-4 md:px-16 pointer-events-auto z-20">
      <div className="hidden md:block">
        <Lantern delay={0} duration={6} sizeClass="w-20 h-40" />
      </div>
      <div>
        <Lantern delay={0.5} duration={5} />
      </div>
      <div>
        <Lantern delay={1.2} duration={5.5} sizeClass="w-12 h-24 md:w-20 md:h-40" />
      </div>
      <div>
        <Lantern delay={2} duration={4.5} sizeClass="w-16 h-32 md:w-24 md:h-48" />
      </div>
      <div className="hidden md:block">
        <Lantern delay={0.8} duration={6.5} sizeClass="w-20 h-40" />
      </div>
    </div>
  );
};

export default AnimatedLanterns;
