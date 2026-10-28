export type ExpeditionDay = {
  day: number;
  title: string;
  mode: "Cycling" | "Transfer" | "Cycling / transfer" | "To be confirmed";
  distance: string;
  sleepingElevation: string;
  description: string;
  highlights: string[];
};

export const itineraryModes: ExpeditionDay["mode"][] = [
  "Cycling",
  "Transfer",
  "Cycling / transfer",
  "To be confirmed",
];

export function isExpeditionDayList(value: unknown): value is ExpeditionDay[] {
  if (!Array.isArray(value) || value.length > 25) return false;

  return value.every((day, index) => {
    if (!day || typeof day !== "object") return false;
    const item = day as Record<string, unknown>;
    return (
      item.day === index + 1 &&
      typeof item.title === "string" && item.title.trim().length > 0 && item.title.length <= 140 &&
      typeof item.mode === "string" && itineraryModes.includes(item.mode as ExpeditionDay["mode"]) &&
      typeof item.distance === "string" && item.distance.length <= 60 &&
      typeof item.sleepingElevation === "string" && item.sleepingElevation.length <= 80 &&
      typeof item.description === "string" && item.description.length <= 1800 &&
      Array.isArray(item.highlights) && item.highlights.length <= 8 &&
      item.highlights.every((highlight) => typeof highlight === "string" && highlight.length <= 120)
    );
  });
}
