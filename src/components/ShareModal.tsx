import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { X, Copy, Share2 } from "lucide-react";

/** Share modal with QR code and copy link */
const ShareModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied! Share the Eid blessings ✦");
    }).catch(() => {
      toast.error("Could not copy link");
    });
  }, [url]);

  const handleNativeShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: "Eid Mubarak — Interactive Greeting",
        text: "Eid Mubarak! ✦ Wishing you peace, joy, and blessings. Open this interactive Eid card!",
        url,
      }).catch(() => {});
    }
  }, [url]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-night-deep/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="relative max-w-sm w-full p-8 rounded-2xl border border-gold/20 bg-night-mid/95 backdrop-blur-xl box-glow-gold">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-2xl text-primary text-center mb-2">
                Share this Eid Card
              </h3>
              <p className="text-muted-foreground text-center text-sm mb-6">
                Scan QR code or copy the link
              </p>

              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-xl bg-foreground/95">
                  <QRCodeSVG
                    value={url}
                    size={180}
                    bgColor="hsl(45, 60%, 90%)"
                    fgColor="hsl(225, 40%, 6%)"
                    level="M"
                    includeMargin={false}
                  />
                </div>
              </div>

              {/* URL display */}
              <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-background/50 border border-border">
                <p className="text-sm text-muted-foreground truncate flex-1">{url}</p>
                <button
                  onClick={handleCopy}
                  className="shrink-0 p-2 rounded-md hover:bg-gold/10 text-primary transition-colors cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-3 rounded-lg font-display text-sm tracking-wider border border-gold/30 text-primary bg-gold/5 hover:bg-gold/15 transition-all cursor-pointer"
                >
                  Copy Link
                </button>
                {typeof navigator !== "undefined" && "share" in navigator && (
                  <button
                    onClick={handleNativeShare}
                    className="flex items-center justify-center gap-2 flex-1 py-3 rounded-lg font-display text-sm tracking-wider gradient-gold text-primary-foreground hover:opacity-90 transition-all cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
