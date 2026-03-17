import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const GoldenMagicTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  const addParticle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    const colors = ["#d4af37", "#ffd700", "#fbbf24", "#fef3c7"];
    const newParticle: Particle = {
      id,
      x,
      y,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setParticles((prev) => [...prev.slice(-15), newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    let frameCount = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      frameCount++;
      if (frameCount % 2 === 0) addParticle(e.clientX, e.clientY);
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
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full will-change-transform"
          initial={{ opacity: 0.7, scale: 0 }}
          animate={{ 
            opacity: 0, 
            scale: 1.5,
            y: p.y + (Math.random() - 0.5) * 30 - p.y,
            x: p.x + (Math.random() - 0.5) * 30 - p.x,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
      
      {/* Subtle cursor glow */}
      <motion.div
        className="absolute w-16 h-16 bg-gold/10 rounded-full blur-2xl will-change-transform"
        animate={{ x: cursorPos.x - 32, y: cursorPos.y - 32 }}
        transition={{ type: "spring", damping: 40, stiffness: 300, mass: 0.3 }}
      />
    </div>
  );
};

export default GoldenMagicTrail;
