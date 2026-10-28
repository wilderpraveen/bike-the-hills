"use server";

import { revalidatePath } from "next/cache";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { isExpeditionDayList } from "@/lib/expedition-itinerary";
import {
  getExpedition,
  getLocalExpeditionStore,
  getExpeditions,
  saveLocalExpeditionStore,
  type ExpeditionDetails,
  type ManagedExpedition,
} from "@/lib/managed-expeditions";
import { saveSiteContent as persistSiteContent, type SiteContent } from "@/lib/site-content";
async function authorizeManager() {
  return process.env.NODE_ENV === "development";
}

async function storeExpeditionImage(file: FormDataEntryValue | null) {
  if (!(file instanceof File) || file.size === 0) return { ok: false as const, message: "Choose a photo to upload." };
  if (file.size > 8 * 1024 * 1024) return { ok: false as const, message: "Choose a photo smaller than 8 MB." };

  const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  const extension = extensions[file.type];
  if (!extension) return { ok: false as const, message: "Use a JPEG, PNG, or WebP photo." };

  const directory = path.join(process.cwd(), "public", "images", "expeditions");
  await mkdir(directory, { recursive: true });
  const filename = `${randomUUID()}.${extension}`;
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()), { flag: "wx" });
  return { ok: true as const, image: `/images/expeditions/${filename}` };
}

export async function uploadNewExpeditionImage(formData: FormData) {
  if (!(await authorizeManager())) return { ok: false as const, message: "Photo uploads are only available on the local development site." };
  return storeExpeditionImage(formData.get("photo"));
}

export async function uploadSiteImage(formData: FormData) {
  if (!(await authorizeManager())) return { ok: false as const, message: "Photo uploads are only available on the local development site." };
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) return { ok: false as const, message: "Choose a photo to upload." };
  if (file.size > 8 * 1024 * 1024) return { ok: false as const, message: "Choose a photo smaller than 8 MB." };
  const extensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
  const extension = extensions[file.type];
  if (!extension) return { ok: false as const, message: "Use a JPEG, PNG, or WebP photo." };
  const directory = path.join(process.cwd(), "public", "images", "site");
  await mkdir(directory, { recursive: true });
  const filename = `${randomUUID()}.${extension}`;
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()), { flag: "wx" });
  return { ok: true as const, image: `/images/site/${filename}` };
}

export async function updateSiteContent(content: SiteContent) {
  if (!(await authorizeManager())) return { ok: false as const, message: "The local site editor is only available while running the development site." };
  try {
    await persistSiteContent(content);
  } catch {
    return { ok: false as const, message: "Please review the page content and try saving again." };
  }
  revalidatePath("/");
  revalidatePath("/destinations");
  revalidatePath("/manager");
  return { ok: true as const, message: "Home page and destination content saved on this computer." };
}

