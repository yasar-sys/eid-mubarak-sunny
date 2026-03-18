import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import StarField from "@/components/StarField";
import RoyalCard from "@/components/RoyalCard";
import { CardData } from "@/components/scenes/Scene0Setup";
import QuranAyat from "@/components/QuranAyat";

const Scene3Opening = ({ onNext, cardData }: { onNext: () => void; cardData: CardData }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
      transition={{ duration: 1.2 }}
    >
      <StarField />
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        className="relative z-20 text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <QuranAyat
          arabic="وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ"
          translation="And your Lord says, 'Call upon Me; I will respond to you' (40:60)"
          className="mb-6"
          delay={0.8}
        />
        <span className="font-cinzel text-gold-light text-xs tracking-[0.4em] uppercase opacity-60">For You</span>
        <h2 className="font-display text-4xl md:text-5xl text-foreground mt-2">
          {cardData.receiverName}'s <span className="text-gold text-glow-gold">Gift</span>
        </h2>
      </motion.div>

      <div className="relative z-20 w-full flex flex-col items-center">
        <RoyalCard 
          cardData={cardData} 
          onReveal={() => setIsRevealed(true)} 
        />

        {/* Manual Next Button */}
        <AnimatePresence>
          {isRevealed && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="mt-16 group flex items-center gap-3 px-8 py-3 rounded-full glass border border-gold/30 text-gold-light font-cinzel text-sm tracking-[0.2em] uppercase hover:bg-gold/10 transition-all duration-300"
            >
              Next Scene
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent" />
        <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase">Interactive</span>
      </div>
    </motion.div>
  );
};

export default Scene3Opening;
