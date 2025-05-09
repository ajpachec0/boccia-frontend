// app/api/scoreboard/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    teams: [
      {
        code: "CHI",
        flag: "/flags/chile.png",
        name: "J BASTIAS",
        number: 2202,
        color: "bg-red-600",
        score: [0, 1, 2, 3, 4, 5],
        time: 240, // 4:00
      },
      {
        code: "ESA",
        flag: "/flags/el_salvador.png",
        name: "M SAYES",
        number: 2201,
        color: "bg-blue-500",
        score: [1, 2, 3, 4, 5, 6],
        time: 210, // 3:30
      },
    ],
    currentEnd: 3,
    ballsUsed: {
      CHI: 3,
      ESA: 2,
    },
  };
  return NextResponse.json(data);
}
