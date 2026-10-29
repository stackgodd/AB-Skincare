import { Link } from "@tanstack/react-router";
import { useState } from "react";
import marbleDark from "@/assets/mineral-dark.jpg";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return sent ? (
    <p className="text-sm">Thank you — your 10% welcome code is on its way to {email}.</p>
  ) : (
    <form
      onSubmit={(e) => { e.preventDefault(); if (/\S+@\S+\.\S+/.test(email)) setSent(true); }}
      className="flex border-b border-current"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:opacity-60"
      />
      <button type="submit" className="text-[0.7rem] tracking-[0.2em] uppercase">Subscribe</button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="marble bg-stone text-stone-foreground" style={{ ["--marble-img" as string]: `url(${marbleDark})` }}>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2 max-w-md">
          <h3 className="font-display text-3xl">The skin letter</h3>
          <p className="mt-3 text-sm opacity-70">Early access, formulation notes and 10% off your first ritual.</p>
          <div className="mt-6"><Newsletter /></div>
        </div>
        <div>
          <p className="eyebrow !text-current opacity-60">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/shop" className="link-underline">Skin Care</Link></li>
            <li><Link to="/ritual" className="link-underline">The Ritual</Link></li>
            <li><Link to="/about" className="link-underline">Philosophy</Link></li>
            <li><Link to="/consultation" className="link-underline">Consultation</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow !text-current opacity-60">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="mailto:hello@allabskin.com" className="link-underline">hello@allabskin.com</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="link-underline">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] justify-between border-t border-current/15 px-5 py-6 text-xs opacity-60 md:px-10">
        <span>© {new Date().getFullYear()} All ab Skin</span>
        <span>Vegan · Barrier-first · Fragrance-free</span>
      </div>
    </footer>
  );
}
