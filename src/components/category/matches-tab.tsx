import { Card, CardContent } from "@/components/ui/card";
import { Round } from "@/types/categories-events.type";
import Image from "next/image";

interface Props {
  rounds: Round[];
}

export function MatchesTab({ rounds }: Props) {
  return (
    <>
      {rounds.map((round) => (
        <div key={round.id} className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Ronda {round.number}</h3>
          <div className="grid gap-4">
            {round.matches.map((match, idx) => (
              <Card key={match.id} className="overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 flex items-center gap-2 border-b">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-medium">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-medium">Partido {idx + 1}</span>
                </div>
                <CardContent className="p-0">
                  {match.players.map((player, pIdx) => {
                    const opponent = match.players[pIdx === 0 ? 1 : 0];
                    const playerWon =
                      (player.score ?? 0) > (opponent.score ?? 0);
                    return (
                      <div
                        key={player.id}
                        className={`flex items-center p-4 ${
                          pIdx === 0 ? "border-b" : ""
                        }`}
                      >
                        <div className="w-10 text-center font-medium text-muted-foreground">
                          {player.id}
                        </div>
                        <div className="flex-1 flex items-center gap-3">
                          {player.flag && (
                            <div className="relative h-5 w-8 overflow-hidden rounded">
                              <Image
                                src={player.flag}
                                alt={`Bandera de ${player.country}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="font-medium">{player.name}</div>
                        </div>
                        <div
                          className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-lg ${
                            playerWon ? "bg-green-500 text-white" : "bg-muted"
                          }`}
                        >
                          {player.score}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
