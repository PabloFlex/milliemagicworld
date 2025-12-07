const collections = [
  {
    title: "Accessoires",
    description: "Hair, bag et guêtres pour booster chaque look.",
  },
  {
    title: "Haut",
    description: "Tops fluides et tee-shirts graphiques.",
  },
  {
    title: "Bas",
    description: "Pants, jeans et skirts pour jouer les volumes.",
  },
  {
    title: "Streetwear",
    description: "Vestes et sweats à mixer non-stop.",
  },
];

function HighlightCard({ title, description }: (typeof collections)[number]) {
  return (
    <article className="flex flex-1 flex-col gap-3 rounded-3xl border border-[#e0d0f5] bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <p className="text-xs uppercase tracking-[0.4em] text-[#8c65c7]">{title}</p>
      <p className="text-base text-[#2c1535]">{description}</p>
      <button
        type="button"
        className="mt-auto text-xs uppercase tracking-[0.35em] text-[#36b0c2]"
      >
        Voir +
      </button>
    </article>
  );
}

export default function CollectionHighlights() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-8 lg:flex-row">
        {collections.map((collection) => (
          <HighlightCard key={collection.title} {...collection} />
        ))}
      </div>
    </section>
  );
}
