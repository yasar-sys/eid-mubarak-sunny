import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import StarField from "@/components/StarField";
import FloatingParticles from "@/components/FloatingParticles";
import ShootingStars from "@/components/ShootingStars";
import AudioToggle from "@/components/AudioToggle";
import ShareModal from "@/components/ShareModal";
import LandingScene from "@/components/scenes/LandingScene";
import LanternScene from "@/components/scenes/LanternScene";
import CelebrationScene from "@/components/scenes/CelebrationScene";
import FinalCard from "@/components/scenes/FinalCard";

/**
 * Main Eid Greeting page — 4 sequential scenes
 * with smooth animated transitions
 */
const Index = () => {
  const [scene, setScene] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  const nextScene = useCallback(() => {
    setScene((s) => Math.min(s + 1, 3));
  }, []);

  return (
    <div className="relative min-h-screen gradient-night overflow-hidden">
      {/* Background effects */}
      <StarField />
      <FloatingParticles count={15} />
      <ShootingStars />

      {/* Audio toggle */}
      <AudioToggle />

      {/* Scene transitions */}
      <AnimatePresence mode="wait">
        {scene === 0 && <LandingScene key="landing" onNext={nextScene} />}
        {scene === 1 && <LanternScene key="lantern" onNext={nextScene} />}
        {scene === 2 && <CelebrationScene key="celebration" onNext={nextScene} />}
        {scene === 3 && <FinalCard key="final" onShare={() => setShareOpen(true)} />}
      </AnimatePresence>

      {/* Share modal with QR code */}
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
};

export default Index;
