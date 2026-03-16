import { motion } from "framer-motion";

/**
 * Animated Cloud overlay for the initial landing screen.
 * Covers the screen, then slides apart to reveal the moon and Eid greeting.
 */
const AnimatedClouds = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden flex items-center justify-center">
      {/* Left Cloud */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-full md:w-2/3 h-full mix-blend-screen"
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full object-cover scale-150 origin-left"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="cloudGradLeft" cx="30%" cy="50%" r="70%">
              <stop offset="0%" stopColor="hsl(45, 20%, 95%)" />
              <stop offset="50%" stopColor="hsl(45, 10%, 85%)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <path
            d="M -200 600 L 800 600 Q 700 400 500 400 Q 400 200 200 250 Q -50 100 -200 -50 Z"
            fill="url(#cloudGradLeft)"
            opacity="0.9"
          />
          <path
            d="M -200 600 L 600 600 Q 500 450 300 450 Q 200 300 0 320 Q -100 200 -200 100 Z"
            fill="hsl(45, 15%, 90%)"
            opacity="0.8"
          />
        </svg>
      </motion.div>

      {/* Right Cloud */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-full md:w-2/3 h-full mix-blend-screen"
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: "100%", opacity: 0 }}
        transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full object-cover scale-150 origin-right"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="cloudGradRight" cx="70%" cy="50%" r="70%">
              <stop offset="0%" stopColor="hsl(45, 20%, 95%)" />
              <stop offset="50%" stopColor="hsl(45, 10%, 85%)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <path
            d="M 1000 600 L 0 600 Q 100 400 300 400 Q 400 200 600 250 Q 850 100 1000 -50 Z"
            fill="url(#cloudGradRight)"
            opacity="0.9"
          />
          <path
            d="M 1000 600 L 200 600 Q 300 450 500 450 Q 600 300 800 320 Q 900 200 1000 100 Z"
            fill="hsl(45, 15%, 90%)"
            opacity="0.8"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default AnimatedClouds;
