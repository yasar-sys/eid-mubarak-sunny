import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { useState, useRef } from "react";

const InteractiveEnvelope = ({ onOpen }: { onOpen: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt for realism
  const tiltX = useSpring(0, { stiffness: 80, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 80, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isOpen) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    tiltX.set(((e.clientY - cy) / rect.height) * 12);
    tiltY.set(((e.clientX - cx) / rect.width) * -12);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setIsHovered(false);
  };

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(onOpen, 2400);
    }
  };

  return (
    <div className="relative flex flex-col items-center" style={{ perspective: 900 }}>
      {/* Ground shadow */}
      <motion.div
        className="absolute -bottom-8 w-4/5 h-6 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)" }}
        animate={isOpen ? { scaleX: 0.7, opacity: 0.2 } : isHovered ? { scaleX: 1.08, opacity: 0.5 } : { scaleX: 1, opacity: 0.4 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        ref={containerRef}
        className="relative w-[280px] h-[185px] sm:w-[360px] sm:h-[238px] md:w-[440px] md:h-[290px] cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        onClick={handleOpen}
        style={{ rotateX: tiltX, rotateY: tiltY }}
        animate={isOpen ? { y: -6, scale: 1.01 } : isHovered ? { y: -8 } : { y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        {/* ── Ambient glow ── */}
        <motion.div
          className="absolute -inset-10 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(43 100% 58% / 0.12) 0%, transparent 65%)" }}
          animate={isOpen ? { opacity: [0.4, 1, 0] } : { opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: isOpen ? 2 : 5, repeat: isOpen ? 0 : Infinity }}
        />

        {/* ═══════════════════════════════════════════════
            ENVELOPE BACK BODY (z-0)
        ═══════════════════════════════════════════════ */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] z-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 440 290" preserveAspectRatio="none">
            <defs>
              <filter id="paper" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
                <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
              </filter>
              <linearGradient id="envBack" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="hsl(43,75%,58%)" />
                <stop offset="100%" stopColor="hsl(36,85%,40%)" />
              </linearGradient>
            </defs>
            {/* Base paper */}
            <rect x="0" y="0" width="440" height="290" rx="12" fill="url(#envBack)" />
            {/* Subtle inner shadow for depth */}
            <rect x="10" y="10" width="420" height="270" rx="8" fill="rgba(0,0,0,0.15)" filter="blur(8px)" />
            {/* Corner ornaments */}
            {[[18, 18], [422, 18], [18, 272], [422, 272]].map(([cx, cy], i) => (
              <g key={i} transform={`translate(${cx},${cy})`}>
                <circle r="4" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <circle r="1.5" fill="rgba(255,255,255,0.12)" />
              </g>
            ))}
          </svg>
        </div>

        {/* ═══════════════════════════════════════════════
            INNER CARD (z-10) — slides up on open
        ═══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-[12px] top-[14px] z-10 rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center"
          style={{
            background: "linear-gradient(160deg, hsl(220 45% 10% / 0.95), hsl(230 40% 14% / 0.98))",
            backdropFilter: "blur(16px)",
            border: "1px solid hsl(43 100% 60% / 0.3)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 15px 35px rgba(0,0,0,0.4)",
          }}
          initial={{ y: 0, opacity: 0, scale: 0.92 }}
          animate={isOpen ? { y: "-82%", opacity: 1, scale: 1 } : { y: 0, opacity: 0, scale: 0.92 }}
          transition={{ 
            delay: 0.6, 
            duration: 1.4, 
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.8, delay: 0.7 }
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          {/* Star icon */}
          <motion.div
            className="w-8 h-8 md:w-12 md:h-12 mb-4 text-gold/60"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </motion.div>

          <p className="font-cinzel text-foreground/80 text-xs md:text-sm tracking-[0.2em] uppercase leading-loose px-2">
            A sacred message<br />is prepared for you…
          </p>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        </motion.div>

        {/* ═══════════════════════════════════════════════
            ENVELOPE FRONT BODY (z-20) — Side & Bottom flaps
        ═══════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 440 290" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sideGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(38,80%,46%)" />
                <stop offset="100%" stopColor="hsl(40,85%,54%)" />
              </linearGradient>
              <linearGradient id="bottomGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(40,84%,56%)" />
                <stop offset="100%" stopColor="hsl(36,90%,42%)" />
              </linearGradient>
            </defs>
            {/* Left side flap */}
            <path d="M0 0 L220 145 L0 290 Z" fill="url(#sideGrad)" />
            <path d="M0 0 L220 145 L0 290" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
            
            {/* Right side flap */}
            <path d="M440 0 L220 145 L440 290 Z" fill="url(#sideGrad)" transform="scale(-1, 1) translate(-440, 0)" />
            <path d="M440 0 L220 145 L440 290" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />

            {/* Bottom flap */}
            <path d="M0 290 L220 126 L440 290 Z" fill="url(#bottomGrad)" />
            <path d="M0 290 L220 126 L440 290" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            
            {/* Sheen on bottom flap */}
            <path d="M40 290 L220 160 L400 290 Z" fill="rgba(255,255,255,0.05)" />
          </svg>
        </div>

        {/* ═══════════════════════════════════════════════
            TOP FLAP (z-30) — opens with realistic 3D fold
        ═══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center"
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg viewBox="0 0 440 290" className="w-full h-full" preserveAspectRatio="none" style={{ filter: "drop-shadow(0 8px 25px rgba(0,0,0,0.4))", backfaceVisibility: "hidden" }}>
            <defs>
              <linearGradient id="flapGrad" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="hsl(43,100%,68%)" />
                <stop offset="60%" stopColor="hsl(41,95%,58%)" />
                <stop offset="100%" stopColor="hsl(38,90%,48%)" />
              </linearGradient>
            </defs>

            {/* Front of the flap (triangle) */}
            <path d="M0 0 L220 155 L440 0 Z" fill="url(#flapGrad)" />
            {/* Border frame */}
            <path d="M10 5 L220 148 L430 5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

            {/* ── Realistic Wax Seal ── */}
            <g transform="translate(220, 105)">
              {/* Outer seal body */}
              <circle r="24" fill="hsl(0,60%,24%)" opacity="0.95" />
              <path d="M-22 8 Q-28 18 -15 22 Q-5 25 5 21 Q18 18 22 8" fill="hsl(0,60%,24%)" opacity="0.8" />
              <circle r="18" fill="hsl(0,55%,32%)" />
              {/* Embossed detail */}
              <circle r="15" fill="none" stroke="hsl(43,100%,75%)" strokeWidth="1" opacity="0.6" />
              <path d="M-6 -4 Q0 -10 6 -4 Q0 10 -6 -4" fill="hsl(43,100%,75%)" opacity="0.8" />
              <circle cy="-8" r="3" fill="hsl(43,100%,80%)" opacity="0.6" />
            </g>
          </svg>

          {/* Back of the flap (visible when open) */}
          <div 
            className="absolute inset-0 bg-gold-dark/95 backdrop-blur-sm" 
            style={{ 
              transform: "rotateX(180deg)", 
              backfaceVisibility: "hidden",
              clipPath: "polygon(0 0, 50% 53.5%, 100% 0)",
              borderTop: "1px solid rgba(255,255,255,0.1)"
            }} 
          />
        </motion.div>

        {/* ═══════════════════════════════════════════════
            TAP INDICATOR
        ═══════════════════════════════════════════════ */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute inset-0 z-40 flex items-end justify-center pb-4 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="px-5 py-2 rounded-full text-[10px] sm:text-xs font-cinzel tracking-[0.35em] uppercase"
                style={{
                  background: "hsl(220 40% 8% / 0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid hsl(43 100% 60% / 0.25)",
                  color: "hsl(43 100% 80%)",
                }}
                animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                Tap to Open ✦
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════
            LIGHT BURST ON OPEN
        ═══════════════════════════════════════════════ */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute inset-0 z-[5] rounded-2xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.8 }}
              style={{ background: "radial-gradient(circle, hsl(43 100% 72% / 0.45) 0%, transparent 70%)" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InteractiveEnvelope;
