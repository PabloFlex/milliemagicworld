import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos produits hébergées par Shopify
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
