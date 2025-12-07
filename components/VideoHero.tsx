export default function VideoHero() {
  return (
    <section className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/video-poster.jpg"
      >
        <source src="/assets/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#040109]/90 via-[#2c0d49]/85 to-[#110417]/30" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-32 sm:px-10 lg:px-12">
        <p className="text-xs uppercase tracking-[0.7em] text-white/75">
          Millie&rsquo;s Magic World
        </p>
        <h1 className="hero-title hero-title-glow text-4xl font-light leading-snug text-white drop-shadow-[0_8px_20px_rgba(5,0,10,0.7)] sm:text-5xl lg:text-6xl">
          « LA MODE N&rsquo;A PAS DE GENRE. JUSTE DU CARACTÈRE »
        </h1>
        <p className="max-w-2xl text-base text-white/85 sm:text-lg">
          Dans cette forêt d&rsquo;aurores, Millie brode des silhouettes libres où se mêlent soies iridescentes
          et armures street. Suis l&rsquo;orbe, respire, et compose ton sortilège vestimentaire.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-xs uppercase">
          <button className="rounded-full bg-white/90 px-6 py-3 tracking-[0.3em] text-[#2c1535]">
            Découvrir
          </button>
          <button className="rounded-full border border-white/70 px-6 py-3 tracking-[0.3em] text-white">
            Looks
          </button>
        </div>
      </div>
    </section>
  );
}
