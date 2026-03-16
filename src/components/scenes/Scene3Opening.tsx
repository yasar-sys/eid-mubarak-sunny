import { motion } from "framer-motion";
import RoyalCard from "@/components/RoyalCard";
import StarField from "@/components/StarField";
import FloatingParticles from "@/components/FloatingParticles";

const Scene3Opening = ({ onNext }: { onNext: () => void }) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden bg-royal-teal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Background Ambience */}
      <StarField />
      <FloatingParticles count={20} color="#ffd700" />
      
      {/* Animated Islamic Patterns in background */}
      <motion.div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 100 100'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='%23ffd700' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px' 
        }}
        animate={{ 
          backgroundPosition: ['0px 0px', '200px 200px'],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      {/* Main Content: The Royal Card */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full">
        <RoyalCard onReveal={onNext} />
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#ffd700]/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default Scene3Opening;
