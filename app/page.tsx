import CollectionHighlights from "@/components/CollectionHighlights";
import NavBar from "@/components/NavBar";
import OrbFollower from "@/components/OrbFollower";
import VideoHero from "@/components/VideoHero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdf8ff] text-[#2c1535]">
      <OrbFollower />
      <NavBar />
      <VideoHero />
      <CollectionHighlights />
    </div>
  );
}
