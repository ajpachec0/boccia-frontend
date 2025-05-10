import { createEventAction } from "@/actions/events/create-event.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MultiSelect } from "../ui/multi-select";
import { toast } from "sonner";

// Schema para validación con Zod
const formSchema = z.object({
  evento: z.string().min(1, "El evento es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  fechaInicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
  fechaFin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
  categoriaIds: z.array(z.number()).min(1, "Selecciona al menos una categoría"),
});

export type ModalNewEventFormValues = z.infer<typeof formSchema>;

interface ModalNewEventProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  categoriesOptions: { id: number; name: string }[];
}

export const ModalNewEvent: React.FC<ModalNewEventProps> = ({
  isModalOpen,
  setIsModalOpen,
  categoriesOptions,
}) => {
  const form = useForm<ModalNewEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      evento: "",
      descripcion: "",
      fechaInicio: "",
      fechaFin: "",
      categoriaIds: [],
    },
  });

  const onSubmit = async (values: ModalNewEventFormValues) => {
    const { error } = await createEventAction(values);

    const toastId = toast.loading("Creando evento...");

    if (error) {
      toast.error("Error al crear el evento", {
        id: toastId,
      });
      return;
    }
    toast.success("Evento creado con éxito", {
      id: toastId,
    });

    setIsModalOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agregar nuevo evento</DialogTitle>
          <DialogDescription>
            Complete la información para crear un nuevo evento de torneo.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="evento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del evento</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción del evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fechaInicio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de inicio</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fechaFin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de fin</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoriaIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorías</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={categoriesOptions.map((cat) => ({
                        label: cat.name,
                        value: String(cat.id),
                      }))}
                      defaultValue={field.value.map(String)}
                      onValueChange={(values) =>
                        field.onChange(values.map(Number))
                      }
                      placeholder="Selecciona categorías"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar evento</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
