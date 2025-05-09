"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const ENDS = 6;
const BALLS_PER_END = 6;
const POLL_INTERVAL_MS = 1000;

interface Team {
  code: string;
  flag: string;
  name: string;
  number: number;
  color: string;
  score: number[];
  time: number;
}

interface ScoreboardResponse {
  teams: Team[];
  currentEnd: number;
  ballsUsed: { [key: string]: number };
}

export const ScoreboardPageComponent = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentEnd, setCurrentEnd] = useState<number>(1);
  const [ballsUsed, setBallsUsed] = useState<{ [key: string]: number }>({});

  const fetchScoreboard = async () => {
    try {
      const res = await fetch("/api/scoreboard");
      if (!res.ok) throw new Error("Error fetching scoreboard");
      const data: ScoreboardResponse = await res.json();
      setTeams(data.teams);
      setCurrentEnd(data.currentEnd);
      setBallsUsed(data.ballsUsed);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchScoreboard();
    const interval = setInterval(fetchScoreboard, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900 text-white">
      <div className="relative flex items-center justify-between px-8 py-4 bg-black">
        {teams[0] && (
          <div className="flex items-center space-x-3">
            <Image
              src={teams[0].flag}
              alt={teams[0].code}
              width={32}
              height={24}
            />
            <span className="text-xl font-bold">{teams[0].code}</span>
            <span>#{teams[0].number}</span>
            <span className="uppercase">{teams[0].name}</span>
          </div>
        )}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center space-y-0.5">
          <div className="text-sm uppercase">BC2 Male - Knockout</div>
          <div className="text-sm uppercase">Final - Court 1</div>
        </div>
        {teams[1] && (
          <div className="flex items-center space-x-3">
            <div className="uppercase text-right">{teams[1].name}</div>
            <span>#{teams[1].number}</span>
            <span className="text-xl font-bold">{teams[1].code}</span>
            <Image
              src={teams[1].flag}
              alt={teams[1].code}
              width={32}
              height={24}
            />
          </div>
        )}
      </div>

      <div className="relative flex flex-1">
        {teams.map((team, idx) => (
          <div
            key={idx}
            className={`${team.color} flex-1 flex items-center justify-center`}
          >
            <span className="text-9xl font-bold">
              {team.score[currentEnd - 1]}
            </span>
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black text-white w-20 h-20 flex items-center justify-center text-4xl rounded-full">
            {currentEnd}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-8 py-4 bg-black">
        {teams[0] && (
          <div className="flex space-x-2">
            {Array.from({ length: BALLS_PER_END }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full ${
                  i < (ballsUsed[teams[0].code] || 0)
                    ? "bg-white"
                    : "border-2 border-white"
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex space-x-16">
          {teams.map((team, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl font-medium">
                {formatTime(team.time)}
              </div>
            </div>
          ))}
        </div>

        {teams[1] && (
          <div className="flex space-x-2">
            {Array.from({ length: BALLS_PER_END }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full ${
                  i < (ballsUsed[teams[1].code] || 0)
                    ? "bg-white"
                    : "border-2 border-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
