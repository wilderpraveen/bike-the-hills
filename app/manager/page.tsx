import { Mountain } from "lucide-react";
import { coldDesertItinerary } from "@/data/cold-desert-itinerary";
import { getManagerItineraries } from "@/lib/managed-itinerary";
import { getExpeditions } from "@/lib/managed-expeditions";
import ManagerWorkspace from "@/components/manager/ManagerWorkspace";
import { getSiteContent } from "@/lib/site-content";

export default async function ManagerPage() {
  if (process.env.NODE_ENV !== "development") return <LocalOnlyNotice />;

  const allExpeditions = await getExpeditions(true);
  const activeExpeditions = allExpeditions.filter((expedition) => !expedition.isArchived);
  const archivedExpeditions = allExpeditions.filter((expedition) => expedition.isArchived);
  const saved = await getManagerItineraries();
  const siteContent = await getSiteContent();
  const initial = {
    ...saved,
    ...(saved["cold-desert-expedition"] ? {} : { "cold-desert-expedition": coldDesertItinerary }),
  };

  return (
    <ManagerWorkspace expeditions={activeExpeditions} archivedExpeditions={archivedExpeditions} initialItineraries={initial} siteContent={siteContent} />
  );
}

function LocalOnlyNotice() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f4ef] px-5 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-[#eaf1ec] text-[#12372a]"><Mountain size={22} /></span>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#c09138]">Website manager</p>
        <h1 className="mt-2 font-playfair text-3xl font-bold text-[#12372a]">Available on your computer</h1>
        <p className="mt-4 leading-7 text-stone-600">The tour manager edits project files, so it is available only while running the local development site. Publish tour changes by deploying the updated project.</p>
      </section>
    </main>
  );
}
