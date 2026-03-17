import { useMemo } from "react";
import { motion } from "framer-motion";

/** Floating particles with smooth GPU-accelerated motion */
const FloatingParticles = ({ 
  count = 20,
  color 
}: { 
  count?: number;
  color?: string;
}) => {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const goldPalette = ["#fbbf24", "#fcd34d", "#d4af37", "#f59e0b", "#fef3c7"];
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1.5,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.35 + 0.15,
        color: color || goldPalette[Math.floor(Math.random() * goldPalette.length)],
        sway: (Math.random() - 0.5) * 80,
      };
    }),
    [count, color]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: p.left,
            bottom: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -window.innerHeight - 50],
            x: [0, p.sway, 0],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
