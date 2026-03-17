import { motion } from "framer-motion";
import InteractiveEnvelope from "@/components/InteractiveEnvelope";

const Scene2Envelope = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-night-deep"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient background glow layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-moonlight/[0.02] blur-[80px]" />
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl">
        {/* Radial glow behind envelope */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(43 100% 60% / 0.1) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <h2 className="font-cinzel text-gold-light/70 text-sm md:text-lg tracking-[0.5em] uppercase">
            A Blessed Invitation
          </h2>
          <motion.div 
            className="h-px w-0 mx-auto mt-4 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            animate={{ width: "6rem" }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </motion.div>

        {/* Interactive Envelope */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="z-20"
        >
          <InteractiveEnvelope onOpen={onNext} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Scene2Envelope;
