"use client";

import type { ReactNode, ButtonHTMLAttributes } from "react";

type CTAButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  price?: string;
  intent?: "primary" | "ghost";
  icon?: ReactNode;
};

export default function CTAButton({
  label,
  price,
  intent = "primary",
  icon,
  className = "",
  ...rest
}: CTAButtonProps) {
  const baseClasses =
    "group relative overflow-hidden border px-6 py-3 text-[0.55rem] font-semibold uppercase tracking-[0.45em] transition focus:outline-none";
  const intentClasses =
    intent === "primary"
      ? "border-white/10 text-[#0b0414] shadow-[0_15px_35px_rgba(150,101,255,0.35)]"
      : "border-white text-white hover:bg-white hover:text-[#090113]";

  return (
    <button
      type="button"
      className={`${baseClasses} ${intentClasses} ${className}`}
      {...rest}
    >
      {intent === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-[#f5d1ff] via-[#9c68ff] to-[#51d1ff] opacity-90 transition group-hover:opacity-100" />
      )}
      <span className="relative flex items-center justify-center gap-3">
        {icon}
        {label}
        {price && (
          <span className="text-[0.75rem] font-bold tracking-normal">
            {price}
          </span>
        )}
      </span>
    </button>
  );
}
