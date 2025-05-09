import Image from "next/image";
import React from "react";

interface Props {
  category: {
    standings: {
      id: string;
      name: string;
      country: string;
      flag?: string;
      color: string;
      textColor?: string;
    }[];
  };
}

export const TabTableClasification = ({ category }: Props) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Clasificación</h2>
      <div className="grid gap-4">
        {category.standings.map((player, index) => (
          <div
            key={player.id}
            className="relative overflow-hidden rounded-lg p-4 flex items-center"
            style={{
              backgroundColor: player.color,
              color: player.textColor || "white",
            }}
          >
            <div className="absolute top-0 left-0 w-12 h-full bg-black/10 flex items-center justify-center text-xl font-bold">
              {index + 1}
            </div>
            <div className="ml-12 flex items-center gap-4">
              {player.flag && (
                <div className="relative h-6 w-9 overflow-hidden rounded border border-black/10">
                  <Image
                    src={player.flag || "/placeholder.svg"}
                    alt={`Bandera de ${player.country}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="font-bold">{player.name}</div>
                <div className="text-sm opacity-90">{player.country}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
