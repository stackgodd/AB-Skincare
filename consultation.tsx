import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import cleanser from "@/assets/cleanser.jpg";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — All ab Skin" },
      { name: "description", content: "A twenty-minute conversation with an All ab Skin specialist to find the formulations that fit your skin." },
      { property: "og:title", content: "Book a Consultation — All ab Skin" },
      { property: "og:description", content: "A twenty-minute conversation with a skin specialist." },
    ],
  }),
  component: Consultation,
});

const concerns = ["Dryness", "Sensitivity", "Uneven tone", "Breakouts", "Fine lines", "Dullness"];

function Consultation() {
  const [sent, setSent] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const field = "w-full border-b bg-transparent py-3 text-sm outline-none focus:border-foreground";

  return (
    <section className="grid md:grid-cols-2">
      <img src={cleanser} alt="" className="h-[40vh] w-full object-cover md:h-full" />
      <div className="px-6 py-16 md:px-16 lg:px-24">
        <p className="eyebrow">Personal consultation</p>
        <h1 className="mt-3 font-display text-5xl">Find your ritual.</h1>
        {sent ? (
          <div className="rise mt-10">
            <p className="text-lg">Thank you, {sent}.</p>
            <p className="mt-3 text-muted-foreground">A specialist will be in touch within one working day to confirm your session.</p>
            <Link to="/shop" className="link-underline mt-8 inline-block text-[0.7rem] tracking-[0.2em] uppercase">Browse while you wait</Link>
          </div>
        ) : (
          <form
            className="mt-10 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(String(new FormData(e.currentTarget).get("name") || "").split(" ")[0] ?? "");
            }}
          >
            <input name="name" required placeholder="Full name" className={field} />
            <input name="email" type="email" required placeholder="Email address" className={field} />
            <select name="format" className={field} defaultValue="Video call">
              <option>Video call</option>
              <option>Phone call</option>
            </select>
            <input name="date" type="date" required className={field} />
            <div>
              <p className="eyebrow mb-3">Concerns</p>
              <div className="flex flex-wrap gap-2">
                {concerns.map((c) => {
                  const on = picked.includes(c);
                  return (
                    <button type="button" key={c} onClick={() => setPicked(on ? picked.filter((x) => x !== c) : [...picked, c])}
                      className={`border px-4 py-2 text-xs transition ${on ? "border-primary bg-primary text-primary-foreground" : "hover:border-foreground"}`}>
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
            <textarea name="notes" rows={3} placeholder="Your current routine (optional)" className={field} />
            <button type="submit" className="w-full bg-primary py-4 text-[0.7rem] tracking-[0.2em] uppercase text-primary-foreground transition hover:opacity-90">
              Request a session
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
