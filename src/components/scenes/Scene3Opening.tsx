import { motion } from "framer-motion";
import RoyalCard from "@/components/RoyalCard";
import StarField from "@/components/StarField";
import FloatingParticles from "@/components/FloatingParticles";

const Scene3Opening = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden bg-royal-teal"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <StarField />
      <FloatingParticles count={20} color="#ffd700" />
      
      {/* Islamic pattern background */}
      <motion.div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 100 100'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='%23ffd700' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px' 
        }}
        animate={{ 
          backgroundPosition: ['0px 0px', '200px 200px'],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Ambient light orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[20%] left-[15%] w-[200px] h-[200px] rounded-full bg-gold/[0.04] blur-[80px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-[250px] h-[250px] rounded-full bg-moonlight/[0.03] blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-center w-full">
        <RoyalCard onReveal={onNext} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-gold/[0.03] to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default Scene3Opening;
