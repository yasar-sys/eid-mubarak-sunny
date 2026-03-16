import { motion } from "framer-motion";
import CrescentMoon from "@/components/CrescentMoon";
import SceneButton from "@/components/SceneButton";

/** Scene 1: Night sky with crescent moon and opening text */
const LandingScene = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      {/* Radial glow behind moon */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(43 80% 55% / 0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Crescent Moon */}
      <CrescentMoon className="w-32 h-32 md:w-44 md:h-44 mb-8" />

      {/* Arabic bismillah */}
      <motion.p
        className="font-arabic text-2xl md:text-3xl text-gold/70 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
      </motion.p>

      {/* Main text */}
      <motion.h1
        className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground text-center leading-tight text-glow-moon mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5 }}
      >
        A blessed night has arrived…
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="font-body text-lg md:text-xl text-muted-foreground text-center mb-8 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        Step into a journey of light, prayer, and celebration
      </motion.p>

      {/* Decorative line */}
      <motion.div
        className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 2 }}
      />

      {/* CTA Button */}
      <SceneButton onClick={onNext} delay={2.5}>
        Begin the Eid Journey ✦
      </SceneButton>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 3.5 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-gold/30 flex justify-center pt-1"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-gold/50"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LandingScene;
