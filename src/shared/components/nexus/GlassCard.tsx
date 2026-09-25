"use client";
import React from "react";

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: "blue" | "purple" | "cyan" | "none";
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const glowColors = {
  blue: "hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]",
  purple: "hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
  cyan: "hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]",
  none: "",
};

const paddings = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glow = "none",
  hover = false,
  padding = "md",
  onClick,
}) => {
  const baseClasses = "relative overflow-hidden rounded-xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 transition-all duration-300";
  const hoverClasses = hover ? "hover:-translate-y-1 hover:bg-white/20 dark:hover:bg-black/50 cursor-pointer" : "";
  const glowClasses = hover ? glowColors[glow] : "";
  
  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${glowClasses} ${paddings[padding]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
