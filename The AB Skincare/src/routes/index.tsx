import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Check, Menu, Minus, Moon, Plus, ShoppingBag, Sun, Trash2 } from "lucide-react";

import heroImage from "@/assets/allab-hero.jpg";
import cleanserImage from "@/assets/allab-cleanser.jpg";
import tonerImage from "@/assets/allab-toner.jpg";
import serumImage from "@/assets/allab-serum.jpg";
import creamImage from "@/assets/allab-cream.jpg";
import eyeImage from "@/assets/allab-eye.jpg";
import maskImage from "@/assets/allab-mask.jpg";
import spfImage from "@/assets/allab-spf.jpg";
import mineralDarkImage from "@/assets/allab-mineral-dark.jpg";
import mineralLightImage from "@/assets/allab-mineral-light.jpg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

type Product = {
  id: number;
  step: string;
  action: string;
  name: string;
  shortName: string;
  price: number;
  volume: string;
  image: string;
  description: string;
  ingredients: string;
};

const products: Product[] = [
  { id: 1, step: "01", action: "Cleanse", name: "Lumina Cleansing Gel", shortName: "Cleanser", price: 42, volume: "200 mL", image: cleanserImage, description: "A low-foam amino acid cleanser that lifts sunscreen, makeup and daily residue without disturbing the skin barrier.", ingredients: "Amino acids · Chamomile · Glycerin" },
  { id: 2, step: "02", action: "Tone", name: "Dewpoint Toner Mist", shortName: "Toner", price: 38, volume: "150 mL", image: tonerImage, description: "A weightless, alcohol-free mist that restores water and prepares skin for the formulations that follow.", ingredients: "Rose water · Panthenol · Sodium PCA" },
  { id: 3, step: "03", action: "Treat", name: "Radiance C Serum", shortName: "Serum", price: 68, volume: "30 mL", image: serumImage, description: "A concentrated vitamin C and peptide treatment for a more even, resilient and visibly rested complexion.", ingredients: "Vitamin C · Peptides · Niacinamide" },
  { id: 4, step: "04", action: "Hydrate", name: "Aqua Veil Essence", shortName: "Essence", price: 54, volume: "50 mL", image: heroImage, description: "A replenishing layer of multi-weight hydration designed to soften the look of fine dehydration lines.", ingredients: "Hyaluronic acid · Ectoin · Beta-glucan" },
  { id: 5, step: "05", action: "Eye", name: "Clarity Eye Cream", shortName: "Eye cream", price: 58, volume: "15 mL", image: eyeImage, description: "A cooling peptide cream that softens, de-puffs and supports the delicate eye contour without heaviness.", ingredients: "Caffeine · Peptides · Squalane" },
  { id: 6, step: "06", action: "Repair", name: "Nocturne Barrier Cream", shortName: "Moisturizer", price: 72, volume: "60 mL", image: creamImage, description: "A breathable ceramide cream that seals in hydration and supports recovery through the night.", ingredients: "Ceramides · Squalane · Oat lipids" },
  { id: 7, step: "07", action: "Protect", name: "Daily Defense SPF 50", shortName: "SPF", price: 46, volume: "50 mL", image: spfImage, description: "A sheer daily moisturizer with broad-spectrum SPF 50 protection and a natural, comfortable finish.", ingredients: "Zinc oxide · Bisabolol · Vitamin E" },
];

