import { useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

/** Scene 4: Final greeting card with share functionality */
const FinalCard = ({ onShare }: { onShare: () => void }) => {
  const handleEidClick = useCallback(() => {
    const colors = ["#D4A843", "#F0D68A", "#B8860B", "#FFD700", "#FFF8DC"];
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors, shapes: ["star"] });
  }, []);

  const lineVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 1.2 + i * 0.4, duration: 0.8 },
    }),
  };

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Radial background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(43 80% 55% / 0.05) 0%, transparent 60%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Card container */}
      <motion.div
        className="relative max-w-lg w-full p-8 md:p-12 rounded-2xl border border-gold/20 bg-night-mid/80 backdrop-blur-xl box-glow-gold overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Animated shimmer */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsl(43 80% 55% / 0.3) 50%, transparent 60%)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
        />

        {/* Decorative corner elements */}
        <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-gold/30 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-gold/30 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-gold/30 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-gold/30 rounded-br-lg" />

        {/* Arabic header */}
        <motion.p
          className="font-arabic text-2xl md:text-3xl text-gold text-center mb-2 relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          عيد مبارك
        </motion.p>

        {/* Decorative Islamic divider */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <div className="w-2 h-2 rotate-45 border border-gold/50" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/50" />
          <div className="w-2 h-2 rotate-45 border border-gold/50" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Greeting message — staggered reveal */}
        <div className="text-center space-y-3 relative z-10">
          {[
            "May this Eid bring peace to your heart,",
            "joy to your home,",
            "and blessings to your life.",
          ].map((line, i) => (
            <motion.p
              key={i}
              className="font-body text-xl md:text-2xl text-foreground/90 leading-relaxed"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Eid Mubarak — clickable */}
        <motion.h2
          onClick={handleEidClick}
          className="font-display text-3xl md:text-4xl text-primary text-glow-gold text-center mt-8 mb-8 cursor-pointer select-none relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Eid Mubarak!
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.8 }}
        />

        {/* Signature */}
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <p className="text-muted-foreground text-sm mb-1">Designed & Developed by</p>
          <p className="font-display text-lg text-primary">Samin Yasar Sunny</p>
          <p className="text-muted-foreground text-sm mt-1">
            CSE | Mymensingh Engineering College
          </p>
        </motion.div>
      </motion.div>

      {/* Share button */}
      <motion.button
        onClick={onShare}
        className="mt-8 px-8 py-3 font-display text-base tracking-wider border border-gold/30 text-primary bg-gold/5 rounded-full backdrop-blur-sm
          hover:bg-gold/15 hover:border-gold transition-all duration-500 cursor-pointer flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <span>Share this Eid Card</span>
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          ✦
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

export default FinalCard;
