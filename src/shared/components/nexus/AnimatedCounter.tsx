"use client";
import React, { useEffect, useState, useRef } from "react";

export interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = prevValue.current;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const nextValue = startValue + (value - startValue) * easeProgress;
      setCurrentValue(nextValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        prevValue.current = value;
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, duration]);

  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(currentValue);

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};
