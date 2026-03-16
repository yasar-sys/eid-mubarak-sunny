import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const GoldenMagicTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const addParticle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    const newParticle: Particle = {
      id,
      x,
      y,
      size: Math.random() * 8 + 4,
      color: Math.random() > 0.5 ? "#d4af37" : "#ffd700", // Gold and Bright Yellow
    };

    setParticles((prev) => [...prev.slice(-20), newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      addParticle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setCursorPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        addParticle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [addParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 0, x: p.x, y: p.y }}
            animate={{ 
              opacity: 0, 
              scale: Math.random() * 2, 
              x: p.x + (Math.random() - 0.5) * 50, 
              y: p.y + (Math.random() - 0.5) * 50,
              rotate: Math.random() * 360 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: "50%",
              filter: `blur(${Math.random() * 2}px) drop-shadow(0 0 5px ${p.color})`,
              left: -p.size / 2,
              top: -p.size / 2,
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Subtle cursor glow */}
      <motion.div
        className="absolute w-20 h-20 bg-gold-light/20 rounded-full blur-2xl"
        animate={{ 
          x: cursorPos.x - 40, 
          y: cursorPos.y - 40,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />
    </div>
  );
};

export default GoldenMagicTrail;