export async function uploadExpeditionImage(slug: string, formData: FormData) {
  if (!(await authorizeManager())) return { ok: false as const, message: "Photo uploads are only available on the local development site." };
  if (!(await getExpedition(slug))) return { ok: false as const, message: "Select an active expedition before adding its photo." };

  const uploaded = await storeExpeditionImage(formData.get("photo"));
  if (!uploaded.ok) return uploaded;
  const image = uploaded.image;
  const store = await getLocalExpeditionStore();
  store.imageOverrides = { ...store.imageOverrides, [slug]: image };
  await saveLocalExpeditionStore(store);

  revalidatePath("/");
  revalidatePath("/tours");
  revalidatePath("/manager");
  revalidatePath(`/expeditions/${slug}`);
  revalidatePath("/contact");
  return { ok: true as const, image };
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

export async function createExpedition(input: unknown) {
  const allowed = await authorizeManager();
  if (!allowed) return { ok: false as const, message: "Manager access is required to create a tour page." };
  if (!input || typeof input !== "object") return { ok: false as const, message: "Please complete the required tour details." };

  const value = input as Record<string, unknown>;
  const title = typeof value.title === "string" ? value.title.trim() : "";
  const region = typeof value.region === "string" ? value.region.trim() : "";
  const duration = typeof value.duration === "string" ? value.duration.trim() : "";
  const groupSize = typeof value.groupSize === "string" ? value.groupSize.trim() : "";
  const difficulty = typeof value.difficulty === "string" ? value.difficulty.trim() : "";
  const altitude = typeof value.altitude === "string" ? value.altitude.trim() : "";
  const season = typeof value.season === "string" ? value.season.trim() : "";
  const description = typeof value.description === "string" ? value.description.trim() : "";
  const pageHeading = typeof value.pageHeading === "string" ? value.pageHeading.trim() : "";
  const overview = typeof value.overview === "string" ? value.overview.trim() : "";
  const enquiryPrompt = typeof value.enquiryPrompt === "string" ? value.enquiryPrompt.trim() : "";
  const image = typeof value.image === "string" ? value.image : "";
  const highlights = Array.isArray(value.highlights)
    ? value.highlights.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean).slice(0, 8)
    : [];
  const allowedImages = ["/images/routes/spiti.jpg", "/images/routes/valley.jpg", "/images/routes/himalaya.jpg"];
  const isUploadedImage = /^\/images\/expeditions\/[0-9a-f-]{36}\.(jpg|png|webp)$/.test(image);

  if (!title || title.length > 100 || !region || region.length > 100 || !duration || duration.length > 40 || !groupSize || groupSize.length > 60 ||
      !difficulty || difficulty.length > 40 || !altitude || altitude.length > 40 || !season || season.length > 60 ||
      !description || description.length > 500 || !pageHeading || pageHeading.length > 120 || !overview || overview.length > 1200 ||
      !enquiryPrompt || enquiryPrompt.length > 500 || (!allowedImages.includes(image) && !isUploadedImage) || highlights.length === 0) {
    return { ok: false as const, message: "Please fill in the required fields and add at least one highlight." };
  }
  if (isUploadedImage) {
    try {
      await access(path.join(process.cwd(), "public", image.slice(1)));
    } catch {
      return { ok: false as const, message: "Upload the hero photo again before creating this page." };
    }
  }

  const slug = slugify(title);
  if (!slug) return { ok: false as const, message: "Use a tour title with letters or numbers." };
  if (await getExpedition(slug, true)) return { ok: false as const, message: "A tour page with that title already exists. Choose a different title." };

  const expedition: ManagedExpedition = {
    id: slug,
    slug,
    title,
    region,
    duration,
    groupSize,
    difficulty,
    altitude,
    season,
    image,
    description,
    pageContent: {
      eyebrow: `A journey through ${region}`,
      heading: pageHeading,
      description: overview,
      highlights,
      enquiryPrompt,
    },
    isArchived: false,
  };

  const store = await getLocalExpeditionStore();
  store.created.push(expedition);
  store.archivedSlugs = store.archivedSlugs.filter((item) => item !== slug);
  await saveLocalExpeditionStore(store);

  revalidatePath("/");
  revalidatePath("/tours");
  revalidatePath("/manager");
  revalidatePath(`/expeditions/${slug}`);
  revalidatePath("/contact");
  return { ok: true as const, message: "Tour page created. Add its day-by-day itinerary next.", expedition };
}

function readExpeditionDetails(input: unknown): ExpeditionDetails | null {
  if (!input || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  const title = typeof value.title === "string" ? value.title.trim() : "";
  const region = typeof value.region === "string" ? value.region.trim() : "";
  const duration = typeof value.duration === "string" ? value.duration.trim() : "";
  const groupSize = typeof value.groupSize === "string" ? value.groupSize.trim() : "";
  const difficulty = typeof value.difficulty === "string" ? value.difficulty.trim() : "";
  const altitude = typeof value.altitude === "string" ? value.altitude.trim() : "";
  const season = typeof value.season === "string" ? value.season.trim() : "";
  const description = typeof value.description === "string" ? value.description.trim() : "";
  const heading = typeof value.pageHeading === "string" ? value.pageHeading.trim() : "";
  const overview = typeof value.overview === "string" ? value.overview.trim() : "";
  const enquiryPrompt = typeof value.enquiryPrompt === "string" ? value.enquiryPrompt.trim() : "";
  const highlights = Array.isArray(value.highlights)
    ? value.highlights.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean).slice(0, 8)
    : [];

  if (!title || title.length > 100 || !region || region.length > 100 || !duration || duration.length > 40 || !groupSize || groupSize.length > 60 ||
      !difficulty || difficulty.length > 40 || !altitude || altitude.length > 40 || !season || season.length > 60 ||
      !description || description.length > 500 || !heading || heading.length > 120 || !overview || overview.length > 1200 ||
      !enquiryPrompt || enquiryPrompt.length > 500 || highlights.length === 0) return null;

  return {
    title,
    region,
    duration,
    groupSize,
    difficulty,
    altitude,
    season,
    description,
    pageContent: {
      eyebrow: `A journey through ${region}`,
      heading,
      description: overview,
      highlights,
      enquiryPrompt,
    },
  };
}

