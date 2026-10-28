"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Save, Trash2, MapPinned, ChevronRight, Eye, PencilLine, ArrowLeft, Archive, RotateCcw, FilePlus2, ImagePlus } from "lucide-react";
import type { ManagedExpedition } from "@/lib/managed-expeditions";
import { itineraryModes, type ExpeditionDay } from "@/lib/expedition-itinerary";
import { archiveExpedition, createExpedition, restoreExpedition, saveItinerary, updateExpedition, uploadExpeditionImage, uploadNewExpeditionImage } from "@/app/manager/actions";
import ItineraryAccordion from "@/components/expeditions/ItineraryAccordion";

type Props = {
  expeditions: ManagedExpedition[];
  archivedExpeditions: ManagedExpedition[];
  initialItineraries: Record<string, ExpeditionDay[]>;
  localMode?: boolean;
};

export default function ItineraryManager({ expeditions, archivedExpeditions, initialItineraries, localMode = false }: Props) {
  const [expeditionItems, setExpeditionItems] = useState(expeditions);
  const [archivedItems, setArchivedItems] = useState(archivedExpeditions);
  const [activeSlug, setActiveSlug] = useState(expeditions[0]?.slug ?? "");
  const [itineraries, setItineraries] = useState(initialItineraries);
  const [notice, setNotice] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createNotice, setCreateNotice] = useState("");
  const [confirmArchive, setConfirmArchive] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [isPending, startTransition] = useTransition();
  const activeExpedition = expeditionItems.find((item) => item.slug === activeSlug);
  const days = itineraries[activeSlug] ?? [];

  function updateDay(index: number, patch: Partial<ExpeditionDay>) {
    setItineraries((current) => ({
      ...current,
      [activeSlug]: (current[activeSlug] ?? []).map((day, dayIndex) =>
        dayIndex === index ? { ...day, ...patch } : day,
      ),
    }));
  }

  function addDay() {
    if (days.length >= 25) return;
    setItineraries((current) => ({
      ...current,
      [activeSlug]: [
        ...(current[activeSlug] ?? []),
        {
          day: days.length + 1,
          title: "",
          mode: "To be confirmed",
          distance: "",
          sleepingElevation: "",
          description: "",
          highlights: [],
        },
      ],
    }));
    setNotice("");
  }

  function removeDay(index: number) {
    setItineraries((current) => ({
      ...current,
      [activeSlug]: (current[activeSlug] ?? [])
        .filter((_, dayIndex) => dayIndex !== index)
        .map((day, dayIndex) => ({ ...day, day: dayIndex + 1 })),
    }));
  }

  function save() {
    setNotice("");
    startTransition(async () => {
      const result = await saveItinerary(activeSlug, days);
      setNotice(result.message);
    });
  }

  function uploadHeroImage(file?: File) {
    if (!file) return;
    const slug = activeSlug;
    const data = new FormData();
    data.set("photo", file);
    setNotice("");
    setUploadingHero(true);
    startTransition(async () => {
      const result = await uploadExpeditionImage(slug, data);
      if (result.ok) {
        setExpeditionItems((current) => current.map((item) => item.slug === slug ? { ...item, image: result.image } : item));
      }
      setNotice(result.ok ? "Expedition hero photo updated and saved." : result.message);
      setUploadingHero(false);
    });
  }

  function createNewExpedition(input: unknown) {
    setCreateNotice("");
    startTransition(async () => {
      const result = await createExpedition(input);
      if (!result.ok) {
        setCreateNotice(result.message);
        return;
      }
      setExpeditionItems((current) => [result.expedition, ...current]);
      setItineraries((current) => ({ ...current, [result.expedition.slug]: [] }));
      setActiveSlug(result.expedition.slug);
      setShowCreate(false);
      setShowPreview(false);
      setNotice(result.message);
    });
  }

  function savePageDetails(input: unknown) {
    if (!activeExpedition) return;
    const slug = activeExpedition.slug;
    setNotice("");
    startTransition(async () => {
      const result = await updateExpedition(slug, input);
      setNotice(result.message);
      if (!result.ok) return;
      setExpeditionItems((current) => current.map((item) => item.slug === slug ? result.expedition : item));
      setShowEditDetails(false);
    });
  }

  function removeCurrentPage() {
    if (!activeExpedition) return;
    startTransition(async () => {
      const result = await archiveExpedition(activeExpedition.slug);
      setNotice(result.message);
      if (!result.ok) return;
      setArchivedItems((current) => [{ ...activeExpedition, isArchived: true }, ...current]);
      const remaining = expeditionItems.filter((item) => item.slug !== activeExpedition.slug);
      setExpeditionItems(remaining);
      setActiveSlug(remaining[0]?.slug ?? "");
      setConfirmArchive(false);
      setShowPreview(false);
    });
  }

  function restorePage(expedition: ManagedExpedition) {
    startTransition(async () => {
      const result = await restoreExpedition(expedition.slug);
      setNotice(result.message);
      if (!result.ok) return;
      setArchivedItems((current) => current.filter((item) => item.slug !== expedition.slug));
      setExpeditionItems((current) => [{ ...expedition, isArchived: false }, ...current]);
      setActiveSlug(expedition.slug);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
      <aside className="h-fit rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-2 px-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Your expeditions</p>
          <button type="button" onClick={() => { setShowCreate(true); setShowEditDetails(false); setCreateNotice(""); }} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-[#12372a] hover:bg-[#eaf1ec]"><FilePlus2 size={15} /> New</button>
        </div>
        <nav className="mt-3 space-y-1" aria-label="Choose expedition">
          {expeditionItems.map((expedition) => (
          <button key={expedition.slug} type="button" onClick={() => { setActiveSlug(expedition.slug); setShowEditDetails(false); setShowCreate(false); setNotice(""); }} className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeSlug === expedition.slug ? "bg-[#eaf1ec] text-[#12372a]" : "text-stone-600 hover:bg-stone-50"}`}>
              <span>{expedition.title}</span><ChevronRight size={17} className="shrink-0" />
            </button>
          ))}
        </nav>
        {archivedItems.length > 0 && <div className="mt-5 border-t border-stone-200 pt-4">
          <p className="px-2 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-400">Archived · hidden from site</p>
          <div className="mt-2 space-y-1">
            {archivedItems.map((expedition) => (
              <div key={expedition.slug} className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm text-stone-500">
                <span className="min-w-0 truncate">{expedition.title}</span>
                <button type="button" onClick={() => restorePage(expedition)} disabled={isPending} aria-label={`Restore ${expedition.title}`} className="shrink-0 rounded-lg p-2 text-[#12372a] hover:bg-[#eaf1ec] disabled:opacity-50"><RotateCcw size={16} /></button>
              </div>
            ))}
          </div>
        </div>}
        <div className="mt-5 rounded-2xl bg-stone-50 p-4 text-sm leading-6 text-stone-600">
          <MapPinned size={18} className="mb-2 text-[#12372a]" />
          Changes saved here appear on the selected tour page and itinerary.
        </div>
      </aside>

      <section className="min-w-0 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c09138]">Tour page &amp; day-by-day plan</p>
            <h2 className="mt-2 font-playfair text-3xl font-bold text-[#12372a]">{activeExpedition?.title ?? "Create your first tour page"}</h2>
            <p className="mt-2 text-sm text-stone-500">Create a tour page, then add or remove the days in its itinerary.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeExpedition && !showCreate && <button type="button" onClick={() => { setShowEditDetails((show) => !show); setNotice(""); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#12372a] px-4 py-3 text-sm font-semibold text-[#12372a] transition hover:bg-[#f1f5f1]">
              <PencilLine size={16} /> {showEditDetails ? "Back to itinerary" : "Edit page details"}
            </button>}
            {activeExpedition && <button type="button" onClick={() => setConfirmArchive((confirm) => !confirm)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-800 transition hover:bg-red-50">
              <Archive size={16} /> Remove page
            </button>}
            {activeExpedition && !showEditDetails && <button type="button" onClick={() => setShowPreview((show) => !show)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#12372a] px-4 py-3 text-sm font-semibold text-[#12372a] transition hover:bg-[#f1f5f1]">
              {showPreview ? <PencilLine size={17} /> : <Eye size={17} />}
              {showPreview ? "Back to editing" : "Preview tour page"}
            </button>}
            {!showPreview && !showEditDetails && activeExpedition && <button type="button" onClick={save} disabled={isPending} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#07382f] px-5 py-3 font-semibold text-white transition hover:bg-[#125343] disabled:opacity-60">
              <Save size={17} /> {isPending ? "Saving…" : "Save itinerary"}
            </button>}
          </div>
        </div>

        {localMode && <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">Local-only mode: new pages and archived pages are saved in <code>data/local-expeditions.json</code>; itineraries are saved in <code>data/local-itineraries.json</code>. This local editor does not require a login.</p>}
        {notice && <p role="status" className={`mt-5 rounded-xl px-4 py-3 text-sm ${notice.startsWith("Saved on this computer") || notice.startsWith("Itinerary saved") || notice.startsWith("Expedition hero photo updated") ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900"}`}>{notice}</p>}
        {activeExpedition && !showCreate && !showPreview && !showEditDetails && <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-[#fdfdfb] p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:w-52">
            <Image src={activeExpedition.image} alt={`${activeExpedition.title} expedition`} fill sizes="208px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-stone-800">Expedition detail page photo</p>
            <p className="mt-1 text-sm leading-6 text-stone-500">One main photo appears at the top of this expedition’s detail page.</p>
            <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#12372a] px-4 py-2.5 text-sm font-semibold text-[#12372a] transition hover:bg-[#f1f5f1]">
              <ImagePlus size={17} /> {uploadingHero ? "Uploading photo…" : "Choose or replace photo"}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={isPending} onChange={(event) => uploadHeroImage(event.currentTarget.files?.[0])} />
            </label>
            <p className="mt-1.5 text-xs text-stone-500">JPEG, PNG, or WebP · up to 8 MB</p>
          </div>
        </div>}
        {confirmArchive && activeExpedition && <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-950">
          <span>Remove “{activeExpedition.title}” from the public tours and home page? It can be restored later.</span>
          <div className="flex gap-2"><button type="button" onClick={() => setConfirmArchive(false)} className="rounded-lg border border-red-200 bg-white px-3 py-2 font-semibold">Cancel</button><button type="button" onClick={removeCurrentPage} disabled={isPending} className="rounded-lg bg-red-800 px-3 py-2 font-semibold text-white disabled:opacity-60">{isPending ? "Removing…" : "Remove page"}</button></div>
        </div>}

        {showCreate ? <NewExpeditionForm pending={isPending} notice={createNotice} onCancel={() => setShowCreate(false)} onCreate={createNewExpedition} /> : showEditDetails && activeExpedition ? (
          <ExpeditionDetailsForm key={activeExpedition.slug} expedition={activeExpedition} pending={isPending} notice={notice} onCancel={() => setShowEditDetails(false)} onSave={savePageDetails} />
        ) : showPreview && activeExpedition ? (
          <TourPagePreview expedition={activeExpedition} itinerary={days} />
        ) : activeExpedition && days.length === 0 ? (
          <div className="my-8 rounded-2xl border border-dashed border-stone-300 px-5 py-10 text-center">
            <p className="font-semibold text-stone-700">No itinerary days yet</p>
            <p className="mt-2 text-sm text-stone-500">Add a day to start building this tour’s plan.</p>
          </div>
        ) : activeExpedition ? (
          <div className="mt-6 space-y-5">
            {days.map((day, index) => (
              <article key={`${activeSlug}-${index}`} className="rounded-2xl border border-stone-200 bg-[#fdfdfb] p-4 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-[#07382f] font-playfair text-lg font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
                    <div><p className="font-semibold text-[#12372a]">Day {index + 1}</p><p className="text-xs text-stone-500">Itinerary details</p></div>
                  </div>
                  <button type="button" onClick={() => removeDay(index)} aria-label={`Remove day ${index + 1}`} className="rounded-lg p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-700"><Trash2 size={18} /></button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Day title" value={day.title} placeholder="e.g. Kaza to Kibber" onChange={(value) => updateDay(index, { title: value })} />
                  <label className="block text-sm font-semibold text-stone-700">Day type
                    <select value={day.mode} onChange={(event) => updateDay(index, { mode: event.target.value as ExpeditionDay["mode"] })} className={inputClass}>
                      {itineraryModes.map((mode) => <option key={mode}>{mode}</option>)}
                    </select>
                  </label>
                  <Field label="Distance" value={day.distance} placeholder="e.g. 42 km cycling" onChange={(value) => updateDay(index, { distance: value })} />
                  <Field label="Overnight elevation" value={day.sleepingElevation} placeholder="e.g. 3,800 m" onChange={(value) => updateDay(index, { sleepingElevation: value })} />
                </div>
                <label className="mt-4 block text-sm font-semibold text-stone-700">Day description
                  <textarea value={day.description} onChange={(event) => updateDay(index, { description: event.target.value })} rows={4} maxLength={1800} placeholder="Describe the route, stops, and what riders can expect." className={`${inputClass} resize-y`} />
                </label>
                  <Field key={`${activeSlug}-${day.day}-highlights`} label="Highlights (separate with commas)" defaultValue={day.highlights.join(", ")} placeholder="e.g. Monastery, mountain views, village visit" maxLength={1000} onChange={(value) => updateDay(index, { highlights: value.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 8) })} />
              </article>
            ))}
          </div>
        ) : null}

        {activeExpedition && !showCreate && !showEditDetails && !showPreview && <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-6">
          <button type="button" onClick={addDay} disabled={days.length >= 25} className="inline-flex items-center gap-2 rounded-xl border border-[#12372a] px-5 py-3 font-semibold text-[#12372a] transition hover:bg-[#f1f5f1] disabled:opacity-50"><Plus size={18} /> Add itinerary day</button>
          <span className="text-xs text-stone-500">{days.length} of 25 days</span>
        </div>}
      </section>
    </div>
  );
}

function TourPagePreview({ expedition, itinerary }: { expedition?: ManagedExpedition; itinerary: ExpeditionDay[] }) {
  if (!expedition) return null;
  const previewItinerary = itinerary.map((day) => ({
    ...day,
    title: day.title.trim() || `Add a title for Day ${day.day}`,
  }));

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-stone-200 bg-stone-50">
      <section className="relative isolate flex min-h-85 items-end overflow-hidden px-5 pb-8 pt-20 sm:min-h-105 sm:px-8 sm:pb-10">
        <Image src={expedition.image} alt="" fill sizes="(max-width: 640px) 100vw, 900px" className="absolute inset-0 -z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/40 to-black/15" />
        <div className="w-full text-white">
          <span className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/90"><ArrowLeft size={17} /> All expeditions</span>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">{expedition.region}</p>
          <h3 className="max-w-3xl font-playfair text-4xl font-bold leading-tight sm:text-5xl">{expedition.title}</h3>
          <p className="mt-4 max-w-2xl leading-7 text-white/90">{expedition.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[expedition.duration, expedition.groupSize, expedition.difficulty, `Up to ${expedition.altitude}`].map((detail) => <span key={detail} className="rounded-full border border-white/30 bg-black/20 px-3.5 py-2 text-xs backdrop-blur-sm">{detail}</span>)}
          </div>
        </div>
      </section>
      <section className="bg-white px-4 py-8 sm:px-7 sm:py-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.23em] text-[#12372a]">Day by day</p>
        <h4 className="font-playfair text-3xl font-bold text-gray-900 sm:text-4xl">Tour plan &amp; itinerary</h4>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">Preview of the itinerary section as visitors will see it on the expedition page.</p>
        <ItineraryAccordion itinerary={previewItinerary} />
      </section>
    </div>
  );
}

function ExpeditionDetailsForm({ expedition, pending, notice, onCancel, onSave }: {
  expedition: ManagedExpedition;
  pending: boolean;
  notice: string;
  onCancel: () => void;
  onSave: (input: unknown) => void;
}) {
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    onSave({
      title: values.get("title"),
      region: values.get("region"),
      duration: values.get("duration"),
      groupSize: values.get("groupSize"),
      difficulty: values.get("difficulty"),
      altitude: values.get("altitude"),
      season: values.get("season"),
      description: values.get("description"),
      pageHeading: values.get("pageHeading"),
      overview: values.get("overview"),
      highlights: String(values.get("highlights") ?? "").split(",").map((item) => item.trim()).filter(Boolean),
      enquiryPrompt: values.get("enquiryPrompt"),
    });
  }

  return (
    <form onSubmit={submit} className="mt-6 rounded-2xl border border-stone-200 bg-[#fdfdfb] p-4 sm:p-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c09138]">Edit expedition</p>
        <h3 className="mt-1 font-playfair text-2xl font-bold text-[#12372a]">Tour page details</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">Update the information visitors see on this tour page. Its web address will stay the same.</p>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Tour title" name="title" defaultValue={expedition.title} required placeholder="Tour title" maxLength={100} />
        <Field label="Region" name="region" defaultValue={expedition.region} required placeholder="Region" maxLength={100} />
        <Field label="Duration" name="duration" defaultValue={expedition.duration} required placeholder="e.g. 7 Days" maxLength={40} />
        <Field label="Group size" name="groupSize" defaultValue={expedition.groupSize} required placeholder="e.g. 6–8 riders" maxLength={60} />
        <label className="mt-4 block text-sm font-semibold text-stone-700">Difficulty
          <select name="difficulty" defaultValue={expedition.difficulty} className={inputClass}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
        </label>
        <Field label="Maximum altitude" name="altitude" defaultValue={expedition.altitude} required placeholder="e.g. 4,300 m" maxLength={40} />
        <Field label="Operating season" name="season" defaultValue={expedition.season} required placeholder="e.g. June - September" maxLength={60} />
        <Field label="Short tour description" name="description" defaultValue={expedition.description} required maxLength={500} placeholder="Summary shown on tour cards and the detail page." />
        <Field label="Detail page heading" name="pageHeading" defaultValue={expedition.pageContent.heading} required maxLength={120} placeholder="A heading for the detail page" />
        <label className="mt-4 block text-sm font-semibold text-stone-700 sm:col-span-2">Overview text
          <textarea name="overview" defaultValue={expedition.pageContent.description} required maxLength={1200} rows={4} className={`${inputClass} resize-y`} />
        </label>
        <Field label="Highlights (separate with commas)" name="highlights" defaultValue={expedition.pageContent.highlights.join(", ")} required maxLength={1000} placeholder="Mountain roads, village stays, local culture" />
        <label className="mt-4 block text-sm font-semibold text-stone-700 sm:col-span-2">Enquiry prompt
          <textarea name="enquiryPrompt" defaultValue={expedition.pageContent.enquiryPrompt} required maxLength={500} rows={2} className={`${inputClass} resize-y`} />
        </label>
      </div>
      {notice && <p role="alert" className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950">{notice}</p>}
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button type="button" onClick={onCancel} disabled={pending} className="rounded-xl border border-stone-300 px-5 py-3 font-semibold text-stone-700 hover:bg-stone-100 disabled:opacity-60">Cancel</button>
        <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-xl bg-[#07382f] px-5 py-3 font-semibold text-white transition hover:bg-[#125343] disabled:opacity-60"><Save size={17} />{pending ? "Saving details…" : "Save page details"}</button>
      </div>
    </form>
  );
}

function NewExpeditionForm({ pending, notice, onCancel, onCreate }: { pending: boolean; notice: string; onCancel: () => void; onCreate: (input: unknown) => void }) {
  const [image, setImage] = useState("/images/routes/spiti.jpg");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageNotice, setImageNotice] = useState("");

  async function uploadHeroPhoto(file?: File) {
    if (!file) return;
    const formData = new FormData();
    formData.set("photo", file);
    setUploadingImage(true);
    setImageNotice("");
    const result = await uploadNewExpeditionImage(formData);
    if (result.ok) {
      setImage(result.image);
      setImageNotice("Photo uploaded and selected for this expedition.");
    } else {
      setImageNotice(result.message);
    }
    setUploadingImage(false);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    onCreate({
      title: values.get("title"),
      region: values.get("region"),
      duration: values.get("duration"),
      groupSize: values.get("groupSize"),
      difficulty: values.get("difficulty"),
      altitude: values.get("altitude"),
      season: values.get("season"),
      image,
      description: values.get("description"),
      pageHeading: values.get("pageHeading"),
      overview: values.get("overview"),
      highlights: String(values.get("highlights") ?? "").split(",").map((item) => item.trim()).filter(Boolean),
      enquiryPrompt: values.get("enquiryPrompt"),
    });
  }

  return (
    <form onSubmit={submit} className="mt-6 rounded-2xl border border-stone-200 bg-[#fdfdfb] p-4 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c09138]">New expedition</p><h3 className="mt-1 font-playfair text-2xl font-bold text-[#12372a]">Create the detail page</h3><p className="mt-2 text-sm leading-6 text-stone-600">A new page and public tour card will be created. Its itinerary starts empty, ready for you to add days.</p></div>
        <button type="button" onClick={onCancel} className="rounded-lg px-3 py-2 text-sm font-semibold text-stone-500 hover:bg-stone-100">Cancel</button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Tour title" name="title" required placeholder="e.g. Moonland Explorer" />
        <Field label="Region" name="region" required placeholder="e.g. Spiti Valley" />
        <Field label="Duration" name="duration" required placeholder="e.g. 7 Days" />
        <Field label="Group size" name="groupSize" required placeholder="e.g. 6–8 riders or Custom group size" maxLength={60} />
        <label className="block text-sm font-semibold text-stone-700">Difficulty
          <select name="difficulty" defaultValue="Intermediate" className={inputClass}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
        </label>
        <Field label="Maximum altitude" name="altitude" required placeholder="e.g. 4,300 m" />
        <Field label="Operating season" name="season" required placeholder="e.g. June - September" />
        <div className="text-sm font-semibold text-stone-700">
          <label>Card and hero image
            <select name="image" value={image} onChange={(event) => { setImage(event.target.value); setImageNotice(""); }} className={inputClass}>
              <option value="/images/routes/spiti.jpg">Spiti Valley</option><option value="/images/routes/valley.jpg">Himalayan Valley</option><option value="/images/routes/himalaya.jpg">High Himalaya</option>
              {image.startsWith("/images/expeditions/") && <option value={image}>Uploaded photo</option>}
            </select>
          </label>
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-stone-100"><Image src={image} alt="Selected expedition hero photo" fill sizes="96px" className="object-cover" /></div>
            <div className="min-w-0 flex-1"><p className="text-xs font-medium text-stone-500">Upload a custom hero photo</p><p className="mt-1 text-xs font-normal text-stone-500">JPEG, PNG, or WebP · up to 8 MB</p></div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#12372a] px-3 py-2 text-xs font-bold text-[#12372a] hover:bg-[#f1f5f1]"><ImagePlus size={15} />{uploadingImage ? "Uploading…" : "Choose photo"}<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={uploadingImage || pending} onChange={(event) => uploadHeroPhoto(event.currentTarget.files?.[0])} /></label>
          </div>
          {imageNotice && <p role="status" className={`mt-2 text-xs font-normal ${imageNotice.startsWith("Photo uploaded") ? "text-green-700" : "text-amber-800"}`}>{imageNotice}</p>}
        </div>
        <Field label="Short tour description" name="description" required maxLength={500} placeholder="A short summary shown on the tour card and hero." />
        <Field label="Detail page heading" name="pageHeading" required maxLength={120} placeholder="e.g. Find a quieter road through the Himalaya" />
        <label className="block text-sm font-semibold text-stone-700 sm:col-span-2">Overview text
          <textarea name="overview" required maxLength={1200} rows={3} placeholder="Introduce the journey for visitors." className={`${inputClass} resize-y`} />
        </label>
        <Field label="Highlights (separate with commas)" name="highlights" required maxLength={1000} placeholder="Mountain roads, village stays, local culture" />
        <label className="block text-sm font-semibold text-stone-700 sm:col-span-2">Enquiry prompt
          <textarea name="enquiryPrompt" required maxLength={500} rows={2} placeholder="What should riders ask the team before booking?" className={`${inputClass} resize-y`} />
        </label>
      </div>
      {notice && <p role="alert" className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950">{notice}</p>}
      <button type="submit" disabled={pending || uploadingImage} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#07382f] px-5 py-3 font-semibold text-white transition hover:bg-[#125343] disabled:opacity-60"><FilePlus2 size={17} />{pending ? "Creating page…" : "Create tour page"}</button>
    </form>
  );
}

function Field({ label, value, defaultValue, placeholder, onChange, name, required = false, maxLength = 140 }: { label: string; value?: string; defaultValue?: string; placeholder: string; onChange?: (value: string) => void; name?: string; required?: boolean; maxLength?: number }) {
  return (
    <label className="mt-4 block text-sm font-semibold text-stone-700">{label}
      <input name={name} {...(value !== undefined ? { value } : { defaultValue })} onChange={onChange ? (event) => onChange(event.target.value) : undefined} required={required} maxLength={maxLength} placeholder={placeholder} className={inputClass} />
    </label>
  );
}

const inputClass = "mt-2 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-3 font-normal text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#12372a] focus:ring-2 focus:ring-[#12372a]/10";
