import { isShopifyConfigured } from "@/lib/shopify/client";
import {
  fetchShopifyProduct,
  fetchShopifyProducts,
} from "@/lib/shopify/products";

import type { FeaturedProduct } from "./productTypes";
import { mockFeaturedProducts } from "./mockProducts";

export type { FeaturedProduct, ProductVariant } from "./productTypes";

// Sans SHOPIFY_STORE_DOMAIN, le site affiche les produits de démo (mockProducts.ts).
export async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  if (!isShopifyConfigured()) {
    return mockFeaturedProducts;
  }
  return fetchShopifyProducts();
}

export async function getFeaturedProductById(
  productId: string,
): Promise<FeaturedProduct | undefined> {
  const normalizedId = decodeURIComponent(productId);
  if (!isShopifyConfigured()) {
    return mockFeaturedProducts.find((product) => product.id === normalizedId);
  }
  return fetchShopifyProduct(normalizedId);
}
