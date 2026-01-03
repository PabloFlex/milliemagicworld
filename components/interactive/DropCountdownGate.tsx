"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import DropCountdownExperience from "@/components/interactive/DropCountdownExperience";
import { hasDropOpened } from "@/lib/drop-config";

type DropCountdownGateProps = {
  children: ReactNode;
};

export default function DropCountdownGate({ children }: DropCountdownGateProps) {
  const pathname = usePathname();
  // Passe ce useState à false quand tu veux désactiver temporairement le portail.
  const [isGateEnabled] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(() => hasDropOpened());

  // Permet d'ouvrir automatiquement le site une fois le drop lancé.
  useEffect(() => {
    if (isUnlocked) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (hasDropOpened()) {
        window.clearInterval(intervalId);
        setIsUnlocked(true);
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isUnlocked]);

  const isDropPage = pathname?.startsWith("/drop");
  const shouldShowGate = isGateEnabled && !isDropPage && !isUnlocked;

  useEffect(() => {
    if (!shouldShowGate) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldShowGate]);

  if (!shouldShowGate) {
    return <>{children}</>;
  }

  return (
    <>
      <DropCountdownExperience variant="overlay" onCountdownEnd={() => setIsUnlocked(true)} />
      <div aria-hidden className="pointer-events-none opacity-0">
        {children}
      </div>
    </>
  );
}
