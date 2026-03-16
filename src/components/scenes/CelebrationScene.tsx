import { useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import MosqueSilhouette from "@/components/MosqueSilhouette";
import CrescentMoon from "@/components/CrescentMoon";
import SceneButton from "@/components/SceneButton";

/** Fire gold-themed confetti burst */
const fireConfetti = () => {
  const colors = ["#D4A843", "#F0D68A", "#B8860B", "#FFD700", "#FFF8DC"];
  confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors, shapes: ["star", "circle"] });
  setTimeout(() => {
    confetti({ particleCount: 70, angle: 60, spread: 55, origin: { x: 0 }, colors });
    confetti({ particleCount: 70, angle: 120, spread: 55, origin: { x: 1 }, colors });
  }, 400);
  setTimeout(() => {
    confetti({ particleCount: 40, spread: 120, origin: { y: 0.4 }, colors, shapes: ["star"] });
  }, 800);
};

/** Scene 3: Mosque silhouette with Eid Mubarak text and confetti */
const CelebrationScene = ({ onNext }: { onNext: () => void }) => {
  useEffect(() => {
    const timeout = setTimeout(fireConfetti, 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleEidClick = useCallback(() => fireConfetti(), []);

  // Orbiting light dots around Eid Mubarak
  const orbitDots = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i / 8) * 360,
      delay: i * 0.15,
    })), []);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(43 80% 55% / 0.06) 0%, transparent 60%)",
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Moon behind mosque */}
      <div className="relative w-full max-w-2xl">
        <CrescentMoon className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 z-0" />
        <MosqueSilhouette className="relative z-10 w-full opacity-80" />
      </div>

      {/* Eid Mubarak with orbiting dots */}
      <div className="relative mt-8 mb-6">
        {/* Orbiting dots */}
        {orbitDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-1.5 h-1.5 rounded-full bg-gold/60"
            style={{
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: [
                Math.cos((dot.angle * Math.PI) / 180) * 120,
                Math.cos(((dot.angle + 360) * Math.PI) / 180) * 120,
              ],
              y: [
                Math.sin((dot.angle * Math.PI) / 180) * 40,
                Math.sin(((dot.angle + 360) * Math.PI) / 180) * 40,
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: dot.delay,
            }}
          />
        ))}

        <motion.h1
          onClick={handleEidClick}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-primary text-glow-gold cursor-pointer select-none relative z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", damping: 10 }}
          whileHover={{ scale: 1.08, textShadow: "0 0 40px hsl(43 80% 55% / 0.7)" }}
          whileTap={{ scale: 0.95 }}
        >
          Eid Mubarak
        </motion.h1>
      </div>

      <motion.p
        className="text-muted-foreground text-sm mb-8 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >✦</motion.span>
        tap the text for a surprise
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >✦</motion.span>
      </motion.p>

      <SceneButton onClick={onNext} delay={1.8}>
        Read the Greeting ✦
      </SceneButton>
    </motion.div>
  );
};

export default CelebrationScene;
