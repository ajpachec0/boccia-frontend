import { ChevronLeft, Calendar, MapPin, Trophy, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TabTableClasification } from "../../../../components/category/tab-table-clasification";

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = getCategoryById(params.id);

  if (!category) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
        <Link href="/">
          <Button variant="outline" className="mt-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver al inicio
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:text-primary transition-colors">
              Bracket
            </Link>
            <span className="mx-2">›</span>
            <Link href="/" className="hover:text-primary transition-colors">
              Eventos
            </Link>
            <span className="mx-2">›</span>
            <span>Cali 2024 World Boccia Challenger</span>
          </div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver a categorías
          </Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-0">
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge variant="outline" className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {category.date}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {category.location}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {category.entrants} participantes
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5" />
              {category.format}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {category.courts.map((court, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {index + 1}
                </div>
                <div>
                  <div className="text-sm font-medium">{court.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {court.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs para diferentes vistas */}
      <Tabs defaultValue="bracket" className="mb-8">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="bracket">Clasificación</TabsTrigger>
          <TabsTrigger value="pools">Grupos</TabsTrigger>
          <TabsTrigger value="matches">Partidos</TabsTrigger>
        </TabsList>

        {/* Tab de Clasificación */}
        <TabsContent value="bracket" className="mt-6">
          <TabTableClasification category={category} />
        </TabsContent>

        {/* Tab de Grupos */}
        <TabsContent value="pools" className="mt-6">
          {category.pools.map((pool) => (
            <Card key={pool.id} className="mb-8">
              <CardHeader className="pb-0">
                <CardTitle className="text-xl">Pool {pool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-2 text-left font-medium text-muted-foreground w-10">
                          #
                        </th>
                        <th className="py-3 px-2 text-left font-medium text-muted-foreground">
                          Participante
                        </th>
                        <th className="py-3 px-2 text-center font-medium text-muted-foreground w-16">
                          Victorias
                        </th>
                        <th className="py-3 px-2 text-center font-medium text-muted-foreground w-16">
                          Dif. Puntos
                        </th>
                        <th className="py-3 px-2 text-center font-medium text-muted-foreground w-16">
                          Puntos a favor
                        </th>
                        <th className="py-3 px-2 text-center font-medium text-muted-foreground w-16">
                          Ends ganados
                        </th>
                        <th className="py-3 px-2 text-center font-medium text-muted-foreground w-16">
                          PDIFF Match
                        </th>
                        <th className="py-3 px-2 text-center font-medium text-muted-foreground w-16">
                          PDIFF End
                        </th>
                        <th
                          className="py-3 px-2 text-center font-medium text-muted-foreground"
                          colSpan={2}
                        >
                          VS Record
                        </th>
                      </tr>
                      <tr className="border-b bg-muted/30">
                        <th className="py-2 px-2"></th>
                        <th className="py-2 px-2"></th>
                        <th className="py-2 px-2"></th>
                        <th className="py-2 px-2"></th>
                        <th className="py-2 px-2"></th>
                        <th className="py-2 px-2"></th>
                        <th className="py-2 px-2"></th>
                        <th className="py-2 px-2"></th>
                        <th className="py-2 px-2 text-center w-16">
                          {pool.players[0].id}
                        </th>
                        <th className="py-2 px-2 text-center w-16">
                          {pool.players[1].id}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pool.players.map((player) => (
                        <tr
                          key={player.id}
                          className="border-b hover:bg-muted/20"
                        >
                          <td className="py-3 px-2 text-center">
                            <div className="bg-primary/10 text-primary font-medium rounded-full w-8 h-8 flex items-center justify-center mx-auto">
                              {player.id}
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-3">
                              {player.flag && (
                                <div className="relative h-5 w-8 overflow-hidden rounded">
                                  <Image
                                    src={player.flag || "/placeholder.svg"}
                                    alt={`Bandera de ${player.country}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <div className="font-medium">{player.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {player.country}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center font-medium">
                            {player.stats.wins}
                          </td>
                          <td className="py-3 px-2 text-center font-medium">
                            {player.stats.pointsDiff}
                          </td>
                          <td className="py-3 px-2 text-center font-medium">
                            {player.stats.pointsFor}
                          </td>
                          <td className="py-3 px-2 text-center font-medium">
                            {player.stats.endsWon}
                          </td>
                          <td className="py-3 px-2 text-center font-medium">
                            {player.stats.pdiffMatch}
                          </td>
                          <td className="py-3 px-2 text-center font-medium">
                            {player.stats.pdiffEnd}
                          </td>
                          {pool.players.map((vsPlayer) => (
                            <td
                              key={`${player.id}-vs-${vsPlayer.id}`}
                              className="py-3 px-2 text-center"
                            >
                              {player.id === vsPlayer.id ? (
                                "-"
                              ) : player.vsRecord &&
                                player.vsRecord[vsPlayer.id] ? (
                                <div
                                  className={`rounded-full w-8 h-8 flex items-center justify-center mx-auto ${
                                    player.vsRecord[vsPlayer.id] > 0
                                      ? "bg-green-500 text-white"
                                      : "bg-red-500 text-white"
                                  }`}
                                >
                                  {player.vsRecord[vsPlayer.id]}
                                </div>
                              ) : (
                                "-"
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Tab de Partidos */}
        <TabsContent value="matches" className="mt-6">
          {category.rounds.map((round) => (
            <div key={round.id} className="mb-10">
              <h3 className="text-xl font-semibold mb-4">
                Ronda {round.number}
              </h3>
              <div className="grid gap-4">
                {round.matches.map((match, index) => (
                  <Card
                    key={`${round.id}-${index}`}
                    className="overflow-hidden"
                  >
                    <div className="bg-muted/30 px-4 py-2 flex items-center gap-2 border-b">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium">
                        Partido {index + 1}
                      </span>
                    </div>
                    <CardContent className="p-0">
                      {match.players.map((player, playerIndex) => (
                        <div
                          key={`${match.id}-${player.id}`}
                          className={`flex items-center p-4 ${
                            playerIndex === 0 ? "border-b" : ""
                          }`}
                        >
                          <div className="w-10 text-center font-medium text-muted-foreground">
                            {player.id}
                          </div>
                          <div className="flex-1 flex items-center gap-3">
                            {player.flag && (
                              <div className="relative h-5 w-8 overflow-hidden rounded">
                                <Image
                                  src={player.flag || "/placeholder.svg"}
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
                              player.score >
                              match.players[playerIndex === 0 ? 1 : 0].score
                                ? "bg-green-500 text-white"
                                : "bg-muted"
                            }`}
                          >
                            {player.score}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Función simulada para obtener datos de categoría
function getCategoryById(id: string) {
  const brazilFlag = "/placeholder.svg?height=30&width=50";
  const colombiaFlag = "/placeholder.svg?height=30&width=50";

  const allCategories = [
    {
      id: "bc1-female",
      name: "BC1 Femenino",
      entrants: 2,
      status: "En curso",
      date: "5th Octubre 2024",
      location: "Cali, Colombia",
      format: "Round Robin",
      courts: [
        { name: "Court 1", status: "Activo" },
        { name: "Court 2", status: "En espera" },
      ],
      standings: [
        {
          id: "1101",
          name: "BEATRIZ MARTA DAS CHAGAS",
          country: "Brasil",
          flag: brazilFlag,
          color: "#FFD700",
          textColor: "#000000",
        },
        {
          id: "1102",
          name: "LUZ GENES",
          country: "Colombia",
          flag: colombiaFlag,
          color: "#C0C0C0",
          textColor: "#000000",
        },
        {
          id: "NA",
          name: "NA",
          country: "",
          flag: "",
          color: "#CD7F32",
          textColor: "#FFFFFF",
        },
      ],
      pools: [
        {
          id: "pool-a",
          name: "A",
          players: [
            {
              id: "1101",
              name: "BEATRIZ MARTA DAS CHAGAS",
              country: "Brasil",
              flag: brazilFlag,
              stats: {
                wins: 2,
                pointsDiff: 3,
                pointsFor: 8,
                endsWon: 4,
                pdiffMatch: 2,
                pdiffEnd: 3,
              },
              vsRecord: {
                "1102": 4,
              },
            },
            {
              id: "1102",
              name: "LUZ GENES",
              country: "Colombia",
              flag: colombiaFlag,
              stats: {
                wins: 0,
                pointsDiff: -3,
                pointsFor: 5,
                endsWon: 4,
                pdiffMatch: 0,
                pdiffEnd: 2,
              },
              vsRecord: {
                "1101": -4,
              },
            },
          ],
        },
      ],
      rounds: [
        {
          id: "round-1",
          number: 1,
          matches: [
            {
              id: "match-1",
              players: [
                {
                  id: "1101",
                  name: "BEATRIZ MARTA DAS CHAGAS",
                  country: "Brasil",
                  flag: brazilFlag,
                  score: 4,
                },
                {
                  id: "1102",
                  name: "LUZ GENES",
                  country: "Colombia",
                  flag: colombiaFlag,
                  score: 3,
                },
              ],
            },
          ],
        },
        {
          id: "round-2",
          number: 2,
          matches: [
            {
              id: "match-2",
              players: [
                {
                  id: "1101",
                  name: "BEATRIZ MARTA DAS CHAGAS",
                  country: "Brasil",
                  flag: brazilFlag,
                  score: 4,
                },
                {
                  id: "1102",
                  name: "LUZ GENES",
                  country: "Colombia",
                  flag: colombiaFlag,
                  score: 2,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return allCategories.find((cat) => cat.id === id);
}
