import { useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

/** Scene 4: Final greeting card with share functionality */
const FinalCard = () => {
  const handleShare = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied! Share the Eid blessings ✦");
    }).catch(() => {
      toast.error("Could not copy link");
    });
  }, []);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Card container */}
      <motion.div
        className="relative max-w-lg w-full p-8 md:p-12 rounded-2xl border border-gold/20 bg-night-mid/80 backdrop-blur-xl box-glow-gold"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Decorative corner elements */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-gold/30 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-gold/30 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-gold/30 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-gold/30 rounded-br-lg" />

        {/* Arabic header */}
        <motion.p
          className="font-arabic text-2xl md:text-3xl text-gold text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          عيد مبارك
        </motion.p>

        {/* Divider */}
        <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-8" />

        {/* Greeting message */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <p className="font-body text-xl md:text-2xl text-foreground/90 leading-relaxed">
            May this Eid bring peace to your heart,
          </p>
          <p className="font-body text-xl md:text-2xl text-foreground/90 leading-relaxed">
            joy to your home,
          </p>
          <p className="font-body text-xl md:text-2xl text-foreground/90 leading-relaxed">
            and blessings to your life.
          </p>
        </motion.div>

        {/* Eid Mubarak */}
        <motion.h2
          className="font-display text-3xl md:text-4xl text-primary text-glow-gold text-center mt-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Eid Mubarak!
        </motion.h2>

        {/* Divider */}
        <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-6" />

        {/* Signature */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <p className="text-muted-foreground text-sm mb-1">Designed & Developed by</p>
          <p className="font-display text-lg text-primary">Samin Yasar Sunny</p>
          <p className="text-muted-foreground text-sm mt-1">
            CSE | Mymensingh Engineering College
          </p>
        </motion.div>
      </motion.div>

      {/* Share button */}
      <motion.button
        onClick={handleShare}
        className="mt-8 px-6 py-3 font-display text-base tracking-wider border border-gold/30 text-primary bg-gold/5 rounded-full backdrop-blur-sm
          hover:bg-gold/15 hover:border-gold transition-all duration-500 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Share this Eid Card ✦
      </motion.button>
    </motion.div>
  );
};

export default FinalCard;
