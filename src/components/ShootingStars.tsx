import { useMemo } from "react";
import { motion } from "framer-motion";

/** Shooting stars that streak across the sky */
const ShootingStars = () => {
  const stars = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 60 + 20}%`,
      delay: Math.random() * 10 + i * 3,
      duration: 1 + Math.random() * 0.5,
      angle: 25 + Math.random() * 20,
    })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            transform: `rotate(${s.angle}deg)`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, 200],
            y: [0, 100],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 8 + Math.random() * 6,
          }}
        >
          {/* Streak line */}
          <div
            className="h-px bg-gradient-to-l from-star via-star/50 to-transparent"
            style={{ width: 60 + Math.random() * 40 }}
          />
          {/* Head glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-star blur-sm" />
        </motion.div>
      ))}
    </div>
  );
};

export default ShootingStars;
