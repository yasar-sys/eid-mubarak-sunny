import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const InteractiveEnvelope = ({ onOpen }: { onOpen: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(onOpen, 2200);
    }
  };

  return (
    <div
      className="relative w-[280px] h-[190px] sm:w-[340px] sm:h-[230px] md:w-[420px] md:h-[280px] cursor-pointer group"
      onClick={handleOpen}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute -inset-8 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(43 100% 60% / 0.08) 0%, transparent 70%)" }}
        animate={isOpen ? { opacity: [0.5, 1, 0] } : { opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: isOpen ? 1.5 : 4, repeat: isOpen ? 0 : Infinity }}
      />

      {/* Shadow */}
      <motion.div
        className="absolute inset-0 bg-night-deep/50 blur-3xl scale-110 pointer-events-none translate-y-6 rounded-xl"
        animate={isOpen ? { opacity: 0, scale: 0.8 } : {}}
        transition={{ duration: 1 }}
      />

      {/* Back envelope body */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-[hsl(43,80%,55%)] to-[hsl(43,100%,40%)]" />
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23fff' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Inner card — slides up when opened */}
      <motion.div
        className="absolute inset-[6px] sm:inset-2 top-3 sm:top-4 glass-strong rounded-lg flex flex-col items-center justify-center p-4 sm:p-6 z-10 overflow-hidden"
        initial={{ y: 0 }}
        animate={isOpen ? { y: "-70%" } : { y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <motion.div
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-3 text-gold/60"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </motion.div>
        <p className="font-cinzel text-foreground/80 text-center text-xs sm:text-sm md:text-base tracking-wide">
          "A special blessing<br />awaits you..."
        </p>
      </motion.div>

      {/* Front fold — side & bottom triangles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <svg viewBox="0 0 420 280" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="foldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(43, 100%, 62%)" />
              <stop offset="100%" stopColor="hsl(43, 100%, 48%)" />
            </linearGradient>
            <linearGradient id="sideGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(43, 90%, 58%)" />
              <stop offset="100%" stopColor="hsl(43, 100%, 52%)" />
            </linearGradient>
          </defs>
          {/* Left triangle */}
          <path d="M0 0 L210 140 L0 280 Z" fill="url(#sideGrad)" opacity="0.95" />
          {/* Right triangle */}
          <path d="M420 0 L210 140 L420 280 Z" fill="url(#sideGrad)" opacity="0.95" />
          {/* Bottom triangle */}
          <path d="M0 280 L210 120 L420 280 Z" fill="url(#foldGrad)" />
          {/* Decorative arcs on bottom */}
          <path
            d="M170 265 Q210 235 250 265"
            fill="none"
            stroke="hsl(43,100%,75%)"
            strokeWidth="0.8"
            opacity="0.3"
          />
          <path
            d="M185 258 Q210 240 235 258"
            fill="none"
            stroke="hsl(43,100%,75%)"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Top flap — opens on click */}
      <motion.div
        className="absolute inset-0 z-30 origin-top"
        style={{ perspective: 800 }}
        initial={{ rotateX: 0 }}
        animate={isOpen ? { rotateX: 175 } : { rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 420 280" className="w-full h-full drop-shadow-xl" preserveAspectRatio="none">
          <defs>
            <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(43, 100%, 60%)" />
              <stop offset="100%" stopColor="hsl(43, 80%, 50%)" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 L210 148 L420 0 Z"
            fill="url(#flapGrad)"
            stroke="hsl(43, 100%, 70%)"
            strokeWidth="0.3"
          />
          {/* Wax seal */}
          <circle cx="210" cy="100" r="18" fill="hsl(0, 60%, 35%)" opacity="0.9" />
          <circle cx="210" cy="100" r="14" fill="none" stroke="hsl(43,100%,70%)" strokeWidth="0.8" opacity="0.6" />
          <path d="M205 95 L215 105 M215 95 L205 105" stroke="hsl(43,100%,80%)" strokeWidth="1.2" opacity="0.7" />
        </svg>
      </motion.div>

      {/* "Tap to Open" indicator */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="px-4 py-2 rounded-full glass text-foreground/80 text-[10px] sm:text-xs font-cinzel tracking-[0.3em] uppercase"
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Tap to Open
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Light burst on open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute inset-0 z-[5] rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.5 }}
            style={{ background: "radial-gradient(circle, hsl(43 100% 70% / 0.4) 0%, transparent 70%)" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveEnvelope;
