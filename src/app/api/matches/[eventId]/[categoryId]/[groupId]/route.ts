import { NextResponse } from "next/server";
import { getMatchesByGroupByCategoryByEvent } from "@/server/matches/get-matches-by-cateogry-by-event";

interface Params {
  params: {
    eventId: string;
    categoryId: string;
    groupId: string;
  };
}

// GET /api/matches/:eventId/:categoryId/:groupId
export async function GET(_: Request, { params }: Params) {
  const { eventId, categoryId, groupId } = params;
  const matches = await getMatchesByGroupByCategoryByEvent(
    eventId,
    categoryId,
    groupId
  );
  return NextResponse.json(matches);
}
