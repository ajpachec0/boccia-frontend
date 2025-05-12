import { api } from "@/config/axios-config";

export const getEventById = async (id: string): Promise<EventResponse> => {
  const res = await api
    .get(`/eventos/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching event:", error);
      //   throw error; // Rethrow the error to handle it in the calling function
    });

  return res;
};

export interface EventResponse {
  evento: {
    id: number;
    evento: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    lugar: string;
    pais: string;
  };
  categorias: number;
  jugadores: number;
  paises: number;
  partidos: number;
}
