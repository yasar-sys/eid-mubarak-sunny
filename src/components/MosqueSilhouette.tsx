import { motion } from "framer-motion";

/** Mosque silhouette SVG for the celebration scene */
const MosqueSilhouette = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <svg viewBox="0 0 800 300" className="w-full h-full">
        <defs>
          <linearGradient id="mosqueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(225, 35%, 15%)" />
            <stop offset="100%" stopColor="hsl(225, 40%, 8%)" />
          </linearGradient>
        </defs>

        {/* Main dome */}
        <path d="M300 300 L300 160 Q400 40 500 160 L500 300 Z" fill="url(#mosqueGrad)" />

        {/* Left minaret */}
        <rect x="220" y="100" width="30" height="200" fill="url(#mosqueGrad)" />
        <path d="M220 100 Q235 60 250 100 Z" fill="url(#mosqueGrad)" />
        <circle cx="235" cy="70" r="5" fill="hsl(43, 80%, 55%)" opacity="0.8" />

        {/* Right minaret */}
        <rect x="550" y="100" width="30" height="200" fill="url(#mosqueGrad)" />
        <path d="M550 100 Q565 60 580 100 Z" fill="url(#mosqueGrad)" />
        <circle cx="565" cy="70" r="5" fill="hsl(43, 80%, 55%)" opacity="0.8" />

        {/* Center dome crescent */}
        <circle cx="400" cy="75" r="8" fill="hsl(43, 80%, 55%)" opacity="0.9" />

        {/* Small domes */}
        <path d="M280 300 L280 200 Q320 160 360 200 L360 300 Z" fill="url(#mosqueGrad)" opacity="0.8" />
        <path d="M440 300 L440 200 Q480 160 520 200 L520 300 Z" fill="url(#mosqueGrad)" opacity="0.8" />

        {/* Windows */}
        <ellipse cx="400" cy="220" rx="15" ry="25" fill="hsl(43, 80%, 55%)" opacity="0.15" />
        <ellipse cx="320" cy="240" rx="8" ry="14" fill="hsl(43, 80%, 55%)" opacity="0.1" />
        <ellipse cx="480" cy="240" rx="8" ry="14" fill="hsl(43, 80%, 55%)" opacity="0.1" />

        {/* Base */}
        <rect x="200" y="290" width="400" height="10" fill="url(#mosqueGrad)" />
      </svg>
    </motion.div>
  );
};

export default MosqueSilhouette;
