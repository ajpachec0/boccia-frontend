import EventoContainer from "@/components/eventos/evento-container";
import { getCategoriesOptions } from "@/server/category/get-categories-options";
import { getAllEvents } from "@/server/events/get-all-events";

export default async function Page() {
  const eventos = await getAllEvents();
  const categoriesOptions = await getCategoriesOptions();

  return (
    <>
      <EventoContainer
        eventos={eventos}
        categoriesOptions={categoriesOptions}
      />
    </>
  );
}
