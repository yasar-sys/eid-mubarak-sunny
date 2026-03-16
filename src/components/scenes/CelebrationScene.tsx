import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import MosqueSilhouette from "@/components/MosqueSilhouette";
import CrescentMoon from "@/components/CrescentMoon";
import SceneButton from "@/components/SceneButton";

/** Fire gold-themed confetti burst */
const fireConfetti = () => {
  const colors = ["#D4A843", "#F0D68A", "#B8860B", "#FFD700", "#FFF8DC"];
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { y: 0.6 },
    colors,
    shapes: ["star", "circle"],
  });
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });
  }, 400);
};

/** Scene 3: Mosque silhouette with Eid Mubarak text and confetti */
const CelebrationScene = ({ onNext }: { onNext: () => void }) => {
  useEffect(() => {
    const timeout = setTimeout(fireConfetti, 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleEidClick = useCallback(() => {
    fireConfetti();
  }, []);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Moon behind mosque */}
      <div className="relative w-full max-w-2xl">
        <CrescentMoon className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 z-0" />
        <MosqueSilhouette className="relative z-10 w-full opacity-80" />
      </div>

      {/* Eid Mubarak text — clickable for confetti */}
      <motion.h1
        onClick={handleEidClick}
        className="font-display text-5xl md:text-7xl lg:text-8xl text-primary text-glow-gold mt-8 mb-6 cursor-pointer select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Eid Mubarak
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-sm mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        ✦ tap the text for a surprise ✦
      </motion.p>

      <SceneButton onClick={onNext} delay={1.8}>
        Read the Greeting ✦
      </SceneButton>
    </motion.div>
  );
};

export default CelebrationScene;
