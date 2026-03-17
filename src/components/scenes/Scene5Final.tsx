import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import ShareModal from "@/components/ShareModal";

const Scene5Final = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullMessage = "May the celestial blessings of this holy day \nilluminate your path with peace, \njoy, and eternal prosperity.\n\nEid Mubarak.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedMessage(fullMessage.slice(0, index));
      index++;
      if (index > fullMessage.length) {
        clearInterval(timer);
        // Hide cursor after typing
        setTimeout(() => setShowCursor(false), 1500);
        // Elegant confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 25, spread: 360, ticks: 80, zIndex: 100, colors: ['#fbbf24', '#fcd34d', '#ffffff', '#d4af37'] };
        const interval: ReturnType<typeof setInterval> = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);
          const particleCount = 15 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() * 0.4 } }));
        }, 250);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-6 overflow-hidden bg-night-deep"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[30%] left-[20%] w-[350px] h-[350px] rounded-full bg-gold/[0.04] blur-[120px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[20%] w-[250px] h-[250px] rounded-full bg-moonlight/[0.03] blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none" />

      {/* Glassmorphism Card */}
      <motion.div
        className="relative z-20 w-full max-w-2xl glass-strong rounded-3xl glass-glow p-8 md:p-16 flex flex-col items-center text-center overflow-hidden"
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Inner glow at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-gradient-to-b from-gold/[0.06] to-transparent pointer-events-none" />

        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/20 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/20 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/20 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/20 rounded-br-lg" />

        <div className="font-cinzel text-xl md:text-3xl text-foreground/90 leading-relaxed whitespace-pre-wrap flex-grow min-h-[200px] flex items-center tracking-wide">
          {typedMessage}
          {showCursor && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[2px] h-[1.1em] bg-gold/70 ml-1 translate-y-[0.1em]"
            />
          )}
        </div>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-8 mb-6 w-full"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/20" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/20" />
        </motion.div>

        {/* Action Button */}
        <motion.div
          className="w-full flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4 }}
        >
          <button
            onClick={() => setIsShareOpen(true)}
            className="group relative px-10 py-4 rounded-full glass text-gold-light text-sm font-cinzel tracking-[0.2em] uppercase hover:bg-gold/10 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Hover sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative z-10">Share Card ✦</span>
          </button>
        </motion.div>
      </motion.div>

      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />

      {/* Footer */}
      <motion.div
        className="absolute bottom-6 left-0 w-full flex flex-col items-center text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 2 }}
      >
        <p className="font-cinzel text-[10px] md:text-xs text-foreground/40 tracking-[0.3em] uppercase leading-loose">
          Designed & Developed by <span className="text-gold/70">Samin Yasar Sunny</span>
          <br />
          CSE | Mymensingh Engineering College
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Scene5Final;
