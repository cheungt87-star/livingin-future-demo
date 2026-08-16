import React from "react";

type BadgeVariant = "outline" | "green" | "red";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "outline", className = "" }: BadgeProps) {
  const baseClasses =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap";

  const variantClasses: Record<BadgeVariant, string> = {
    outline: "border border-charcoal bg-transparent text-charcoal",
    green: "bg-teal text-white",
    red: "bg-renter-red text-white",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
