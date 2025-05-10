"use server";

import { ModalNewEventFormValues } from "@/components/eventos/modal-new-event";
import { api } from "@/config/axios-config";
import { handleServerAction } from "@/utils/handle-server-action";
import { revalidatePath } from "next/cache";

export const createEventAction = handleServerAction(
  async (data: ModalNewEventFormValues) => {
    const res = await api.post("/eventos", data);

    revalidatePath("/eventos");
    return res.data;
  }
);
