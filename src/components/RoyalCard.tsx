import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const RoyalCard = ({ onReveal }: { onReveal: () => void }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="relative perspective-2000 py-20 px-4">
      <motion.div
        className="relative w-80 h-[480px] md:w-[400px] md:h-[560px] cursor-pointer preserve-3d group"
        onClick={() => {
          if (!isOpened) {
            setIsOpened(true);
            setTimeout(onReveal, 2500);
          }
        }}
        initial={{ rotateY: -10, rotateX: 5 }}
        animate={isOpened ? { rotateY: -180 } : { rotateY: [-5, 5, -5] }}
        transition={isOpened ? { duration: 1.5, ease: "easeInOut" } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Front of the Card */}
        <div className="absolute inset-0 backface-hidden z-20">
          <div className="w-full h-full bg-[#004d4d] rounded-2xl border-4 border-[#d4af37] shadow-2xl flex flex-col items-center justify-between p-8 overflow-hidden">
            {/* Intricate Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='%23ffd700' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }} />
            
            <div className="relative z-10 w-full flex justify-center">
               <div className="w-16 h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            </div>

            <div className="relative z-10 text-center space-y-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-24 h-24 md:w-32 md:h-32 mx-auto"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#d4af37]">
                   <path d="M50 5 Q70 5 85 20 Q95 35 95 55 Q95 75 80 90 Q65 95 50 95 Q35 95 20 80 Q5 65 5 45 Q5 25 20 10 Q35 5 50 5 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                   <path d="M50 15 Q65 15 75 25 Q85 35 85 50 Q85 65 75 75 Q65 85 50 85 Q35 85 25 75 Q15 65 15 50 Q15 35 25 25 Q35 15 50 15 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                   <path d="M50 25 L60 35 L50 45 L40 35 Z" fill="currentColor" />
                </svg>
              </motion.div>
              <h1 className="font-display text-3xl md:text-5xl gold-foil-text tracking-widest uppercase">
                Ramadan<br/>Kareem
              </h1>
            </div>

            <div className="relative z-10 w-full text-center">
               <p className="text-[#d4af37]/60 font-body text-xs tracking-[0.5em] mb-4 uppercase">
                  Tap to unfold blessings
               </p>
               <div className="w-16 h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            </div>
          </div>
        </div>

        {/* Back of the Card (Revealed after flip) */}
        <div className="absolute inset-0 backface-hidden z-10 rotate-y-180">
          <div className="w-full h-full bg-[#fdfaf1] rounded-2xl border-4 border-[#d4af37] shadow-inner p-10 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isOpened ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1, duration: 1 }}
              className="space-y-6"
            >
              <h2 className="font-display text-4xl text-[#004d4d] mb-4">Ramadan Mubarak</h2>
              <p className="font-body text-[#004d4d]/80 leading-relaxed text-lg italic">
                Wishing you a month filled with peace, <br/>
                reflection, and endless blessings.
              </p>
              <div className="w-12 h-12 mx-auto text-[#d4af37] opacity-40">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Decorative Surroundings */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
             <div className="absolute top-10 left-10 w-20 h-20 border border-[#d4af37]/20 rounded-full animate-pulse" />
             <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#d4af37]/10 rounded-full animate-pulse delay-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoyalCard;
