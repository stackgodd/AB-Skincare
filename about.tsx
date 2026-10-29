import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import marbleDark from "@/assets/mineral-dark.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Philosophy — All ab Skin" },
      { name: "description", content: "Less, but better. The principles behind every All ab Skin formulation." },
      { property: "og:title", content: "Philosophy — All ab Skin" },
      { property: "og:description", content: "Less, but better. The principles behind every formulation." },
    ],
  }),
  component: About,
});

const tenets = [
  ["Barrier-first", "Every formula is assessed by one question: does it leave the skin barrier stronger than it found it?"],
  ["Few, proven actives", "We use a small number of well-studied ingredients at meaningful concentrations — nothing decorative."],
  ["Without fragrance", "No synthetic or essential-oil fragrance. The scent of each formula is simply the scent of its ingredients."],
  ["Vegan, always", "No animal-derived ingredients and no animal testing, at any stage of development."],
];

function About() {
  return (
    <>
      <section className="relative h-[70vh] overflow-hidden">
        <img src={hero} alt="" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-overlay" />
        <div className="relative mx-auto flex h-full max-w-[1440px] items-end px-5 pb-16 md:px-10">
          <h1 className="rise max-w-2xl font-display text-6xl leading-none text-primary-foreground md:text-8xl dark:text-foreground">Less, but better.</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1200px] gap-16 px-5 py-24 md:grid-cols-2 md:px-10">
        {tenets.map(([t, d], i) => (
          <div key={t} className="border-t pt-6">
            <span className="text-xs tabular-nums text-muted-foreground">0{i + 1}</span>
            <h2 className="mt-3 font-display text-3xl">{t}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section className="marble bg-stone py-24 text-center text-stone-foreground" style={{ ["--marble-img" as string]: `url(${marbleDark})` }}>
        <h2 className="font-display text-4xl md:text-5xl">Begin with three.</h2>
        <Link to="/shop" className="mt-8 inline-block border border-current px-10 py-4 text-[0.7rem] tracking-[0.2em] uppercase">Explore skin care</Link>
      </section>
    </>
  );
}
