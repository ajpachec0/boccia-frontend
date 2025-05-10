import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabTableClasification } from "@/components/category/tab-table-clasification";
import { ApiPool, PoolsTab } from "./pools-tab";
import { MatchesTab } from "./matches-tab";
import { CategoryEvent } from "@/types/categories-events.type";

interface Props {
  category: CategoryEvent;
  pools: ApiPool[];
}

export function CategoryTabs({ category, pools }: Props) {
  return (
    <Tabs defaultValue="bracket" className="mb-8">
      <TabsList className="grid grid-cols-3 w-full max-w-md">
        <TabsTrigger value="bracket">Clasificación</TabsTrigger>
        <TabsTrigger value="pools">Grupos</TabsTrigger>
        <TabsTrigger value="matches">Partidos</TabsTrigger>
      </TabsList>

      <TabsContent value="bracket" className="mt-6">
        <TabTableClasification category={category} />
      </TabsContent>
      <TabsContent value="pools" className="mt-6">
        <PoolsTab pools={pools} />
      </TabsContent>
      <TabsContent value="matches" className="mt-6">
        <MatchesTab rounds={category.rounds} />
      </TabsContent>
    </Tabs>
  );
}
