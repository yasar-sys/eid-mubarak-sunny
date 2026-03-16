import { motion } from "framer-motion";

/** Glowing crescent moon SVG with animation */
const CrescentMoon = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <div className="absolute inset-0 rounded-full blur-3xl bg-gold/30 scale-[1.7] mix-blend-screen" />
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_0_35px_hsl(43,80%,60%,0.8)] mix-blend-screen"
      >
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(43, 90%, 80%)" />
            <stop offset="70%" stopColor="hsl(43, 80%, 60%)" />
            <stop offset="100%" stopColor="hsl(43, 70%, 45%)" />
          </radialGradient>
          <mask id="crescentMask">
            <rect x="0" y="0" width="200" height="200" fill="white" />
            <circle cx="130" cy="90" r="60" fill="black" />
          </mask>
        </defs>
        {/* Crescent shape using a mask so the center is truly transparent */}
        <circle cx="100" cy="100" r="70" fill="url(#moonGlow)" mask="url(#crescentMask)" />
      </svg>
    </motion.div>
  );
};

export default CrescentMoon;
