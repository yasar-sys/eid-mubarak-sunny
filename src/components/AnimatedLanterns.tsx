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
        rotate: [10, -10, 10], // Physics-like swing
        opacity: 1, 
        y: 0 
      }}
      transition={{
        rotate: { repeat: Infinity, duration, ease: "easeInOut", delay },
        opacity: { duration: 1.5, delay: delay * 0.5 },
        y: { duration: 1.5, type: "spring", bounce: 0.4, delay: delay * 0.5 }
      }}
      whileHover={{ scale: 1.05, filter: "brightness(1.3)" }}
    >
      {/* Lantern String */}
      <div className="w-[1px] h-12 md:h-20 bg-gradient-to-b from-transparent to-gold/60" />

      {/* Actual Lantern Body Elements (Simulated geometry) */}
      <div className="relative w-full h-full flex flex-col items-center">
        {/* Top Dome */}
        <div className="w-1/2 h-4 md:h-6 bg-gold-dark rounded-t-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4)]" />
        
        {/* Main Body */}
        <div className="relative w-full h-2/3 md:h-3/4 border-2 border-gold-dark bg-night-deep/80 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(250,204,21,0.1)] flex items-center justify-center hexagon-clip">
          {/* Inner Light Core */}
          <motion.div 
            className="w-1/3 h-1/2 bg-gold-light rounded-full blur-[4px] shadow-[0_0_15px_rgba(250,204,21,0.8)]"
            animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity, delay }}
          />
          {/* Decorative Lines */}
          <div className="absolute inset-0 border border-gold/20 scale-90" />
        </div>
        
        {/* Bottom Base */}
        <div className="w-1/2 h-3 md:h-5 bg-gold-dark rounded-b border-t border-gold/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]" />
      </div>

      {/* Cast Glow on Environment */}
      <div className="absolute bottom-[-20%] w-[150%] h-[150%] bg-gold/5 blur-3xl pointer-events-none rounded-full" />
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
