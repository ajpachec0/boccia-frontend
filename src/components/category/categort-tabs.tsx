import { TabTableClasification } from "@/components/category/tab-table-clasification";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryEvent } from "@/types/categories-events.type";
import { ApiPool, PoolsTab } from "./pools-tab";

interface Props {
  category: CategoryEvent;
  pools: ApiPool[];
  eventId: string;
  categoryId: string;
}

export function CategoryTabs({ category, pools, categoryId, eventId }: Props) {
  return (
    <Tabs defaultValue="pools" className="mb-8">
      <TabsList className="grid grid-cols-2 w-full max-w-md">
        <TabsTrigger value="bracket">Clasificación</TabsTrigger>
        <TabsTrigger value="pools">Grupos</TabsTrigger>
        {/* <TabsTrigger value="matches">Partidos</TabsTrigger> */}
      </TabsList>

      <TabsContent value="bracket" className="mt-6">
        <TabTableClasification category={category} />
      </TabsContent>
      <TabsContent value="pools" className="mt-6">
        <PoolsTab pools={pools} categoryId={categoryId} eventId={eventId} />
      </TabsContent>
      {/* <TabsContent value="matches" className="mt-6">
        <MatchesTab
          matches={matches}
          // matches={matches}
        />
      </TabsContent> */}
    </Tabs>
  );
}
