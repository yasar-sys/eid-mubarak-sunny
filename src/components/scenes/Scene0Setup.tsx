import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import StarField from "@/components/StarField";
import FloatingParticles from "@/components/FloatingParticles";

export type CardTemplate = "royal" | "midnight" | "ivory";
export type Gender = "male" | "female" | "not-mentioned";

export interface CardData {
  userName: string;
  gender: Gender;
  senderName: string;
  receiverName: string;
  template: CardTemplate;
}

const templates: { id: CardTemplate; name: string; desc: string; gradient: string; accent: string; border: string }[] = [
  {
    id: "royal",
    name: "Royal Teal",
    desc: "Deep teal with radiant gold",
    gradient: "from-[#003d3d] to-[#006060]",
    accent: "#d4af37",
    border: "border-[#d4af37]/60",
  },
  {
    id: "midnight",
    name: "Majestic Midnight",
    desc: "Indigo blues with silver shimmer",
    gradient: "from-[#0a0428] to-[#1a1060]",
    accent: "#c0c8d8",
    border: "border-[#8899cc]/60",
  },
  {
    id: "ivory",
    name: "Eternal Ivory",
    desc: "Warm cream with rose gold",
    gradient: "from-[#f9f3e8] to-[#f0e0c8]",
    accent: "#b07050",
    border: "border-[#b07050]/60",
  },
];

