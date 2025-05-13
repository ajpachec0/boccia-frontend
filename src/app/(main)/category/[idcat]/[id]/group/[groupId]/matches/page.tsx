import GroupMatchesClient from "@/components/matches/group-matches-container";
import { getMatchesByGroupByCategoryByEvent } from "@/server/matches/get-matches-by-cateogry-by-event";

interface Props {
  params: { idcat: string; id: string; groupId: string };
}

export default async function GroupMatchesPage({ params }: Props) {
  const initialMatches = await getMatchesByGroupByCategoryByEvent(
    params.id,
    params.idcat,
    params.groupId
  );

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <h1 className="text-2xl font-semibold mb-4">
        Partidos del grupo {params.groupId}
      </h1>

      <GroupMatchesClient
        initialMatches={initialMatches}
        eventId={params.id}
        categoryId={params.idcat}
        groupId={params.groupId}
      />
    </div>
  );
}
