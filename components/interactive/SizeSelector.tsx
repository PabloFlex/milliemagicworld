"use client";

import { useState } from "react";

type SizeSelectorProps = {
  sizes: string[];
  columns?: number;
  className?: string;
  buttonClassName?: string;
  suppressNavigation?: boolean;
  onSelect?: (size: string) => void;
  buttonShape?: "rounded" | "square";
  tone?: "light" | "dark";
};

export default function SizeSelector({
  sizes,
  columns,
  className = "",
  buttonClassName = "",
  suppressNavigation = false,
  onSelect,
  buttonShape = "rounded",
  tone = "light",
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const computedColumns =
    columns ?? Math.min(6, Math.max(sizes.length, 3));
  const shapeClass =
    buttonShape === "square" ? "rounded-none" : "rounded-lg";
  const textTone =
    tone === "dark" ? "text-white" : "text-slate-700";
  const unselectedClass =
    tone === "dark"
      ? "border-white/30 bg-transparent text-white hover:border-white/60"
      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400";
  const selectedClass =
    tone === "dark"
      ? "border-white bg-white text-[#10041a]"
      : "border-slate-900 bg-slate-900 text-white";

  return (
    <div
      className={`grid justify-items-center gap-2 text-xs font-semibold tracking-[0.25em] ${textTone} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${computedColumns}, minmax(0, 1fr))`,
      }}
    >
      {sizes.map((size, index) => {
        const isSelected = selectedSize === size;
        const key = `${size}-${index}`;
        return (
          <button
            key={key}
            type="button"
            onClick={(event) => {
              if (suppressNavigation) {
                event.preventDefault();
                event.stopPropagation();
              }
              setSelectedSize(size);
              onSelect?.(size);
            }}
            className={`w-full ${shapeClass} border px-3 py-2 text-center transition ${
              isSelected ? selectedClass : unselectedClass
            } ${buttonClassName}`}
            aria-pressed={isSelected}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
