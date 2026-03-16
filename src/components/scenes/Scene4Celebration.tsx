import { motion } from "framer-motion";
import { useState } from "react";
import SceneButton from "@/components/SceneButton";
import MosqueSilhouette from "@/components/MosqueSilhouette";
import StarField from "@/components/StarField";
import FloatingParticles from "@/components/FloatingParticles";

const Scene4Celebration = ({ onNext }: { onNext: () => void }) => {
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number }[]>([]);

  // Simple localized spark effect for clicks
  const triggerFirework = (e: React.MouseEvent) => {
    const newFirework = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setFireworks((prev) => [...prev, newFirework]);
    // Clean up
    setTimeout(() => {
      setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
    }, 1000);
  };

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden bg-night-deep"
      onClick={triggerFirework}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.5 }}
    >
      <StarField />
      <FloatingParticles count={25} />

      <div className="relative z-20 flex flex-col items-center justify-center flex-grow pt-24 pb-48 w-full cursor-pointer">
        
        {/* Main interactive text */}
        <motion.h1
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-gold text-center leading-tight drop-shadow-2xl text-glow-gold mb-2 transition-transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, type: "spring" }}
        >
          Eid Mubarak
        </motion.h1>

        <motion.p
          className="font-body text-sm md:text-base text-gold-light/60 tracking-widest uppercase mt-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          ✦ tap the sky for a surprise ✦
        </motion.p>

        {/* Advance Button */}
        <div className="mt-8 z-30 relative" onClick={(e) => e.stopPropagation()}>
          <SceneButton onClick={onNext} delay={4}>
            Read the Greeting ✦
          </SceneButton>
        </div>
      </div>

      {/* Mosque Silhouette moving into sharper focus and glowing */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none z-10 opacity-70"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2 }}
      >
        {/* Glow behind mosque */}
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-gold/10 to-transparent" />
        <MosqueSilhouette />
      </motion.div>

      {/* Click Fireworks */}
      {fireworks.map((fw) => (
        <motion.div
          key={fw.id}
          className="absolute pointer-events-none z-50 rounded-full bg-gold shadow-[0_0_20px_rgba(250,204,21,1)]"
          style={{ left: fw.x, top: fw.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 5, 10], opacity: [1, 0.8, 0] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
};

export default Scene4Celebration;
