import type { Metadata } from "next";

import DropCountdownExperience from "@/components/interactive/DropCountdownExperience";

export const metadata: Metadata = {
  title: "Millie's Magic World — Drop Countdown",
  description:
    "Le portail Millie's Magic World s'ouvrira le 14 février. Découvre le décompte féérique avant l'arrivée du drop.",
};

export default function DropPage() {
  return <DropCountdownExperience variant="page" />;
}
