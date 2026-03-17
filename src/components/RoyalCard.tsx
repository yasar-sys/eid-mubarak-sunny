import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { CardData, CardTemplate } from "@/components/scenes/Scene0Setup";

/* ─── Per-template visual configs ─── */
const THEMES: Record<CardTemplate, {
  bg: string; border: string; accent: string; accentLight: string; accentFoil: string;
  textDark: string; backBg: string; sealColor: string; pattern: string;
}> = {
  royal: {
    bg: "linear-gradient(145deg, #003d3d 0%, #005555 45%, #003030 100%)",
    border: "#c8a84b",
    accent: "#d4af37",
    accentLight: "#f0cc66",
    accentFoil: "linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fcf6ba, #aa771c)",
    textDark: "#003030",
    backBg: "linear-gradient(145deg, #fdfaf0 0%, #f5edd8 100%)",
    sealColor: "#8b1a1a",
    pattern: "rgba(212,175,55,0.08)",
  },
  midnight: {
    bg: "linear-gradient(145deg, #080320 0%, #150b45 50%, #06021a 100%)",
    border: "#8090bb",
    accent: "#aab8d8",
    accentLight: "#ccd8f0",
    accentFoil: "linear-gradient(to right, #a0a8c0, #e8ecf8, #8890b0, #e0e8f8, #90a0c8)",
    textDark: "#06021a",
    backBg: "linear-gradient(145deg, #f0f4ff 0%, #e0e8f8 100%)",
    sealColor: "#2c1a6e",
    pattern: "rgba(160,176,216,0.07)",
  },
  ivory: {
    bg: "linear-gradient(145deg, #f8f0e0 0%, #f4e4c8 50%, #ecdcc0 100%)",
    border: "#a06840",
    accent: "#b07848",
    accentLight: "#d09060",
    accentFoil: "linear-gradient(to right, #8b5a2b, #d4956a, #8b4513, #c87941, #7a3e1a)",
    textDark: "#3a1e0a",
    backBg: "linear-gradient(145deg, #fff8ee 0%, #f5ead8 100%)",
    sealColor: "#5c2c0a",
    pattern: "rgba(160,104,64,0.07)",
  },
};

