// app/api/scoreboard/[id]/route.ts
import { api } from "@/config/axios-config";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

// In-memory cache to persist match state between requests (dev/demo only)
interface MatchData {
  id: string;
  score: number;
  players: string[];
}

const matchCache = new Map<string, MatchData>();

// GET and PUT proxy with in-memory override
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // If cached, return that
  if (matchCache.has(id)) {
    return NextResponse.json(matchCache.get(id));
  }
  // Otherwise fetch external and cache it
  const externalRes = await api.get(`/partido/${id}`);
  const data = externalRes.data;
  matchCache.set(id, data);
  return NextResponse.json(data, { status: externalRes.status });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const payload = await req.json();
  // Forward to external
  const externalRes = await api.put(`/partido/${id}`, payload);
  const result = externalRes.data;
  // Update cache with fresh result
  matchCache.set(id, result);
  try {
    const eventId = result.evento?.id;
    const categoryId =
      result.faseEventoCategoria?.eventoCategoria?.categoria?.id;
    if (eventId && categoryId) {
      revalidatePath(`/eventos/${eventId}/category/${categoryId}`);
    }
  } catch (e) {
    console.error("Failed to revalidate path", e);
  }
  return NextResponse.json(result, { status: externalRes.status });
}
