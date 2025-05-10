import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { CategoryHeader } from "@/components/category/category-header";
import { CategoryInfoCard } from "@/components/category/category-infocard";
import { CategoryTabs } from "@/components/category/categort-tabs";
import { CategoryEvent } from "@/types/categories-events.type";
import { getGrupoByCategoryByEvent } from "@/server/grupos/get-grupo-by-category-by-event";

interface Props {
  params: { idcat: string; id: string };
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategoryById(params.idcat) as CategoryEvent | undefined;
  const group = await getGrupoByCategoryByEvent(params.id, params.idcat);

  if (!category) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
        <Link href="/eventos">
          <Button variant="outline" className="mt-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver al inicio
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <CategoryHeader category={category} />
      <CategoryInfoCard category={category} />
      <CategoryTabs category={category} pools={group} />
    </div>
  );
}

function getCategoryById(id: string) {
  const brazilFlag = "https://flagcdn.com/w320/uy.png";
  const colombiaFlag = "https://flagcdn.com/w320/co.png";

  const allCategories = [
    {
      id: "1",
      name: "BC1 Femenino",
      entrants: 2,
      status: "En curso",
      date: "16 de Junio de 2025",
      location: "San Salvador, El Salvador",
      format: "Round Robin",
      courts: [
        { name: "Court 1", status: "Activo" },
        { name: "Court 2", status: "En espera" },
      ],
      standings: [
        {
          id: "1101",
          name: "BEATRIZ MARTA DAS CHAGAS",
          country: "Uruguay",
          flag: brazilFlag,
          color: "#FFD700",
          textColor: "#000000",
        },
        {
          id: "1102",
          name: "LUZ GENES",
          country: "Colombia",
          flag: colombiaFlag,
          color: "#C0C0C0",
          textColor: "#000000",
        },
        {
          id: "NA",
          name: "NA",
          country: "",
          flag: "",
          color: "#CD7F32",
          textColor: "#FFFFFF",
        },
      ],
      pools: [
        {
          id: "pool-a",
          name: "A",
          players: [
            {
              id: "1101",
              name: "BEATRIZ MARTA DAS CHAGAS",
              country: "Brasil",
              flag: brazilFlag,
              stats: {
                wins: 2,
                pointsDiff: 3,
                pointsFor: 8,
                endsWon: 4,
                pdiffMatch: 2,
                pdiffEnd: 3,
              },
              vsRecord: {
                "1102": 4,
              },
            },
            {
              id: "1102",
              name: "LUZ GENES",
              country: "Colombia",
              flag: colombiaFlag,
              stats: {
                wins: 0,
                pointsDiff: -3,
                pointsFor: 5,
                endsWon: 4,
                pdiffMatch: 0,
                pdiffEnd: 2,
              },
              vsRecord: {
                "1101": -4,
              },
            },
          ],
        },
      ],
      rounds: [
        {
          id: "round-1",
          number: 1,
          matches: [
            {
              id: "match-1",
              players: [
                {
                  id: "1101",
                  name: "BEATRIZ MARTA DAS CHAGAS",
                  country: "Brasil",
                  flag: brazilFlag,
                  score: 4,
                },
                {
                  id: "1102",
                  name: "LUZ GENES",
                  country: "Colombia",
                  flag: colombiaFlag,
                  score: 3,
                },
              ],
            },
          ],
        },
        {
          id: "round-2",
          number: 2,
          matches: [
            {
              id: "match-2",
              players: [
                {
                  id: "1101",
                  name: "BEATRIZ MARTA DAS CHAGAS",
                  country: "Brasil",
                  flag: brazilFlag,
                  score: 4,
                },
                {
                  id: "1102",
                  name: "LUZ GENES",
                  country: "Colombia",
                  flag: colombiaFlag,
                  score: 2,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return allCategories.find((cat) => cat.id === id);
}
