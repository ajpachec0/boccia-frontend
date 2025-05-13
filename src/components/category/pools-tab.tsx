// components/category/PoolsTab.tsx
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import EmptyCategory from "../common/empty-section";

interface ApiCountry {
  fotoPais: string;
  pais: string;
}

interface ApiPlayerEntry {
  id: number;
  jugador: {
    id: number;
    nombre: string;
    pais: ApiCountry;
  };
  // campos futuros de la API:
  puntos?: number;
  puntosDif?: number;
  puntosFavor?: number;
  ganados?: number;
}

export interface ApiPool {
  id: number;
  nombre: string;
  jugadores: ApiPlayerEntry[];
}

interface Props {
  pools: ApiPool[];
  eventId: string;
  categoryId: string;
}

export function PoolsTab({ pools, categoryId, eventId }: Props) {
  // // Valores por defecto para stats
  // const defaultStats = {
  //   wins: 0,
  //   pointsDiff: 0,
  //   pointsFor: 0,
  //   endsWon: 0,
  //   pdiffMatch: 0,
  //   pdiffEnd: 0,
  // };

  // // Algunos ejemplos quemados para *dar variedad*, puedes ajustar
  // const burnedStats: Record<number, typeof defaultStats> = {
  //   17: {
  //     wins: 3,
  //     pointsDiff: 24,
  //     pointsFor: 26,
  //     endsWon: 10,
  //     pdiffMatch: 10,
  //     pdiffEnd: 5,
  //   },
  //   18: {
  //     wins: 2,
  //     pointsDiff: -6,
  //     pointsFor: 9,
  //     endsWon: 5,
  //     pdiffMatch: 3,
  //     pdiffEnd: 3,
  //   },
  //   19: {
  //     wins: 1,
  //     pointsDiff: -6,
  //     pointsFor: 10,
  //     endsWon: 5,
  //     pdiffMatch: 3,
  //     pdiffEnd: 4,
  //   },
  //   20: {
  //     wins: 0,
  //     pointsDiff: -12,
  //     pointsFor: 6,
  //     endsWon: 4,
  //     pdiffMatch: 0,
  //     pdiffEnd: 2,
  //   },
  //   21: {
  //     wins: 2,
  //     pointsDiff: 5,
  //     pointsFor: 12,
  //     endsWon: 6,
  //     pdiffMatch: 4,
  //     pdiffEnd: 3,
  //   },
  //   22: {
  //     wins: 1,
  //     pointsDiff: -3,
  //     pointsFor: 8,
  //     endsWon: 5,
  //     pdiffMatch: 2,
  //     pdiffEnd: 1,
  //   },
  //   23: {
  //     wins: 0,
  //     pointsDiff: -10,
  //     pointsFor: 4,
  //     endsWon: 3,
  //     pdiffMatch: 0,
  //     pdiffEnd: 2,
  //   },
  //   24: {
  //     wins: 3,
  //     pointsDiff: 15,
  //     pointsFor: 20,
  //     endsWon: 8,
  //     pdiffMatch: 6,
  //     pdiffEnd: 4,
  //   },
  // };

  if (pools.length === 0) {
    return <EmptyCategory categoryName="Grupos" />;
  }

  return (
    <>
      {pools.map((pool) => (
        <Card key={pool.id} className="mb-8">
          <div className="px-4 pt-4 flex justify-end">
            <Link
              href={`/category/${categoryId}/${eventId}/group/${pool.id}/matches`}
            >
              <Button size="sm">Ver partidos</Button>
            </Link>
          </div>
          <CardHeader className="pb-0">
            <CardTitle className="text-xl">{pool.nombre}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  {/* Cabecera principal */}
                  <tr className="border-b bg-muted/10">
                    <th className="py-3 px-2 text-left font-medium text-muted-foreground w-10">
                      #
                    </th>
                    <th className="py-3 px-2 text-left font-medium text-muted-foreground">
                      ENTRANT
                    </th>
                    <th className="py-3 px-2 text-center font-medium text-muted-foreground">
                      WINS
                    </th>
                    <th className="py-3 px-2 text-center font-medium text-muted-foreground">
                      POINTS DIFF
                    </th>
                    <th className="py-3 px-2 text-center font-medium text-muted-foreground">
                      POINTS FOR
                    </th>
                    <th className="py-3 px-2 text-center font-medium text-muted-foreground">
                      POINTS
                    </th>
                    {/* <th className="py-3 px-2 text-center font-medium text-muted-foreground">
                      PDIFF MATCH
                    </th>
                    <th className="py-3 px-2 text-center font-medium text-muted-foreground">
                      PDIFF END
                    </th> */}
                    <th
                      colSpan={pool.jugadores.length}
                      className="py-3 px-2 text-center font-medium text-muted-foreground"
                    >
                      VS RECORD
                    </th>
                  </tr>
                  {/* Sub-encabezado con IDs */}
                  <tr className="border-b bg-muted/20">
                    <th colSpan={6}></th>
                    {pool.jugadores.map((op) => (
                      <th
                        key={op.jugador.id}
                        className="py-2 px-2 text-center font-medium text-muted-foreground"
                      >
                        {op.jugador.id}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pool.jugadores.map((entry, idx) => {
                    // Obtenemos stats (quemados o por defecto)
                    // const stats = burnedStats[entry.jugador.id] ?? defaultStats;

                    // Generamos un VS Record quemado para cada fila
                    const vsRecord = pool.jugadores.reduce<
                      Record<number, number>
                    >((acc, op) => {
                      if (op.jugador.id === entry.jugador.id) {
                        acc[op.jugador.id] = 0; // self
                      } else {
                        // Ejemplo aleatorio entre 0 y 10
                        acc[op.jugador.id] = Math.floor(Math.random() * 11);
                      }
                      return acc;
                    }, {});

                    return (
                      <tr key={entry.id} className="border-b hover:bg-muted/20">
                        <td className="py-3 px-2 text-center">{idx + 1}</td>
                        <td className="py-3 px-2 flex items-center gap-3">
                          <div className="relative h-5 w-8 overflow-hidden rounded">
                            <Image
                              src={entry.jugador.pais.fotoPais}
                              alt={`Bandera de ${entry.jugador.pais.pais}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">
                            {entry.jugador.nombre}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center font-medium">
                          {entry.ganados}
                        </td>
                        <td className="py-3 px-2 text-center font-medium">
                          {entry.puntosDif}
                        </td>
                        <td className="py-3 px-2 text-center font-medium">
                          {entry.puntosFavor}
                        </td>
                        <td className="py-3 px-2 text-center font-medium">
                          {entry.puntos}
                        </td>
                        {/* <td className="py-3 px-2 text-center font-medium">
                          {entry.puntos}
                        </td>
                        <td className="py-3 px-2 text-center font-medium">
                          {stats.pdiffEnd}
                        </td> */}
                        {/* VS Record dinámico */}
                        {pool.jugadores.map((op) => {
                          const val = vsRecord[op.jugador.id];
                          const self = op.jugador.id === entry.jugador.id;
                          return (
                            <td
                              key={op.jugador.id}
                              className="py-3 px-2 text-center"
                            >
                              {self ? (
                                "—"
                              ) : (
                                <div
                                  className={`rounded-full w-8 h-8 flex items-center justify-center mx-auto font-medium text-white ${
                                    val > 0 ? "bg-green-500" : "bg-red-500"
                                  }`}
                                >
                                  {val}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
