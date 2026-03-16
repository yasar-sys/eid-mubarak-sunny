import { useState, useEffect } from "react";

/** Typewriter effect for text reveal */
const TypewriterText = ({
  text,
  className = "",
  speed = 50,
  delay = 0,
  onComplete,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
    }
  }, [displayed, started, text, speed, onComplete]);

  return (
    <p className={className}>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="inline-block w-0.5 h-5 bg-gold ml-1 animate-pulse" />
      )}
    </p>
  );
};

export default TypewriterText;
