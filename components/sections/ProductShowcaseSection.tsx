import ProductCards from "@/components/sections/ProductCards";

const floatingOrbs = [
  { size: 220, top: "14%", left: "8%", color: "rgba(161, 119, 255, 0.35)" },
  { size: 160, top: "60%", left: "15%", color: "rgba(111, 216, 222, 0.25)" },
  { size: 190, top: "32%", right: "12%", color: "rgba(255, 166, 213, 0.3)" },
  { size: 140, bottom: "12%", right: "22%", color: "rgba(252, 255, 198, 0.3)" },
];

export default function ProductShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-[#040006] py-20 text-white sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(151,119,255,0.18),transparent_55%),radial-gradient(circle_at_bottom,_rgba(65,152,183,0.22),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0">
        {floatingOrbs.map((orb) => (
          <span
            key={`${orb.top ?? orb.bottom}-${orb.left ?? orb.right}-${orb.size}`}
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              bottom: orb.bottom,
              left: orb.left,
              right: orb.right,
              backgroundColor: orb.color,
            }}
            className="absolute rounded-full blur-[110px]"
          />
        ))}
      </div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.55em] text-white/70">
            Drop en clair
          </p>
          <h2 className="mt-4 text-3xl font-light leading-tight text-white sm:text-4xl">
            Les artefacts portables prêts à invoquer
          </h2>
          <p className="mt-4 text-base text-white/75 sm:text-lg">
            Chaque carte est reliée au headless CMS : prix, tailles et prévisualisation se
            mettent à jour dès que Millie craft une nouvelle pièce.
          </p>
        </div>
        <ProductCards />
      </div>
    </section>
  );
}
