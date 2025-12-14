"use client";

import Image from "next/image";

const originParagraphs = [
  "Heyoo, bienvenue chez Millie's Fantastic World. Je suis Millie, 22 ans, passionnée d'art alternatif et créatrice de mode autodidacte.",
  "Enfant, je dessinais déjà des silhouettes flamboyantes; aujourd'hui je leur donne vie dans mon atelier, un laboratoire onirique aux mille couleurs.",
  "MFW est une maison engagée : Androgyne, Inclusive et Mystique. La mode est pour nous un moyen d'expression intime ; chacun doit pouvoir se sentir bien dans ses tenues, sans crainte du jugement, peu importe son style.",
  "Contre la fast-fashion, nous créons localement, en séries limitées, avec des matières choisies avec soin pour respecter la planète autant que votre singularité.",
];

const stats = [
  { label: "Classe", value: "Créatrice mystique" },
  { label: "Affinité", value: "Androgyne / Inclusive / Mystique" },
  { label: "Compétence", value: "Looks uniques & éthiques" },
  { label: "Origine", value: "Atelier secret, France" },
];

const auraParticles = [
  { top: "8%", left: "12%", size: 160, color: "#f5dcff" },
  { top: "30%", right: "10%", size: 120, color: "#d9f7ff" },
  { bottom: "20%", left: "5%", size: 140, color: "#ffe4f5" },
  { bottom: "8%", right: "15%", size: 180, color: "#e2fff8" },
  { top: "50%", left: "40%", size: 90, color: "#f2d7ff" },
];

export default function OriginsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#fbf4ff] via-[#f3f9ff] to-[#fff7f0] py-20 text-[#1f1428] sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.85),transparent_55%),radial-gradient(circle_at_60%_-5%,rgba(199,221,255,0.4),transparent_50%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="relative overflow-hidden rounded-[56px] border border-[#f0e7ff] bg-white/90 p-10 shadow-[0_45px_150px_rgba(31,7,50,0.1)] backdrop-blur">
          <div className="pointer-events-none absolute inset-0">
            {auraParticles.map((particle, index) => (
              <span
                key={`particle-${index}`}
                style={{
                  top: particle.top,
                  bottom: particle.bottom,
                  left: particle.left,
                  right: particle.right,
                  width: particle.size,
                  height: particle.size,
                  background: `radial-gradient(circle, ${particle.color}, transparent 65%)`,
                  animationDelay: `${index * 0.4}s`,
                }}
                className="absolute rounded-full opacity-70 blur-3xl animate-pulse"
              />
            ))}
          </div>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative">
              <div className="relative h-[420px] overflow-hidden rounded-[48px] border border-[#f0e4ff] bg-white/80 p-6 shadow-[0_35px_100px_rgba(23,6,38,0.15)]">
                <Image
                  src="/assets/images/millie.png"
                  alt="Silhouette de Millie"
                  width={640}
                  height={1024}
                  className="h-full w-full object-contain"
                  priority={false}
                />
                <div className="absolute left-6 top-6">
                  <span className="rounded-full bg-[#f8e8ff] px-3 py-1 text-xs uppercase tracking-[0.4em] text-[#b05edc]">
                    RPG
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 text-right">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#84dbe4]">
                    Niveau 22
                  </p>
                  <p className="text-sm font-semibold text-[#2a1238]">Classe : Muse</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 rounded-[32px] border border-[#efe3ff] bg-white/80 px-6 py-5 shadow-[0_20px_60px_rgba(26,5,42,0.15)]">
                <p className="text-sm uppercase tracking-[0.35em] text-[#9d7ed0]">
                  Profil
                </p>
                <div className="grid gap-3 text-sm text-[#3b224b] sm:grid-cols-2">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[22px] border border-[#f1e5ff] bg-[#faf8ff] px-4 py-3"
                    >
                      <p className="text-[11px] uppercase tracking-[0.35em] text-[#a28bc3]">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-base text-[#1f132b]">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-[36px] border border-[#efe3ff] bg-[#fbf8ff] px-8 py-6 text-left shadow-[0_25px_80px_rgba(25,5,41,0.12)]">
                {originParagraphs.slice(0, 2).map((paragraph) => (
                  <p key={paragraph} className="mb-5 font-serif text-lg leading-relaxed text-[#2b1336]">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="rounded-[36px] border border-[#e8f3ff] bg-[#f7fbff] px-8 py-6 text-left shadow-[0_25px_80px_rgba(25,5,41,0.12)]">
                {originParagraphs.slice(2).map((paragraph) => (
                  <p key={paragraph} className="mb-5 font-serif text-lg leading-relaxed text-[#1e223a] last:mb-0">
                    {paragraph}
                  </p>
                ))}
                <div className="mt-6 rounded-[28px] border border-dashed border-[#dbe9ff] bg-white/70 px-6 py-4 text-sm uppercase tracking-[0.35em] text-[#8ec9d0]">
                  Quête active : révéler un style unique et responsable.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
