"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight, Trophy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModalNewEvent } from "@/components/eventos/modal-new-event";

interface Event {
  id: number;
  evento: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
}

interface Props {
  eventos: Event[];
  categoriesOptions: { id: number; name: string }[];
}

export default function EventoContainer({ eventos, categoriesOptions }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = useMemo(() => new Date(), []);

  // Función para parsear fecha en formato DD-MM-YYYY
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  // Particionar eventos según estado
  const upcomingEvents = useMemo(
    () => eventos.filter((e) => new Date(e.fechaInicio) > today),
    [eventos, today]
  );

  const ongoingEvents = useMemo(
    () =>
      eventos.filter(
        (e) => new Date(e.fechaInicio) <= today && new Date(e.fechaFin) >= today
      ),
    [eventos, today]
  );

  const pastEvents = useMemo(
    () => eventos.filter((e) => new Date(e.fechaFin) < today),
    [eventos, today]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/logo-bocciasv.png"
              alt="Logo"
              width={28}
              height={28}
              className="h-9 w-9"
            />
            <span className="text-primary">Sistema de Torneos</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4">
            <Button
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span>Nuevo evento</span>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Eventos de Boccia</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora los torneos y competiciones de boccia a nivel nacional.
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="mb-12">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="upcoming">Próximos</TabsTrigger>
            <TabsTrigger value="ongoing">En curso</TabsTrigger>
            <TabsTrigger value="past">Pasados</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ongoing" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <ModalNewEvent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        categoriesOptions={categoriesOptions}
      />
    </div>
  );
}

function EventCard({
  event,
  formatDate,
}: {
  event: Event;
  formatDate: (dateStr: string) => string;
}) {
  // Calcular duración en días
  const durationDays = useMemo(() => {
    const start = new Date(event.fechaInicio);
    const end = new Date(event.fechaFin);
    const diff = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  }, [event]);

  // Determinar estado para badge
  let statusText: string;
  let badgeVariant: "default" | "secondary";
  const now = new Date();
  if (new Date(event.fechaInicio) > now) {
    statusText = "Próximo";
    badgeVariant = "default";
  } else if (new Date(event.fechaFin) < now) {
    statusText = "Finalizado";
    badgeVariant = "secondary";
  } else {
    statusText = "En curso";
    badgeVariant = "default";
  }

  return (
    <Link href={`/eventos/${event.id}`} className="group">
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative h-64">
          <Image
            src="/boccia-evento-foto.jpg"
            alt={event.evento}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <Badge variant={badgeVariant}>{statusText}</Badge>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{event.evento}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Calendar className="h-4 w-4" />
            <span>{`${formatDate(event.fechaInicio)} - ${formatDate(
              event.fechaFin
            )}`}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.descripcion}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {durationDays} días
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 group-hover:text-primary"
            >
              Detalles <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
