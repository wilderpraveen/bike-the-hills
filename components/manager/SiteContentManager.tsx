"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { ImagePlus, Plus, Save, Trash2 } from "lucide-react";
import { updateSiteContent, uploadSiteImage } from "@/app/manager/actions";
import type { SiteContent } from "@/lib/site-content";
import type { ManagedExpedition } from "@/lib/managed-expeditions";

type HomeSection = keyof SiteContent["home"];

export default function SiteContentManager({ initialContent, view, expeditions }: { initialContent: SiteContent; view: "home" | "destinations"; expeditions: ManagedExpedition[] }) {
  const [content, setContent] = useState(initialContent);
  const [notice, setNotice] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateHome<K extends HomeSection>(section: K, patch: Partial<SiteContent["home"][K]>) {
    setContent((current) => ({
      ...current,
      home: { ...current.home, [section]: { ...current.home[section], ...patch } },
    }));
  }

  function updateDestinationPage(patch: Partial<SiteContent["destinationsPage"]>) {
    setContent((current) => ({ ...current, destinationsPage: { ...current.destinationsPage, ...patch } }));
  }

  function updateDestination(index: number, patch: Partial<SiteContent["destinations"][number]>) {
    setContent((current) => ({
      ...current,
      destinations: current.destinations.map((destination, itemIndex) => itemIndex === index ? { ...destination, ...patch } : destination),
    }));
  }

  function addDestination() {
    setContent((current) => ({
      ...current,
      destinations: [...current.destinations, { slug: "new-destination-" + (current.destinations.length + 1), name: "New destination", description: "", image: "/images/langza1.jpg" }],
    }));
  }

  function removeDestination(index: number) {
    setContent((current) => ({ ...current, destinations: current.destinations.filter((_, itemIndex) => itemIndex !== index) }));
  }

  function save() {
    setNotice("");
    startTransition(async () => {
      const result = await updateSiteContent(content);
      setNotice(result.message);
    });
  }

  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c09138]">Site content</p>
          <h2 className="mt-1 font-playfair text-3xl font-bold text-[#12372a]">{view === "home" ? "Manage the home page" : "Manage destinations"}</h2>
          <p className="mt-2 text-sm text-stone-500">Edit words and photos, then save them to this project.</p>
        </div>
        <button type="button" onClick={save} disabled={isPending} className="inline-flex items-center gap-2 rounded-xl bg-[#07382f] px-5 py-3 font-semibold text-white hover:bg-[#125343] disabled:opacity-60">
          <Save size={17} /> {isPending ? "Saving…" : "Save changes"}
        </button>
      </div>

      {notice && <p role="status" className={"mt-5 rounded-xl px-4 py-3 text-sm " + (notice.startsWith("Home page") ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900")}>{notice}</p>}

      {view === "home" ? (
        <div className="mt-6 space-y-5">
          <Panel title="Hero banner">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Small heading" value={content.home.hero.eyebrow} onChange={(eyebrow) => updateHome("hero", { eyebrow })} />
              <TextArea label="Main heading" value={content.home.hero.title} onChange={(title) => updateHome("hero", { title })} />
              <TextArea label="Introduction" value={content.home.hero.description} onChange={(description) => updateHome("hero", { description })} />
              <PhotoField label="Hero photo" image={content.home.hero.image} onChange={(image) => updateHome("hero", { image })} />
              <TextField label="Main button text" value={content.home.hero.primaryCta} onChange={(primaryCta) => updateHome("hero", { primaryCta })} />
              <TextField label="Second button text" value={content.home.hero.secondaryCta} onChange={(secondaryCta) => updateHome("hero", { secondaryCta })} />
            </div>
          </Panel>

          <Panel title="Featured expeditions heading">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Small heading" value={content.home.featured.eyebrow} onChange={(eyebrow) => updateHome("featured", { eyebrow })} />
              <TextField label="Main heading" value={content.home.featured.title} onChange={(title) => updateHome("featured", { title })} />
              <TextArea label="Introduction" value={content.home.featured.description} onChange={(description) => updateHome("featured", { description })} />
            </div>
            <fieldset className="mt-5">
              <legend className="text-sm font-semibold text-stone-700">Expedition cards shown on the home page</legend>
              <p className="mt-1 text-xs text-stone-500">Choose the tours visitors should see. They appear in the order selected below.</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {expeditions.map((expedition) => {
                  const selected = content.home.featured.expeditionSlugs.includes(expedition.slug);
                  return (
                    <label key={expedition.slug} className="flex cursor-pointer items-start gap-3 rounded-xl border border-stone-200 p-3 text-sm text-stone-700 hover:bg-stone-50">
                      <input type="checkbox" checked={selected} onChange={(event) => updateHome("featured", { expeditionSlugs: event.target.checked ? [...content.home.featured.expeditionSlugs, expedition.slug] : content.home.featured.expeditionSlugs.filter((slug) => slug !== expedition.slug) })} className="mt-0.5 size-4 accent-[#12372a]" />
                      <span><span className="block font-semibold">{expedition.title}</span><span className="text-xs text-stone-500">{expedition.region}</span></span>
                    </label>
                  );
                })}
              </div>
              {content.home.featured.expeditionSlugs.filter((slug) => expeditions.some((expedition) => expedition.slug === slug)).length === 0 && <p role="alert" className="mt-2 text-sm text-red-700">Select at least one expedition to show on the home page.</p>}
            </fieldset>
          </Panel>

          <Panel title="Why ride with us">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Small heading" value={content.home.whyRide.eyebrow} onChange={(eyebrow) => updateHome("whyRide", { eyebrow })} />
              <TextField label="Main heading" value={content.home.whyRide.title} onChange={(title) => updateHome("whyRide", { title })} />
              <TextArea label="Introduction" value={content.home.whyRide.description} onChange={(description) => updateHome("whyRide", { description })} />
            </div>
            <div className="mt-5 space-y-3">
              {content.home.whyRide.cards.map((card, index) => (
                <div key={index} className="grid gap-3 rounded-xl border border-stone-200 p-4 sm:grid-cols-2">
                  <TextField label={"Card " + (index + 1) + " title"} value={card.title} onChange={(title) => updateHome("whyRide", { cards: content.home.whyRide.cards.map((item, i) => i === index ? { ...item, title } : item) })} />
                  <TextArea label="Card description" value={card.description} onChange={(description) => updateHome("whyRide", { cards: content.home.whyRide.cards.map((item, i) => i === index ? { ...item, description } : item) })} />
                  <button type="button" onClick={() => updateHome("whyRide", { cards: content.home.whyRide.cards.filter((_, i) => i !== index) })} className="inline-flex w-fit items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"><Trash2 size={14} /> Remove card</button>
                </div>
              ))}
              <button type="button" onClick={() => updateHome("whyRide", { cards: [...content.home.whyRide.cards, { title: "", description: "" }] })} className="inline-flex items-center gap-2 rounded-lg border border-[#12372a] px-3 py-2 text-sm font-semibold text-[#12372a]"><Plus size={16} /> Add card</button>
            </div>
          </Panel>

          <Panel title="Hidden routes">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Small heading" value={content.home.hiddenRoutes.eyebrow} onChange={(eyebrow) => updateHome("hiddenRoutes", { eyebrow })} />
              <TextArea label="Main heading" value={content.home.hiddenRoutes.title} onChange={(title) => updateHome("hiddenRoutes", { title })} />
              <TextArea label="First paragraph" value={content.home.hiddenRoutes.description} onChange={(description) => updateHome("hiddenRoutes", { description })} />
              <TextArea label="Second paragraph" value={content.home.hiddenRoutes.story} onChange={(story) => updateHome("hiddenRoutes", { story })} />
              <PhotoField label="Section photo" image={content.home.hiddenRoutes.image} onChange={(image) => updateHome("hiddenRoutes", { image })} />
            </div>
            <StringList label="Route highlights" values={content.home.hiddenRoutes.highlights} onChange={(highlights) => updateHome("hiddenRoutes", { highlights })} />
          </Panel>

          <Panel title="Home page destinations heading">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Small heading" value={content.home.destinations.eyebrow} onChange={(eyebrow) => updateHome("destinations", { eyebrow })} />
              <TextField label="Main heading" value={content.home.destinations.title} onChange={(title) => updateHome("destinations", { title })} />
              <TextArea label="Introduction" value={content.home.destinations.description} onChange={(description) => updateHome("destinations", { description })} />
            </div>
          </Panel>

          <Panel title="The Bike the Hills experience">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Small heading" value={content.home.experience.eyebrow} onChange={(eyebrow) => updateHome("experience", { eyebrow })} />
              <TextField label="Main heading" value={content.home.experience.title} onChange={(title) => updateHome("experience", { title })} />
              <TextArea label="Introduction" value={content.home.experience.description} onChange={(description) => updateHome("experience", { description })} />
              <PhotoField label="Section photo" image={content.home.experience.image} onChange={(image) => updateHome("experience", { image })} />
            </div>
            <StringList label="Experience highlights" values={content.home.experience.highlights} onChange={(highlights) => updateHome("experience", { highlights })} />
          </Panel>

          <Panel title="Rider stories">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Small heading" value={content.home.testimonials.eyebrow} onChange={(eyebrow) => updateHome("testimonials", { eyebrow })} />
              <TextField label="Main heading" value={content.home.testimonials.title} onChange={(title) => updateHome("testimonials", { title })} />
              <TextArea label="Introduction" value={content.home.testimonials.description} onChange={(description) => updateHome("testimonials", { description })} />
            </div>
            <div className="mt-5 space-y-3">
              {content.home.testimonials.items.map((item, index) => (
                <div key={index} className="grid gap-3 rounded-xl border border-stone-200 p-4 sm:grid-cols-3">
                  <TextArea label={"Story " + (index + 1)} value={item.quote} onChange={(quote) => updateHome("testimonials", { items: content.home.testimonials.items.map((entry, i) => i === index ? { ...entry, quote } : entry) })} />
                  <TextField label="Rider name" value={item.name} onChange={(name) => updateHome("testimonials", { items: content.home.testimonials.items.map((entry, i) => i === index ? { ...entry, name } : entry) })} />
                  <TextField label="Country" value={item.country} onChange={(country) => updateHome("testimonials", { items: content.home.testimonials.items.map((entry, i) => i === index ? { ...entry, country } : entry) })} />
                  <button type="button" onClick={() => updateHome("testimonials", { items: content.home.testimonials.items.filter((_, i) => i !== index) })} className="inline-flex w-fit items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"><Trash2 size={14} /> Remove story</button>
                </div>
              ))}
              <button type="button" onClick={() => updateHome("testimonials", { items: [...content.home.testimonials.items, { quote: "", name: "", country: "" }] })} className="inline-flex items-center gap-2 rounded-lg border border-[#12372a] px-3 py-2 text-sm font-semibold text-[#12372a]"><Plus size={16} /> Add story</button>
            </div>
          </Panel>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <Panel title="Destinations page introduction">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Hero small heading" value={content.destinationsPage.heroEyebrow} onChange={(heroEyebrow) => updateDestinationPage({ heroEyebrow })} />
              <TextField label="Hero title" value={content.destinationsPage.heroTitle} onChange={(heroTitle) => updateDestinationPage({ heroTitle })} />
              <TextArea label="Hero description" value={content.destinationsPage.heroDescription} onChange={(heroDescription) => updateDestinationPage({ heroDescription })} />
              <PhotoField label="Destinations page hero photo" image={content.destinationsPage.heroImage} onChange={(heroImage) => updateDestinationPage({ heroImage })} />
              <TextField label="Destinations section small heading" value={content.destinationsPage.sectionEyebrow} onChange={(sectionEyebrow) => updateDestinationPage({ sectionEyebrow })} />
              <TextField label="Destinations section title" value={content.destinationsPage.sectionTitle} onChange={(sectionTitle) => updateDestinationPage({ sectionTitle })} />
              <TextArea label="Destinations section description" value={content.destinationsPage.sectionDescription} onChange={(sectionDescription) => updateDestinationPage({ sectionDescription })} />
            </div>
          </Panel>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-playfair text-2xl font-bold text-[#12372a]">Destination cards</h3>
            <button type="button" onClick={addDestination} disabled={content.destinations.length >= 30} className="inline-flex items-center gap-2 rounded-xl border border-[#12372a] px-4 py-2.5 text-sm font-semibold text-[#12372a] disabled:opacity-50"><Plus size={16} /> Add destination</button>
          </div>
          {content.destinations.map((destination, index) => (
            <Panel key={destination.slug + "-" + index} title={"Destination " + (index + 1)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Name" value={destination.name} onChange={(name) => updateDestination(index, { name })} />
                <TextField label="Page link name" value={destination.slug} onChange={(slug) => updateDestination(index, { slug: slugify(slug) })} />
                <TextArea label="Description" value={destination.description} onChange={(description) => updateDestination(index, { description })} />
                <PhotoField label="Destination photo" image={destination.image} onChange={(image) => updateDestination(index, { image })} />
              </div>
              <button type="button" onClick={() => removeDestination(index)} className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"><Trash2 size={16} /> Remove destination</button>
            </Panel>
          ))}
        </div>
      )}

      <div className="mt-7 flex justify-end">
        <button type="button" onClick={save} disabled={isPending} className="inline-flex items-center gap-2 rounded-xl bg-[#07382f] px-5 py-3 font-semibold text-white hover:bg-[#125343] disabled:opacity-60"><Save size={17} /> {isPending ? "Saving…" : "Save changes"}</button>
      </div>
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-stone-200 bg-[#fdfdfb] p-4 sm:p-5"><h3 className="mb-4 font-semibold text-[#12372a]">{title}</h3>{children}</section>;
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block text-sm font-semibold text-stone-700">{label}<input value={value} onChange={(event) => onChange(event.target.value)} maxLength={1800} className={inputClass} /></label>;
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block text-sm font-semibold text-stone-700">{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} maxLength={1800} className={inputClass + " resize-y"} /></label>;
}

function PhotoField({ label, image, onChange }: { label: string; image: string; onChange: (image: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file?: File) {
    if (!file) return;
    const formData = new FormData();
    formData.set("photo", file);
    setUploading(true);
    setError("");
    const result = await uploadSiteImage(formData);
    if (result.ok) onChange(result.image);
    else setError(result.message);
    setUploading(false);
  }

  return (
    <div className="block text-sm font-semibold text-stone-700">
      <p>{label}</p>
      <div className="mt-2 flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-stone-100"><Image src={image} alt="" fill sizes="112px" className="object-cover" /></div>
        <div className="min-w-0 flex-1"><p className="text-xs font-normal text-stone-500">JPEG, PNG, or WebP · up to 8 MB</p>
          <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#12372a] px-3 py-2 text-xs font-bold text-[#12372a] hover:bg-[#f1f5f1]"><ImagePlus size={15} />{uploading ? "Uploading…" : "Choose or replace photo"}<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={uploading} onChange={(event) => upload(event.currentTarget.files?.[0])} /></label>
          {error && <p role="alert" className="mt-1 text-xs font-normal text-red-700">{error}</p>}
        </div>
      </div>
    </div>
  );
}

function StringList({ label, values, onChange }: { label: string; values: string[]; onChange: (values: string[]) => void }) {
  return (
    <div className="mt-5">
      <h4 className="text-sm font-semibold text-stone-700">{label}</h4>
      <div className="mt-2 space-y-2">
        {values.map((value, index) => <div key={index} className="flex gap-2">
          <input value={value} onChange={(event) => onChange(values.map((item, i) => i === index ? event.target.value : item))} className={inputClass} />
          <button type="button" aria-label={"Remove " + label + " " + (index + 1)} onClick={() => onChange(values.filter((_, i) => i !== index))} className="shrink-0 rounded-lg p-3 text-red-700 hover:bg-red-50"><Trash2 size={16} /></button>
        </div>)}
      </div>
      <button type="button" onClick={() => onChange([...values, ""])} className="mt-2 inline-flex items-center gap-2 rounded-lg border border-[#12372a] px-3 py-2 text-sm font-semibold text-[#12372a]"><Plus size={16} /> Add item</button>
    </div>
  );
}

function slugify(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72);
}

const inputClass = "mt-2 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-3 font-normal text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#12372a] focus:ring-2 focus:ring-[#12372a]/10";
