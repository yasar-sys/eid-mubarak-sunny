import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import ShareModal from "@/components/ShareModal";

const Scene5Final = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const fullMessage = "May the celestial blessings of this holy day \nilluminate your path with peace, \njoy, and eternal prosperity.\n\nEid Mubarak.";

  // Typing effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedMessage(fullMessage.slice(0, index));
      index++;
      if (index > fullMessage.length) {
        clearInterval(timer);
        // Fire confetti when done typing
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100, colors: ['#fbbf24', '#fcd34d', '#ffffff'] };

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);
          const particleCount = 20 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
        }, 200);
      }
    }, 45); // Faster typing

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-6 overflow-hidden bg-night-deep"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        className="relative z-20 w-full max-w-2xl bg-night-mid/80 backdrop-blur-xl border border-gold/30 rounded-2xl shadow-[0_0_50px_rgba(250,204,21,0.05)] p-8 md:p-16 flex flex-col items-center text-center overflow-hidden"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        {/* Subtle decorative glow in card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />

        <div className="font-display text-2xl md:text-4xl text-foreground font-serif leading-relaxed whitespace-pre-wrap flex-grow min-h-[200px] flex items-center" style={{ fontFamily: "'Cinzel', serif" }}>
          {typedMessage}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-[3px] h-[1.2em] bg-gold ml-1 translate-y-1/4"
          />
        </div>

        {/* Action Buttons */}
        <motion.div
          className="mt-12 w-full flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <button
            onClick={() => setIsShareOpen(true)}
            className="px-8 py-4 rounded-full border border-gold/40 text-gold-light text-sm tracking-widest uppercase hover:bg-gold hover:text-night transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.1)] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] cursor-pointer"
          >
            Share Card ✦
          </button>
        </motion.div>
      </motion.div>

      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />

      {/* Footer Title */}
      <motion.div
        className="absolute bottom-6 left-0 w-full flex flex-col items-center text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 2 }}
      >
        <p className="font-body text-xs md:text-sm text-foreground/50 tracking-widest uppercase leading-loose">
          Designed & Developed by <span className="text-gold">Samin Yasar Sunny</span>
          <br />
          CSE | Mymensingh Engineering College
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Scene5Final;
