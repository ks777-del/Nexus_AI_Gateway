"use client";

import React from "react";

export interface NexusLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export function NexusLogo({ size = 32, className = "", glow = false }: NexusLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`${glow ? "drop-shadow-[0_0_8px_rgba(14,165,233,0.6)] animate-pulse" : ""} ${className}`}
      fill="none"
    >
      <defs>
        <linearGradient id="nexus-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        d="M16 2L2 10v12l14 8 14-8V10L16 2zm0 4.6l10 5.7v11.4L16 29.4l-10-5.7V12.3l10-5.7z"
        fill="url(#nexus-logo-grad)"
      />
      <circle cx="16" cy="10" r="2.5" fill="url(#nexus-logo-grad)" />
      <circle cx="10" cy="20" r="2.5" fill="url(#nexus-logo-grad)" />
      <circle cx="22" cy="20" r="2.5" fill="url(#nexus-logo-grad)" />
      <path
        d="M16 10L10 20M16 10L22 20M10 20L22 20"
        stroke="url(#nexus-logo-grad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default NexusLogo;
