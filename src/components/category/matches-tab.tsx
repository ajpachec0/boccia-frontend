"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpToLine, ChevronLeft, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface ApiArbitro {
  id: number;
  nombre: string;
}

interface ApiPais {
  fotoPais: string;
  pais: string;
}

interface ApiJugador {
  id: number;
  nombre: string;
  pais: ApiPais;
}

export interface ApiMatch {
  id: number;
  puntosJugador1: number;
  puntosJugador2: number;
  jugador1: ApiJugador;
  jugador2: ApiJugador;
  ganador: number | null;
  arbitro: ApiArbitro;
}

interface Props {
  matches: ApiMatch[];
}

export function MatchesTab({ matches }: Props) {
  const router = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const matchesOrderById = matches.sort((a, b) => a.id - b.id);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Header with back button and stats */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2 w-fit"
        >
          <ChevronLeft size={16} />
          Regresar a Grupos
        </Button>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-md">
            <Users size={16} className="text-primary" />
            <span className="text-sm font-medium">
              {matches.length} partidos
            </span>
          </div>
        </div>
      </div>

      {/* Ongoing Matches Section */}
      {matchesOrderById.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            Partidos en Curso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {matchesOrderById.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 rounded-full shadow-md z-50"
          onClick={scrollToTop}
        >
          <ArrowUpToLine size={18} />
        </Button>
      )}
    </div>
  );
}

// Extracted MatchCard component for cleaner code
function MatchCard({ match }: { match: ApiMatch }) {
  return (
    <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-3 flex items-center gap-2 border-b">
        <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-semibold shadow-sm text-sm p-2">
          {match.id}
        </div>
        <span className="font-medium text-sm">Partido {match.id}</span>

        <Link href={`/scoreboard/${match.id}`} className="ml-auto">
          <Button size="sm" variant="outline">
            Ver Detalles
          </Button>
        </Link>
      </div>

      {/* Content */}
      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x">
          {[
            {
              player: match.jugador1,
              score: match.puntosJugador1,
              isWinner: match.ganador === match.jugador1.id,
            },
            {
              player: match.jugador2,
              score: match.puntosJugador2,
              isWinner: match.ganador === match.jugador2.id,
            },
          ].map(({ player, score, isWinner }, playerIndex) => {
            const opponentScore =
              playerIndex === 0 ? match.puntosJugador2 : match.puntosJugador1;
            const won = score > opponentScore || isWinner;

            return (
              <div
                key={player.id}
                className={`p-3 flex flex-col items-center ${
                  won ? "bg-green-50 dark:bg-green-950/20" : ""
                }`}
              >
                {/* Flag & Name */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative h-5 w-8 overflow-hidden rounded shadow-sm">
                    <Image
                      src={player.pais.fotoPais || "/placeholder.svg"}
                      alt={`Bandera de ${player.pais.pais}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-medium text-sm">{player.nombre}</div>
                </div>

                {/* Country */}
                <div className="text-xs text-muted-foreground mb-3">
                  {player.pais.pais}
                </div>

                {/* Score */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${
                    won
                      ? "bg-gradient-to-br from-green-500 to-green-600 text-white ring-1 ring-green-200 dark:ring-green-900"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {score > 0 ? score : "0"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Referee info */}
        <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-2 border-t text-xs text-muted-foreground">
          <span className="font-medium">Árbitro:</span> {match.arbitro.nombre}
        </div>
      </CardContent>
    </Card>
  );
}
