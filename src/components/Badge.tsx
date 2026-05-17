import React from "react";

type BadgeProps = {
  text: string;
  variant?: "popular" | "bestSeller";
  className?: string;
};

export default function Badge({
  text,
  variant = "popular",
  className = "",
}: BadgeProps) {
  const base =
    "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-white text-[10px] font-bold uppercase tracking-widest rounded-full";

  const styles = {
    popular:
      "bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]",

    bestSeller:
      "bg-gradient-to-r from-red-600 via-red-500 to-pink-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]",
  };

  return (
    <span className={`${base} ${styles[variant]} ${className}`}>
      {text}
    </span>
  );
}