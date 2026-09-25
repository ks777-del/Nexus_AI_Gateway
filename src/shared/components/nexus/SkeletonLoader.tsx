"use client";
import React from "react";

export interface SkeletonLoaderProps {
  variant?: "text" | "card" | "chart" | "table" | "avatar" | "button";
  lines?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = "text",
  lines = 1,
  className = "",
}) => {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-800 rounded";

  if (variant === "text") {
    return (
      <div className={`space-y-2 ${className}`} role="status" aria-label="Loading text">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={`h-4 w-full ${baseClasses}`} style={{ width: i === lines - 1 && lines > 1 ? '70%' : '100%' }}></div>
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`p-4 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4 ${className}`} role="status" aria-label="Loading card">
        <div className={`h-40 w-full ${baseClasses}`}></div>
        <div className="space-y-2">
          <div className={`h-4 w-3/4 ${baseClasses}`}></div>
          <div className={`h-4 w-1/2 ${baseClasses}`}></div>
        </div>
      </div>
    );
  }

  if (variant === "chart") {
    return (
      <div className={`h-64 w-full rounded-xl ${baseClasses} ${className}`} role="status" aria-label="Loading chart"></div>
    );
  }
  
  if (variant === "avatar") {
    return (
      <div className={`h-12 w-12 rounded-full ${baseClasses} ${className}`} role="status" aria-label="Loading avatar"></div>
    );
  }

  return (
    <div className={`${baseClasses} h-full w-full ${className}`} role="status" aria-label="Loading content"></div>
  );
};
