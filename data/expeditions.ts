export const expeditions = [
  {
    id: 1,
    slug: "cold-desert-expedition",
    title: "Cold Desert Expedition",
    region: "Kinnaur & Spiti Valley",
    duration: "10 Days",
    difficulty: "Intermediate",
    altitude: "4,550 m",
    season: "June - September",
    image: "/images/routes/spiti.jpg",
    description:
      "Cycle from Kinnaur’s green valleys into Spiti’s cold desert, passing remote villages and historic monasteries.",
  },

  {
    id: 2,
    slug: "hidden-valleys-expedition",
    title: "Hidden Valleys Expedition",
    region: "Himachal Himalaya",
    duration: "8 Days",
    difficulty: "Intermediate",
    altitude: "4,200 m",
    season: "May - October",
    image: "/images/routes/valley.jpg",
    description:
      "Explore quiet Himalayan valleys, local culture, monasteries and scenic roads beyond the usual routes.",
  },

  {
    id: 3,
    slug: "high-himalayan-traverse",
    title: "High Himalayan Traverse",
    region: "Trans Himalaya",
    duration: "12 Days",
    difficulty: "Advanced",
    altitude: "5,100 m",
    season: "July - September",
    image: "/images/routes/himalaya.jpg",
    description:
      "Cross dramatic Trans-Himalayan terrain on a demanding expedition designed for experienced cyclists.",
  },
];

export type Expedition = (typeof expeditions)[number];
