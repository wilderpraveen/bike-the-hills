import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bike,
  CalendarDays,
  CheckCircle2,
  MapPinned,
  Mountain,
  Users,
  BedDouble,
  ShieldCheck,
} from "lucide-react";
import { expeditions } from "@/data/expeditions";
import Navbar from "@/components/layout/Navbar";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const itinerary = [
  {
    day: 1,
    title: "Arrive in Shimla · Drive to Thanedar",
    distance: "75 km by vehicle",
    stats: "Start 2,100 m · Highest 2,700 m · Overnight 2,400 m",
    description:
      "Travel north from Shimla to Thanedar, a peaceful village surrounded by apple orchards. Settle into your accommodation, meet the team, prepare your bike and get briefed on the journey ahead.",
    highlights: "Apple orchards · Trip briefing · Bike preparation",
  },
  {
    day: 2,
    title: "Thanedar to Batseri, Sangla",
    distance: "150 km by vehicle",
    stats: "Start 2,400 m · Highest 2,800 m · Overnight 2,750 m",
    description:
      "Follow the Indo-Tibet Highway towards Rakcham before entering the Baspa River valley. Batseri and the surrounding villages offer a beautiful riverside setting and a comfortable place to rest before the cycling begins.",
    highlights: "Baspa River valley · Kinnaur villages",
  },
  {
    day: 3,
    title: "Explore the Baspa River Valley",
    distance: "40 km cycling",
    stats: "Start 2,720 m · Highest 2,815 m · Overnight 2,720 m",
    description:
      "Ease into the expedition with an acclimatisation ride towards Chitkul. The route follows winding roads beside the river, with a steady climb on the way out and a rewarding descent on the return.",
    highlights: "Chitkul · Baspa River · Acclimatisation ride",
  },
  {
    day: 4,
    title: "Batseri to Kanam",
    distance: "83 km total · 75 km cycling",
    stats: "Start 2,720 m · Highest 2,858 m · Overnight 2,703 m",
    description:
      "Ride onward through the Kinnaur region to Kanam, a historic monastic village also known as the Land of God. The village is associated with the translator Rinchen Zangpo and is known for its cluster of monasteries and traditional local culture.",
    highlights: "Kinnaur landscapes · Kanam village · Monasteries",
  },
  {
    day: 5,
    title: "Kanam to Nako",
    distance: "72 km cycling",
    stats: "Start 2,703 m · Highest 3,625 m · Overnight 3,625 m",
    description:
      "A demanding riding day with repeated climbs and descents as the landscape becomes increasingly stark and high-altitude. Reach Nako, a village set beneath the dramatic backdrop of Reo Purgyil, then explore the village and its monastery.",
    highlights: "High-altitude riding · Nako village · Nako Monastery",
  },
  {
    day: 6,
    title: "Nako · Gue · Tabo",
    distance: "78 km cycling",
    stats: "Start 3,625 m · Highest 3,850 m · Overnight 3,300 m",
    description:
      "Continue into Spiti with a visit to Gue, known for its preserved Buddhist monk mummy, displayed in a shrine. Then ride to Tabo, a welcoming village whose monastery was founded in 996 CE and remains one of the region’s most remarkable cultural sites.",
    highlights: "Gue mummy shrine · Tabo village · Tabo Monastery",
  },
  {
    day: 7,
    title: "Tabo · Dhankar · Kaza",
    distance: "54 km cycling",
    stats: "Start 3,300 m · Highest 3,930 m · Overnight 3,650 m",
    description:
      "Ride through the striking, dry landscapes of Spiti towards Kaza, with a detour to Dhankar Monastery. If conditions and timing allow, take the hike to Dhankar Lake and look out over the confluence of the Pin and Spiti rivers before continuing to Kaza.",
    highlights: "Dhankar Monastery · Dhankar Lake hike · River confluence",
  },
  {
    day: 8,
    title: "Kaza · Langza · Hikkim · Komic · Ki · Chicham",
    distance: "55 km cycling",
    stats: "Start 3,700 m · Highest 4,587 m · Overnight 4,270 m",
    description:
      "Explore some of Spiti’s celebrated high villages. Send a postcard from Hikkim, look for fossils around Langza and take in the high-altitude views at Komic. After lunch, continue towards Ki Monastery and cross the dramatic Chicham Bridge before settling in Chicham.",
    highlights: "Langza fossils · Hikkim post office · Komic · Ki Monastery · Chicham Bridge",
  },
  {
    day: 9,
    title: "Chicham to Chandratal",
    distance: "75 km cycling",
    stats: "Start 4,270 m · Highest 4,590 m · Overnight 4,000 m",
    description:
      "Take on the final full day in the saddle across high mountain terrain towards Chandratal. The surface becomes rougher as the route climbs to Kunzum La; from the pass, continue towards the beautiful crescent-shaped lake for a memorable finish to the riding.",
    highlights: "Kunzum La · High mountain riding · Chandratal",
  },
  {
    day: 10,
    title: "Chandratal to Manali",
    distance: "170 km by vehicle",
    stats: "Start around 4,000 m · Overnight in Manali around 1,900 m (optional)",
    description:
      "Leave early for the drive to Manali. The route is an adventure in itself, with rugged tracks, boulder sections, water crossings and dramatic mountain scenery. The expedition concludes in Manali; you can stay overnight or continue onwards, depending on your onward travel plans.",
    highlights: "Chandra Valley · Mountain road journey · Trip ends in Manali",
  },
];

