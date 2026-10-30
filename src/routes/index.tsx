import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { products, skinTypes, categoryInfo, getProduct, type Category } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { CursorRail } from "@/components/site/CursorRail";
import heroVideo from "@/assets/videos/hero-water.mp4.asset.json";
import heroImg from "@/assets/hero.jpg";
import cleanser from "@/assets/cleanser.jpg";
import serum from "@/assets/serum.jpg";
import cream from "@/assets/cream.jpg";
import toner from "@/assets/toner.jpg";
import eye from "@/assets/eye.jpg";
import spf from "@/assets/spf.jpg";
import marbleDark from "@/assets/mineral-dark.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skin Care — All ab Skin" },
      { name: "description", content: "Vegan, barrier-first, fragrance-free skin care. Seven considered formulations for luminous, resilient skin." },
      { property: "og:title", content: "Skin Care — All ab Skin" },
      { property: "og:description", content: "Vegan, barrier-first, fragrance-free skin care for luminous, resilient skin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Hero() {
  const vid = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };
  return (
    <section className="relative h-[78vh] min-h-[560px] overflow-hidden bg-stone">
      <img src={heroImg} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${ready ? "opacity-0" : "opacity-100"}`} />
      <video
        ref={vid}
        src={heroVideo.url}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-[cubic-bezier(.25,.1,.25,1)] ${ready ? "opacity-100" : "opacity-0"}`}
      />
      <div className="hero-scrim absolute inset-0" />
      <div className="on-media relative mx-auto flex h-full max-w-[1920px] items-center px-5 md:px-[4.5rem] lg:px-[19.5%]">
        <div className="max-w-md">
          <h1 className="text-[2.6rem] leading-tight md:text-5xl">Skin Care</h1>
          <p className="mt-6 leading-relaxed opacity-90">Skin is ever-changing—it responds to environment, lifestyle and diet.</p>
          <p className="mt-4 leading-relaxed opacity-90">Our seven formulations are designed with this in mind, catering to different preferences and needs to guide you towards optimal skin health.</p>
          <Link to="/shop" className="btn-light mt-10">
            Discover the range <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
          </Link>
        </div>
      </div>
      <button
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="on-media absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-current/50 opacity-80 transition-opacity hover:opacity-100 md:right-[4.5rem]"
      >
        {playing ? <Pause className="h-3.5 w-3.5" strokeWidth={1.5} /> : <Play className="h-3.5 w-3.5" strokeWidth={1.5} />}
      </button>
    </section>
  );
}

const catImages: Record<Category, string> = { Cleanse: cleanser, Tone: toner, Hydrate: heroImg, Treat: serum, Eye: eye, Repair: cream, Protect: spf };

function Categories() {
  return (
    <section className="reveal py-20">
      <CursorRail label="Skin care categories">
        {(Object.keys(categoryInfo) as Category[]).map((c) => (
          <Link key={c} to="/shop" search={{ cat: c }} className="group w-[44vw] shrink-0 sm:w-[28vw] lg:w-[14.5vw]">
            <div className="aspect-square overflow-hidden bg-muted">
              <img src={catImages[c]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.25,.1,.25,1)] group-hover:scale-105" />
            </div>
            <p className="mt-4 text-[0.95rem] font-medium">{categoryInfo[c]}</p>
          </Link>
        ))}
      </CursorRail>
    </section>
  );
}

