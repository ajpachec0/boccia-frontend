"use client";

import type React from "react";

import { Trophy, Timer, Flag } from "lucide-react";
import { useState, useEffect } from "react";
import { SportsLoader } from "./sport-loader";

interface ScoreboardLoaderProps {
  variant?: "trophy" | "timer" | "flag";
  text?: string;
}

export function ScoreboardLoader({
  variant = "trophy",
  text = "Cargando partido...",
}: ScoreboardLoaderProps) {
  const [icon, setIcon] = useState<React.ReactNode>(
    <Trophy className="w-12 h-12 text-amber-500" />
  );

  useEffect(() => {
    switch (variant) {
      case "trophy":
        setIcon(<Trophy className="w-12 h-12 text-amber-500" />);
        break;
      case "timer":
        setIcon(<Timer className="w-12 h-12 text-blue-500" />);
        break;
      case "flag":
        setIcon(<Flag className="w-12 h-12 text-green-500" />);
        break;
    }
  }, [variant]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <SportsLoader icon={icon} text={text} />
    </div>
  );
}
