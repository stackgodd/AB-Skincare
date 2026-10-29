import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { products, formatPrice } from "@/lib/products";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [setSearchOpen]);
  if (!searchOpen) return null;
  const s = q.trim().toLowerCase();
  const results = s
    ? products.filter((p) => [p.name, p.category, ...p.ingredients].join(" ").toLowerCase().includes(s))
    : products.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background rise">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex justify-end">
          <button aria-label="Close search" onClick={() => setSearchOpen(false)}><X className="h-5 w-5" strokeWidth={1.25} /></button>
        </div>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search formulations, ingredients…"
          className="mt-10 w-full border-b bg-transparent pb-4 font-display text-4xl outline-none placeholder:text-muted-foreground md:text-6xl"
        />
        <p className="eyebrow mt-8">{s ? `${results.length} results` : "Suggested"}</p>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {results.map((p) => (
            <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} onClick={() => setSearchOpen(false)} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-3 font-display text-lg">{p.name}</p>
              <p className="text-xs text-muted-foreground">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