const RoyalCard = ({ onReveal, cardData }: { onReveal: () => void; cardData: CardData }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const theme = THEMES[cardData.template];
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
        style: {
          transform: 'none',
          borderRadius: '16px'
        }
      });
      const link = document.createElement('a');
      link.download = `eid-card-${cardData.receiverName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-280, 280], [12, -12]), { damping: 22, stiffness: 90 });
  const rotateY = useSpring(useTransform(mouseX, [-280, 280], [-12, 12]), { damping: 22, stiffness: 90 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isOpened) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const genderTitle = cardData.gender === "male" ? "Brother" : cardData.gender === "female" ? "Sister" : "Friend";

  return (
    <div className="relative py-16 px-4 flex flex-col items-center" style={{ perspective: 1400 }}>
      {/* Decorative orbits */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 pointer-events-none">
            <div className="absolute top-8 left-8 w-24 h-24 rounded-full border pointer-events-none" style={{ borderColor: `${theme.accent}20` }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="w-full h-full rounded-full border border-dashed" style={{ borderColor: `${theme.accent}15` }} />
            </div>
            <div className="absolute bottom-16 right-8 w-16 h-16 rounded-full border" style={{ borderColor: `${theme.accent}15` }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative w-72 h-[440px] md:w-[380px] md:h-[530px] cursor-pointer"
        style={{ transformStyle: "preserve-3d", rotateX: isOpened ? 0 : rotateX, rotateY: isOpened ? 0 : rotateY }}
        animate={isOpened ? { rotateY: -180 } : {}}
        transition={isOpened ? { duration: 1.6, ease: [0.4, 0, 0.2, 1] } : { type: "spring", damping: 28 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => { if (!isOpened) { setIsOpened(true); setTimeout(onReveal, 2600); } }}
      >
        {/* ══════════════ FRONT ══════════════ */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: "hidden", background: theme.bg, border: `3px solid ${theme.border}`, boxShadow: `0 30px 80px -15px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.12)` }}>
          {/* Gloss reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

          {/* Pattern overlay — diamond grid */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Cpath d='M25 2 L48 25 L25 48 L2 25 Z' fill='none' stroke='%23fff' stroke-width='0.7'/%3E%3C/svg%3E")`,
            backgroundSize: "28px 28px",
          }} />

          {/* Islamic arch motif at top */}
          <svg viewBox="0 0 380 60" className="absolute top-0 left-0 w-full" preserveAspectRatio="none">
            <path d="M0 60 Q95 10 190 30 Q285 50 380 0 L380 0 L0 0 Z" fill={`${theme.accent}12`} />
            <path d="M0 0 Q95 50 190 30 Q285 10 380 60" fill="none" stroke={`${theme.accent}`} strokeWidth="0.7" opacity="0.3" />
          </svg>

          {/* Top separator */}
          <div className="absolute top-6 left-0 w-full flex justify-center">
            <div className="w-2/3 h-px bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent" style={{ "--accent": theme.accent } as React.CSSProperties} />
          </div>

          {/* To: label */}
          <div className="absolute top-9 left-0 w-full text-center">
            <p className="font-cinzel text-[9px] tracking-[0.35em] uppercase" style={{ color: `${theme.accentLight}80` }}>
              To: {cardData.receiverName}
            </p>
          </div>

          {/* Centre content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
            {/* Crescent icon */}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 md:w-24 md:h-24"
            >
              <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                <circle cx="40" cy="40" r="35" stroke={theme.accent} strokeWidth="1" opacity="0.25" />
                <circle cx="40" cy="40" r="28" stroke={theme.accent} strokeWidth="0.6" opacity="0.15" />
                <path
                  d="M40 14 C25 14 14 26 14 40 C14 54 25 66 40 66 C44 66 48 65 52 63 C45 59 40 52 40 44 C40 33 47 24 58 22 C52 17 46 14 40 14 Z"
                  fill={theme.accent}
                  style={{ filter: `drop-shadow(0 0 8px ${theme.accent}70)` }}
                />
                <circle cx="56" cy="21" r="3.5" fill={theme.accentLight} opacity="0.6" />
                <circle cx="63" cy="34" r="2" fill={theme.accentLight} opacity="0.4" />
              </svg>
            </motion.div>

            {/* Gold foil title */}
            <h1
              className="font-display text-3xl md:text-4xl font-bold tracking-widest text-center uppercase"
              style={{ background: theme.accentFoil, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Eid<br />Mubarak
            </h1>

            <p className="font-arabic text-xl md:text-2xl" style={{ color: theme.accentLight, opacity: 0.8 }}>عيد مبارك</p>
          </div>

          {/* Wax seal with gesture */}
          <div className="absolute bottom-10 left-0 w-full flex flex-col items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.12, rotate: 6 }}
              className="w-14 h-14 rounded-full flex items-center justify-center relative"
              style={{ background: theme.sealColor, border: `2px solid ${theme.accent}70`, boxShadow: `0 0 20px ${theme.sealColor}80` }}
            >
              <svg viewBox="0 0 40 40" className="w-8 h-8">
                <path d="M20 5 L24 14 L34 14 L26 20 L29 29 L20 24 L11 29 L14 20 L6 14 L16 14 Z" fill={theme.accent} opacity="0.9" />
              </svg>
              <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-10" />
            </motion.div>

            <p className="font-cinzel text-[9px] md:text-[10px] tracking-[0.4em] uppercase" style={{ color: `${theme.accentLight}50` }}>
              Tap to unfold
            </p>

            <div className="w-1/2 h-px bg-gradient-to-r from-transparent mx-4" style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.accent}40, transparent)` }} />

            {/* From label */}
            <p className="font-cinzel text-[9px] tracking-[0.35em] uppercase pb-1" style={{ color: `${theme.accentLight}70` }}>
              From: {cardData.senderName}
            </p>
          </div>
        </div>

        {/* ══════════════ BACK ══════════════ */}
        <div
          ref={cardRef}
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: theme.backBg, border: `3px solid ${theme.border}`, boxShadow: "0 30px 70px -15px rgba(0,0,0,0.6)" }}
        >
          {/* Light texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='30' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }} />

          {/* Corner accents */}
          {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-6 h-6`} style={{ border: `1px solid ${theme.accent}40`, borderRadius: i === 0 ? "8px 0 0 0" : i === 1 ? "0 8px 0 0" : i === 2 ? "0 0 0 8px" : "0 0 8px 0" }} />
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={isOpened ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col h-full items-center justify-center px-8 text-center gap-4"
          >
            {/* Top decorative rule */}
            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: theme.border }} />

            <p className="font-arabic text-2xl md:text-3xl" style={{ color: theme.accent }}> عيد مبارك</p>

            <h2 className="font-display text-2xl md:text-3xl font-semibold" style={{ color: theme.textDark }}>
              Dear {genderTitle},<br />
              <span style={{ fontSize: "0.9em" }}>{cardData.receiverName}</span>
            </h2>

            <p className="font-body text-base md:text-lg leading-relaxed italic" style={{ color: `${theme.textDark}CC` }}>
              On this blessed Eid, may Allah shower you with prosperity, peace and endless joy.
              Wishing you and your family a truly beautiful celebration.
            </p>

            <div className="flex items-center gap-3 w-full justify-center">
              <div className="h-px flex-1 bg-current opacity-20" style={{ color: theme.border }} />
              <div className="w-1.5 h-1.5 rotate-45 opacity-60" style={{ background: theme.accent }} />
              <div className="h-px flex-1 bg-current opacity-20" style={{ color: theme.border }} />
            </div>

            <div className="text-center">
              <p className="font-cinzel text-xs tracking-[0.2em] uppercase" style={{ color: `${theme.textDark}80` }}>With love & blessings</p>
              <p className="font-display text-lg font-semibold mt-1" style={{ color: theme.accent }}>{cardData.senderName}</p>
            </div>

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadCard}
              disabled={isDownloading}
              className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-cinzel tracking-widest uppercase transition-all duration-300"
              style={{ borderColor: `${theme.accent}40`, color: theme.textDark, background: `${theme.accent}10` }}
            >
              <Download className={`w-3 h-3 ${isDownloading ? 'animate-bounce' : ''}`} />
              {isDownloading ? 'Saving...' : 'Download Card'}
            </motion.button>

            {/* Bottom rule */}
            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: theme.border }} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoyalCard;
