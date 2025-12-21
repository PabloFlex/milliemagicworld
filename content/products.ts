export type FeaturedProduct = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  shipping: string;
  sizes: string[];
  badge?: string;
  highlights: string[];
  preview: {
    src: string;
    alt: string;
    glow: string;
  };
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
    sizes: ["XS", "S", "M", "L", "XL"],
    highlights: ["Coupe androgyne", "Doublure satinée"],
    preview: {
      src: "/assets/images/millie.png",
      alt: "Présentation Millie's Magic World",
      glow: "rgba(255, 210, 255, 0.45)",
    },
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
    sizes: ["XS", "S", "M", "L"],
    highlights: ["Unisexe", "Tissu certifié Oeko-Tex"],
    preview: {
      src: "/assets/images/millie.png",
      alt: "Présentation Millie's Magic World",
      glow: "rgba(111, 220, 255, 0.35)",
    },
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
    sizes: ["TU"],
    highlights: ["Bandoulière modulable", "Made in France"],
    preview: {
      src: "/assets/images/millie.png",
      alt: "Présentation Millie's Magic World",
      glow: "rgba(255, 179, 228, 0.45)",
    },
    aura: {
      from: "#401b45",
      via: "#8a2f70",
      to: "#fdb2ff",
    },
  },
  {
    id: "nebula-boots",
    title: "Nebula Boots",
    category: "Studio Lune",
    description: "Bottes plateformées reflet miroir, boucle astrale et zip invisible.",
    price: "210 €",
    shipping: "Made to order / 7 jours",
    badge: "Nouveau",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    highlights: ["Semelle amortie", "Cuir vegan premium"],
    preview: {
      src: "/assets/images/millie.png",
      alt: "Présentation Millie's Magic World",
      glow: "rgba(179, 210, 255, 0.4)",
    },
    aura: {
      from: "#2f2c74",
      via: "#5691ff",
      to: "#b1e1ff",
    },
  },
];
