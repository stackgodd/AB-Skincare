import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — All ab Skin" },
      { name: "description", content: "The formulations you have saved for later." },
      { property: "og:title", content: "Wishlist — All ab Skin" },
      { property: "og:description", content: "The formulations you have saved for later." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, add } = useStore();
  const items = wishlist.map(getProduct).filter((p) => !!p);
  return (
    <div className="mx-auto min-h-[60vh] max-w-[1920px] px-5 py-16 md:px-[4.5rem]">
      <h1 className="text-4xl md:text-5xl">Wishlist</h1>
      {items.length === 0 ? (
        <div className="mt-10">
          <p className="text-muted-foreground">You haven’t saved anything yet. Tap the heart on any formulation to keep it here.</p>
          <Link to="/shop" className="btn-solid mt-8">Discover skin care</Link>
        </div>
      ) : (
        <>
          <button onClick={() => items.forEach((p) => add(p.slug))} className="btn-ghost mt-8">Add all to cart</button>
          <div className="mt-12 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </>
      )}
    </div>
  );
}
