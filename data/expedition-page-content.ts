type ExpeditionPageContent = {
  eyebrow: string;
  heading: string;
  description: string;
  highlights: string[];
  enquiryPrompt: string;
};

export const expeditionPageContent: Partial<
  Record<string, ExpeditionPageContent>
> = {
  "hidden-valleys-expedition": {
    eyebrow: "A quieter Himalayan journey",
    heading: "Explore the valleys beyond the usual route",
    description:
      "Spend eight days cycling through quieter Himalayan valleys, with local culture, monasteries, and peaceful roads shaping the journey.",
    highlights: [
      "Remote Himalayan valleys",
      "Local culture and monasteries",
      "Quieter roads and landscapes",
    ],
    enquiryPrompt:
      "Ask the team about the daily route, accommodation, and what to prepare for this intermediate expedition.",
  },
  "high-himalayan-traverse": {
    eyebrow: "A challenge in the Trans Himalaya",
    heading: "Take on a high mountain traverse",
    description:
      "A twelve-day advanced cycling expedition across dramatic Trans-Himalayan terrain, designed for experienced riders looking for a serious mountain challenge.",
    highlights: [
      "Dramatic Trans-Himalayan terrain",
      "An advanced cycling challenge",
      "A journey designed for experienced riders",
    ],
    enquiryPrompt:
      "Talk with the team about the route, daily riding, altitude preparation, and support plan before booking.",
  },
};
