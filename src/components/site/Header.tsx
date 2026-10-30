import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Search, Sun, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/shop", label: "Skin Care" },
  { to: "/ritual", label: "The Ritual" },
  { to: "/skin-finder", label: "Skin Finder" },
  { to: "/about", label: "Philosophy" },
  { to: "/consultation", label: "Consultation" },
] as const;

function ThemeSwitch() {
  const { theme, toggleTheme } = useStore();
  return (
    <button
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="relative flex h-6 w-11 items-center rounded-full border border-foreground/40 px-0.5 transition-colors duration-500 hover:border-foreground"
    >
      <Sun className="absolute left-1.5 h-2.5 w-2.5 opacity-60" strokeWidth={1.5} />
      <Moon className="absolute right-1.5 h-2.5 w-2.5 opacity-60" strokeWidth={1.5} />
      <span
        className={`relative z-10 h-[18px] w-[18px] rounded-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(.25,.1,.25,1)] ${
          theme === "dark" ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function Header() {
  const { count, setCartOpen, setSearchOpen, wishlist } = useStore();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 bg-background transition-shadow duration-700 ${scrolled ? "shadow-[0_1px_0_var(--color-border)]" : ""}`}>
        {/* Top row */}
        <div className={`mx-auto grid max-w-[1920px] grid-cols-3 items-center px-5 transition-all duration-700 md:px-[4.5rem] ${scrolled ? "h-14" : "h-20"}`}>
          <div className="flex items-center gap-6 text-[0.8rem]">
            <button aria-label="Open menu" className="lg:hidden" onClick={() => setMenu(true)}>
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <Link to="/consultation" className="hidden hover:opacity-60 lg:inline">Consultation</Link>
            <a href="mailto:hello@allabskin.com" className="hidden hover:opacity-60 lg:inline">Contact us</a>
          </div>
          <Link to="/" className={`logo justify-self-center transition-all duration-700 ${scrolled ? "text-3xl" : "text-[2.6rem]"}`}>
            All ab
          </Link>
          <div className="flex items-center justify-end gap-5 text-[0.8rem] md:gap-6">
            <ThemeSwitch />
            <Link to="/wishlist" className="hidden hover:opacity-60 sm:inline">Wishlist ({wishlist.length})</Link>
            <button aria-label="Open cart" onClick={() => setCartOpen(true)} className="hover:opacity-60">
              My cart ({count})
            </button>
          </div>
        </div>
        {/* Nav row */}
        <div className="hidden border-t lg:block">
          <div className="mx-auto grid max-w-[1920px] grid-cols-[1fr_auto_1fr] items-stretch px-[4.5rem]">
            <span />
            <nav className="flex items-center gap-9 py-4 text-[0.9rem]">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} className="link-underline pb-0.5" activeProps={{ className: "!bg-[length:100%_1px]" }}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={() => setSearchOpen(true)}
              className="ml-auto flex items-center gap-3 border-l pl-6 text-[0.9rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Search className="h-4 w-4" strokeWidth={1.25} /> Search…
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="page-fade fixed inset-0 z-50 overflow-y-auto bg-background p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="logo text-3xl">All ab</span>
            <button aria-label="Close menu" onClick={() => setMenu(false)}>
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
          <button
            onClick={() => { setMenu(false); setSearchOpen(true); }}
            className="mt-10 flex w-full items-center gap-3 border-b pb-3 text-muted-foreground"
          >
            <Search className="h-4 w-4" strokeWidth={1.25} /> Search…
          </button>
          <nav className="mt-10 flex flex-col gap-5">
            {[{ to: "/", label: "Home" } as const, ...nav, { to: "/wishlist", label: `Wishlist (${wishlist.length})` } as const].map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="text-3xl">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
