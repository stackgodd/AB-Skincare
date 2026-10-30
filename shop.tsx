import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products, type Category } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Skin Care — All ab Skin" },
      { name: "description", content: "Shop all seven All ab Skin formulations: cleanse, tone, hydrate, treat, eye, repair, protect." },
      { property: "og:title", content: "Skin Care — All ab Skin" },
      { property: "og:description", content: "Shop all seven All ab Skin formulations." },
    ],
  }),
  component: Shop,
});

const cats: ("All" | Category)[] = ["All", "Cleanse", "Tone", "Hydrate", "Treat", "Eye", "Repair", "Protect"];
type Sort = "step" | "low" | "high";

function Shop() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [sort, setSort] = useState<Sort>("step");
  const list = products
    .filter((p) => cat === "All" || p.category === cat)
    .sort((a, b) => (sort === "step" ? a.step - b.step : sort === "low" ? a.price - b.price : b.price - a.price));

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
      <p className="eyebrow">Skin care</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">The complete ritual</h1>
      <p className="mt-4 max-w-lg text-muted-foreground">Seven formulations to be used in sequence, or individually as your skin requires.</p>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y py-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`text-sm transition ${cat === c ? "text-foreground underline underline-offset-8" : "text-muted-foreground hover:text-foreground"}`}>
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="bg-transparent text-foreground outline-none">
            <option value="step">Ritual order</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
    </div>
  );
}
