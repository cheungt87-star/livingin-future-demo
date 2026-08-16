import React from "react";

interface SubHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SubHeading({ children, className = "" }: SubHeadingProps) {
  return (
    <h3
      className={`
        text-xs font-semibold uppercase text-secondary tracking-wider mb-3
        ${className}
      `}
    >
      {children}
    </h3>
  );
}
