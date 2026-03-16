import { motion } from "framer-motion";

/** Hanging Islamic lantern with swing animation */
const Lantern = ({
  delay = 0,
  className = "",
}: {
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      style={{ transformOrigin: "top center" }}
    >
      {/* String */}
      <div className="w-px h-12 bg-gold/40" />

      {/* Lantern body */}
      <motion.div
        className="relative"
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ transformOrigin: "top center" }}
      >
        {/* Top cap */}
        <div className="w-8 h-3 mx-auto rounded-t-full gradient-gold" />

        {/* Main body */}
        <div className="relative w-16 h-24 mx-auto">
          <svg viewBox="0 0 64 96" className="w-full h-full">
            <defs>
              <linearGradient id={`lanternGrad-${delay}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(43, 80%, 60%)" />
                <stop offset="50%" stopColor="hsl(43, 90%, 70%)" />
                <stop offset="100%" stopColor="hsl(43, 70%, 45%)" />
              </linearGradient>
            </defs>
            {/* Lantern outline shape */}
            <path
              d="M16 0 Q0 24 8 48 Q12 60 16 72 Q20 84 32 96 Q44 84 48 72 Q52 60 56 48 Q64 24 48 0 Z"
              fill={`url(#lanternGrad-${delay})`}
              opacity="0.3"
              stroke="hsl(43, 80%, 55%)"
              strokeWidth="1"
            />
            {/* Inner glow */}
            <ellipse cx="32" cy="48" rx="12" ry="20" fill="hsl(43, 90%, 70%)" opacity="0.5" />
            {/* Decorative lines */}
            <line x1="32" y1="10" x2="32" y2="86" stroke="hsl(43, 80%, 55%)" strokeWidth="0.5" opacity="0.5" />
            <line x1="20" y1="48" x2="44" y2="48" stroke="hsl(43, 80%, 55%)" strokeWidth="0.5" opacity="0.5" />
          </svg>

          {/* Light glow effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gold-light/60 blur-lg animate-pulse-glow" />
          </div>
        </div>

        {/* Bottom tip */}
        <div className="w-3 h-4 mx-auto bg-gold rounded-b-full" />
      </motion.div>
    </motion.div>
  );
};

export default Lantern;
