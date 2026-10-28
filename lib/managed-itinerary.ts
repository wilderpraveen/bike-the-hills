import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import localItineraryData from "@/data/local-itineraries.json";
import type { ExpeditionDay } from "@/lib/expedition-itinerary";

async function readLocalItineraries(): Promise<Record<string, ExpeditionDay[]>> {
  try {
    const filePath = path.join(process.cwd(), "data", "local-itineraries.json");
    const contents = await readFile(filePath, "utf8");
    const parsed: unknown = JSON.parse(contents);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, ExpeditionDay[]>
      : {};
  } catch {
    return {};
  }
}

export async function getManagedItinerary(slug: string): Promise<ExpeditionDay[] | null> {
  const itineraries = process.env.NODE_ENV === "development"
    ? await readLocalItineraries()
    : localItineraryData as Record<string, ExpeditionDay[]>;
  return itineraries[slug] ?? null;
}

export async function getManagerItineraries(): Promise<Record<string, ExpeditionDay[]>> {
  return process.env.NODE_ENV === "development"
    ? readLocalItineraries()
    : localItineraryData as Record<string, ExpeditionDay[]>;
}
