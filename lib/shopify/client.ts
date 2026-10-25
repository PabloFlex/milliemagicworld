// Uniquement côté serveur : le token ne doit pas partir dans le bundle client.
const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-04";

export const SHOPIFY_CACHE_TAG = "shopify";

export function isShopifyConfigured(): boolean {
  return Boolean(domain);
}

function endpoint(): string {
  // mock.shop (boutique de démo publique) expose l'API sur /api sans version
  if (domain === "mock.shop") return "https://mock.shop/api";
  return `https://${domain}/api/${apiVersion}/graphql.json`;
}

type StorefrontOptions = {
  variables?: Record<string, unknown>;
  // false pour les requêtes panier : jamais mises en cache
  cache?: boolean;
};

export async function storefrontFetch<T>(
  query: string,
  { variables, cache = true }: StorefrontOptions = {},
): Promise<T> {
  if (!domain) {
    throw new Error("SHOPIFY_STORE_DOMAIN manquant");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["X-Shopify-Storefront-Access-Token"] = token;
  }

  const response = await fetch(endpoint(), {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    ...(cache
      ? { next: { revalidate: 60, tags: [SHOPIFY_CACHE_TAG] } }
      : { cache: "no-store" as const }),
  });

  if (!response.ok) {
    throw new Error(`Shopify ${response.status}: ${await response.text()}`);
  }

  const json = (await response.json()) as {
    data?: T;
    errors?: { message: string }[];
  };
  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join(" / "));
  }
  return json.data as T;
}

export function formatMoney(money: { amount: string; currencyCode: string }) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: money.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(money.amount));
}
