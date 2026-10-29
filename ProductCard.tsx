import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useStore();
  return (
    <div className="group flex flex-col">
      <Link to="/product/$slug" params={{ slug: p.slug }} className="relative block aspect-[4/5] overflow-hidden bg-muted">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.04]" />
        {p.bestseller && <span className="eyebrow absolute left-4 top-4 bg-background/80 px-2 py-1 backdrop-blur">Bestseller</span>}
      </Link>
      <div className="mt-5 flex flex-1 flex-col text-center">
        <p className="eyebrow">Step 0{p.step} · {p.category}</p>
        <Link to="/product/$slug" params={{ slug: p.slug }} className="mt-2 font-display text-2xl">{p.name}</Link>
        <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{p.short}</p>
        <p className="mt-3 text-sm tabular-nums">{p.size} · {formatPrice(p.price)}</p>
        <button
          onClick={() => add(p.slug)}
          className="mx-auto mt-5 w-full max-w-[16rem] border border-foreground py-3 text-[0.7rem] tracking-[0.2em] uppercase transition hover:bg-foreground hover:text-background"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
