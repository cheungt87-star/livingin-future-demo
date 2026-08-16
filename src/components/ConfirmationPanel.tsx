import React from "react";
import { motion } from "framer-motion";

type TintColor = "coral" | "teal" | "sun";

interface ConfirmationPanelProps {
  badge: React.ReactNode;
  hero: React.ReactNode;
  supporting?: React.ReactNode;
  tint?: TintColor;
  className?: string;
}

export function ConfirmationPanel({
  badge,
  hero,
  supporting,
  tint = "teal",
  className = "",
}: ConfirmationPanelProps) {
  const tintClasses: Record<TintColor, string> = {
    coral: "bg-coral bg-opacity-10 border-coral",
    teal: "bg-teal bg-opacity-10 border-teal",
    sun: "bg-sun bg-opacity-10 border-sun",
  };

  const heroColorClasses: Record<TintColor, string> = {
    coral: "text-coral",
    teal: "text-teal",
    sun: "text-sun",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        ${tintClasses[tint]} border rounded-2xl p-6 text-center
        ${className}
      `}
    >
      <div className="mb-3">{badge}</div>
      <div className={`font-mono text-2xl font-bold mb-2 ${heroColorClasses[tint]}`}>
        {hero}
      </div>
      {supporting && <p className="text-sm text-slate">{supporting}</p>}
    </motion.div>
  );
}
