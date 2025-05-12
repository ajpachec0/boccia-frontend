// components/category/MatchesTab.tsx
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
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

  const machesOrderById = matches.sort((a, b) => a.id - b.id);


  return (
    <>
      {machesOrderById.map((match, idx) => (
        <Card key={match.id} className="overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-muted/30 px-4 py-2 flex items-center gap-2 border-b">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-medium">
              {idx + 1}
            </div>
            <span className="text-sm font-medium">Partido {idx + 1}</span>
            <Link
              href={`/scoreboard/${match.id}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary flex justify-end ml-auto"
            >
              <Button>Ver Puntuación</Button>
            </Link>
          </div>

          {/* Content */}
          <CardContent className="p-0">
            {[
              { player: match.jugador1, score: match.puntosJugador1 },
              { player: match.jugador2, score: match.puntosJugador2 },
            ].map(({ player, score }, playerIndex) => {
              const opponentScore =
                playerIndex === 0 ? match.puntosJugador2 : match.puntosJugador1;
              const won = score > opponentScore;
              return (
                <div
                  key={player.id}
                  className={`flex items-center p-4 ${
                    playerIndex === 0 ? "border-b" : ""
                  }`}
                >
                  {/* Player ID */}
                  <div className="w-10 text-center font-medium text-muted-foreground">
                    {player.id}
                  </div>

                  {/* Flag & Name */}
                  <div className="flex-1 flex items-center gap-3">
                    <div className="relative h-5 w-8 overflow-hidden rounded">
                      <Image
                        src={player.pais.fotoPais}
                        alt={`Bandera de ${player.pais.pais}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="font-medium">{player.nombre}</div>
                  </div>

                  {/* Score */}
                  <div
                    className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-lg ${
                      won ? "bg-green-500 text-white" : "bg-muted"
                    }`}
                  >
                    {score > 0 ? score : "0"}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
