import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import StarField from "@/components/StarField";
import FloatingParticles from "@/components/FloatingParticles";
import ShootingStars from "@/components/ShootingStars";
import AudioToggle from "@/components/AudioToggle";
import Scene1Spiritual from "@/components/scenes/Scene1Spiritual";
import Scene2Envelope from "@/components/scenes/Scene2Envelope";
import Scene3Opening from "@/components/scenes/Scene3Opening";
import Scene4Celebration from "@/components/scenes/Scene4Celebration";
import Scene5Final from "@/components/scenes/Scene5Final";

const Index = () => {
  const [scene, setScene] = useState(0);

  const nextScene = useCallback(() => {
    setScene((s) => Math.min(s + 1, 4));
  }, []);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform mouse values into subtle positional shifts
  const bgX = useTransform(mouseX, [-1, 1], ["-1%", "1%"]);
  const bgY = useTransform(mouseY, [-1, 1], ["-1%", "1%"]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-night-deep">
      {/* Global Background Particles for 2nd-5th scenes; Scene 1 hides this via opacity */}
      {scene > 0 && (
        <motion.div
          className="absolute inset-0 w-[102%] h-[102%] -left-[1%] -top-[1%]"
          style={{ x: bgX, y: bgY }}
        >
          <StarField />
          <FloatingParticles count={15} />
          <ShootingStars />
        </motion.div>
      )}

      {/* Audio toggle */}
      <AudioToggle />

      {/* Cinematic Scene Transitions */}
      <AnimatePresence mode="wait">
        {scene === 0 && <Scene1Spiritual key="s1" onNext={nextScene} />}
        {scene === 1 && <Scene2Envelope key="s2" onNext={nextScene} />}
        {scene === 2 && <Scene3Opening key="s3" onNext={nextScene} />}
        {scene === 3 && <Scene4Celebration key="s4" onNext={nextScene} />}
        {scene === 4 && <Scene5Final key="s5" />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
