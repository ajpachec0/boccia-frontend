"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";
import { useState, useEffect } from "react";

interface SportsLoaderProps {
  className?: string;
  text?: string;
  icon?: React.ReactNode;
}

export function SportsLoader({
  className,
  text = "Cargando partido...",
  icon,
}: SportsLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 bg-black/80 rounded-lg shadow-lg",
        className
      )}
    >
      {/* Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          {icon || (
            <Trophy className="w-12 h-12 text-amber-500 animate-pulse" />
          )}
        </div>

        {/* Circular progress */}
        <svg
          className="w-24 h-24 rotate-[-90deg] transform"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-gray-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary transition-all duration-300 ease-in-out"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
        </svg>
      </div>

      {/* Text */}
      <p className="text-lg font-medium text-white mb-2">{text}</p>

      {/* Animated dots */}
      <div className="flex space-x-2 mt-1">
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
