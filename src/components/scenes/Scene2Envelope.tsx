import { motion } from "framer-motion";
import InteractiveEnvelope from "@/components/InteractiveEnvelope";

const Scene2Envelope = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-night-deep"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1.2 }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl">
        {/* Glow behind envelope */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(43 100% 60% / 0.12) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cinematic Header Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-gold-light/80 text-lg md:text-2xl tracking-[0.4em] uppercase">
            A Blessed Invitation
          </h2>
          <div className="h-px w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </motion.div>

        {/* Interactive Envelope */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="z-20"
        >
          <InteractiveEnvelope onOpen={onNext} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Scene2Envelope;
