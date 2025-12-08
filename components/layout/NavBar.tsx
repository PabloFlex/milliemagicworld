import Image from "next/image";
import { navigationSections, type NavSection } from "@/content/navigation";

function LogoMark() {
  return (
    <Image
      src="/assets/images/logo-tiny.png"
      alt="Millie's Magic World logo"
      width={60}
      height={60}
      className="h-10 w-10 rounded-full border border-white/30 bg-white/90 object-cover drop-shadow-[0_6px_18px_rgba(29,7,39,0.45)]"
      priority
    />
  );
}

function NavSection({ title, items }: NavSection) {
  return (
    <div className="group relative text-xs font-semibold uppercase tracking-[0.35em] text-white">
      <button
        type="button"
        className="rounded-full px-3 py-2 text-white transition hover:bg-white/10"
      >
        {title}
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-30 mt-3 w-44 -translate-x-1/2 rounded-2xl border border-white/40 bg-white/90 p-4 text-left text-[#2c1535] opacity-0 shadow-lg transition duration-200 group-hover:pointer-events-auto group-hover:-translate-y-1 group-hover:opacity-100">
        <ul className="space-y-2 text-[0.7rem] tracking-[0.2em] text-[#3c234a]">
          {items.map((item) => (
            <li key={item}>
              <button
                type="button"
                className="w-full text-left uppercase transition hover:text-[#7a60c9]"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function NavBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/15 bg-gradient-to-b from-black/60 via-black/20 to-transparent px-6 py-4 text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 text-[0.7rem] uppercase tracking-[0.35em] text-white/80 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <LogoMark />
          <nav className="flex flex-wrap items-center gap-5 text-white/90 lg:hidden">
            {navigationSections.map((section) => (
              <NavSection key={section.title} {...section} />
            ))}
          </nav>
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              className="rounded-full border border-white/40 px-3 py-2 transition hover:border-white hover:bg-white/10"
              aria-label="Compte client"
            >
              <span className="text-base">👤</span>
            </button>
            <button
              type="button"
              className="rounded-full border border-white/40 px-3 py-2 transition hover:border-white hover:bg-white/10"
              aria-label="Panier"
            >
              <span className="text-base">🛒</span>
            </button>
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-between gap-6 lg:flex">
          <nav className="flex flex-wrap items-center gap-5 text-white/90">
            {navigationSections.map((section) => (
              <NavSection key={section.title} {...section} />
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-white/40 px-3 py-2 transition hover:border-white hover:bg-white/10"
              aria-label="Compte client"
            >
              <span className="text-base">👤</span>
            </button>
            <button
              type="button"
              className="rounded-full border border-white/40 px-3 py-2 transition hover:border-white hover:bg-white/10"
              aria-label="Panier"
            >
              <span className="text-base">🛒</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
