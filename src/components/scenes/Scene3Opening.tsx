import { motion } from "framer-motion";
import SceneButton from "@/components/SceneButton";
import FloatingParticles from "@/components/FloatingParticles";
import eidCelebrationImg from "@/assets/eid-celebration.jpg";

const Scene3Opening = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Full-screen celebration background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
      >
        <img
          src={eidCelebrationImg}
          alt="Muslims celebrating Eid together"
          className="w-full h-full object-cover"
        />
        {/* Cinematic overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/50 to-night-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-night-deep/40 via-transparent to-transparent" />
      </motion.div>

      <FloatingParticles count={15} color="#ffd700" />

      {/* Film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none z-10" />

      {/* Content overlay */}
      <div className="relative z-20 flex flex-col items-center justify-end min-h-screen w-full pb-12 md:pb-20 px-4">
        {/* Glassmorphism content card */}
        <motion.div
          className="glass-strong rounded-3xl glass-glow p-6 md:p-10 max-w-lg w-full text-center"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top decorative line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <motion.p
            className="font-arabic text-gold-light/80 text-xl md:text-2xl mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            عيد مبارك
          </motion.p>

          <motion.h2
            className="font-display text-2xl md:text-4xl text-foreground font-bold mb-3 leading-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            The Joy of <span className="text-gold text-glow-gold">Togetherness</span>
          </motion.h2>

          <motion.p
            className="font-body text-foreground/70 text-sm md:text-base leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            After a month of devotion and reflection, <br className="hidden md:block" />
            we come together to celebrate with love and gratitude.
          </motion.p>

          {/* Divider */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <SceneButton onClick={onNext} delay={0}>
              Continue the Journey ✦
            </SceneButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Scene3Opening;
