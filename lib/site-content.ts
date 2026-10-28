import "server-only";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import storedSiteContent from "@/data/site-content.json";

export type DestinationContent = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type SiteContent = typeof storedSiteContent;

export async function getSiteContent(): Promise<SiteContent> {
  if (process.env.NODE_ENV !== "development") return storedSiteContent;
  try {
    const file = path.join(process.cwd(), "data", "site-content.json");
    const parsed: unknown = JSON.parse(await readFile(file, "utf8"));
    return isSiteContent(parsed) ? parsed : storedSiteContent;
  } catch {
    return storedSiteContent;
  }
}

export function isSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const content = value as Record<string, unknown>;
  if (!content.home || typeof content.home !== "object" || !content.destinationsPage || typeof content.destinationsPage !== "object" || !Array.isArray(content.destinations)) return false;
  const home = content.home as Record<string, unknown>;
  const sections = ["hero", "featured", "whyRide", "hiddenRoutes", "destinations", "experience", "testimonials"];
  if (!sections.every((key) => home[key] && typeof home[key] === "object")) return false;

  const stringFields: Record<string, string[]> = {
    hero: ["eyebrow", "title", "description", "image", "primaryCta", "secondaryCta"],
    featured: ["eyebrow", "title", "description"],
    whyRide: ["eyebrow", "title", "description"],
    hiddenRoutes: ["eyebrow", "title", "description", "story", "image"],
    destinations: ["eyebrow", "title", "description"],
    experience: ["eyebrow", "title", "description", "image"],
    testimonials: ["eyebrow", "title", "description"],
  };
  for (const [sectionName, fields] of Object.entries(stringFields)) {
    const section = home[sectionName] as Record<string, unknown>;
    for (const field of fields) {
      if (typeof section[field] !== "string" || !(section[field] as string).trim() || (section[field] as string).length > 1800) return false;
    }
  }
  const featured = home.featured as Record<string, unknown>;
  if (!Array.isArray(featured.expeditionSlugs) || featured.expeditionSlugs.length < 1 || featured.expeditionSlugs.length > 30 ||
      featured.expeditionSlugs.some((slug) => typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) ||
      new Set(featured.expeditionSlugs).size !== featured.expeditionSlugs.length) return false;
  const siteImages = [
    (home.hero as Record<string, unknown>).image,
    (home.hiddenRoutes as Record<string, unknown>).image,
    (home.experience as Record<string, unknown>).image,
    (content.destinationsPage as Record<string, unknown>).heroImage,
  ];

  const destinationPage = content.destinationsPage as Record<string, unknown>;
  for (const field of ["heroEyebrow", "heroTitle", "heroDescription", "heroImage", "sectionEyebrow", "sectionTitle", "sectionDescription"]) {
    if (typeof destinationPage[field] !== "string" || !(destinationPage[field] as string).trim() || (destinationPage[field] as string).length > 1800) return false;
  }

  const destinations = content.destinations as unknown[];
  if (destinations.length > 30) return false;
  const seen = new Set<string>();
  for (const item of destinations) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    const destination = item as Record<string, unknown>;
    if (typeof destination.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(destination.slug) || seen.has(destination.slug)) return false;
    if (["name", "description", "image"].some((field) => typeof destination[field] !== "string" || !(destination[field] as string).trim() || (destination[field] as string).length > 1800)) return false;
    siteImages.push(destination.image);
    seen.add(destination.slug);
  }
  if (siteImages.some((image) => typeof image !== "string" || !image.startsWith("/images/") || image.includes("..") || image.includes("\\"))) return false;

  const arrayFields: Array<[Record<string, unknown>, string, string[]]> = [
    [home.whyRide as Record<string, unknown>, "cards", ["title", "description"]],
    [home.testimonials as Record<string, unknown>, "items", ["quote", "name", "country"]],
  ];
  for (const [section, key, fields] of arrayFields) {
    if (!Array.isArray(section[key]) || (section[key] as unknown[]).length > 12) return false;
    for (const item of section[key] as unknown[]) {
      if (!item || typeof item !== "object" || fields.some((field) => typeof (item as Record<string, unknown>)[field] !== "string")) return false;
    }
  }
  for (const [sectionName, field] of [["hiddenRoutes", "highlights"], ["experience", "highlights"]]) {
    const section = home[sectionName] as Record<string, unknown>;
    if (!Array.isArray(section[field]) || (section[field] as unknown[]).length > 12 || (section[field] as unknown[]).some((item) => typeof item !== "string")) return false;
  }
  return true;
}

export async function saveSiteContent(content: SiteContent) {
  if (process.env.NODE_ENV !== "development") throw new Error("Site content can only be edited during local development.");
  if (!isSiteContent(content)) throw new Error("Please review the site content fields and try again.");
  const file = path.join(process.cwd(), "data", "site-content.json");
  await writeFile(file, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}