function SixtyForty() {
  return (
    <section className="bg-panel text-panel-foreground">
      <div className="mx-auto grid max-w-[1920px] items-center md:grid-cols-[2fr_3fr]">
        <div className="reveal px-5 py-16 md:px-[4.5rem] lg:pl-[19.5vw] lg:pr-16">
          <p className="eyebrow">Pure clarity</p>
          <h2 className="mt-4 text-3xl leading-tight md:text-[2.4rem]">Deep cleansing, gently handled</h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
            Lumina Cleansing Gel is devised for city-dwellers facing congestion—lifting the day without disturbing the barrier beneath.
          </p>
          <Link to="/product/$slug" params={{ slug: "lumina-cleansing-gel" }} className="btn-ghost mt-10">
            Discover the cleanser <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
          </Link>
        </div>
        <div className="h-[60vh] overflow-hidden md:h-[80vh]">
          <img src={cleanser} alt="Lumina Cleansing Gel" loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function Performers() {
  const pair = [getProduct("dewpoint-toner-mist")!, getProduct("radiance-c-serum")!];
  return (
    <section className="mx-auto grid max-w-[1920px] gap-12 px-5 py-24 md:px-[4.5rem] lg:grid-cols-2 lg:pl-[16.5vw]">
      <div className="reveal">
        <div className="aspect-[4/5] overflow-hidden">
          <img src={serum} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <p className="eyebrow mt-6">Brilliant performers</p>
        <h2 className="mt-3 text-3xl leading-tight">Dewpoint to prepare. Radiance C to brighten.</h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          One is a balancing mist, the other a vitamin-rich serum. Together, they make for a most harmonious, efficacious pairing.
        </p>
      </div>
      <div className="reveal grid grid-cols-2 gap-6 self-start">
        {pair.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
    </section>
  );
}

function RecentRail() {
  return (
    <section className="reveal border-t py-24">
      <h2 className="px-5 text-3xl md:px-[4.5rem] lg:pl-[19.5vw]">Recent additions and revered formulations</h2>
      <p className="mt-3 px-5 text-sm text-muted-foreground md:px-[4.5rem] lg:pl-[19.5vw]">Move your cursor toward either edge to browse.</p>
      <div className="mt-12">
        <CursorRail label="Featured formulations">
          {products.map((p) => (
            <div key={p.slug} className="w-[72vw] shrink-0 sm:w-[40vw] lg:w-[22vw]">
              <ProductCard p={p} />
            </div>
          ))}
        </CursorRail>
      </div>
    </section>
  );
}

function SkinNeeds() {
  return (
    <section className="reveal mx-auto max-w-[1920px] px-5 py-24 md:px-[4.5rem] lg:px-[19.5vw]">
      <h2 className="text-3xl">Formulations to support skin’s needs</h2>
      <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skinTypes.map((s) => (
          <Link key={s.id} to="/shop" search={{ skin: s.id }} className="group border-t pt-5">
            <h3 className="flex items-center gap-2 text-lg font-medium">
              {s.label} <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.25} />
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FiftyFifty({ img, eyebrow, title, body, to, cta, reverse }: { img: string; eyebrow: string; title: string; body: string; to: "/skin-finder" | "/consultation"; cta: string; reverse?: boolean }) {
  return (
    <section className="bg-panel text-panel-foreground">
      <div className="mx-auto grid max-w-[1920px] items-center md:grid-cols-2">
        <div className={`h-[55vh] overflow-hidden md:h-[75vh] ${reverse ? "md:order-2" : ""}`}>
          <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="reveal px-5 py-16 md:px-[8vw]">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 text-3xl leading-tight md:text-[2.4rem]">{title}</h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{body}</p>
          <Link to={to} className="btn-solid mt-10">
            {cta} <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Reading() {
  const items = [
    { to: "/about" as const, img: marbleDark, eyebrow: "Philosophy", title: "Less, but better: the principles behind every formula" },
    { to: "/ritual" as const, img: cream, eyebrow: "Ritual", title: "Seven steps, each with a single purpose" },
    { to: "/skin-finder" as const, img: toner, eyebrow: "Guide", title: "How to read your skin in five questions" },
  ];
  return (
    <section className="reveal mx-auto max-w-[1920px] px-5 py-24 md:px-[4.5rem] lg:px-[19.5vw]">
      <h2 className="text-3xl">Recommended reading</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {items.map((r) => (
          <Link key={r.to} to={r.to} className="group">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={r.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
            </div>
            <p className="eyebrow mt-5">{r.eyebrow}</p>
            <h3 className="mt-2 text-lg font-medium leading-snug group-hover:opacity-70">{r.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <SixtyForty />
      <Performers />
      <RecentRail />
      <SkinNeeds />
      <FiftyFifty
        img={eye}
        eyebrow="Find an ideal regimen"
        title="Understanding your skin"
        body="By identifying the characteristics of your skin, we can recommend the formulations best suited to you."
        to="/skin-finder"
        cta="Begin the process"
      />
      <FiftyFifty
        img={spf}
        eyebrow="Live assistance"
        title="Personalised skin care consultations"
        body="Our consultants can help you select formulations that suit your skin type, environment and textural preferences—be it to establish a regimen or refine an existing one."
        to="/consultation"
        cta="Speak to a consultant"
        reverse
      />
      <Reading />
    </>
  );
}