const bestSellers = products.filter((product) => [1, 3, 6].includes(product.id));
const supportingProducts = products.filter((product) => ![1, 3, 6].includes(product.id));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "All ab Skin — Measured skincare, luminous results" },
      { name: "description", content: "Discover seven precise skincare formulations for calm, luminous and resilient skin." },
      { property: "og:title", content: "All ab Skin — Measured skincare, luminous results" },
      { property: "og:description", content: "Seven precise formulations for calm, luminous and resilient skin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

function Storefront() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [bag, setBag] = useState<Record<number, number>>({});
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(preferred);
    document.documentElement.classList.toggle("dark", preferred);
  }, []);

  const setTheme = (checked: boolean) => {
    setIsDark(checked);
    document.documentElement.classList.toggle("dark", checked);
  };

  const addToBag = (product: Product) => {
    setBag((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
  };

  const updateQuantity = (id: number, delta: number) => {
    setBag((current) => {
      const next = Math.max(0, (current[id] ?? 0) + delta);
      if (next === 0) {
        const copy = { ...current };
        delete copy[id];
        return copy;
      }
      return { ...current, [id]: next };
    });
  };

  const itemCount = Object.values(bag).reduce((total, quantity) => total + quantity, 0);
  const subtotal = products.reduce((total, product) => total + product.price * (bag[product.id] ?? 0), 0);

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <main className="page-ambient min-h-screen overflow-hidden text-foreground">
      <div className="border-b border-glass-border bg-primary py-2 text-center text-[11px] uppercase tracking-[0.18em] text-primary-foreground">
        Complimentary delivery on orders over $150
      </div>

      <header className="sticky top-0 z-40 px-3 py-3 sm:px-6">
        <div className="glass-panel mx-auto flex min-h-16 max-w-6xl items-center justify-between rounded-2xl px-4 sm:px-6">
          <a href="#top" className="font-display text-2xl font-medium" aria-label="All ab Skin home">All ab Skin</a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-foreground" href="#collection">Collection</a>
            <a className="transition-colors hover:text-foreground" href="#philosophy">Philosophy</a>
            <a className="transition-colors hover:text-foreground" href="#consultation">Consultation</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <Sun className="size-4 text-muted-foreground" aria-hidden="true" />
              <Switch checked={isDark} onCheckedChange={setTheme} aria-label="Toggle dark mode" />
              <Moon className="size-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <Button variant="glass" size="icon" className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></Button>
            <Button variant="luxury" onClick={() => setBagOpen(true)} aria-label={`Open bag with ${itemCount} items`}>
              <ShoppingBag /> <span className="hidden sm:inline">Bag</span><span>{itemCount}</span>
            </Button>
          </div>
        </div>
      </header>

      <section id="top" className="relative isolate mx-auto grid max-w-6xl items-center gap-10 overflow-hidden px-6 pb-20 pt-8 lg:min-h-[720px] lg:grid-cols-2 lg:py-14">
        <img src={mineralLightImage} alt="" width={1600} height={1200} className="hero-mineral pointer-events-none absolute inset-0 -z-20 size-full object-cover dark:hidden" />
        <img src={mineralDarkImage} alt="" width={1600} height={1200} className="hero-mineral pointer-events-none absolute inset-0 -z-20 hidden size-full object-cover dark:block" />
        <div className="hero-veil pointer-events-none absolute inset-0 -z-10" />
        <div className="relative z-10 animate-fade-in">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-primary">The seven-step ritual</p>
          <h1 className="max-w-xl font-display text-6xl font-medium leading-[0.9] sm:text-7xl lg:text-8xl">
            Skin that <span className="italic text-primary">breathes</span> light.
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            Seven precise formulations for luminous, resilient skin. Layered with intention and quietly powerful.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="luxury" size="luxury"><a href="#collection">Explore the collection</a></Button>
            <Button asChild variant="glass" size="luxury"><a href="#consultation">Book a consultation</a></Button>
          </div>
          <div className="mt-12 grid max-w-md grid-cols-3 border-y border-border py-4 text-xs text-muted-foreground">
            <span>Vegan formulas</span><span className="text-center">Barrier-first</span><span className="text-right">No fragrance</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[31rem] animate-scale-in lg:ml-auto">
          <div className="glass-panel overflow-hidden rounded-3xl p-3">
            <img src={heroImage} alt="All ab Skin serum on frosted glass" width={1024} height={1280} className="aspect-[16/11] w-full rounded-2xl object-cover object-center sm:aspect-[4/5]" />
          </div>
          <div className="glass-panel absolute -bottom-5 -left-3 rounded-2xl px-5 py-4 sm:-left-8">
            <p className="font-display text-3xl">07</p>
            <p className="text-xs text-muted-foreground">formulations, one ritual</p>
          </div>
        </div>
      </section>

      <section id="collection" className="scroll-mt-28 py-20">
        <div className="mx-auto mb-12 flex max-w-6xl flex-col justify-between gap-4 border-b border-border px-6 pb-6 sm:flex-row sm:items-end">
          <div><p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">The essentials</p><h2 className="mt-2 font-display text-4xl sm:text-6xl">Three formulations to begin.</h2></div>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">Our most relied-upon formulas, each given room to be understood.</p>
        </div>

        <div className="space-y-1">
          {bestSellers.map((product, index) => (
            <article key={product.id} className={`reveal-section product-chapter relative isolate grid min-h-[640px] overflow-hidden lg:grid-cols-2 ${index % 2 ? "product-chapter-reverse" : ""}`}>
              <div className={`relative min-h-[420px] overflow-hidden ${index % 2 ? "lg:order-2" : ""}`}>
                <img src={product.image} alt={product.name} loading="lazy" width={1024} height={1024} className="size-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
                <p className="absolute left-6 top-6 border border-glass-border bg-glass px-3 py-2 text-[10px] uppercase tracking-[0.18em] backdrop-blur-md">All ab Skin · Bestseller</p>
              </div>
              <div className={`chapter-copy relative flex items-center px-6 py-16 sm:px-12 lg:px-[9vw] ${index % 2 ? "lg:order-1" : ""}`}>
                <img src={index === 1 ? mineralDarkImage : mineralLightImage} alt="" loading="lazy" width={1600} height={1200} className="chapter-texture pointer-events-none absolute inset-0 -z-20 size-full object-cover" />
                <div className="chapter-veil pointer-events-none absolute inset-0 -z-10" />
                <div className="max-w-lg">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Step {product.step} · {product.action}</p>
                  <h3 className="mt-4 font-display text-5xl leading-none sm:text-6xl">{product.name}</h3>
                  <p className="mt-6 text-base leading-7 text-muted-foreground">{product.description}</p>
                  <p className="mt-7 border-t border-border pt-5 text-sm text-muted-foreground"><span className="font-medium text-foreground">Key ingredients</span><br />{product.ingredients}</p>
                  <div className="mt-8 flex items-end justify-between gap-6"><div><p className="font-display text-3xl">${product.price}</p><p className="text-xs text-muted-foreground">{product.volume}</p></div><div className="flex gap-2"><Button variant="glass" onClick={() => setSelected(product)}>Explore</Button><Button variant="luxury" onClick={() => addToBag(product)}>Add to bag</Button></div></div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="ritual-band relative isolate overflow-hidden py-20">
          <img src={mineralDarkImage} alt="" loading="lazy" width={1600} height={1200} className="pointer-events-none absolute inset-0 -z-20 size-full object-cover" />
          <div className="ritual-band-veil pointer-events-none absolute inset-0 -z-10" />
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-9 flex items-end justify-between gap-6 text-primary-foreground"><div><p className="text-xs uppercase tracking-[0.2em] text-accent-soft">Complete only as needed</p><h3 className="mt-2 font-display text-4xl sm:text-5xl">The supporting ritual</h3></div><p className="hidden max-w-xs text-sm text-primary-foreground/70 sm:block">Targeted additions for hydration, eyes, weekly repair and daily protection.</p></div>
            <div className="grid grid-cols-2 gap-px bg-glass-border lg:grid-cols-4">
              {supportingProducts.map((product) => (
                <article key={product.id} className="group bg-page-deep/85 p-3 text-primary-foreground backdrop-blur-xl">
                  <Button variant="ghost" className="h-auto w-full p-0 hover:bg-transparent" onClick={() => setSelected(product)} aria-label={`View ${product.name}`}>
                    <img src={product.image} alt={product.name} loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                  </Button>
                  <div className="px-1 pb-2 pt-4"><p className="text-[10px] uppercase tracking-[0.16em] text-accent-soft">{product.action}</p><h4 className="mt-1 font-display text-xl leading-tight sm:text-2xl">{product.name}</h4><div className="mt-4 flex items-center justify-between text-sm"><span>${product.price}</span><Button variant="quiet" size="sm" onClick={() => addToBag(product)}>Add</Button></div></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="philosophy" className="reveal-section mx-auto max-w-6xl scroll-mt-28 px-6 py-16">
        <div className="glass-panel grid gap-12 rounded-3xl p-8 sm:p-12 md:grid-cols-2 md:p-14">
          <div><p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Our philosophy</p><h2 className="mt-3 font-display text-5xl leading-none">Less, but <span className="italic">better.</span></h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Every formula is built around a small number of proven actives. Nothing decorative, nothing that does not earn its place on your skin.</p></div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
            {[['07','considered formulas'],['00','synthetic fragrances'],['100%','vegan & cruelty-free'],['03','core daily steps']].map(([value,label]) => <div key={label} className="border-t border-border pt-4"><dt className="font-display text-4xl text-primary">{value}</dt><dd className="mt-1 text-sm text-muted-foreground">{label}</dd></div>)}
          </dl>
        </div>
      </section>

      <section id="consultation" className="reveal-section mx-auto max-w-6xl scroll-mt-28 px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div className="overflow-hidden rounded-3xl"><img src={cleanserImage} alt="All ab Skin formulation consultation" loading="lazy" width={1024} height={1024} className="aspect-[5/4] w-full object-cover" /></div>
          <div className="px-2 lg:px-8"><p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Personal consultation</p><h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">Find your ritual.</h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">A twenty-minute conversation with a skin specialist. We’ll review your routine and recommend the formulations that genuinely fit.</p><Button variant="luxury" size="luxury" className="mt-8" onClick={() => window.alert("Consultation requests are opening soon.")}>Request a session</Button></div>
        </div>
      </section>

      <section className="reveal-section mx-auto max-w-6xl px-6 py-16">
        <div className="glass-panel rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">The skin letter</p><h2 className="mt-3 font-display text-5xl">Stay in the glow</h2><p className="mx-auto mt-4 max-w-md text-muted-foreground">Early access, formulation notes and 10% off your first ritual.</p>
          {subscribed ? <p className="mx-auto mt-7 flex w-fit items-center gap-2 text-sm text-primary"><Check className="size-4" /> You’re on the list.</p> : <form onSubmit={submitNewsletter} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required placeholder="Email address" className="h-12 flex-1 rounded-full border border-glass-border bg-glass px-5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary" /><Button variant="luxury" size="luxury" type="submit">Subscribe</Button></form>}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 pt-12">
        <div className="border-t border-border pt-8"><div className="grid gap-10 sm:grid-cols-3"><div><p className="font-display text-3xl">All ab Skin</p><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">Measured skincare for luminous, resilient skin.</p></div><div><p className="text-xs uppercase tracking-[0.16em] text-primary">Explore</p><div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground"><a href="#collection">Collection</a><a href="#philosophy">Philosophy</a><a href="#consultation">Consultation</a></div></div><div><p className="text-xs uppercase tracking-[0.16em] text-primary">Client care</p><div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground"><span>Delivery & returns</span><span>Product guidance</span><span>Contact</span></div></div></div><div className="mt-12 flex flex-col justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row"><span>© 2026 All ab Skin</span><span>Designed with intention in Aotearoa</span></div></div>
      </footer>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && <DialogContent className="glass-panel max-h-[90vh] max-w-4xl overflow-y-auto rounded-3xl border-glass-border p-3 sm:p-4"><div className="grid gap-5 md:grid-cols-2"><img src={selected.image} alt={selected.name} width={1024} height={1024} className="aspect-square w-full rounded-2xl object-cover" /><div className="flex flex-col justify-center p-4 sm:p-7"><p className="text-xs uppercase tracking-[0.16em] text-primary">Step {selected.step} · {selected.action}</p><DialogTitle className="mt-3 font-display text-4xl font-normal sm:text-5xl">{selected.name}</DialogTitle><DialogDescription className="mt-5 text-base leading-7 text-muted-foreground">{selected.description}</DialogDescription><p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground"><span className="font-medium text-foreground">Key ingredients</span><br />{selected.ingredients}</p><div className="mt-8 flex items-center justify-between"><span className="font-display text-3xl">${selected.price}</span><span className="text-xs text-muted-foreground">{selected.volume}</span></div><Button variant="luxury" size="luxury" className="mt-5" onClick={() => { addToBag(selected); setSelected(null); setBagOpen(true); }}>Add to bag</Button></div></div></DialogContent>}
      </Dialog>

      <Sheet open={bagOpen} onOpenChange={setBagOpen}>
        <SheetContent className="flex w-full flex-col border-glass-border bg-popover sm:max-w-md"><SheetHeader><SheetTitle className="font-display text-3xl font-normal">Your bag</SheetTitle><SheetDescription>{itemCount ? `${itemCount} item${itemCount === 1 ? "" : "s"} reserved for you.` : "Your ritual is waiting."}</SheetDescription></SheetHeader><div className="mt-7 flex-1 space-y-5 overflow-y-auto">{itemCount === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingBag className="mb-4 size-8 text-primary" /><p className="font-display text-2xl">Your bag is empty</p><p className="mt-2 text-sm text-muted-foreground">Begin with one considered formulation.</p></div> : products.filter((product) => bag[product.id]).map((product) => <div key={product.id} className="flex gap-4 border-b border-border pb-5"><img src={product.image} alt="" width={1024} height={1024} className="size-24 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="font-display text-xl leading-tight">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">${product.price} · {product.volume}</p><div className="mt-3 flex items-center gap-2"><Button variant="quiet" size="icon" className="size-8" onClick={() => updateQuantity(product.id, -1)} aria-label={`Remove one ${product.name}`}><Minus /></Button><span className="w-5 text-center text-sm">{bag[product.id]}</span><Button variant="quiet" size="icon" className="size-8" onClick={() => updateQuantity(product.id, 1)} aria-label={`Add one ${product.name}`}><Plus /></Button><Button variant="ghost" size="icon" className="ml-auto size-8" onClick={() => setBag((current) => { const copy = { ...current }; delete copy[product.id]; return copy; })} aria-label={`Remove ${product.name}`}><Trash2 /></Button></div></div></div>)}</div>{itemCount > 0 && <div className="border-t border-border pt-5"><div className="mb-5 flex items-center justify-between"><span className="text-sm text-muted-foreground">Subtotal</span><span className="font-display text-3xl">${subtotal}</span></div><Button variant="luxury" size="luxury" className="w-full" onClick={() => window.alert("Checkout will be available at launch.")}>Continue to checkout</Button><p className="mt-3 text-center text-xs text-muted-foreground">Taxes and delivery calculated at checkout.</p></div>}</SheetContent>
      </Sheet>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="bg-popover"><SheetHeader><SheetTitle className="font-display text-3xl font-normal">All ab Skin</SheetTitle><SheetDescription>Measured skincare.</SheetDescription></SheetHeader><nav className="mt-10 flex flex-col gap-6 font-display text-4xl"><a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a><a href="#philosophy" onClick={() => setMenuOpen(false)}>Philosophy</a><a href="#consultation" onClick={() => setMenuOpen(false)}>Consultation</a></nav><div className="mt-12 flex items-center justify-between border-t border-border pt-6"><span className="text-sm text-muted-foreground">Dark appearance</span><Switch checked={isDark} onCheckedChange={setTheme} aria-label="Toggle dark mode" /></div></SheetContent>
      </Sheet>
    </main>
  );
}