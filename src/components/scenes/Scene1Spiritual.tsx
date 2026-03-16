import { motion } from "framer-motion";
import SceneButton from "@/components/SceneButton";

const Scene1Spiritual = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/campus-bg.jpg')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.5 }}
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

      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-gold-light uppercase tracking-[0.4em] text-sm md:text-base font-semibold">
            Eid Mubarak From
          </h2>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
            Mymensingh <br/>
            Engineering College
          </h1>
        </motion.div>

        <motion.p
          className="mt-8 text-lg md:text-xl text-white/90 font-serif italic text-center max-w-2xl leading-relaxed drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          Celebrating the spirit of unity and devotion <br/> 
          within our beloved campus community.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <SceneButton onClick={onNext} delay={0}>
            Begin the Journey ✦
          </SceneButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Scene1Spiritual;