export async function updateExpedition(slug: string, input: unknown) {
  if (!(await authorizeManager())) return { ok: false as const, message: "The local tour manager is only available while running the development site." };
  const current = await getExpedition(slug);
  if (!current) return { ok: false as const, message: "That active tour page could not be found." };

  const details = readExpeditionDetails(input);
  if (!details) return { ok: false as const, message: "Please fill in the required page details and at least one highlight." };
  const duplicateTitle = (await getExpeditions(true)).some((item) => item.slug !== slug && item.title.toLocaleLowerCase() === details.title.toLocaleLowerCase());
  if (duplicateTitle) return { ok: false as const, message: "Another expedition already uses that title. Choose a different title." };

  const store = await getLocalExpeditionStore();
  store.pageOverrides = { ...store.pageOverrides, [slug]: details };
  await saveLocalExpeditionStore(store);

  revalidatePath("/");
  revalidatePath("/tours");
  revalidatePath("/manager");
  revalidatePath(`/expeditions/${slug}`);
  revalidatePath("/contact");
  return { ok: true as const, message: "Tour page details saved on this computer.", expedition: { ...current, ...details } };
}

export async function archiveExpedition(slug: string) {
  const allowed = await authorizeManager();
  if (!allowed) return { ok: false as const, message: "Manager access is required to remove a tour page." };
  const expedition = await getExpedition(slug, true);
  if (!expedition) return { ok: false as const, message: "That tour page could not be found." };

  const store = await getLocalExpeditionStore();
  if (!store.archivedSlugs.includes(slug)) store.archivedSlugs.push(slug);
  await saveLocalExpeditionStore(store);

  revalidatePath("/");
  revalidatePath("/tours");
  revalidatePath("/manager");
  revalidatePath(`/expeditions/${slug}`);
  revalidatePath("/contact");
  return { ok: true as const, message: "Tour page removed from the public site. You can restore it from Archived expeditions." };
}

export async function restoreExpedition(slug: string) {
  const allowed = await authorizeManager();
  if (!allowed) return { ok: false as const, message: "Manager access is required to restore a tour page." };
  const expedition = await getExpedition(slug, true);
  if (!expedition) return { ok: false as const, message: "That tour page could not be found." };

  const store = await getLocalExpeditionStore();
  store.archivedSlugs = store.archivedSlugs.filter((item) => item !== slug);
  await saveLocalExpeditionStore(store);

  revalidatePath("/");
  revalidatePath("/tours");
  revalidatePath("/manager");
  revalidatePath(`/expeditions/${slug}`);
  revalidatePath("/contact");
  return { ok: true as const, message: "Tour page restored to the public site." };
}

export async function saveItinerary(slug: string, days: unknown) {
  if (!(await authorizeManager())) return { ok: false, message: "The local tour manager is only available while running the development site." };
  if (!(await getExpedition(slug)) || !isExpeditionDayList(days)) {
    return { ok: false, message: "Please check the itinerary fields and try again." };
  }

  const filePath = path.join(process.cwd(), "data", "local-itineraries.json");
  let itineraries: Record<string, unknown> = {};
  try {
    const contents = await readFile(filePath, "utf8");
    const parsed: unknown = JSON.parse(contents);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      itineraries = parsed as Record<string, unknown>;
    }
  } catch {
    // A missing or empty data file starts as an empty local itinerary collection.
  }

  itineraries[slug] = days;
  await writeFile(filePath, `${JSON.stringify(itineraries, null, 2)}\n`, "utf8");

  revalidatePath(`/expeditions/${slug}`);
  revalidatePath("/manager");
  return { ok: true, message: "Saved on this computer. The local tour page now uses these details." };
}
