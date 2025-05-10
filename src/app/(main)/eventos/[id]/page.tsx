import DashboardTournamentCategories from "@/components/dashboard/dashboard";

interface EventPageDetailProps {
  params: {
    id: string;
  };
}

export default async function EventPageDetail({
  params,
}: EventPageDetailProps) {
  const { id } = params;

  return (
    <>
      <DashboardTournamentCategories />
    </>
  );
}
