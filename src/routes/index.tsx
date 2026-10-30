import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products, formatPrice } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import heroImg from "@/assets/hero.jpg";
import serum from "@/assets/serum.jpg";
import cream from "@/assets/cream.jpg";
import cleanser from "@/assets/cleanser.jpg";
import marbleLight from "@/assets/mineral-light.jpg";
import marbleDark from "@/assets/mineral-dark.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "All ab Skin — Seven formulations, one ritual" },
      { name: "description", content: "Vegan, barrier-first, fragrance-free skin care. Seven considered formulations for luminous, resilient skin." },
      { property: "og:title", content: "All ab Skin — Seven formulations, one ritual" },
      { property: "og:description", content: "Vegan, barrier-first, fragrance-free skin care for luminous, resilient skin." },
    ],
  }),
  component: Home,
});

const slides = [
  { img: heroImg, eyebrow: "The seven-step ritual", title: "Skin that breathes light.", body: "Seven precise formulations, layered with intention and quietly powerful.", cta: { to: "/shop", label: "Discover the range" } },
  { img: serum, eyebrow: "Step 04 · Treat", title: "Radiance, distilled.", body: "Vitamin C and peptides for an even, visibly rested complexion.", cta: { to: "/product/$slug", slug: "radiance-c-serum", label: "Discover Radiance C" } },
  { img: cream, eyebrow: "Step 06 · Repair", title: "The quiet work of night.", body: "A breathable ceramide cream that supports recovery while you sleep.", cta: { to: "/product/$slug", slug: "nocturne-barrier-cream", label: "Discover Nocturne" } },
] as const;

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), 6500);
    return () => clearTimeout(t);
  }, [i, paused]);
  const s = slides[i] ?? slides[0];

  return (
    <section className="relative grid min-h-[86vh] md:grid-cols-2" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="marble order-2 flex flex-col justify-center bg-secondary px-6 py-16 md:order-1 md:px-16 lg:px-24" style={{ ["--marble-img" as string]: `url(${marbleLight})` }}>
        <div key={i} className="rise max-w-lg">
          <p className="eyebrow">{s.eyebrow}</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] md:text-7xl">{s.title}</h1>
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-muted-foreground">{s.body}</p>
          {"slug" in s.cta ? (
            <Link to="/product/$slug" params={{ slug: s.cta.slug }} className="mt-10 inline-flex items-center gap-3 bg-primary px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition hover:gap-5">
              {s.cta.label} <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
            </Link>
          ) : (
            <Link to="/shop" className="mt-10 inline-flex items-center gap-3 bg-primary px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition hover:gap-5">
              {s.cta.label} <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
            </Link>
          )}
        </div>
        <div className="mt-16 flex items-center gap-6">
          <span className="text-xs tabular-nums text-muted-foreground">0{i + 1} / 0{slides.length}</span>
          <div className="flex gap-2">
            {slides.map((_, n) => (
              <button key={n} aria-label={`Slide ${n + 1}`} onClick={() => setI(n)} className="relative h-px w-10 bg-border">
                {n === i && <span key={`${i}-${paused}`} className="absolute inset-y-0 left-0 bg-foreground" style={{ width: "100%", animation: paused ? undefined : "progress 6.5s linear" }} />}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-3">
            <button aria-label="Previous slide" onClick={() => setI((i - 1 + slides.length) % slides.length)}><ArrowLeft className="h-4 w-4" strokeWidth={1.25} /></button>
            <button aria-label="Next slide" onClick={() => setI((i + 1) % slides.length)}><ArrowRight className="h-4 w-4" strokeWidth={1.25} /></button>
          </div>
        </div>
      </div>
      <div className="relative order-1 h-[55vh] overflow-hidden md:order-2 md:h-auto">
        <img key={i} src={s.img} alt="" className="kenburns absolute inset-0 h-full w-full object-cover" />
      </div>
      <style>{`@keyframes progress{from{width:0}to{width:100%}}`}</style>
    </section>
  );
}

function Rail() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section className="py-24">
      <div className="mx-auto flex max-w-[1440px] items-end justify-between px-5 md:px-10">
        <div>
          <p className="eyebrow">The range</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Seven formulations, in order.</h2>
        </div>
        <div className="hidden gap-3 md:flex">
          <button aria-label="Scroll left" onClick={() => scroll(-1)} className="border p-3 transition hover:bg-foreground hover:text-background"><ArrowLeft className="h-4 w-4" strokeWidth={1.25} /></button>
          <button aria-label="Scroll right" onClick={() => scroll(1)} className="border p-3 transition hover:bg-foreground hover:text-background"><ArrowRight className="h-4 w-4" strokeWidth={1.25} /></button>
        </div>
      </div>
      <div ref={ref} className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:px-10 [scrollbar-width:none]">
        {products.map((p) => (
          <div key={p.slug} className="w-[78vw] shrink-0 snap-start sm:w-[42vw] lg:w-[23vw]">
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Editorial() {
  return (
    <section className="marble bg-stone text-stone-foreground" style={{ ["--marble-img" as string]: `url(${marbleDark})` }}>
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <img src={cleanser} alt="Lumina Cleansing Gel on stone" className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow !text-current opacity-60">Our philosophy</p>
          <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">Less, but better.</h2>
          <p className="mt-6 max-w-md leading-relaxed opacity-75">
            Every formula is built around a small number of proven actives. Nothing decorative, nothing that does not earn its place on your skin.
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-current/20 pt-8">
            {[["07", "considered formulas"], ["00", "synthetic fragrances"], ["100%", "vegan & cruelty-free"], ["03", "core daily steps"]].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-4xl">{n}</dt>
                <dd className="mt-1 text-xs tracking-wide opacity-60">{l}</dd>
              </div>
            ))}
          </dl>
          <Link to="/about" className="link-underline mt-10 inline-block text-[0.7rem] tracking-[0.2em] uppercase">Read our philosophy</Link>
        </div>
      </div>
    </section>
  );
}

function Feature() {
  const p = products.find((x) => x.slug === "aqua-veil-essence")!;
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-2 md:px-10">
      <div className="flex flex-col justify-center md:pr-16">
        <p className="eyebrow">In focus</p>
        <h2 className="mt-4 font-display text-5xl">{p.name}</h2>
        <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>
        <p className="mt-6 text-sm">{p.ingredients.join(" · ")}</p>
        <div className="mt-10 flex items-center gap-8">
          <Link to="/product/$slug" params={{ slug: p.slug }} className="border border-foreground px-8 py-4 text-[0.7rem] tracking-[0.2em] uppercase transition hover:bg-foreground hover:text-background">
            Discover · {formatPrice(p.price)}
          </Link>
        </div>
      </div>
      <div className="aspect-square overflow-hidden">
        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
      </div>
    </section>
  );
}

function ConsultCta() {
  return (
    <section className="marble bg-secondary" style={{ ["--marble-img" as string]: `url(${marbleLight})` }}>
      <div className="mx-auto max-w-3xl px-5 py-28 text-center">
        <p className="eyebrow">Personal consultation</p>
        <h2 className="mt-4 font-display text-5xl md:text-6xl">Find your ritual.</h2>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">A twenty-minute conversation with a skin specialist, and the formulations that genuinely fit.</p>
        <Link to="/consultation" className="mt-10 inline-block bg-primary px-10 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition hover:opacity-90">
          Request a session
        </Link>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Rail />
      <Editorial />
      <Feature />
      <ConsultCta />
    </>
  );
}
