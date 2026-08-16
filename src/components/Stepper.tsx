import { Plus, Minus } from "lucide-react";

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function Stepper({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  className = "",
}: StepperProps) {
  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus size={18} className="text-charcoal" />
      </button>

      <div className="flex-1 text-center">
        <p className="text-lg font-mono font-bold text-charcoal">{value}</p>
      </div>

      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={18} className="text-charcoal" />
      </button>
    </div>
  );
}
