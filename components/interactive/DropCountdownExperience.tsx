"use client";

import { useEffect, useMemo, useState } from "react";

import OrbFollower from "@/components/interactive/OrbFollower";
import { DROP_DATE, DROP_LABEL } from "@/lib/drop-config";

type FairyLight = {
  id: string;
  size: number;
  color: string;
  blur: number;
  delay: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

const fairyLights: FairyLight[] = [
  { id: "aura-north", top: "6%", left: "10%", size: 220, color: "rgba(255,238,255,0.28)", blur: 90, delay: "0s" },
  { id: "aura-east", top: "24%", right: "8%", size: 180, color: "rgba(173,214,255,0.35)", blur: 80, delay: "0.4s" },
  { id: "aura-southwest", top: "58%", left: "15%", size: 260, color: "rgba(255,204,238,0.35)", blur: 120, delay: "0.8s" },
  { id: "aura-southeast", bottom: "12%", right: "18%", size: 210, color: "rgba(188,255,235,0.32)", blur: 110, delay: "1.2s" },
  { id: "aura-center", bottom: "6%", left: "50%", size: 160, color: "rgba(255,250,227,0.3)", blur: 70, delay: "1.6s" },
];

export type CountdownSnapshot = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isPast: boolean;
};

const pad = (value: number) => value.toString().padStart(2, "0");

const computeSnapshot = (): CountdownSnapshot => {
  const diff = DROP_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      isPast: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    isPast: false,
  };
};

type DropCountdownExperienceProps = {
  variant?: "overlay" | "page";
  onCountdownEnd?: () => void;
  onSkip?: () => void;
};

export default function DropCountdownExperience({
  variant = "overlay",
  onCountdownEnd,
  onSkip,
}: DropCountdownExperienceProps) {
  const [snapshot, setSnapshot] = useState<CountdownSnapshot>(() => computeSnapshot());
  const dropLegend = DROP_LABEL.toUpperCase();
  const showOrbFollower = variant === "overlay";

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const next = computeSnapshot();
      setSnapshot(next);

      if (next.isPast) {
        window.clearInterval(intervalId);
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (snapshot.isPast) {
      onCountdownEnd?.();
    }
  }, [snapshot.isPast, onCountdownEnd]);

  const wrapperClass =
    variant === "overlay"
      ? "fixed inset-0 z-[80] bg-[#05020c]/95"
      : "relative min-h-screen bg-[#05020c]";

  const segments = useMemo(
    () => [
      { label: "Jours", value: snapshot.days },
      { label: "Heures", value: snapshot.hours },
      { label: "Minutes", value: snapshot.minutes },
      { label: "Secondes", value: snapshot.seconds },
    ],
    [snapshot.days, snapshot.hours, snapshot.minutes, snapshot.seconds],
  );

  return (
    <section
      data-drop-countdown={variant}
      className={`${wrapperClass} flex min-h-screen w-full items-center justify-center overflow-hidden text-white`}
      aria-live="polite"
    >
      {showOrbFollower && <OrbFollower wrapperClassName="pointer-events-none fixed inset-0 z-[90]" />}
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <video
            className="h-full w-full object-cover opacity-40"
            autoPlay
            loop
            muted
            playsInline
            poster="/video-poster.jpg"
          >
            <source src="/assets/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#05020c]/50 via-[#070015]/80 to-[#02010a]" />
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,183,244,0.22),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(93,146,255,0.2),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0218]/45 via-transparent to-[#120020]/85" />
          <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_75%)] opacity-20 mix-blend-screen" />
          {fairyLights.map((orb) => (
            <span
              key={orb.id}
              className="absolute rounded-full opacity-70 blur-3xl animate-[pulse_7s_ease-in-out_infinite]"
              style={{
                top: orb.top,
                left: orb.left,
                right: orb.right,
                bottom: orb.bottom,
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                background: orb.color,
                filter: `blur(${orb.blur}px)`,
                animationDelay: orb.delay,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex w-full max-w-5xl justify-center px-4 py-6 sm:px-10 sm:py-12">
        <div className="relative w-full overflow-hidden rounded-[44px] border border-white/20 bg-gradient-to-b from-[#0a011a]/70 via-[#12052b]/80 to-[#080014]/90 px-8 py-12 text-center shadow-[0_35px_120px_rgba(2,0,10,0.65)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-x-12 top-8 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-60" />
          <div className="pointer-events-none absolute inset-x-20 bottom-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-40" />
          <div className="pointer-events-none absolute -left-10 top-10 h-28 w-28 rounded-full bg-[#ffbdf4]/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-6 bottom-16 h-24 w-24 rounded-full bg-[#8dd8ff]/25 blur-3xl" />

          <div className="relative flex flex-col items-center justify-center gap-10 text-center">
            <p className="text-[0.65rem] uppercase tracking-[0.65em] text-white/70">Rituel du {dropLegend}</p>
            <div className="text-3xl font-light uppercase tracking-[0.4em] text-white drop-shadow-[0_8px_30px_rgba(191,128,255,0.45)] sm:text-4xl">
              Le voile se lèvera dans
            </div>
            <p className="max-w-3xl text-sm text-white/85 sm:text-base">
              Ce portail scelle la prochaine offrande Millie&rsquo;s Magic World. Lorsque le sablier s&rsquo;éteint,
              les astres laissent passer la collection. Respire, laisse les lucioles tournoyer et prépare ton invocation.
            </p>

            {snapshot.isPast ? (
              <div className="w-full rounded-[32px] border border-emerald-300/30 bg-emerald-900/30 p-8 text-center text-sm uppercase tracking-[0.45em] text-emerald-50 shadow-[0_20px_80px_rgba(9,190,104,0.2)] sm:text-base">
                Portail ouvert — la magie peut être explorée.
              </div>
            ) : (
              <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
                {segments.map((segment) => (
                  <div
                    key={segment.label}
                    className="relative overflow-hidden rounded-[28px] border border-white/25 bg-white/5 px-4 py-8 text-center shadow-[0_25px_60px_rgba(8,1,27,0.45)] backdrop-blur-xl"
                  >
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-70" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_70%)] opacity-90" />
                    </div>
                    <div className="relative z-10 text-4xl font-light tracking-[0.32em] text-white drop-shadow-[0_10px_35px_rgba(82,27,125,0.8)] sm:text-5xl">
                      {segment.value}
                    </div>
                    <div className="relative z-10 mt-3 text-[0.6rem] uppercase tracking-[0.55em] text-white/70">
                      {segment.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col items-center gap-4 text-[0.65rem] uppercase tracking-[0.5em] text-white/60 sm:flex-row">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-lime-200 drop-shadow-[0_0_15px_rgba(205,255,173,0.9)]" />
                Alignement astral validé
              </span>
              <span className="text-white/35">•</span>
              <span>Collection « Bloom Witchcraft »</span>
            </div>

            <div className="relative w-full overflow-hidden rounded-[32px] border border-white/15 bg-white/5 px-6 py-5 text-left text-[0.65rem] uppercase tracking-[0.4em] text-white/80">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 opacity-70" />
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <span>Chant astral en préparation</span>
                <span className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#F5B1FF] shadow-[0_0_12px_rgba(231,126,255,0.8)]" />
                  Orbes synchronisées
                </span>
              </div>
            </div>

            {onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="text-[0.6rem] uppercase tracking-[0.5em] text-white/40 underline-offset-4 transition hover:text-white/80 hover:underline"
              >
                Voir le site (démo)
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
