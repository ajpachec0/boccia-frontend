import { api } from "@/config/axios-config";

export const getGrupoByCategoryByEvent = async (
  eventId: string,
  categoryId: string
) => {
  const queryParams = {
    eventoId: eventId,
    categoriaId: categoryId,
  };

  const res = api.get(`/grupo`, {
    params: queryParams,
  });
  const data = await res.then((response) => response.data);
  return data;
};
