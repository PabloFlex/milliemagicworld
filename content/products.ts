export type FeaturedProduct = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  shipping: string;
  badge?: string;
  highlights: string[];
  aura: {
    from: string;
    via?: string;
    to: string;
  };
};

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "halo-coat",
    title: "Halo Coat ∞",
    category: "Drop Eclipse",
    description: "Parka modulable satinée, capuche cathedral et surpiqûres phospho.",
    price: "220 €",
    shipping: "Prêt sous 72h",
    badge: "Edition limitée",
    highlights: ["Androgyne fit", "Doublure upcyclée"],
    aura: {
      from: "#43306f",
      via: "#6d48c9",
      to: "#ff8ac3",
    },
  },
  {
    id: "prism-set",
    title: "Prism Set",
    category: "Capsule Ritual",
    description: "Twin set crop + pantalon flare avec reflets iridescents qui suivent la lumière.",
    price: "185 €",
    shipping: "Précommande 10 jours",
    badge: "Best-seller",
    highlights: ["Unisexe", "Tissu certifié Oeko-Tex"],
    aura: {
      from: "#162237",
      via: "#2b7f9f",
      to: "#9fe7ff",
    },
  },
  {
    id: "astral-bag",
    title: "Astral Bag",
    category: "Atelier Secret",
    description: "Mini bag orbital, cuir végétal embossé et poignée nacrée qui flirte avec la lune.",
    price: "140 €",
    shipping: "Pièce unique / 1 semaine",
    highlights: ["Bandoulière modulable", "Made in France"],
    aura: {
      from: "#401b45",
      via: "#8a2f70",
      to: "#fdb2ff",
    },
  },
];
