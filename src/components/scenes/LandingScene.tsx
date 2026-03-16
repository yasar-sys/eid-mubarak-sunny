import { motion } from "framer-motion";
import SceneButton from "@/components/SceneButton";
import AnimatedClouds from "@/components/AnimatedClouds";

/** Scene 1: Night sky with opening text inside the watercolor arch */
const LandingScene = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      {/* Cloud Reveal Transition */}
      <AnimatedClouds />

      <div className="relative z-10 flex flex-col items-center justify-start flex-grow pt-32 md:pt-40 pb-32">
        {/* Arabic bismillah */}
        <motion.p
          className="font-arabic text-2xl md:text-3xl text-gold/90 mb-6 drop-shadow-md"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 3.5 }}
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </motion.p>

        {/* Main text */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center leading-tight drop-shadow-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 4 }}
        >
          Eid Mubarak
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-body text-lg md:text-2xl text-white/90 text-center mb-12 max-w-lg drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8, duration: 1 }}
        >
          May the divine blessings of Allah bring you hope, faith, and joy on Eid and forever.
        </motion.p>

        {/* CTA Button */}
        <SceneButton onClick={onNext} delay={6}>
          Begin the Celebration ✦
        </SceneButton>
      </div>
    </motion.div>
  );
};

export default LandingScene;
