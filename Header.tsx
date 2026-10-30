import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Search, ShoppingBag, Sun, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/shop", label: "Skin Care" },
  { to: "/ritual", label: "The Ritual" },
  { to: "/about", label: "Philosophy" },
  { to: "/consultation", label: "Consultation" },
] as const;

export function Header() {
  const { count, setCartOpen, setSearchOpen, theme, toggleTheme } = useStore();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <div className="bg-stone py-2 text-center text-[0.7rem] tracking-[0.18em] uppercase text-stone-foreground">
        Complimentary delivery on orders over $150
      </div>
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-border" : "bg-background border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <div className="flex items-center gap-8">
            <button aria-label="Open menu" className="md:hidden" onClick={() => setMenu(true)}>
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <nav className="hidden gap-7 md:flex">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="link-underline text-[0.8rem] tracking-wide"
                  activeProps={{ className: "text-primary" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-display text-2xl tracking-[0.12em]">
            ALL AB
          </Link>
          <div className="flex items-center gap-5">
            <button aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" strokeWidth={1.25} />
            </button>
            <button aria-label={`Switch to ${theme === "light" ? "basalt" : "marble"} theme`} onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-[18px] w-[18px]" strokeWidth={1.25} />
              ) : (
                <Sun className="h-[18px] w-[18px]" strokeWidth={1.25} />
              )}
            </button>
            <button aria-label="Open cart" onClick={() => setCartOpen(true)} className="relative flex items-center gap-1.5 text-[0.8rem]">
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.25} />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && <span className="tabular-nums">({count})</span>}
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-50 bg-background p-6 md:hidden rise">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl tracking-[0.12em]">ALL AB</span>
            <button aria-label="Close menu" onClick={() => setMenu(false)}>
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
          <nav className="mt-14 flex flex-col gap-6">
            {[{ to: "/", label: "Home" } as const, ...nav].map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="font-display text-4xl">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
