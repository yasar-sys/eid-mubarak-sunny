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
      <div className="font-arabic text-xl md:text-2xl text-foreground/15 mb-2 tracking-wide text-center">
        {arabic}
      </div>
      <div className="font-cinzel text-[8px] md:text-[10px] text-foreground/10 uppercase tracking-[0.2em] text-center max-w-[250px]">
        {translation}
      </div>
    </motion.div>
  );
};

export default QuranAyat;
