// components/category/GroupMatchesClient.tsx
"use client";

import { useEffect, useState } from "react";
import { ApiMatch, MatchesTab } from "../category/matches-tab";

interface Props {
  initialMatches: ApiMatch[];
  eventId: string;
  categoryId: string;
  groupId: string;
}

export default function GroupMatchesClient({
  initialMatches,
  eventId,
  categoryId,
  groupId,
}: Props) {
  const [matches, setMatches] = useState<ApiMatch[]>(initialMatches);

  useEffect(() => {
    let isMounted = true;

    const fetchMatches = async () => {
      try {
        const res = await fetch(
          `/api/matches/${eventId}/${categoryId}/${groupId}`
        );
        if (!res.ok) throw new Error("Error al actualizar partidos");
        const data: ApiMatch[] = await res.json();
        if (isMounted) setMatches(data);
      } catch (e) {
        console.error(e);
      }
    };

    // Primera carga rápida
    fetchMatches();
    // Polling cada 10 000 ms
    const interval = setInterval(fetchMatches, 10_000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [eventId, categoryId, groupId]);

  return <MatchesTab matches={matches} />;
}
