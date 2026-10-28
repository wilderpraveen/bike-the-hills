import "server-only";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { expeditions as builtInExpeditions } from "@/data/expeditions";
import { expeditionPageContent } from "@/data/expedition-page-content";
import localExpeditionData from "@/data/local-expeditions.json";

export type ExpeditionPageContent = {
  eyebrow: string;
  heading: string;
  description: string;
  highlights: string[];
  enquiryPrompt: string;
};

export type ManagedExpedition = {
  id: string | number;
  slug: string;
  title: string;
  region: string;
  duration: string;
  groupSize: string;
  difficulty: string;
  altitude: string;
  season: string;
  image: string;
  description: string;
  pageContent: ExpeditionPageContent;
  isArchived: boolean;
};

export type ExpeditionDetails = Pick<ManagedExpedition,
  "title" | "region" | "duration" | "groupSize" | "difficulty" | "altitude" | "season" | "description" | "pageContent"
>;

export type LocalExpeditionStore = {
  created: ManagedExpedition[];
  archivedSlugs: string[];
  imageOverrides?: Record<string, string>;
  pageOverrides?: Record<string, ExpeditionDetails>;
};

function builtInPage(expedition: (typeof builtInExpeditions)[number]): ManagedExpedition {
  const pageContent = expeditionPageContent[expedition.slug] ?? {
    eyebrow: "A journey through the Himalaya",
    heading: `Explore ${expedition.region} by bicycle`,
    description: expedition.description,
    highlights: [expedition.region, expedition.duration, expedition.difficulty],
    enquiryPrompt: "Ask the team about the route, daily riding, and preparation for this expedition.",
  };

  return {
    ...expedition,
    groupSize: "Custom group size",
    pageContent,
    isArchived: false,
  };
}

async function readLocalStore(): Promise<LocalExpeditionStore> {
  try {
    let parsed: unknown;
    if (process.env.NODE_ENV === "development") {
      const filePath = path.join(process.cwd(), "data", "local-expeditions.json");
      parsed = JSON.parse(await readFile(filePath, "utf8"));
    } else {
      parsed = localExpeditionData;
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { created: [], archivedSlugs: [] };
    }
    const store = parsed as Partial<LocalExpeditionStore>;
    return {
      created: Array.isArray(store.created) ? store.created : [],
      archivedSlugs: Array.isArray(store.archivedSlugs) ? store.archivedSlugs : [],
      imageOverrides: store.imageOverrides && typeof store.imageOverrides === "object" && !Array.isArray(store.imageOverrides)
        ? store.imageOverrides
        : {},
      pageOverrides: store.pageOverrides && typeof store.pageOverrides === "object" && !Array.isArray(store.pageOverrides)
        ? store.pageOverrides
        : {},
    };
  } catch {
    return { created: [], archivedSlugs: [] };
  }
}

export async function saveLocalExpeditionStore(store: LocalExpeditionStore) {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Local expedition editing is only available during development.");
  }
  const filePath = path.join(process.cwd(), "data", "local-expeditions.json");
  await writeFile(filePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export async function getExpeditions(includeArchived = false): Promise<ManagedExpedition[]> {
  const localStore = await readLocalStore();
  const pages = new Map<string, ManagedExpedition>();

  builtInExpeditions.map(builtInPage).forEach((page) => pages.set(page.slug, page));
  localStore.created.forEach((page) => pages.set(page.slug, { ...page, groupSize: page.groupSize ?? "Custom group size", isArchived: false }));
  Object.entries(localStore.pageOverrides ?? {}).forEach(([slug, details]) => {
    const page = pages.get(slug);
    if (page && details && typeof details.title === "string" && details.pageContent) {
      pages.set(slug, { ...page, ...details, slug: page.slug, id: page.id, image: page.image, isArchived: page.isArchived });
    }
  });
  Object.entries(localStore.imageOverrides ?? {}).forEach(([slug, image]) => {
    const page = pages.get(slug);
    if (page && typeof image === "string" && image.startsWith("/images/expeditions/")) {
      pages.set(slug, { ...page, image });
    }
  });
  localStore.archivedSlugs.forEach((slug) => {
    const page = pages.get(slug);
    if (page) pages.set(slug, { ...page, isArchived: true });
  });

  return [...pages.values()]
    .filter((page) => includeArchived || !page.isArchived)
    .sort((left, right) => String(left.id).localeCompare(String(right.id), undefined, { numeric: true }));
}

export async function getExpedition(slug: string, includeArchived = false) {
  const expedition = (await getExpeditions(true)).find((item) => item.slug === slug);
  if (!expedition || (expedition.isArchived && !includeArchived)) return null;
  return expedition;
}

export async function getLocalExpeditionStore() {
  return readLocalStore();
}
