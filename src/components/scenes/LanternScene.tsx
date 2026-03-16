import { useState } from "react";
import { motion } from "framer-motion";
import Lantern from "@/components/Lantern";
import TypewriterText from "@/components/TypewriterText";
import SceneButton from "@/components/SceneButton";

/** Scene 2: Hanging lanterns with typewriter message */
const LanternScene = ({ onNext }: { onNext: () => void }) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      {/* Warm ambient glow behind lanterns */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
        style={{
          background: "radial-gradient(ellipse at center top, hsl(43 80% 55% / 0.06) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Lanterns row */}
      <div className="flex items-start justify-center gap-6 md:gap-14 mb-12">
        <Lantern delay={0} className="scale-[0.6] md:scale-90" />
        <Lantern delay={0.2} className="scale-75 md:scale-100 -mt-6" />
        <Lantern delay={0.4} className="scale-[0.85] md:scale-110 -mt-3" />
        <Lantern delay={0.6} className="scale-75 md:scale-100 -mt-6" />
        <Lantern delay={0.8} className="scale-[0.6] md:scale-90" />
        <Lantern delay={1.0} className="hidden sm:flex scale-[0.6] md:scale-90 -mt-2" />
        <Lantern delay={1.2} className="hidden md:flex scale-75" />
      </div>

      {/* Decorative Islamic pattern divider */}
      <motion.div
        className="flex items-center gap-3 mb-8"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
        <div className="w-2 h-2 rotate-45 border border-gold/50" />
        <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
        <div className="w-2 h-2 rotate-45 border border-gold/50" />
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
      </motion.div>

      {/* Typewriter message */}
      <TypewriterText
        text="A month of patience, prayer, and kindness comes to an end."
        className="font-body text-xl md:text-2xl lg:text-3xl text-foreground/90 text-center max-w-2xl leading-relaxed mb-10"
        speed={40}
        delay={1500}
        onComplete={() => setShowButton(true)}
      />

      {/* Reveal button */}
      {showButton && (
        <SceneButton onClick={onNext} delay={0.3}>
          Reveal the Blessing ✦
        </SceneButton>
      )}
    </motion.div>
  );
};

export default LanternScene;
