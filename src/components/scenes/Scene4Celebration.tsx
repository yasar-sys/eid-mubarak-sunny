import { motion } from "framer-motion";
import { useState } from "react";
import SceneButton from "@/components/SceneButton";
import StarField from "@/components/StarField";
import FloatingParticles from "@/components/FloatingParticles";
import QuranAyat from "@/components/QuranAyat";

const Scene4Celebration = ({ onNext }: { onNext: () => void }) => {
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number; particles: { angle: number; distance: number; color: string; size: number }[] }[]>([]);

  const triggerFirework = (e: React.MouseEvent) => {
    const colors = ["#fbbf24", "#fcd34d", "#f59e0b", "#ffffff", "#38bdf8"];
    const particles = Array.from({ length: 12 }, () => ({
      angle: Math.random() * 360,
      distance: Math.random() * 80 + 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 4 + 2,
    }));
    const newFirework = { id: Date.now(), x: e.clientX, y: e.clientY, particles };
    setFireworks((prev) => [...prev, newFirework]);
    setTimeout(() => {
      setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
    }, 1200);
  };

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden bg-night-deep"
      onClick={triggerFirework}
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <StarField />
      <FloatingParticles count={30} />

      {/* Film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-center flex-grow pt-24 pb-48 w-full cursor-pointer">
        
        {/* Ambient glow behind text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(43 100% 60% / 0.12) 0%, transparent 60%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h1
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-gold text-center leading-tight text-glow-gold mb-2"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
        >
          Eid Mubarak
        </motion.h1>

        <motion.p
          className="font-cinzel text-sm md:text-base text-gold-light/50 tracking-[0.3em] uppercase mt-6 mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          ✦ tap the sky for a surprise ✦
        </motion.p>

        <div className="mt-8 z-30 relative" onClick={(e) => e.stopPropagation()}>
          <SceneButton onClick={onNext} delay={1.8}>
            Read the Greeting ✦
          </SceneButton>
        </div>

        {/* Background Quranic Ayat */}
        <QuranAyat
          arabic="وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ"
          translation="To glorify Allah for that [to] which He has guided you (2:185)"
          className="mt-20 opacity-60"
          delay={2}
        />
      </div>

      {/* Mosque Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590076175510-9118b813739a?auto=format&fit=crop&q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/30 to-night-deep/10" />
      </motion.div>

      {/* Click Fireworks - now burst particles */}
      {fireworks.map((fw) => (
        <div key={fw.id} className="absolute pointer-events-none z-50" style={{ left: fw.x, top: fw.y }}>
          {fw.particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 8px ${p.color}`,
                left: -p.size / 2,
                top: -p.size / 2,
              }}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{
                x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                opacity: 0,
                scale: [0, 1.5, 0],
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          ))}
          {/* Central flash */}
          <motion.div
            className="absolute rounded-full bg-gold"
            style={{ left: -3, top: -3, width: 6, height: 6 }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 4, 0], opacity: [1, 0.6, 0] }}
            transition={{ duration: 0.5 }}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default Scene4Celebration;
