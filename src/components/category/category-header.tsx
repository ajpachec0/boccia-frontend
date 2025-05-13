"use client";
import { Button } from "@/components/ui/button";
import { CategoryEvent } from "@/types/categories-events.type";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { CategoryBreadcrumbs } from "./category-breadcrums";

interface Props {
  category: CategoryEvent;
  categoyName: string;
}

export function CategoryHeader({ categoyName }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div>
        <CategoryBreadcrumbs />
        <h1 className="text-3xl font-bold">{categoyName}</h1>
      </div>
      <Button variant="outline" size="sm" onClick={() => router.back()}>
        <ChevronLeft className="mr-2 h-4 w-4" /> Volver a categorías
      </Button>
    </div>
  );
}
