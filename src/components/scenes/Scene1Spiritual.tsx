import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SceneButton from "@/components/SceneButton";

// Import backgrounds to ensure Vite handles them correctly
import bg1 from "@/assets/spiritual-bg-1.jpg";
import bg2 from "@/assets/spiritual-bg-2.jpg";
import bg3 from "@/assets/spiritual-bg-3.jpg";
import bg4 from "@/assets/spiritual-bg-4.jpg";

const Scene1Spiritual = ({ onNext }: { onNext: () => void }) => {
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [bg1, bg2, bg3, bg4];

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(bgTimer);
  }, []);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1.5 }}
    >
      {/* Cinematic Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={backgrounds[currentBg]} 
              className="w-full h-full object-cover" 
              alt="Eid Celebration Background"
            />
          </motion.div>
        </AnimatePresence>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-10" />
      </div>
      {/* Cinematic Light Rays */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden"
        style={{
          background: "linear-gradient(45deg, transparent 40%, rgba(255,215,0,0.08) 50%, transparent 60%)",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["100% 0%", "-100% 100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Sweeping light ray */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-[200px] h-[200%] bg-gradient-to-r from-transparent via-gold-light/5 to-transparent"
          style={{ rotate: "45deg" }}
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />
      </div>
      
      {/* Film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <motion.h2 
            className="text-gold-light uppercase tracking-[0.5em] text-xs md:text-sm font-cinzel"
            initial={{ opacity: 0, letterSpacing: "0.8em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 2, delay: 0.8 }}
          >
            Eid Mubarak From
          </motion.h2>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight drop-shadow-2xl">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Mymensingh
            </motion.span>
            <motion.span
              className="block text-glow-gold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Engineering College
            </motion.span>
          </h1>

          {/* Decorative divider */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.6 }}
          >
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-gold/50" />
            <div className="w-2 h-2 rotate-45 border border-gold/60" />
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-gold/50" />
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-8 text-lg md:text-xl text-foreground/80 font-body italic text-center max-w-2xl leading-relaxed drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Celebrating the spirit of unity and devotion <br/> 
          within our beloved campus community.
        </motion.p>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SceneButton onClick={onNext} delay={0}>
            Begin the Journey ✦
          </SceneButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border border-gold/30 flex justify-center pt-1"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-gold/50"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Scene1Spiritual;
