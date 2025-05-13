import Link from "next/link";
import { ChevronLeft, FolderX } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyCategoryProps {
  categoryName?: string;
  backUrl?: string;
  backLabel?: string;
  withBackButton?: boolean;
}

export default function EmptyCategory({
  categoryName = "esta categoría",
  backUrl = "/eventos",
  backLabel = "Volver al inicio",
  withBackButton = false,
}: EmptyCategoryProps) {
  return (
    <div className="container mx-auto py-8 px-4 text-center h-full flex items-center justify-center">
      <div className="flex flex-col items-center max-w-md mx-auto">
        <div className="bg-muted rounded-full p-6 mb-6">
          <FolderX className="h-12 w-12 text-muted-foreground" />
        </div>

        <h1 className="text-2xl font-bold mb-3">
          No hay información disponible para {categoryName} aún
        </h1>

        <p className="text-muted-foreground mb-6">
          Estamos trabajando para agregar contenido a esta sección. Por favor,
          vuelve a consultar más tarde.
        </p>

        {withBackButton && (
          <Link href={backUrl}>
            <Button variant="outline" className="mt-2">
              <ChevronLeft className="mr-2 h-4 w-4" /> {backLabel}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
