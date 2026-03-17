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
            ENVELOPE BACK BODY
        ═══════════════════════════════════════════════ */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)]">
          {/* Main paper body — warm off-white with faint texture */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 440 290" preserveAspectRatio="none">
            <defs>
              {/* Paper texture filter */}
              <filter id="paper" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
                <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
                <feComponentTransfer in="blended">
                  <feFuncA type="linear" slope="1" />
                </feComponentTransfer>
              </filter>

              {/* Gold envelope gradient */}
              <linearGradient id="envBody" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="hsl(43,80%,60%)" />
                <stop offset="45%" stopColor="hsl(38,85%,52%)" />
                <stop offset="100%" stopColor="hsl(36,90%,42%)" />
              </linearGradient>

              {/* Flap inner face gradient (slightly lighter) */}
              <linearGradient id="flapInner" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(43,75%,68%)" />
                <stop offset="100%" stopColor="hsl(40,80%,54%)" />
              </linearGradient>

              {/* Side triangles gradient */}
              <linearGradient id="sideLeft" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(38,80%,48%)" />
                <stop offset="100%" stopColor="hsl(40,82%,54%)" />
              </linearGradient>
              <linearGradient id="sideRight" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="hsl(38,80%,48%)" />
                <stop offset="100%" stopColor="hsl(40,82%,54%)" />
              </linearGradient>

              {/* Bottom triangle gradient */}
              <linearGradient id="bottomTri" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(40,84%,55%)" />
                <stop offset="100%" stopColor="hsl(36,90%,44%)" />
              </linearGradient>

              {/* Edge fold shading */}
              <linearGradient id="edgeShade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </linearGradient>

              {/* Subtle highlight stripe */}
              <linearGradient id="highlight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>

              {/* Clip for body */}
              <clipPath id="bodyClip">
                <rect x="0" y="0" width="440" height="290" rx="12" ry="12" />
              </clipPath>
            </defs>

            {/* Full body base */}
            <rect x="0" y="0" width="440" height="290" rx="12" fill="url(#envBody)" clipPath="url(#bodyClip)" />

            {/* Paper texture overlay (very subtle) */}
            <rect x="0" y="0" width="440" height="290" rx="12" fill="url(#envBody)" filter="url(#paper)" opacity="0.06" clipPath="url(#bodyClip)" />

            {/* Islamic arabesque border pattern */}
            <rect x="6" y="6" width="428" height="278" rx="8" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <rect x="10" y="10" width="420" height="270" rx="6" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />

            {/* Corner ornaments */}
            {[
              [18, 18], [422, 18], [18, 272], [422, 272],
            ].map(([cx, cy], i) => (
              <g key={i} transform={`translate(${cx},${cy})`}>
                <circle r="4" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
                <circle r="1.5" fill="rgba(255,255,255,0.25)" />
              </g>
            ))}

            {/* Left side triangle (fold shadow) */}
            <path d="M0 0 L220 145 L0 290 Z" fill="url(#sideLeft)" opacity="0.92" />
            {/* Left inner edge line */}
            <path d="M0 0 L220 145 L0 290" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />

            {/* Right side triangle (fold shadow) */}
            <path d="M440 0 L220 145 L440 290 Z" fill="url(#sideRight)" opacity="0.92" />
            <path d="M440 0 L220 145 L440 290" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />

            {/* Bottom flap */}
            <path d="M0 290 L220 126 L440 290 Z" fill="url(#bottomTri)" />
            {/* Bottom flap top edge line */}
            <path d="M0 290 L220 126 L440 290" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" />

            {/* Highlight sheen on bottom flap */}
            <path d="M60 290 L220 160 L380 290 Z" fill="rgba(255,255,255,0.06)" />

            {/* Subtle centre diamond */}
            <path d="M210 183 L220 170 L230 183 L220 196 Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7" />

            {/* Top highlight along top edge */}
            <rect x="0" y="0" width="440" height="32" rx="12" fill="url(#highlight)" clipPath="url(#bodyClip)" />
          </svg>
        </div>

        {/* ═══════════════════════════════════════════════
            INNER CARD — slides up on open
        ═══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-[8px] top-[10px] z-10 rounded-xl overflow-hidden flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(160deg, hsl(220 40% 8% / 0.85), hsl(230 35% 12% / 0.9))",
            backdropFilter: "blur(12px)",
            border: "1px solid hsl(43 100% 60% / 0.25)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 30px rgba(0,0,0,0.5)",
          }}
          initial={{ y: 0, opacity: 1 }}
          animate={isOpen ? { y: "-75%", opacity: 1 } : { y: 0 }}
          transition={{ delay: 0.8, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          {/* Star icon */}
          <motion.div
            className="w-7 h-7 sm:w-9 sm:h-9 mb-3 text-gold/50"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </motion.div>

          <p className="font-cinzel text-foreground/70 text-[10px] sm:text-xs text-center tracking-[0.18em] uppercase leading-relaxed px-4">
            A blessed greeting<br />awaits you…
          </p>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </motion.div>

        {/* ═══════════════════════════════════════════════
            TOP FLAP — opens with realistic 3D fold
        ═══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: 178 } : { rotateX: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 440 290" className="w-full h-full" preserveAspectRatio="none" style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.4))" }}>
            <defs>
              <linearGradient id="flapFront" x1="0" y1="0" x2="0.2" y2="1">
                <stop offset="0%" stopColor="hsl(43,100%,66%)" />
                <stop offset="55%" stopColor="hsl(41,95%,56%)" />
                <stop offset="100%" stopColor="hsl(38,90%,47%)" />
              </linearGradient>
              {/* Flap inner face (shows when flipped open) */}
              <linearGradient id="flapBack" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(43,70%,74%)" />
                <stop offset="100%" stopColor="hsl(40,75%,60%)" />
              </linearGradient>
            </defs>

            {/* Flap triangle */}
            <path
              d="M0 0 L220 154 L440 0 Z"
              fill="url(#flapFront)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.4"
            />

            {/* Flap top highlight */}
            <path d="M40 0 L220 100 L400 0 Z" fill="rgba(255,255,255,0.07)" />

            {/* Flap fold crease line at bottom */}
            <path d="M10 3 L220 150 L430 3" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.6" />

            {/* Border frame */}
            <path d="M8 4 L220 148 L432 4" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" />

            {/* ── Wax seal, more realistic ── */}
            {/* Outer drip ring */}
            <ellipse cx="220" cy="100" rx="22" ry="21" fill="hsl(0,55%,28%)" opacity="0.95" />
            {/* Drip detail blobs */}
            <ellipse cx="208" cy="118" rx="5" ry="3.5" fill="hsl(0,55%,28%)" opacity="0.75" transform="rotate(-15,208,118)" />
            <ellipse cx="234" cy="120" rx="4" ry="3" fill="hsl(0,55%,28%)" opacity="0.65" transform="rotate(20,234,120)" />
            {/* Main inner circle */}
            <circle cx="220" cy="98" r="16" fill="hsl(0,52%,32%)" />
            {/* Sheen on seal */}
            <ellipse cx="215" cy="91" rx="7" ry="4" fill="rgba(255,255,255,0.12)" transform="rotate(-20,215,91)" />
            {/* Outer ring emboss */}
            <circle cx="220" cy="98" r="13.5" fill="none" stroke="hsl(43,100%,70%)" strokeWidth="0.9" opacity="0.7" />
            {/* Inner star / crescent shape */}
            <path
              d="M220 87 C225 87 229 90 229 95 C229 100 225 103 220 104 C219 104 220 104 221 102 C224 100 226 97 226 94 C226 91 224 89 221 89 C220 89 220 87 220 87 Z"
              fill="hsl(43,100%,70%)"
              opacity="0.85"
            />
            <circle cx="226" cy="86" r="2.2" fill="hsl(43,100%,78%)" opacity="0.7" />
          </svg>
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
