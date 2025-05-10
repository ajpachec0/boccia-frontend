import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await auth();
  redirect("/eventos");

  return (
    <>
      {/* <DashboardTournamentCategories /> */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
        <p className="mt-4 text-lg">This is a placeholder for the dashboard.</p>
        <p className="mt-2 text-lg">Please select an event to view details.</p>
        <p className="mt-2 text-lg">You can also create a new event.</p>
        <p className="mt-2 text-lg">This is a placeholder for the dashboard.</p>
        <p className="mt-2 text-lg">Please select an event to view details.</p>
        <p className="mt-2 text-lg">You can also create a new event.</p>
        <p className="mt-2 text-lg">This is a placeholder for the dashboard.</p>
        <p className="mt-2 text-lg">Please select an event to view details.</p>
        <p className="mt-2 text-lg">You can also create a new event.</p>
        <p className="mt-2 text-lg">This is a placeholder for the dashboard.</p>
        <p className="mt-2 text-lg">Please select an event to view details.</p>
      </div>
    </>
  );
}
