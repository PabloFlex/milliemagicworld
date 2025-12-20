import {
  featuredProducts,
  type FeaturedProduct,
} from "@/content/products";

function ProductCard({
  title,
  category,
  description,
  price,
  shipping,
  badge,
  highlights,
  aura,
}: FeaturedProduct) {
  const gradientStops = aura.via
    ? `${aura.from}, ${aura.via}, ${aura.to}`
    : `${aura.from}, ${aura.to}`;

  return (
    <article className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-[32px] border border-white/15 bg-white/5 p-5 text-white shadow-[0_25px_90px_rgba(1,0,10,0.45)] transition duration-300 hover:-translate-y-1.5">
      <div
        className="pointer-events-none absolute inset-0 opacity-60 blur-2xl transition duration-500 group-hover:opacity-90"
        style={{
          background: `linear-gradient(135deg, ${gradientStops})`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/45 via-black/30 to-black/10" />
      <div className="relative z-10 flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.4em] text-white/75">
          <span>{category}</span>
          {badge ? (
            <span className="rounded-full bg-white/15 px-3 py-1 tracking-[0.3em] text-[10px] text-white">
              {badge}
            </span>
          ) : null}
        </div>
        <div>
          <h3 className="text-2xl font-light leading-tight text-white drop-shadow-md">
            {title}
          </h3>
          <p className="mt-2 text-sm text-white/80">{description}</p>
        </div>
        <ul className="grid gap-2 text-xs text-white/85">
          {highlights.map((highlight) => (
            <li
              key={`${title}-${highlight}`}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              <span className="uppercase tracking-[0.3em]">{highlight}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              Tribute
            </p>
            <p className="text-2xl font-semibold text-white drop-shadow-sm">
              {price}
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">
            {shipping}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ProductCards() {
  return (
    <div className="grid w-full gap-4 text-white sm:grid-cols-2 lg:grid-cols-3">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
