import type { FeaturedProduct } from "@/content/productTypes";

import { formatMoney, storefrontFetch } from "./client";

// Champs personnalisés créés par scripts/shopify-setup.mjs (namespace "millie")
const METAFIELD_KEYS = [
  "category",
  "badge",
  "shipping",
  "highlights",
  "story",
  "aura_from",
  "aura_via",
  "aura_to",
] as const;

const PRODUCT_FIELDS = `
  handle
  title
  description
  productType
  featuredImage { url altText }
  priceRange { minVariantPrice { amount currencyCode } }
  options { name values }
  variants(first: 50) {
    nodes {
      id
      availableForSale
      selectedOptions { name value }
      price { amount currencyCode }
    }
  }
  metafields(identifiers: [${METAFIELD_KEYS.map(
    (key) => `{ namespace: "millie", key: "${key}" }`,
  ).join(", ")}]) { key value }
`;

type Money = { amount: string; currencyCode: string };

type ShopifyProduct = {
  handle: string;
  title: string;
  description: string;
  productType: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: Money };
  options: { name: string; values: string[] }[];
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      selectedOptions: { name: string; value: string }[];
      price: Money;
    }[];
  };
  metafields: ({ key: string; value: string } | null)[];
};

const SIZE_OPTION_NAMES = ["taille", "size", "pointure"];

const DEFAULT_AURAS = [
  { from: "#43306f", via: "#6d48c9", to: "#ff8ac3" },
  { from: "#162237", via: "#2b7f9f", to: "#9fe7ff" },
  { from: "#401b45", via: "#8a2f70", to: "#fdb2ff" },
  { from: "#2f2c74", via: "#5691ff", to: "#b1e1ff" },
];

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const value = parseInt(clean.length === 3 ? clean.replace(/./g, "$&$&") : clean, 16);
  if (Number.isNaN(value)) return `rgba(255, 210, 255, ${alpha})`;
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
}

function parseList(value: string | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n|\r\n\s*\r\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function mapProduct(product: ShopifyProduct, index: number): FeaturedProduct {
  const meta = Object.fromEntries(
    product.metafields
      .filter((field): field is { key: string; value: string } => Boolean(field))
      .map((field) => [field.key, field.value]),
  );

  const sizeOption = product.options.find((option) =>
    SIZE_OPTION_NAMES.includes(option.name.toLowerCase()),
  );
  const sizeOf = (options: { name: string; value: string }[]) =>
    (sizeOption && options.find((option) => option.name === sizeOption.name)?.value) ?? "TU";

  const variants = product.variants.nodes.map((variant) => ({
    id: variant.id,
    size: sizeOf(variant.selectedOptions),
    available: variant.availableForSale,
    price: formatMoney(variant.price),
  }));

  const fallbackAura = DEFAULT_AURAS[index % DEFAULT_AURAS.length];
  const aura = {
    from: meta.aura_from ?? fallbackAura.from,
    via: meta.aura_via ?? (meta.aura_from ? undefined : fallbackAura.via),
    to: meta.aura_to ?? fallbackAura.to,
  };

  const story = toParagraphs(meta.story ?? "");

  return {
    id: product.handle,
    title: product.title,
    category: meta.category ?? (product.productType || "Atelier"),
    description: product.description,
    price: formatMoney(product.priceRange.minVariantPrice),
    shipping: meta.shipping ?? "Expédition sous 72h",
    sizes: sizeOption ? sizeOption.values : ["TU"],
    badge: meta.badge,
    highlights: parseList(meta.highlights),
    story: story.length ? story : toParagraphs(product.description),
    preview: {
      src: product.featuredImage?.url ?? "/assets/images/millie.png",
      alt: product.featuredImage?.altText ?? product.title,
      glow: hexToRgba(aura.to, 0.4),
    },
    aura,
    variants,
  };
}

const COLLECTION_QUERY = `
  query FeaturedCollection($handle: String!) {
    collection(handle: $handle) {
      products(first: 50) { nodes { ${PRODUCT_FIELDS} } }
    }
  }
`;

const ALL_PRODUCTS_QUERY = `
  query AllProducts {
    products(first: 50, sortKey: CREATED_AT, reverse: true) { nodes { ${PRODUCT_FIELDS} } }
  }
`;

const PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

// Les pièces affichées viennent de la collection "selection-atelier" (ordre
// réglable dans l'admin Shopify), sinon de tout le catalogue.
export async function fetchShopifyProducts(): Promise<FeaturedProduct[]> {
  const handle = process.env.SHOPIFY_FEATURED_COLLECTION ?? "selection-atelier";
  const { collection } = await storefrontFetch<{
    collection: { products: { nodes: ShopifyProduct[] } } | null;
  }>(COLLECTION_QUERY, { variables: { handle } });

  let nodes = collection?.products.nodes ?? [];
  if (!nodes.length) {
    const { products } = await storefrontFetch<{
      products: { nodes: ShopifyProduct[] };
    }>(ALL_PRODUCTS_QUERY);
    nodes = products.nodes;
  }
  return nodes.map(mapProduct);
}

export async function fetchShopifyProduct(
  handle: string,
): Promise<FeaturedProduct | undefined> {
  const { product } = await storefrontFetch<{ product: ShopifyProduct | null }>(
    PRODUCT_QUERY,
    { variables: { handle } },
  );
  return product ? mapProduct(product, 0) : undefined;
}
