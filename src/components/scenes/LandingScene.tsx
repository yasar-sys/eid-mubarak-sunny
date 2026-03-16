import { motion } from "framer-motion";
import CrescentMoon from "@/components/CrescentMoon";
import SceneButton from "@/components/SceneButton";
import AnimatedClouds from "@/components/AnimatedClouds";

/** Scene 1: Night sky with crescent moon and opening text */
const LandingScene = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      {/* Cloud Reveal Transition */}
      <AnimatedClouds />

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow pt-16 pb-32 md:pb-48">
        {/* Radial glow behind moon */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(43 80% 55% / 0.1) 0%, transparent 60%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ scale: [1, 1.1, 1], opacity: [0, 0.8, 0.5] }}
          transition={{ duration: 6, delay: 2, repeat: Infinity }}
        />

        {/* Crescent Moon */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 2.5, ease: "easeOut" }}
          className="mb-8 mt-12"
        >
          <CrescentMoon className="w-32 h-32 md:w-44 md:h-44" />
        </motion.div>

        {/* Arabic bismillah */}
        <motion.p
          className="font-arabic text-2xl md:text-3xl text-gold/80 mb-4"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 3.5 }}
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </motion.p>

        {/* Main text */}
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-center leading-tight text-glow-moon mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 4 }}
        >
          Eid Mubarak
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-body text-lg md:text-2xl text-muted-foreground/90 text-center mb-10 max-w-lg"
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

      {/* Dark gradient overlay to blend image base gently if needed */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-night-deep to-transparent pointer-events-none z-10" />
    </motion.div>
  );
};

export default LandingScene;
