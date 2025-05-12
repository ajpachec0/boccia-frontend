import { ScoreboardPageComponent } from "@/components/scoreboard/scoreboard-puntuation";

interface Props {
  params: {
    id: string;
  };
}

export default async function ScoreboardPage({ params }: Props) {
  return (
    <>
      <ScoreboardPageComponent id={params.id} />
    </>
  );
}
