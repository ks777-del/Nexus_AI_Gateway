"use client";
import React from "react";
import { GlassCard } from "./GlassCard";
import { AnimatedCounter } from "./AnimatedCounter";
import { SkeletonLoader } from "./SkeletonLoader";

export interface MetricCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number; // percentage change
  changeLabel?: string;
  icon?: React.ReactNode;
  glow?: "blue" | "purple" | "cyan" | "none";
  loading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  change,
  changeLabel,
  icon,
  glow = "none",
  loading = false,
}) => {
  if (loading) {
    return (
      <GlassCard padding="md">
        <SkeletonLoader variant="card" />
      </GlassCard>
    );
  }

  const isPositiveChange = change && change > 0;
  const isNegativeChange = change && change < 0;

  return (
    <GlassCard padding="md" glow={glow} hover>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={value % 1 !== 0 ? 2 : 0} />
            </h2>
          </div>
          
          {change !== undefined && (
            <div className="mt-2 flex items-center text-sm">
              <span 
                className={`font-medium flex items-center ${
                  isPositiveChange ? 'text-emerald-500' : 
                  isNegativeChange ? 'text-red-500' : 
                  'text-gray-500'
                }`}
              >
                {isPositiveChange && (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                )}
                {isNegativeChange && (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                )}
                {change > 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="ml-2 text-gray-500 dark:text-gray-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
            {icon}
          </div>
        )}
      </div>
    </GlassCard>
  );
};
