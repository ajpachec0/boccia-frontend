import { api } from "@/config/axios-config";

export const getCategoriesByEvent = async (eventId: string) => {
  const res = await api
    .get(`/categorias/evento/${eventId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching categories by event:", error);
      return [];
    });

  const categories = res.map((category: { id: number; categoria: string }) => ({
    id: category.id,
    name: category.categoria,
  }));

  return categories;
};
