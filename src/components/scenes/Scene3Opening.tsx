import { motion } from "framer-motion";
import CrescentMoon from "@/components/CrescentMoon";
import AnimatedLanterns from "@/components/AnimatedLanterns";
import MosqueSilhouette from "@/components/MosqueSilhouette";
import SceneButton from "@/components/SceneButton";

const Scene3Opening = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden bg-night-deep"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.5 }}
    >
      <AnimatedLanterns />

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow pt-32 pb-40 w-full">
        {/* Crescent Moon */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <CrescentMoon className="w-24 h-24 md:w-32 md:h-32" />
        </motion.div>

        {/* Calligraphy Stroke Animation (Simulated via fade/blur for performance over vectors) */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center leading-tight drop-shadow-xl text-glow-moon mb-4"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
        >
          Ramadan Kareem
        </motion.h1>

        {/* Advance Button */}
        <div className="mt-16">
          <SceneButton onClick={onNext} delay={4}>
            Enter the Celebration ✦
          </SceneButton>
        </div>
      </div>

      {/* Mosque Silhouette Background Layer */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none z-0 opacity-50"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <MosqueSilhouette />
      </motion.div>
    </motion.div>
  );
};

export default Scene3Opening;
