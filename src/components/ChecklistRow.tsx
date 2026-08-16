import React from "react";
import { Check } from "lucide-react";

interface ChecklistRowProps {
  label: React.ReactNode;
  checked?: boolean;
  onAction?: () => void;
  actionLabel?: React.ReactNode;
  className?: string;
}

export function ChecklistRow({
  label,
  checked = false,
  onAction,
  actionLabel,
  className = "",
}: ChecklistRowProps) {
  return (
    <div className={`flex items-center gap-3 py-3 ${className}`}>
      {/* Checkbox dot */}
      <div className="flex-shrink-0">
        {checked ? (
          <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center">
            <Check size={16} className="text-white" />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-border bg-white" />
        )}
      </div>

      {/* Label */}
      <div className="flex-1">
        <p className={`text-sm ${checked ? "text-charcoal font-medium" : "text-slate"}`}>
          {label}
        </p>
      </div>

      {/* Action button (optional) */}
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="text-xs text-coral hover:text-coral-dark font-medium transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
