import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  loading?: boolean;
}

export function PrimaryButton({
  children,
  fullWidth = true,
  loading = false,
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`
        h-12 rounded-full bg-coral text-white font-bold uppercase text-sm
        shadow-coral hover:bg-coral-dark transition-colors disabled:opacity-50
        disabled:cursor-not-allowed
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? "Processing…" : children}
    </button>
  );
}

export function SecondaryButton({
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        h-12 rounded-full border border-charcoal bg-transparent text-charcoal
        font-bold uppercase text-sm hover:bg-surface transition-colors
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  return variant === "secondary" ? (
    <SecondaryButton {...props}>{children}</SecondaryButton>
  ) : (
    <PrimaryButton {...props}>{children}</PrimaryButton>
  );
}
