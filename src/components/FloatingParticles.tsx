import { useMemo } from "react";
import { motion } from "framer-motion";

/** Floating golden particles that drift upward — adds depth to scenes */
const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const colors = ["#FACC15", "#38BDF8", "#F472B6", "#A78BFA", "#4ADE80"]; // gold, sky, pink, purple, green
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    }),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: -20,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}` // add glow
          }}
          animate={{
            y: [0, -window.innerHeight - 50],
            x: [0, Math.sin(p.id) * 60, 0], // increased sway
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
