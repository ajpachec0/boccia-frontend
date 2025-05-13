"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ENDS = 6;
const BALLS_PER_END = 6;
const POLL_INTERVAL_MS = 5000;
const DEFAULT_TIME = 4 * 60;

interface Team {
  code: string;
  flag: string;
  name: string;
  number: number;
  color: string;
  score: number[];
  time: number;
}

interface ScoreboardPageComponentProps {
  id: string;
}

// Partial match response based on burned GET example
interface MatchResponse {
  puntosJugador1: number;
  puntosJugador2: number;
  jugador1: {
    id: number;
    nombre: string;
    pais: { pais: string; fotoPais: string };
  };
  jugador2: {
    id: number;
    nombre: string;
    pais: { pais: string; fotoPais: string };
  };
}

export const ScoreboardPageComponent: React.FC<
  ScoreboardPageComponentProps
> = ({ id }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentEnd, setCurrentEnd] = useState<number>(1);
  const [ballsUsed, setBallsUsed] = useState<{ [key: string]: number }>({});

  // Fetch initial data and transform to Team[]
  const fetchScoreboard = async () => {
    try {
      const res = await fetch(`/api/scoreboard/${id}`);
      if (!res.ok) throw new Error("Error fetching scoreboard");
      const match: MatchResponse = await res.json();

      const code1 = match.jugador1.pais.pais.slice(0, 3).toUpperCase();
      const code2 = match.jugador2.pais.pais.slice(0, 3).toUpperCase();

      const team1: Team = {
        code: code1,
        flag: match.jugador1.pais.fotoPais,
        name: match.jugador1.nombre,
        number: match.jugador1.id,
        color: "bg-red-600",
        score: [match.puntosJugador1, ...Array(ENDS - 1).fill(0)],
        time: DEFAULT_TIME,
      };
      const team2: Team = {
        code: code2,
        flag: match.jugador2.pais.fotoPais,
        name: match.jugador2.nombre,
        number: match.jugador2.id,
        color: "bg-blue-500",
        score: [match.puntosJugador2, ...Array(ENDS - 1).fill(0)],
        time: DEFAULT_TIME,
      };

      setTeams([team1, team2]);
      setBallsUsed({ [code1]: 0, [code2]: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  // Send updates to PUT route and handle response for name/flag changes
  const updateServer = async (newTeams: Team[]) => {
    const total1 = newTeams[0].score.reduce((sum, pts) => sum + pts, 0);
    const total2 = newTeams[1].score.reduce((sum, pts) => sum + pts, 0);
    const payload = {
      puntosJugador1: total1,
      puntosJugador2: total2,
      jugado: true,
    };

    try {
      const res = await fetch(`/api/scoreboard/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok) {
        const updated = newTeams.map((team, idx) => {
          const key = idx === 0 ? "jugador1" : "jugador2";
          const playerData = result[key];
          return {
            ...team,
            name: playerData.nombre,
            flag: playerData.pais.fotoPais,
          };
        });
        setTeams(updated);
      } else {
        console.error("Error updating match:", result);
      }
    } catch (err) {
      console.error("Error updating match:", err);
    }
  };

  const finishMatch = async () => {
    const total1 = teams[0].score.reduce((sum, pts) => sum + pts, 0);
    const total2 = teams[1].score.reduce((sum, pts) => sum + pts, 0);
    const payload = {
      puntosJugador1: total1,
      puntosJugador2: total2,
      jugado: true,
      finalizado: true,
    };
    try {
      const res = await fetch(`/api/scoreboard/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Partido finalizado");
        router.back();
      } else {
        console.error("Error finishing match");
      }
    } catch (err) {
      console.error("Error finishing match:", err);
    }
  };
  // Handle click to finish match
  const handleFinishMatch = () => {
    finishMatch();
    // Optionally navigate away or show a success message
  };

  // Handle score changes locally and notify server
  const handleScoreChange = (playerIdx: number, delta: number) => {
    setTeams((prev) => {
      const updated = prev.map((team, idx) => {
        if (idx !== playerIdx) return team;
        const newScore = [...team.score];
        newScore[currentEnd - 1] = Math.max(
          0,
          newScore[currentEnd - 1] + delta
        );
        return { ...team, score: newScore };
      });
      updateServer(updated);
      return updated;
    });
  };

  useEffect(() => {
    fetchScoreboard();
    const interval = setInterval(fetchScoreboard, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
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
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="secondary"
            className="m-0 cursor-pointer relative top-0  right-4 p-4 z-50"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm cursor-pointer ">Volver a partidos</span>
          </Button>
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

      {/* Score Area */}
      <div className="relative flex flex-1">
        {teams.map((team, idx) => (
          <div
            key={idx}
            className={`${team.color} flex-1 flex items-center justify-center`}
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleScoreChange(idx, -1)}
                disabled={team.score[currentEnd - 1] <= 0}
                className="text-4xl"
              >
                –
              </button>
              <span className="text-9xl font-bold">
                {team.score[currentEnd - 1]}
              </span>
              <button
                onClick={() => handleScoreChange(idx, +1)}
                className="text-4xl"
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <button
            type="button"
            onClick={handleFinishMatch}
            className="pointer-events-auto bg-black text-white w-40 h-40 flex items-center justify-center text-2xl rounded-full"
          >
            Finalizar Partido
          </button>
        </div>
      </div>

      {/* Footer: balls & timers */}
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
