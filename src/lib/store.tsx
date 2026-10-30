import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

type Line = { slug: string; qty: number };
type Ctx = {
  lines: (Line & { product: Product })[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  theme: "light" | "dark";
  wishlist: string[];
  toggleWish: (slug: string) => void;
  toggleTheme: () => void;
};

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    try {
      setRaw(JSON.parse(localStorage.getItem("allab-cart") || "[]"));
    } catch {}
    try { setWishlist(JSON.parse(localStorage.getItem("allab-wish") || "[]")); } catch {}
    const t = localStorage.getItem("allab-theme");
    if (t === "dark" || t === "light") setTheme(t);
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem("allab-cart", JSON.stringify(raw));
  }, [raw, loaded]);
  useEffect(() => {
    if (loaded) localStorage.setItem("allab-wish", JSON.stringify(wishlist));
  }, [wishlist, loaded]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (loaded) localStorage.setItem("allab-theme", theme);
  }, [theme, loaded]);

  const lines = raw
    .map((l) => ({ ...l, product: getProduct(l.slug)! }))
    .filter((l) => l.product);
  const value: Ctx = {
    lines,
    count: lines.reduce((a, l) => a + l.qty, 0),
    subtotal: lines.reduce((a, l) => a + l.qty * l.product.price, 0),
    add: (slug, qty = 1) => {
      setRaw((r) => {
        const ex = r.find((l) => l.slug === slug);
        return ex ? r.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l)) : [...r, { slug, qty }];
      });
      setCartOpen(true);
    },
    setQty: (slug, qty) =>
      setRaw((r) => (qty <= 0 ? r.filter((l) => l.slug !== slug) : r.map((l) => (l.slug === slug ? { ...l, qty } : l)))),
    remove: (slug) => setRaw((r) => r.filter((l) => l.slug !== slug)),
    clear: () => setRaw([]),
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    wishlist,
    toggleWish: (slug) => setWishlist((w) => (w.includes(slug) ? w.filter((x) => x !== slug) : [...w, slug])),
    theme,
    toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
