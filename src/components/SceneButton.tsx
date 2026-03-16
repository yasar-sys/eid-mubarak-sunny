import { motion } from "framer-motion";

/** Elegant gold-outlined button for scene transitions */
const SceneButton = ({
  children,
  onClick,
  delay = 0,
}: {
  children: React.ReactNode;
  onClick: () => void;
  delay?: number;
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-8 py-3 font-display text-lg tracking-wider border border-gold/50 text-primary bg-gold/5 rounded-full backdrop-blur-sm
        hover:bg-gold/15 hover:border-gold hover:text-gold-light transition-all duration-500 cursor-pointer
        box-glow-gold"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
};

export default SceneButton;
