import React from "react";

interface SegmentedControlProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className = "",
}: SegmentedControlProps) {
  return (
    <div className={`flex gap-2 p-1 bg-surface rounded-full ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            flex-1 py-2 px-3 rounded-full font-medium text-sm transition-colors
            ${
              value === option.value
                ? "bg-charcoal text-white"
                : "bg-transparent text-charcoal hover:bg-border"
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
