import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { getProduct, products, formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import marbleLight from "@/assets/mineral-light.jpg";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: "Not found — All ab Skin" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.name} — All ab Skin` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — All ab Skin` },
        { property: "og:description", content: p.description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="py-40 text-center">
      <h1 className="font-display text-4xl">Formulation not found</h1>
      <Link to="/shop" className="link-underline mt-6 inline-block text-sm">Back to skin care</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const { add } = useStore();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"ingredients" | "use" | "texture">("ingredients");
  const related = products.filter((x) => x.slug !== p.slug).slice(p.step % 4, (p.step % 4) + 3);

  return (
    <>
      <section className="grid md:grid-cols-2">
        <div className="marble flex items-center justify-center bg-secondary p-8 md:p-16" style={{ ["--marble-img" as string]: `url(${marbleLight})` }}>
          <img src={p.image} alt={p.name} className="aspect-[4/5] w-full max-w-lg object-cover shadow-2xl" />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 md:px-16 lg:px-24">
          <nav className="text-xs text-muted-foreground">
            <Link to="/shop" className="link-underline">Skin Care</Link> / {p.category}
          </nav>
          <p className="eyebrow mt-10">Step 0{p.step} · {p.category}</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">{p.name}</h1>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{p.description}</p>

          <div className="mt-10 flex gap-8 border-b text-sm">
            {(["ingredients", "use", "texture"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`-mb-px pb-3 capitalize ${tab === t ? "border-b border-foreground" : "text-muted-foreground"}`}>
                {t === "use" ? "How to use" : t}
              </button>
            ))}
          </div>
          <p className="mt-5 min-h-12 text-sm leading-relaxed">
            {tab === "ingredients" ? p.ingredients.join(" · ") : tab === "use" ? p.howTo : p.texture}
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center border">
              <button aria-label="Decrease quantity" className="p-4" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-3 w-3" /></button>
              <span className="w-6 text-center tabular-nums">{qty}</span>
              <button aria-label="Increase quantity" className="p-4" onClick={() => setQty(qty + 1)}><Plus className="h-3 w-3" /></button>
            </div>
            <button onClick={() => { add(p.slug, qty); setQty(1); }} className="flex-1 bg-primary py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition hover:opacity-90">
              Add to cart · {formatPrice(p.price * qty)}
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{p.size} · Vegan · Fragrance-free</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <p className="eyebrow">Complete the ritual</p>
        <h2 className="mt-3 font-display text-4xl">Pairs well with</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => <ProductCard key={r.slug} p={r} />)}
        </div>
      </section>
    </>
  );
}
