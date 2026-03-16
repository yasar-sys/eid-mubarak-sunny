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
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Lanterns row */}
      <div className="flex items-start justify-center gap-8 md:gap-16 mb-12">
        <Lantern delay={0} className="scale-75 md:scale-100" />
        <Lantern delay={0.3} className="scale-90 md:scale-110 -mt-4" />
        <Lantern delay={0.6} className="scale-75 md:scale-100" />
        <Lantern delay={0.9} className="hidden sm:flex scale-75 md:scale-100" />
        <Lantern delay={1.2} className="hidden md:flex scale-90" />
      </div>

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
