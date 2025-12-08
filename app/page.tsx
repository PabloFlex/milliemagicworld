import OrbFollower from "@/components/interactive/OrbFollower";
import NavBar from "@/components/layout/NavBar";
import CollectionHighlights from "@/components/sections/CollectionHighlights";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdf8ff] text-[#2c1535]">
      <OrbFollower />
      <NavBar />
      <HeroSection />
      <CollectionHighlights />
    </div>
  );
}
