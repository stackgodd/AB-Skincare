import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { formatPrice, type Product } from "@/lib/products";

/** Aesop-style product tile: image on soft ground, label, wishlist heart, hover-reveal add to cart. */
export function ProductCard({ p }: { p: Product }) {
  const { add, wishlist, toggleWish } = useStore();
  const wished = wishlist.includes(p.slug);
  return (
    <div className="group relative flex flex-col">
      <div className="relative">
        <Link to="/product/$slug" params={{ slug: p.slug }} className="block aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.25,.1,.25,1)] group-hover:scale-[1.035]"
          />
        </Link>
        {p.label && <span className="absolute left-4 top-4 bg-background/85 px-2 py-1 text-[0.75rem] text-accent-warm">{p.label}</span>}
        <button
          aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
          aria-pressed={wished}
          onClick={() => {
            toggleWish(p.slug);
            toast(wished ? `${p.name} removed from your wishlist` : `${p.name} added to your wishlist`);
          }}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 transition-transform duration-500 hover:scale-110"
        >
          <Heart className={`h-4 w-4 transition-colors ${wished ? "fill-foreground" : ""}`} strokeWidth={1.25} />
        </button>
        <button
          onClick={() => add(p.slug)}
          className="absolute inset-x-4 bottom-4 translate-y-2 bg-primary py-3.5 text-[0.85rem] text-primary-foreground opacity-0 transition-all duration-700 ease-[cubic-bezier(.25,.1,.25,1)] group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 max-md:static max-md:mt-3 max-md:w-full max-md:translate-y-0 max-md:opacity-100"
        >
          Add to cart — {formatPrice(p.price)}
        </button>
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <Link to="/product/$slug" params={{ slug: p.slug }} className="text-[1.05rem] font-medium hover:opacity-70">
          {p.name}
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{p.short}</p>
        <p className="mt-3 text-sm tabular-nums text-muted-foreground">{p.size} · {formatPrice(p.price)}</p>
      </div>
    </div>
  );
}
