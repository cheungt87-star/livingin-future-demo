import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "./Badge";

interface PendingStateProps {
  badge: string;
  title: React.ReactNode;
  supporting?: React.ReactNode;
  delay?: number;
  onResolve: () => void;
}

export function PendingState({
  badge,
  title,
  supporting,
  delay = 2000,
  onResolve,
}: PendingStateProps) {
  useEffect(() => {
    const timer = setTimeout(onResolve, delay);

    const handleSkip = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && e.code !== "Space") return;
      clearTimeout(timer);
      onResolve();
    };

    // Skip on spacebar or any click
    window.addEventListener("keydown", handleSkip);
    window.addEventListener("click", handleSkip);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("click", handleSkip);
    };
  }, [delay, onResolve]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <div className="mb-4 flex justify-center">
        <Badge variant="outline">{badge}</Badge>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-subtle p-6 mb-4">
        {/* Spinner */}
        <div className="mb-4 flex justify-center">
          <div className="w-8 h-8 border-2 border-border border-t-coral rounded-full animate-spin" />
        </div>

        <div className="text-base font-medium text-charcoal mb-2">{title}</div>

        {supporting && <p className="text-sm text-secondary">{supporting}</p>}
      </div>

      <p className="text-xs text-slate">Tap to continue</p>
    </motion.div>
  );
}
