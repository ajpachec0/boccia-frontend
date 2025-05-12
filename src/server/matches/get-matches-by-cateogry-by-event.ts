import { api } from "@/config/axios-config";

export const getMatchesByGroupByCategoryByEvent = async (
  eventId: string,
  categoryId: string,
  groupId: string
) => {
  const res = await api
    .get(`/partido`, {
      params: {
        eventoId: eventId,
        categoriaId: categoryId,
        grupoId: groupId,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching matches:", error);
      //   throw error; // Rethrow the error to handle it in the calling function
    });

  return res;
};
