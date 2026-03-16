import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Ambient audio player using Web Audio API
 * Generates a soft, warm ambient drone — no external files needed
 */
const AudioToggle = () => {
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gains: GainNode[]; oscs: OscillatorNode[] } | null>(null);

  const startAudio = useCallback(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);

    // Fade in
    masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2);

    const oscs: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    // Warm ambient chord: D2, A2, D3, F#3, A3
    const frequencies = [73.42, 110, 146.83, 185, 220];
    const volumes = [0.15, 0.12, 0.1, 0.08, 0.06];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = volumes[i];

      // Gentle vibrato
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.3 + Math.random() * 0.4;
      lfoGain.gain.value = freq * 0.003;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();

      oscs.push(osc);
      gains.push(gain);
    });

    gains.push(masterGain);
    nodesRef.current = { gains, oscs };
  }, []);

  const stopAudio = useCallback(() => {
    const ctx = audioCtxRef.current;
    const nodes = nodesRef.current;
    if (ctx && nodes) {
      const masterGain = nodes.gains[nodes.gains.length - 1];
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      setTimeout(() => {
        nodes.oscs.forEach((o) => { try { o.stop(); } catch {} });
        ctx.close();
        audioCtxRef.current = null;
        nodesRef.current = null;
      }, 1200);
    }
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stopAudio();
    } else {
      startAudio();
    }
    setPlaying(!playing);
  }, [playing, startAudio, stopAudio]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        nodesRef.current?.oscs.forEach((o) => { try { o.stop(); } catch {} });
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border border-gold/30 bg-night-mid/80 backdrop-blur-md text-primary hover:bg-gold/10 hover:border-gold/60 transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
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
