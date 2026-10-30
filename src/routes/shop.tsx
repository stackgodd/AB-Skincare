import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { products, skinTypes, categoryInfo, type Category, type SkinType } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

const cats = Object.keys(categoryInfo) as Category[];
type Sort = "step" | "low" | "high";

type Search = { cat?: Category | undefined; skin?: SkinType | undefined; sort?: Sort | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: cats.includes(s["cat"] as Category) ? (s["cat"] as Category) : undefined,
    skin: skinTypes.some((t) => t.id === s["skin"]) ? (s["skin"] as SkinType) : undefined,
    sort: s["sort"] === "low" || s["sort"] === "high" ? s["sort"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Skin Care — All ab Skin" },
      { name: "description", content: "Shop all seven All ab Skin formulations by step or skin type." },
      { property: "og:title", content: "All Skin Care — All ab Skin" },
      { property: "og:description", content: "Shop all seven All ab Skin formulations by step or skin type." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { cat, skin, sort = "step" } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const list = products
    .filter((p) => (!cat || p.category === cat) && (!skin || p.skin.includes(skin)))
    .sort((a, b) => (sort === "step" ? a.step - b.step : sort === "low" ? a.price - b.price : b.price - a.price));
  const title = cat ? categoryInfo[cat] : skin ? skinTypes.find((t) => t.id === skin)!.label : "All Skin Care";

  const chip = (active: boolean) =>
    `whitespace-nowrap border px-4 py-2 text-[0.85rem] transition-colors duration-500 ${active ? "border-foreground bg-foreground text-background" : "hover:border-foreground"}`;

  return (
    <div className="mx-auto max-w-[1920px] px-5 py-16 md:px-[4.5rem]">
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/shop" className="hover:text-foreground">Skin Care</Link>
      </nav>
      <h1 className="mt-6 text-4xl md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-lg text-muted-foreground">Seven formulations to be used in sequence, or individually as your skin requires.</p>

      <div className="mt-12 space-y-4 border-y py-6">
        <div className="flex flex-wrap gap-2">
          <Link to="/shop" search={{ skin, sort: sort === "step" ? undefined : sort }} className={chip(!cat)}>All</Link>
          {cats.map((c) => (
            <Link key={c} to="/shop" search={{ cat: c, skin, sort: sort === "step" ? undefined : sort }} className={chip(cat === c)}>{categoryInfo[c]}</Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-3 text-sm text-muted-foreground">
            Skin type
            <select
              value={skin ?? ""}
              onChange={(e) => navigate({ search: (s) => ({ ...s, skin: (e.target.value || undefined) as SkinType | undefined }) })}
              className="border-b bg-transparent py-1 text-foreground outline-none"
            >
              <option value="">All types</option>
              {skinTypes.map((t) => <option key={t.id} value={t.id}>{t.label.replace("For ", "")}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-3 text-sm text-muted-foreground">
            Sort by
            <select
              value={sort}
              onChange={(e) => navigate({ search: (s) => ({ ...s, sort: e.target.value === "step" ? undefined : (e.target.value as Sort) }) })}
              className="border-b bg-transparent py-1 text-foreground outline-none"
            >
              <option value="step">Ritual order</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">{list.length} {list.length === 1 ? "product" : "products"}</p>

      {list.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-muted-foreground">No formulations match these filters.</p>
          <Link to="/shop" className="btn-ghost mt-8">Clear filters</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => <div key={p.slug} className="reveal"><ProductCard p={p} /></div>)}
        </div>
      )}
    </div>
  );
}
