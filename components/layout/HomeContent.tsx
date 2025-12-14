"use client";

import { useState } from "react";
import NewsletterPopup from "@/components/interactive/NewsletterPopup";
import OrbFollower from "@/components/interactive/OrbFollower";
import NavBar from "@/components/layout/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import OriginsSection from "@/components/sections/OriginsSection";

export default function HomeContent() {
  const [newsletterOpen, setNewsletterOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#fdf8ff] text-[#2c1535]">
      <NewsletterPopup onOpenChange={setNewsletterOpen} />
      {!newsletterOpen && <OrbFollower />}
      <NavBar />
      <HeroSection />
      <OriginsSection />
    </div>
  );
}

