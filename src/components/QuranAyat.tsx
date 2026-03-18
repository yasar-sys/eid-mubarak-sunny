import { motion } from "framer-motion";

interface QuranAyatProps {
  arabic: string;
  translation: string;
  className?: string;
  delay?: number;
}

const QuranAyat = ({ arabic, translation, className = "", delay = 0 }: QuranAyatProps) => {
  return (
    <motion.div
      className={`flex flex-col items-center pointer-events-none select-none ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 2 }}
    >
      <div className="font-arabic text-2xl md:text-3xl text-gold mb-2 tracking-wide text-center drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
        {arabic}
      </div>
      <div className="font-cinzel text-[10px] md:text-xs text-foreground/80 uppercase tracking-[0.2em] text-center max-w-[300px]">
        {translation}
      </div>
    </motion.div>
  );
};

export default QuranAyat;
