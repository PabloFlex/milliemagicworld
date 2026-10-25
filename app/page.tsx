import HomeContent from "@/components/layout/HomeContent";
import { getFeaturedProducts } from "@/content/products";

// Prix, stocks et fiches Shopify rafraîchis toutes les 60 secondes
export const revalidate = 60;

export default async function Home() {
  const products = await getFeaturedProducts();
  return <HomeContent products={products} />;
}
