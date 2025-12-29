import type { FeaturedProduct } from "./productTypes";
import { mockFeaturedProducts } from "./mockProducts";

export type { FeaturedProduct } from "./productTypes";

export const featuredProducts: FeaturedProduct[] = mockFeaturedProducts;

export function getFeaturedProducts(): FeaturedProduct[] {
  return featuredProducts;
}

export function getFeaturedProductById(
  productId: string,
): FeaturedProduct | undefined {
  const normalizedId = decodeURIComponent(productId);
  return featuredProducts.find((product) => product.id === normalizedId);
}
