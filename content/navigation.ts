export type NavSection = {
  title: string;
  items: string[];
};

export const navigationSections: NavSection[] = [
  { title: "Accessoires", items: ["Hair", "Bag", "Guêtres"] },
  { title: "Haut", items: ["Top", "Tee-shirt"] },
  { title: "Bas", items: ["Pants", "Jean", "Skirt"] },
  { title: "Streetwear", items: ["Veste", "Sweat"] },
];
