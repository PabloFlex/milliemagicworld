import ProductCards from "@/components/sections/ProductCards";

export default function ProductShowcaseSection() {
  return (
    <section className="bg-[#f6f4fb] py-20 text-[#1f1432] sm:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-6 text-left sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.45em] text-[#9a8dbb]">
              Sélection atelier
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#1b0f2a] sm:text-4xl">
              Un aperçu des pièces disponibles maintenant
            </h2>
            <p className="mt-4 text-base text-[#524061] sm:text-lg">
              Cartes synchronisées avec le CMS headless : visuels, focus matières et grilles
              de tailles se mettent à jour dès qu&rsquo;un drop change.
            </p>
          </div>
          <div className="text-sm text-[#6b5a7c]">
            <p className="uppercase tracking-[0.35em]">Disponibilité</p>
            <p className="mt-2 text-base font-semibold text-[#26143a]">
              Stocks mis à jour en continu depuis le studio
            </p>
          </div>
        </div>
        <ProductCards />
      </div>
    </section>
  );
}
