import DashboardTournamentCategories from "@/components/dashboard/dashboard";
import { getCategoriesByEvent } from "@/server/events/get-categories-by-event";
import { getEventById } from "@/server/events/get-event-by-id";

interface EventPageDetailProps {
  params: {
    id: string;
  };
}

export default async function EventPageDetail({
  params,
}: EventPageDetailProps) {
  const { id } = params;

  const categories = await getCategoriesByEvent(id);
  const event = await getEventById(id);

  // const event = {
  //   id: 5,
  //   nombre: "Torneo de Prueba",
  //   descripcion: "Descripción del torneo de prueba",
  //   fechaInicio: "2023-10-01",
  //   fechaFin: "2023-10-05",
  //   lugar: "Ubicación del torneo de prueba",
  //   pais: "El Salvador",
  // };

  return (
    <>
      <DashboardTournamentCategories
        categories={categories}
        eventInfo={event}
      />
    </>
  );
}