const included = [
  "9 nights’ accommodation in hotels, homestays and camps, as applicable",
  "All meals from dinner on Day 1 to breakfast on Day 10",
  "Transfers from Shimla to Manali, as outlined in the itinerary",
  "Cycle rental and bicycle transportation",
  "Experienced lead cyclist and support staff",
  "Refreshments and hydration on cycling days",
  "Backup vehicle and mechanical support",
  "Entry fees and permits",
  "Filtered drinking water",
  "Safety communication devices, including walkie-talkies",
  "First aid and support, including an oxygen cylinder",
];

const excluded = [
  "5% GST and applicable taxes",
  "Travel and accident insurance",
  "Tips",
  "Alcoholic beverages",
  "Personal expenses during the trip",
  "Single-room supplement",
  "Flight tickets",
  "Inner Line Permit for foreign nationals, where applicable",
  "Costs arising from unforeseen circumstances such as bad weather, landslides, road conditions or other events beyond our control",
];

function BulletList({ items, positive = false }: { items: string[]; positive?: boolean }) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-gray-600">
          {positive ? (
            <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[#12372A]" />
          ) : (
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-stone-400" />
          )}
          <span className="leading-7">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ExpeditionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const expedition = expeditions.find((trip) => trip.slug === slug);

  if (!expedition) {
    return (
      <main className="min-h-screen bg-stone-50 px-6 py-32 text-center">
        <h1 className="font-playfair text-4xl font-bold text-[#12372A]">Expedition not found</h1>
        <Link href="/#expeditions" className="mt-6 inline-flex items-center gap-2 text-[#12372A] underline underline-offset-4">
          <ArrowLeft size={18} /> Browse expeditions
        </Link>
      </main>
    );
  }

  const isSummerMountainBiking = expedition.slug === "cold-desert-expedition";

  if (isSummerMountainBiking) {
    return (
      <main className="min-h-screen bg-stone-50">
        <Navbar />
        <section className="relative isolate flex min-h-[72vh] items-end overflow-hidden px-6 pb-16 pt-32 sm:pb-20">
          <Image
            src={expedition.image}
            alt={expedition.title}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
          <div className="mx-auto w-full max-w-7xl text-white">
            <Link href="/#expeditions" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white">
              <ArrowLeft size={17} /> All expeditions
            </Link>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-white/80">Kinnaur &amp; Spiti Valley · Himachal Pradesh</p>
            <h1 className="max-w-4xl font-playfair text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Cold Desert Expedition
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">
              A 10-day cycling journey from Kinnaur’s river valleys to Spiti’s high-altitude desert, linking remote villages, ancient monasteries and dramatic Himalayan passes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur-sm"><CalendarDays size={17} /> 10 Days</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur-sm"><Bike size={17} /> Moderate</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur-sm"><Users size={17} /> 6–10 guests</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur-sm"><Mountain size={17} /> June–September</span>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#12372A]">About Spiti</p>
              <h2 className="font-playfair text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">Into the heart of the Cold Desert</h2>
              <div className="mt-6 max-w-3xl space-y-5 text-lg leading-8 text-gray-600">
                <p>
                  Spiti—often described as the “middle land” between Tibet and the Indian Himalaya—is a high-altitude desert of sculpted mountains, quiet villages and deep Buddhist heritage. Travelling by bicycle lets you experience this distinctive landscape at a slower, more meaningful pace.
                </p>
                <p>
                  This journey takes you beyond Spiti into the beautiful hills of Kinnaur and the greener parts of lower Himachal. Travelling by bicycle lets you experience the changing landscapes and local life along the way; the journey is as memorable as the destinations.
                </p>
                <p>
                  This route combines Kinnaur’s greener valleys with Spiti’s stark, otherworldly terrain. Although rated moderate, it includes long riding days, sustained climbs and high-altitude sections. Previous cycling experience and good fitness are important.
                </p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: MapPinned, title: "Explore by bike", text: "Discover Kinnaur and Spiti at a rewarding pace." },
                  { icon: BedDouble, title: "Local hospitality", text: "Stay in a mix of hotels, homestays and camps." },
                  { icon: ShieldCheck, title: "Technical support", text: "Ride with mechanical assistance and a backup vehicle." },
                  { icon: Mountain, title: "Living heritage", text: "Visit remote villages and historic monasteries." },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-2xl border border-stone-200 bg-white p-5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-[#12372A]/10 text-[#12372A]"><Icon size={21} /></span>
                    <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
                    <p className="mt-2 leading-6 text-gray-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8 lg:sticky lg:top-24">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#12372A]">Expedition at a glance</p>
              <h3 className="mt-3 font-playfair text-3xl font-bold text-gray-900">The essentials</h3>
              <div className="mt-7 space-y-5">
                {[
                  { icon: CalendarDays, label: "Duration", value: "10 days / 9 nights" },
                  { icon: Bike, label: "Difficulty", value: "Moderate" },
                  { icon: Users, label: "Group size", value: "6–10 people" },
                  { icon: Mountain, label: "Season", value: "June to September" },
                  { icon: BedDouble, label: "Accommodation", value: "Hotels, homestays and camps" },
                  { icon: MapPinned, label: "Route", value: "Shimla · Kinnaur · Spiti · Chandratal · Manali" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-[#12372A]"><Icon size={19} /></span>
                    <div><p className="text-sm text-gray-500">{label}</p><p className="mt-0.5 font-semibold text-gray-900">{value}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/#expeditions" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#12372A] px-6 py-4 font-semibold text-white transition hover:bg-[#1b4d39]">
                Enquire about this expedition <ArrowRight size={17} />
              </Link>
              <p className="mt-3 text-center text-xs leading-5 text-gray-500">Dates, availability and final arrangements are confirmed with our team.</p>
            </aside>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#12372A]">Tour highlights</p>
              <h2 className="font-playfair text-4xl font-bold text-gray-900 sm:text-5xl">Ancient culture. High-altitude roads. Remote Himalayan life.</h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Explore Spiti and Kinnaur on two wheels",
                "Experience warm local hospitality",
                "Technical and mechanical support throughout",
                "Discover lesser-known Himalayan villages",
                "Enjoy immersive local experiences",
                "Visit historic monasteries, some over 1,000 years old",
              ].map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-stone-50 p-5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#12372A] text-sm font-semibold text-white">{String(index + 1).padStart(2, "0")}</span>
                  <p className="leading-6 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#12372A]">Day by day</p>
            <h2 className="font-playfair text-4xl font-bold text-gray-900 sm:text-5xl">Tour plan &amp; itinerary</h2>
            <p className="mt-5 max-w-3xl leading-7 text-gray-600">Distances and elevation figures below follow the supplied route plan. Actual riding conditions and timing can vary with weather, road conditions and the group.</p>
            <div className="mt-10 space-y-5">
              {itinerary.map((day) => (
                <article key={day.day} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                  <div className="grid sm:grid-cols-[88px_1fr]">
                    <div className="flex items-center gap-3 bg-[#12372A] px-5 py-4 text-white sm:flex-col sm:justify-center sm:gap-1 sm:px-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Day</span>
                      <span className="font-playfair text-3xl font-bold">{String(day.day).padStart(2, "0")}</span>
                    </div>
                    <div className="p-5 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="font-playfair text-2xl font-bold text-gray-900">{day.title}</h3>
                        <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5 text-sm font-medium text-gray-700"><Bike size={15} /> {day.distance}</span>
                      </div>
                      <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-gray-500"><Mountain size={16} className="mt-1 shrink-0" />{day.stats}</p>
                      <p className="mt-4 leading-7 text-gray-600">{day.description}</p>
                      <p className="mt-4 text-sm leading-6"><span className="font-semibold text-[#12372A]">Highlights: </span><span className="text-gray-600">{day.highlights}</span></p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white px-6 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div className="rounded-3xl border border-stone-200 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#12372A]">Included</p>
              <h2 className="mt-3 font-playfair text-3xl font-bold text-gray-900">What’s included</h2>
              <BulletList items={included} positive />
            </div>
            <div className="rounded-3xl border border-stone-200 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#12372A]">Not included</p>
              <h2 className="mt-3 font-playfair text-3xl font-bold text-gray-900">What’s not included</h2>
              <BulletList items={excluded} />
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#12372A]">Good to know</p>
              <h2 className="font-playfair text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">Is this expedition for me?</h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-gray-600">
              <p>
                If you enjoy the challenge and satisfaction of cycling through rugged mountain landscapes, this expedition offers plenty of adventure and opportunities to connect with local culture away from the usual routes.
              </p>
              <p>
                You do not need to be an elite athlete, but prior cycling experience and good physical fitness are recommended. Expect extended riding at altitude and sustained uphill sections, with gradients that can average around 5–10% on some climbs.
              </p>
              <p>
                High-altitude travel requires flexibility. The team may adjust the plan in response to weather, road conditions, group wellbeing or other safety considerations.
              </p>
              <div className="rounded-2xl bg-[#12372A] p-6 text-white sm:p-8">
                <h3 className="font-playfair text-2xl font-bold">Ready to ride through Spiti?</h3>
                <p className="mt-3 leading-7 text-white/80">Talk to Bike the Hills about dates, availability, preparation and the details of your expedition.</p>
                <Link href="/#expeditions" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#12372A] transition hover:bg-stone-100">
                  Contact the team <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <section className="relative isolate flex min-h-[72vh] items-end overflow-hidden px-6 pb-16 pt-32 sm:pb-20">
        <Image src={expedition.image} alt={expedition.title} fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
        <div className="mx-auto w-full max-w-7xl text-white">
          <Link href="/#expeditions" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"><ArrowLeft size={17} /> All expeditions</Link>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-white/80">{expedition.region}</p>
          <h1 className="max-w-4xl font-playfair text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">{expedition.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">{expedition.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur-sm"><CalendarDays size={17} /> {expedition.duration}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur-sm"><Bike size={17} /> {expedition.difficulty}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur-sm"><Mountain size={17} /> Up to {expedition.altitude}</span>
          </div>
        </div>
      </section>
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#12372A]">The journey</p>
            <h2 className="font-playfair text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">Discover the Himalayas beyond the usual route</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">Ride through high mountain landscapes, remote settlements and places shaped by local culture. Each Bike the Hills expedition is designed around the character of its region and the experience of travelling by bicycle.</p>
            <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <h3 className="font-playfair text-2xl font-bold text-gray-900">Expedition overview</h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div><p className="text-sm text-gray-500">Operating season</p><p className="mt-1 font-semibold text-gray-900">{expedition.season}</p></div>
                <div><p className="text-sm text-gray-500">Difficulty</p><p className="mt-1 font-semibold text-gray-900">{expedition.difficulty}</p></div>
                <div><p className="text-sm text-gray-500">Duration</p><p className="mt-1 font-semibold text-gray-900">{expedition.duration}</p></div>
                <div><p className="text-sm text-gray-500">Highest altitude listed</p><p className="mt-1 font-semibold text-gray-900">{expedition.altitude}</p></div>
              </div>
            </div>
          </div>
          <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#12372A]">Trip details</p>
            <h3 className="mt-3 font-playfair text-3xl font-bold text-gray-900">What to expect</h3>
            <div className="mt-7 space-y-6">
              {[
                { icon: CalendarDays, title: "Duration", detail: expedition.duration },
                { icon: Mountain, title: "Region", detail: expedition.region },
                { icon: Bike, title: "Difficulty", detail: expedition.difficulty },
                { icon: Users, title: "Group format", detail: "Ask us about a tailored expedition" },
              ].map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#12372A]/10 text-[#12372A]"><Icon size={21} /></span>
                  <div><p className="font-semibold text-gray-900">{title}</p><p className="mt-1 leading-6 text-gray-600">{detail}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-stone-50 p-5"><div className="flex items-start gap-3"><CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#12372A]" /><p className="text-sm leading-6 text-gray-600">The detailed day-by-day itinerary and final trip arrangements can be confirmed with the Bike the Hills team.</p></div></div>
            <Link href="/#expeditions" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#12372A] px-6 py-4 font-semibold text-white transition hover:bg-[#1b4d39]">Explore all expeditions <ArrowLeft size={17} className="rotate-180" /></Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
