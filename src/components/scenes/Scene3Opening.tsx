import { motion } from "framer-motion";
import SceneButton from "@/components/SceneButton";
import FloatingParticles from "@/components/FloatingParticles";
import RoyalCard from "@/components/RoyalCard";
import { CardData } from "@/components/scenes/Scene0Setup";
import eidCelebrationImg from "@/assets/eid-celebration.jpg";

const Scene3Opening = ({ onNext, cardData }: { onNext: () => void; cardData: CardData }) => {
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
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/60 to-night-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-night-deep/40 via-transparent to-transparent" />
      </motion.div>

      <FloatingParticles count={15} color="#ffd700" />
      <div className="absolute inset-0 film-grain pointer-events-none z-10" />

      {/* Content overlay — card + button */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full px-4 py-12">
        {/* Greeting header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="font-cinzel text-gold/60 text-xs tracking-[0.4em] uppercase">Your Personalised Eid Greeting</p>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mt-1">
            For <span className="text-gold text-glow-gold">{cardData.receiverName}</span>
          </h2>
        </motion.div>

        {/* The actual card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <RoyalCard cardData={cardData} onReveal={onNext} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Scene3Opening;
