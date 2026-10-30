import { Link } from "@tanstack/react-router";
import { X, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { formatPrice, FREE_SHIPPING } from "@/lib/products";

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, setQty, remove, clear } = useStore();
  const [done, setDone] = useState(false);
  if (!cartOpen) return null;
  const remaining = Math.max(0, FREE_SHIPPING - subtotal);

  return (
    <div className="fixed inset-0 z-50">
      <button aria-label="Close cart" className="absolute inset-0 bg-overlay" onClick={() => { setCartOpen(false); setDone(false); }} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-2xl animate-in slide-in-from-right duration-500">
        <div className="flex items-center justify-between border-b px-7 py-5">
          <h2 className="font-display text-2xl">Your cart</h2>
          <button aria-label="Close cart" onClick={() => { setCartOpen(false); setDone(false); }}>
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>

        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-10 text-center">
            <p className="eyebrow">Order received</p>
            <h3 className="font-display text-3xl">Thank you.</h3>
            <p className="text-sm text-muted-foreground">A confirmation will be sent to your inbox shortly. Your ritual is on its way.</p>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link to="/shop" onClick={() => setCartOpen(false)} className="border border-foreground px-8 py-3 text-xs tracking-[0.18em] uppercase transition hover:bg-foreground hover:text-background">
              Discover formulations
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b px-7 py-4 text-xs text-muted-foreground">
              {remaining > 0 ? `${formatPrice(remaining)} away from complimentary delivery` : "You qualify for complimentary delivery"}
              <div className="mt-2 h-px w-full bg-border">
                <div className="h-px bg-primary transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} />
              </div>
            </div>
            <ul className="flex-1 divide-y overflow-y-auto px-7">
              {lines.map((l) => (
                <li key={l.slug} className="flex gap-4 py-5">
                  <img src={l.product.image} alt={l.product.name} className="h-24 w-20 object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <span className="font-display text-lg leading-tight">{l.product.name}</span>
                      <span className="text-sm tabular-nums">{formatPrice(l.product.price * l.qty)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{l.product.size}</span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border">
                        <button aria-label="Decrease" className="p-2" onClick={() => setQty(l.slug, l.qty - 1)}><Minus className="h-3 w-3" /></button>
                        <span className="w-6 text-center text-sm tabular-nums">{l.qty}</span>
                        <button aria-label="Increase" className="p-2" onClick={() => setQty(l.slug, l.qty + 1)}><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => remove(l.slug)} className="link-underline text-xs text-muted-foreground">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t px-7 py-6">
              <div className="mb-5 flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <button
                onClick={() => { clear(); setDone(true); }}
                className="w-full bg-primary py-4 text-xs tracking-[0.2em] uppercase text-primary-foreground transition hover:opacity-90"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
