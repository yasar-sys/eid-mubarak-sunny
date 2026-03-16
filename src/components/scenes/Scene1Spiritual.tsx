import { motion } from "framer-motion";
import SceneButton from "@/components/SceneButton";

const Scene1Spiritual = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/mosque-bg.png')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 1 }}
    >
      {/* Light Rays Overlay overlaying the image */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background: "linear-gradient(45deg, transparent 40%, rgba(255,215,0,0.08) 50%, transparent 60%)",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["100% 0%", "-100% 100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-night-deep/50 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
        <motion.p
          className="font-display text-2xl md:text-5xl text-white leading-relaxed drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        >
          “Goodness is in Allah’s hands,
          <br />
          so put your trust in Him.”
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <SceneButton onClick={onNext} delay={0}>
            Continue ✦
          </SceneButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Scene1Spiritual;
