import React from "react";

type AvatarColor = "coral" | "teal";

interface AvatarProps {
  initials: string;
  color?: AvatarColor;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({
  initials,
  color = "teal",
  size = "md",
  className = "",
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const colorClasses = {
    coral: "bg-coral text-white",
    teal: "bg-teal text-white",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full flex items-center justify-center font-bold ${className}`}
    >
      {initials}
    </div>
  );
}
