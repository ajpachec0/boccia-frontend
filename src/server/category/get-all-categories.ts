import { api } from "@/config/axios-config";

export const getAllCategories = async (): Promise<Categories> => {
  const res = await api
    .get("/eventos")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching events:", error);
      throw new Error("Failed to fetch events");
    });
  return res;
};

export interface Categories {
  id: number;
  categoria: string;
}
