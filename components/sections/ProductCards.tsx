import Image from "next/image";

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
  sizes,
  preview,
  aura,
}: FeaturedProduct) {
  const gradientStops = aura.via
    ? `${aura.from}, ${aura.via}, ${aura.to}`
    : `${aura.from}, ${aura.to}`;

  return (
    <article className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.03] p-6 text-white shadow-[0_35px_90px_rgba(1,0,18,0.6)] transition duration-300 hover:-translate-y-1.5">
      <div
        className="pointer-events-none absolute inset-0 opacity-60 blur-3xl transition duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(150deg, ${gradientStops})`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/10" />
      <div className="relative z-10 flex flex-1 flex-col gap-6">
        <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.4em] text-white/80">
          <span>{category}</span>
          {badge ? (
            <span className="rounded-full border border-white/30 px-3 py-1 text-[10px]">
              {badge}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <h3 className="text-2xl font-light leading-tight text-white drop-shadow-md">
                {title}
              </h3>
              <p className="mt-2 text-sm text-white/85">{description}</p>
            </div>
            <ul className="grid gap-2 text-[11px] uppercase tracking-[0.35em] text-white/85">
              {highlights.map((highlight) => (
                <li
                  key={`${title}-${highlight}`}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-[11px] uppercase tracking-[0.45em] text-white/65">
                Tailles
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {sizes.map((size) => (
                  <span
                    key={`${title}-${size}`}
                    className="rounded-full border border-white/20 px-3 py-1 tracking-[0.35em] text-white/90"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="relative flex flex-1 items-center justify-center">
            <div
              className="absolute inset-0 m-6 rounded-[32px] opacity-80 blur-3xl"
              style={{ backgroundColor: preview.glow }}
            />
            <div className="relative h-64 w-full max-w-[260px] overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-[0_30px_80px_rgba(9,0,25,0.5)]">
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 260px"
                className="object-contain"
                priority={false}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs uppercase tracking-[0.4em] text-white/70">
          <div>
            <p>Tribute</p>
            <p className="text-2xl font-semibold tracking-normal text-white">{price}</p>
          </div>
          <p>{shipping}</p>
        </div>
      </div>
    </article>
  );
}

export default function ProductCards() {
  return (
    <div className="grid w-full gap-6 text-white md:grid-cols-2 xl:grid-cols-3">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
