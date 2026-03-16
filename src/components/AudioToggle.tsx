import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Audio player using an HTML5 Audio element
 */
const AudioToggle = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    const audio = new Audio("/song.webm");
    audio.loop = true;
    audio.volume = 0.5; // Set an appropriate default volume
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
    setPlaying(!playing);
  }, [playing]);

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border border-gold/30 bg-night-mid/80 backdrop-blur-md text-primary hover:bg-gold/10 hover:border-gold/60 transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? "Mute song" : "Play song"}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Volume2 className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <VolumeX className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing ring when playing */}
      {playing && (
        <motion.div
          className="absolute inset-0 rounded-full border border-gold/20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

export default AudioToggle;
