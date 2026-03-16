import { motion } from "framer-motion";
import CrescentMoon from "@/components/CrescentMoon";
import SceneButton from "@/components/SceneButton";

/** Scene 1: Night sky with crescent moon and opening text */
const LandingScene = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Crescent Moon */}
      <CrescentMoon className="w-32 h-32 md:w-44 md:h-44 mb-8" />

      {/* Arabic bismillah */}
      <motion.p
        className="font-arabic text-2xl md:text-3xl text-gold/70 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
      </motion.p>

      {/* Main text */}
      <motion.h1
        className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground text-center leading-tight text-glow-moon mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5 }}
      >
        A blessed night has arrived…
      </motion.h1>

      {/* Decorative line */}
      <motion.div
        className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 2 }}
      />

      {/* CTA Button */}
      <SceneButton onClick={onNext} delay={2.5}>
        Begin the Eid Journey ✦
      </SceneButton>
    </motion.div>
  );
};

export default LandingScene;
