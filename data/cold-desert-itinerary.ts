export type ExpeditionDay = {
  day: number;
  title: string;
  mode: "Cycling" | "Transfer" | "Cycling / transfer" | "To be confirmed";
  distance: string;
  sleepingElevation: string;
  description: string;
  highlights: string[];
};

export const coldDesertItinerary: ExpeditionDay[] = [
  {
    day: 1,
    title: "Chandigarh to Sangla Valley",
    mode: "Transfer",
    distance: "Unconfirmed",
    sleepingElevation: "Unconfirmed",
    description: "Travel from Chandigarh into Kinnaur and the Baspa River valley. Settle into the accommodation and meet the team for an introduction to the expedition.",
    highlights: ["Kinnaur landscapes", "Baspa River valley"],
  },
  {
    day: 2,
    title: "Explore the Baspa River Valley",
    mode: "To be confirmed",
    distance: "Unconfirmed",
    sleepingElevation: "Unconfirmed",
    description: "A day around the Baspa River valley before the longer cycling stages. The exact activity and schedule will be confirmed with the final itinerary.",
    highlights: ["Baspa River valley", "Preparation and acclimatisation"],
  },
  {
    day: 3,
    title: "Batseri to Chitkul and return",
    mode: "Cycling",
    distance: "Unconfirmed",
    sleepingElevation: "Unconfirmed",
    description: "Ride from Batseri towards Chitkul and return, following the Baspa River valley. Overnight near Batseri.",
    highlights: ["Chitkul", "Baspa River", "Return ride"],
  },
  {
    day: 4,
    title: "Batseri to Kanam",
    mode: "Cycling / transfer",
    distance: "Unconfirmed",
    sleepingElevation: "Unconfirmed",
    description: "Continue through the Kinnaur region towards Kanam. Final route logistics and cycling distance will be confirmed before departure.",
    highlights: ["Kinnaur landscapes", "Kanam village"],
  },
  {
    day: 5,
    title: "Kanam to Nako",
    mode: "Cycling",
    distance: "Unconfirmed",
    sleepingElevation: "Unconfirmed",
    description: "Travel deeper into the high-altitude landscape and reach Nako, known for its traditional village setting and monastery.",
    highlights: ["Nako village", "Nako Monastery"],
  },
  {
    day: 6,
    title: "Nako to Gue to Tabo",
    mode: "Cycling",
    distance: "Unconfirmed",
    sleepingElevation: "Unconfirmed",
    description: "Continue into Spiti, with a visit to Gue and its Buddhist monk mummy shrine before reaching Tabo and its historic monastery.",
    highlights: ["Gue shrine", "Tabo village", "Tabo Monastery"],
  },
  {
    day: 7,
    title: "Tabo to Dhankar to Kaza",
    mode: "Cycling",
    distance: "Unconfirmed",
    sleepingElevation: "Unconfirmed",
    description: "Ride towards Kaza through Spiti's dramatic dry landscapes, with a visit to Dhankar Monastery. Any hike or additional stop depends on conditions and timing.",
    highlights: ["Dhankar Monastery", "Spiti River valley", "Kaza"],
  },
  {
    day: 8,
    title: "Kaza to Kibber and Chicham, onward to Losar",
    mode: "Cycling / transfer",
    distance: "75 km cycling",
    sleepingElevation: "Unconfirmed",
    description: "Explore Spiti's high villages around Kibber and Chicham, with the route continuing towards Losar via Kiato. The precise riding and vehicle-support plan will be confirmed with the final route sheet.",
    highlights: ["Kibber", "Chicham Bridge", "High-village landscapes", "Losar"],
  },
  {
    day: 9,
    title: "Losar to Chandratal",
    mode: "Cycling / transfer",
    distance: "Unconfirmed",
    sleepingElevation: "Unconfirmed",
    description: "Travel towards Chandratal across high mountain terrain and the Kunzum La area. The final cycling distance and overnight arrangements are to be confirmed.",
    highlights: ["Kunzum La", "Chandra Valley", "Chandratal"],
  },
  {
    day: 10,
    title: "Chandratal to Manali",
    mode: "Transfer",
    distance: "Unconfirmed",
    sleepingElevation: "Unconfirmed",
    description: "Transfer from Chandratal to Manali. The expedition concludes in Manali; departure timing and any onward connections should be arranged after confirming the transfer schedule.",
    highlights: ["Mountain road journey", "Trip ends in Manali"],
  },
];
