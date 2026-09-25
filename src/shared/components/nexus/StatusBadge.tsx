"use client";
import React from "react";

export interface StatusBadgeProps {
  status: "healthy" | "degraded" | "down" | "unknown" | "testing";
  label?: string;
  pulse?: boolean;
  size?: "sm" | "md";
}

const statusConfig = {
  healthy: { color: "bg-emerald-500", label: "Healthy" },
  degraded: { color: "bg-amber-500", label: "Degraded" },
  down: { color: "bg-red-500", label: "Down" },
  unknown: { color: "bg-gray-500", label: "Unknown" },
  testing: { color: "bg-blue-500", label: "Testing" },
};

const sizes = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  pulse = false,
  size = "md",
}) => {
  const config = statusConfig[status];
  const displayLabel = label || config.label;
  const dotColor = config.color;

  return (
    <div className={`inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-sm ${sizes[size]}`}>
      <div className="relative flex h-2 w-2 mr-2">
        {pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`}></span>
      </div>
      <span className="font-medium text-gray-700 dark:text-gray-300">{displayLabel}</span>
    </div>
  );
};
