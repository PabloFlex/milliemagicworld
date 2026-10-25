export type ProductVariant = {
  id: string;
  size: string;
  available: boolean;
  price: string;
};

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
  story: string[];
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
  // Présent uniquement quand le produit vient de Shopify (achat possible)
  variants?: ProductVariant[];
};
