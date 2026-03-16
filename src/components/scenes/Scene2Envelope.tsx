import { motion } from "framer-motion";

const Scene2Envelope = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-night-deep"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1.5 }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Glow behind envelope */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(43 100% 60% / 0.15) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Envelope */}
        <motion.img
          src="/golden-envelope.png"
          alt="Golden Eid Envelope"
          className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain drop-shadow-2xl z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        />

        {/* Open Button */}
        <motion.button
          onClick={onNext}
          className="mt-12 z-20 px-8 py-3 rounded-full border border-gold/50 bg-night/80 text-gold uppercase tracking-[0.2em] text-sm font-semibold backdrop-blur-md hover:bg-gold hover:text-night transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Open the Card
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Scene2Envelope;
