import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [agree, setAgree] = useState(false);
  return sent ? (
    <p className="text-sm">Thank you — your 10% welcome code is on its way to {email}.</p>
  ) : (
    <form onSubmit={(e) => { e.preventDefault(); if (/\S+@\S+\.\S+/.test(email) && agree) setSent(true); }}>
      <div className="flex border-b border-current/60">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" aria-label="Email address" className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:opacity-60" />
        <button type="submit" aria-label="Subscribe"><ArrowRight className="h-4 w-4" strokeWidth={1.25} /></button>
      </div>
      <label className="mt-4 flex items-start gap-3 text-xs opacity-70">
        <input type="checkbox" required checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-current" />
        Subscribe to receive communications from All ab Skin. You may unsubscribe at any time.
      </label>
    </form>
  );
}

export function Footer() {
  const { setCartOpen, setSearchOpen } = useStore();
  const col = "space-y-3 text-sm opacity-80";
  return (
    <footer className="bg-stone text-stone-foreground">
      <div className="mx-auto grid max-w-[1920px] gap-12 px-5 py-20 md:grid-cols-5 md:px-[4.5rem]">
        <div className="md:col-span-2 max-w-sm">
          <p className="text-sm font-medium">Subscribe to All ab communications</p>
          <div className="mt-6"><Newsletter /></div>
        </div>
        <div>
          <p className="mb-5 text-sm font-medium">Shop</p>
          <ul className={col}>
            <li><Link to="/shop" className="link-underline">All skin care</Link></li>
            <li><Link to="/ritual" className="link-underline">The ritual</Link></li>
            <li><Link to="/wishlist" className="link-underline">Wishlist</Link></li>
            <li><button onClick={() => setCartOpen(true)} className="link-underline">My cart</button></li>
            <li><button onClick={() => setSearchOpen(true)} className="link-underline">Search</button></li>
          </ul>
        </div>
        <div>
          <p className="mb-5 text-sm font-medium">Guidance</p>
          <ul className={col}>
            <li><Link to="/skin-finder" className="link-underline">Skin finder</Link></li>
            <li><Link to="/consultation" className="link-underline">Book a consultation</Link></li>
            <li><Link to="/about" className="link-underline">Our philosophy</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-5 text-sm font-medium">Contact</p>
          <ul className={col}>
            <li><a href="mailto:hello@allabskin.com" className="link-underline">hello@allabskin.com</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="link-underline">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1920px] flex-wrap items-center justify-between gap-4 border-t border-current/15 px-5 py-6 text-xs opacity-60 md:px-[4.5rem]">
        <span className="logo text-xl opacity-100">All ab</span>
        <span>Vegan · Barrier-first · Fragrance-free</span>
        <span>© {new Date().getFullYear()} All ab Skin</span>
      </div>
    </footer>
  );
}
