import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  ChevronRight,
  BarChart3,
  PlayCircle,
  Clock,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function DashboardTournamentCategories() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 px-8 p2-4">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-primary">Eventos</span>
            <span className="text-muted-foreground text-sm">›</span>
            <span className="text-muted-foreground text-sm">Evento</span>
            <span className="text-muted-foreground text-sm">›</span>
            <span className="text-muted-foreground text-sm">
              El Salvador 2025 World Boccia Challenger
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4 max-w-screen-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info Card */}
            <Card className="overflow-hidden">
              <div className="bg-primary/10 p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>20 de Junio 2025</span>
                </div>
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">
                  San Salvador 2025 World Boccia Challenger
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>San Salvador, El Salvador</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Button variant="default" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Calendario</span>
                  </Button>
                  <Button variant="default" className="flex items-center gap-2">
                    <PlayCircle className="h-4 w-4" />
                    <span>En vivo</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Ranking</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Reporte</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Escanea para acceso móvil
                </CardTitle>
                <CardDescription>
                  Accede rápidamente desde tu dispositivo
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-6">
                <div className="border p-3 rounded-lg bg-white">
                  <Image
                    src="/qrcode-test.svg"
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="h-[200px] w-[200px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tournament Stats Card */}
            {/* <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Estadísticas del torneo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Categorías</span>
                    <Badge variant="outline">8</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Participantes</span>
                    <Badge variant="outline">42</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Países</span>
                    <Badge variant="outline">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Partidos programados</span>
                    <Badge variant="outline">64</Badge>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Tabs defaultValue="individuals" className="w-full">
              <div className="border-b">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4">
                  <TabsList className="h-9 w-full sm:w-auto mb-4 sm:mb-0">
                    <TabsTrigger value="individuals" className="text-sm">
                      Individuales
                    </TabsTrigger>
                    <TabsTrigger value="teams" className="text-sm">
                      Parejas / Equipos
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="individuals" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="transition-all hover:scale-[1.01] focus:scale-[1.01] focus:outline-none"
                    >
                      <Card className="overflow-hidden h-full border hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-2 flex flex-row items-start justify-between">
                          <div>
                            <CardDescription className="text-xs font-medium text-primary/80 uppercase tracking-wide">
                              Pools
                            </CardDescription>
                            <CardTitle className="text-xl font-bold">
                              {category.name}
                            </CardTitle>
                          </div>
                          <div className="flex items-center justify-center rounded-full w-8 h-8 bg-primary/10 text-primary">
                            <ChevronRight className="h-5 w-5" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-muted-foreground">
                                {category.entrants}{" "}
                                {category.entrants === 1
                                  ? "participante"
                                  : "participantes"}
                              </span>
                            </div>
                            {category.status && (
                              <Badge
                                variant={
                                  category.status === "En curso"
                                    ? "default"
                                    : category.status === "Próximo"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="text-xs"
                              >
                                {category.status}
                              </Badge>
                            )}
                          </div>
                          {/* {category.progress > 0 && (
                            <div className="mt-4 h-1.5 w-full bg-muted overflow-hidden rounded-full">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${category.progress}%` }}
                              ></div>
                            </div>
                          )} */}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="teams" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teamCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="transition-all hover:scale-[1.01] focus:scale-[1.01] focus:outline-none"
                    >
                      <Card className="overflow-hidden h-full border hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-2 flex flex-row items-start justify-between">
                          <div>
                            <CardDescription className="text-xs font-medium text-primary/80 uppercase tracking-wide">
                              Pools
                            </CardDescription>
                            <CardTitle className="text-xl font-bold">
                              {category.name}
                            </CardTitle>
                          </div>
                          <div className="flex items-center justify-center rounded-full w-8 h-8 bg-primary/10 text-primary">
                            <ChevronRight className="h-5 w-5" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-muted-foreground">
                                {category.entrants}{" "}
                                {category.entrants === 1 ? "equipo" : "equipos"}
                              </span>
                            </div>
                            {category.status && (
                              <Badge
                                variant={
                                  category.status === "En curso"
                                    ? "default"
                                    : category.status === "Próximo"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="text-xs"
                              >
                                {category.status}
                              </Badge>
                            )}
                          </div>
                          {/* {category.progress > 0 && (
                            <div className="mt-4 h-1.5 w-full bg-muted overflow-hidden rounded-full">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${category.progress}%` }}
                              ></div>
                            </div>
                          )} */}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  {
    id: "bc1-female",
    name: "BC1 Femenino",
    entrants: 2,
    status: "En curso",
    progress: 75,
  },
  {
    id: "bc1-male",
    name: "BC1 Masculino",
    entrants: 5,
    status: "En curso",
    progress: 60,
  },
  {
    id: "bc2-female",
    name: "BC2 Femenino",
    entrants: 5,
    status: "Próximo",
    progress: 25,
  },
  {
    id: "bc2-male",
    name: "BC2 Masculino",
    entrants: 7,
    status: "Próximo",
    progress: 10,
  },
  {
    id: "bc3-female",
    name: "BC3 Femenino",
    entrants: 5,
    status: "Pendiente",
    progress: 0,
  },
  {
    id: "bc3-male",
    name: "BC3 Masculino",
    entrants: 5,
    status: "Pendiente",
    progress: 0,
  },
  {
    id: "bc4-female",
    name: "BC4 Femenino",
    entrants: 5,
    status: "Pendiente",
    progress: 0,
  },
  {
    id: "bc4-male",
    name: "BC4 Masculino",
    entrants: 8,
    status: "Pendiente",
    progress: 0,
  },
];

const teamCategories = [
  {
    id: "bc1-bc2-mixed",
    name: "BC1/BC2 Mixto",
    entrants: 4,
    status: "En curso",
    progress: 50,
  },
  {
    id: "bc3-mixed",
    name: "BC3 Mixto",
    entrants: 6,
    status: "Próximo",
    progress: 0,
  },
  {
    id: "bc4-mixed",
    name: "BC4 Mixto",
    entrants: 3,
    status: "Pendiente",
    progress: 0,
  },
];