const Scene0Setup = ({ onStart }: { onStart: (data: CardData) => void }) => {
  const [step, setStep] = useState<"intro" | "details" | "template">("intro");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState<Gender>("not-mentioned");
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [template, setTemplate] = useState<CardTemplate>("royal");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateDetails = () => {
    const newErrors: Partial<Record<string, string>> = {};
    if (!userName.trim()) newErrors.userName = "Your name is required";
    if (!senderName.trim()) newErrors.senderName = "Sender name is required";
    if (!receiverName.trim()) newErrors.receiverName = "Receiver name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToTemplate = () => {
    if (validateDetails()) setStep("template");
  };

  const handleStart = () => {
    onStart({ userName, gender, senderName, receiverName, template });
  };

  const inputCls =
    "w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-foreground font-body text-base placeholder-foreground/30 focus:outline-none focus:border-gold/60 focus:bg-gold/5 transition-all duration-300";

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden bg-night-deep"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
      transition={{ duration: 1 }}
    >
      <StarField />
      <FloatingParticles count={12} />

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full bg-gold/[0.04] blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-[250px] h-[250px] rounded-full bg-moonlight/[0.03] blur-[80px]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="absolute inset-0 film-grain pointer-events-none" />

      <AnimatePresence mode="wait">
        {/* ── INTRO ── */}
        {step === "intro" && (
          <motion.div
            key="intro"
            className="relative z-20 flex flex-col items-center text-center max-w-xl w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Crescent + star icon */}
            <motion.div
              className="mb-8"
              animate={{ rotate: [0, 4, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 80 80" className="w-20 h-20 text-gold drop-shadow-[0_0_20px_hsl(43,100%,60%,0.6)]" fill="currentColor">
                <path d="M40 8 C22 8 8 22 8 40 C8 58 22 72 40 72 C46 72 51 70 56 67 C48 63 42 55 42 46 C42 33 51 23 64 22 C57 14 49 8 40 8 Z" opacity="0.9" />
                <circle cx="62" cy="20" r="4" opacity="0.7" />
                <circle cx="70" cy="35" r="2.5" opacity="0.5" />
                <circle cx="58" cy="10" r="1.8" opacity="0.4" />
              </svg>
            </motion.div>

            <motion.p
              className="font-arabic text-gold/70 text-2xl mb-2"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              عيد مبارك
            </motion.p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 leading-tight">
              Create Your <span className="text-gold text-glow-gold">Eid Card</span>
            </h1>
            <p className="font-body text-foreground/60 text-lg mb-10 leading-relaxed">
              Personalise a beautiful Eid greeting card to share with your loved ones.
              Choose your names, design, and let the magic begin.
            </p>

            <motion.button
              onClick={() => setStep("details")}
              className="relative px-12 py-4 rounded-full font-cinzel text-sm tracking-[0.3em] uppercase text-night-deep bg-gradient-to-r from-gold-light via-gold to-[hsl(43,100%,45%)] shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative z-10">Begin ✦</span>
            </motion.button>
          </motion.div>
        )}

        {/* ── DETAILS FORM ── */}
        {step === "details" && (
          <motion.div
            key="details"
            className="relative z-20 w-full max-w-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-strong rounded-3xl glass-glow p-8 flex flex-col gap-6">
              {/* Top line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

              <div className="text-center mb-2">
                <h2 className="font-cinzel text-gold text-lg tracking-widest uppercase">Your Identity</h2>
                <p className="font-body text-foreground/50 text-sm mt-1">Let us personalise your greeting</p>
              </div>

              {/* Name */}
              <div>
                <label className="block font-cinzel text-xs text-gold/60 tracking-widest uppercase mb-2">Your Name</label>
                <input
                  className={inputCls}
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => { setUserName(e.target.value); setErrors((p) => ({ ...p, userName: "" })); }}
                />
                {errors.userName && <p className="text-red-400 text-xs mt-1 font-body">{errors.userName}</p>}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gold/10" />
                <span className="font-cinzel text-xs text-gold/40 tracking-widest uppercase">Card Names</span>
                <div className="h-px flex-1 bg-gold/10" />
              </div>

              {/* Sender */}
              <div>
                <label className="block font-cinzel text-xs text-gold/60 tracking-widest uppercase mb-2">From (Sender)</label>
                <input
                  className={inputCls}
                  placeholder="e.g. Sunny"
                  value={senderName}
                  onChange={(e) => { setSenderName(e.target.value); setErrors((p) => ({ ...p, senderName: "" })); }}
                />
                {errors.senderName && <p className="text-red-400 text-xs mt-1 font-body">{errors.senderName}</p>}
              </div>

              {/* Receiver */}
              <div>
                <label className="block font-cinzel text-xs text-gold/60 tracking-widest uppercase mb-2">To (Receiver)</label>
                <input
                  className={inputCls}
                  placeholder="e.g. Family & Friends"
                  value={receiverName}
                  onChange={(e) => { setReceiverName(e.target.value); setErrors((p) => ({ ...p, receiverName: "" })); }}
                />
                {errors.receiverName && <p className="text-red-400 text-xs mt-1 font-body">{errors.receiverName}</p>}
              </div>

              {/* Gender */}
              <div>
                <label className="block font-cinzel text-xs text-gold/60 tracking-widest uppercase mb-2">Gender</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["male", "female", "not-mentioned"] as Gender[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`py-2.5 rounded-xl border font-cinzel text-xs tracking-wide capitalize transition-all duration-300 ${
                        gender === g
                          ? "bg-gold/20 border-gold text-gold shadow-[0_0_15px_hsl(43,100%,60%,0.2)]"
                          : "border-white/10 text-foreground/50 hover:border-gold/30 hover:text-foreground/80"
                      }`}
                    >
                      {g === "not-mentioned" ? "Other" : g}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={handleNextToTemplate}
                className="relative w-full py-4 rounded-2xl font-cinzel text-sm tracking-[0.2em] uppercase text-night-deep bg-gradient-to-r from-gold-light via-gold to-[hsl(43,100%,45%)] shadow-lg mt-2 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Choose Template →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── TEMPLATE PICKER ── */}
        {step === "template" && (
          <motion.div
            key="template"
            className="relative z-20 w-full max-w-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-strong rounded-3xl glass-glow p-8 flex flex-col gap-5">
              <div className="text-center mb-1">
                <h2 className="font-cinzel text-gold text-lg tracking-widest uppercase">Choose Your Design</h2>
                <p className="font-body text-foreground/50 text-sm mt-1">Select the card template for {receiverName}</p>
              </div>

              <div className="flex flex-col gap-4">
                {templates.map((t) => (
                  <motion.button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      template === t.id
                        ? `${t.border} shadow-[0_0_20px_rgba(0,0,0,0.4)] bg-white/5`
                        : "border-white/10 hover:border-white/20 hover:bg-white/5"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Template mini preview */}
                    <div className={`flex-shrink-0 w-16 h-20 rounded-xl bg-gradient-to-br ${t.gradient} border ${t.border} flex flex-col items-center justify-center gap-1 overflow-hidden`}>
                      <div className="w-8 h-[1px]" style={{ background: t.accent }} />
                      <div className="font-cinzel text-[5px] tracking-widest" style={{ color: t.accent }}>EID</div>
                      <div className="font-cinzel text-[5px] tracking-widest" style={{ color: t.accent }}>MUBARAK</div>
                      <div className="w-8 h-[1px]" style={{ background: t.accent }} />
                    </div>

                    <div className="text-left flex-1">
                      <div className="font-cinzel text-sm text-foreground tracking-wide">{t.name}</div>
                      <div className="font-body text-foreground/50 text-xs mt-0.5">{t.desc}</div>
                    </div>

                    {template === t.id && (
                      <motion.div
                        layoutId="templateCheck"
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                        style={{ borderColor: t.accent, background: `${t.accent}30` }}
                      >
                        <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
                          <path d="M2 5 L4.2 7.5 L8 3" stroke={t.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setStep("details")}
                  className="w-1/3 py-3 rounded-2xl border border-white/15 font-cinzel text-xs text-foreground/60 tracking-widest uppercase hover:border-gold/30 hover:text-foreground/80 transition-all duration-300"
                >
                  ← Back
                </button>
                <motion.button
                  onClick={handleStart}
                  className="flex-1 py-3 rounded-2xl font-cinzel text-sm tracking-[0.2em] uppercase text-night-deep bg-gradient-to-r from-gold-light via-gold to-[hsl(43,100%,45%)] shadow-lg overflow-hidden relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Begin Journey ✦
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Scene0Setup;
