import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Info,
  MapPin,
  PlayCircle,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardTournamentCategories() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header con información del evento */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary-foreground/80 mb-2">
                <Calendar className="h-4 w-4" />
                <span>6th Octubre 2024</span>
              </div>
              <h1 className="text-3xl font-bold">
                Cali 2024 World Boccia Challenger
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4" />
                <span>Cali, Colombia</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                <span>Calendario</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
              >
                <PlayCircle className="h-4 w-4" />
                <span>En vivo</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Ranking</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>Reporte</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas del torneo */}
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categorías</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Participantes</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Países</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Partidos</p>
                <p className="text-2xl font-bold">64</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido principal con pestañas */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar con QR e información */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Acceso móvil</CardTitle>
                <CardDescription>Escanea el código QR</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-6">
                <div className="border p-3 rounded-lg bg-white">
                  <Image
                    src="/qrcode-test.svg"
                    alt="QR Code"
                    width={160}
                    height={160}
                    className="h-[160px] w-[160px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/40 p-4 rounded-lg">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>Información del evento</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                El Cali 2024 World Boccia Challenger es un evento internacional
                que reúne a los mejores atletas de boccia de todo el mundo en
                diferentes categorías.
              </p>
            </div>
          </div>

          {/* Contenido principal */}
          <div>
            <Tabs defaultValue="individuals" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="">
                  <TabsList>
                    <TabsTrigger value="individuals">Individuales</TabsTrigger>
                    <TabsTrigger value="teams">Parejas / Equipos</TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent
                value="individuals"
                className="mt-0"
                id="individuals"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="transition-all hover:scale-[1.01] focus:scale-[1.01] focus:outline-none"
                    >
                      <Card className="overflow-hidden h-full border hover:border-primary/50 transition-colors">
                        <div className={`h-1 bg-amber-500`}></div>
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
                          {category.progress > 0 && (
                            <div className="mt-4 h-1.5 w-full bg-muted overflow-hidden rounded-full">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${category.progress}%` }}
                              ></div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="teams" className="mt-0" id="teams">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teamCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="transition-all hover:scale-[1.01] focus:scale-[1.01] focus:outline-none"
                    >
                      <Card className="overflow-hidden h-full border hover:border-primary/50 transition-colors">
                        <div
                          className={`h-1 ${getCategoryStatusColor(
                            category.status
                          )}`}
                        ></div>
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
                          {category.progress > 0 && (
                            <div className="mt-4 h-1.5 w-full bg-muted overflow-hidden rounded-full">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${category.progress}%` }}
                              ></div>
                            </div>
                          )}
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

      <footer className="border-t py-4 bg-background mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sistema de Torneos. Todos los derechos
          reservados.
        </div>
      </footer>
    </div>
  );
}

// Función para determinar el color de la barra de estado
function getCategoryStatusColor(status: string | undefined) {
  if (!status) return "bg-muted";

  switch (status) {
    case "En curso":
      return "bg-green-500";
    case "Próximo":
      return "bg-blue-500";
    case "Pendiente":
      return "bg-amber-500";
    default:
      return "bg-muted";
  }
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
