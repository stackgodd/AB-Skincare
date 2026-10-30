import { createFileRoute, Link } from "@tanstack/react-router";
import { products, formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/ritual")({
  head: () => ({
    meta: [
      { title: "The Ritual — All ab Skin" },
      { name: "description", content: "The seven-step All ab Skin ritual, from cleanse to protect, morning and evening." },
      { property: "og:title", content: "The Ritual — All ab Skin" },
      { property: "og:description", content: "The seven-step ritual, from cleanse to protect." },
    ],
  }),
  component: Ritual,
});

function Ritual() {
  const { add } = useStore();
  const total = products.reduce((a, p) => a + p.price, 0);
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-10">
      <p className="eyebrow">The ritual</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight md:text-7xl">Seven steps, each with a single purpose.</h1>
      <ol className="mt-20 divide-y border-y">
        {products.map((p) => (
          <li key={p.slug} className="grid items-center gap-6 py-8 md:grid-cols-12">
            <span className="font-display text-5xl text-primary md:col-span-1">0{p.step}</span>
            <img src={p.image} alt={p.name} className="h-28 w-24 object-cover md:col-span-2" />
            <div className="md:col-span-6">
              <p className="eyebrow">{p.category}</p>
              <Link to="/product/$slug" params={{ slug: p.slug }} className="mt-1 block font-display text-3xl">{p.name}</Link>
              <p className="mt-2 text-sm text-muted-foreground">{p.howTo}</p>
            </div>
            <div className="flex items-center gap-6 md:col-span-3 md:justify-end">
              <span className="text-sm tabular-nums">{formatPrice(p.price)}</span>
              <button onClick={() => add(p.slug)} className="link-underline text-[0.7rem] tracking-[0.2em] uppercase">Add</button>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground">The complete ritual · {formatPrice(total)}</p>
        <button onClick={() => products.forEach((p) => add(p.slug))} className="bg-primary px-10 py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition hover:opacity-90">
          Add all seven to cart
        </button>
      </div>
    </div>
  );
}
