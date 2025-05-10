import { api } from "@/config/axios-config";

export const getCategoriesOptions = async () => {
  const res = await api
    .get("/categorias")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching categories:", error);
      return [];
    });

  const options = res.map((category: { id: number; categoria: string }) => ({
    id: category.id,
    name: category.categoria,
  }));

  return options;
};
