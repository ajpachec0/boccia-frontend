import { api } from "@/config/axios-config";

export const getAllEvents = async (): Promise<Event[]> => {
  const res = await api
    .get("/eventos")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching events:", error);
      throw new Error("Failed to fetch events");
    });
  return res;
};

export interface Event {
  id: number;
  evento: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
}
