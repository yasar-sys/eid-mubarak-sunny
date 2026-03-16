import { motion } from "framer-motion";
import { Award } from "lucide-react";

/** Corner Ribbon/Badge indicating Award Winner */
const AwardBadge = () => {
  return (
    <motion.div
      className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-night-mid/80 backdrop-blur-md shadow-[0_0_15px_rgba(250,204,21,0.2)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, type: "spring", bounce: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative flex items-center justify-center">
        <Award className="w-5 h-5 text-gold relative z-10" />
        <motion.div 
          className="absolute inset-0 bg-gold blur-md rounded-full"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="text-sm font-medium text-gold tracking-wide uppercase font-display hidden sm:block">
        Award Winner
      </span>
      <span className="text-sm font-medium text-gold tracking-wide uppercase font-display sm:hidden">
        Winner
      </span>
    </motion.div>
  );
};

export default AwardBadge;
