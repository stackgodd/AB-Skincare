import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products, skinTypes, formatPrice, type SkinType } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/skin-finder")({
  head: () => ({
    meta: [
      { title: "Skin Finder — All ab Skin" },
      { name: "description", content: "Answer a few questions and we'll recommend the formulations best suited to your skin." },
      { property: "og:title", content: "Skin Finder — All ab Skin" },
      { property: "og:description", content: "Find the formulations best suited to your skin." },
    ],
  }),
  component: SkinFinder,
});

const questions: { q: string; options: { label: string; type: SkinType }[] }[] = [
  { q: "By midday, how does your skin feel?", options: [
    { label: "Comfortable and balanced", type: "normal" },
    { label: "Tight or flaky", type: "dry" },
    { label: "Shiny all over", type: "oily" },
    { label: "Shiny in the T-zone, dry elsewhere", type: "combination" },
  ] },
  { q: "How does your skin react to new products?", options: [
    { label: "Rarely reacts", type: "normal" },
    { label: "Often red or stinging", type: "sensitive" },
    { label: "Prone to congestion", type: "oily" },
    { label: "Depends on the area", type: "combination" },
  ] },
  { q: "What is your primary concern?", options: [
    { label: "Fine lines and firmness", type: "mature" },
    { label: "Dehydration", type: "dry" },
    { label: "Redness and reactivity", type: "sensitive" },
    { label: "Enlarged pores", type: "oily" },
  ] },
];

function SkinFinder() {
  const [answers, setAnswers] = useState<SkinType[]>([]);
  const { add } = useStore();
  const step = answers.length;
  const done = step >= questions.length;

  const result: SkinType | undefined = done
    ? (Object.entries(answers.reduce<Record<string, number>>((a, t) => ({ ...a, [t]: (a[t] ?? 0) + 1 }), {})).sort((a, b) => b[1] - a[1])[0]?.[0] as SkinType)
    : undefined;
  const info = skinTypes.find((t) => t.id === result);
  const regimen = result ? products.filter((p) => p.skin.includes(result)).slice(0, 4) : [];

  return (
    <div className="mx-auto min-h-[70vh] max-w-[1920px] px-5 py-16 md:px-[4.5rem] lg:px-[19.5vw]">
      <p className="eyebrow">Skin Finder</p>
      {!done ? (
        <div key={step} className="page-fade">
          <p className="mt-10 text-sm tabular-nums text-muted-foreground">Question {step + 1} of {questions.length}</p>
          <div className="mt-3 h-px bg-border"><div className="h-px bg-foreground transition-all duration-700" style={{ width: `${(step / questions.length) * 100}%` }} /></div>
          <h1 className="mt-10 text-3xl md:text-4xl">{questions[step]!.q}</h1>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {questions[step]!.options.map((o) => (
              <button key={o.label} onClick={() => setAnswers([...answers, o.type])} className="flex items-center justify-between border px-6 py-5 text-left transition-colors duration-500 hover:border-foreground hover:bg-muted">
                {o.label} <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
              </button>
            ))}
          </div>
          {step > 0 && (
            <button onClick={() => setAnswers(answers.slice(0, -1))} className="mt-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.25} /> Previous question
            </button>
          )}
        </div>
      ) : (
        <div className="page-fade">
          <h1 className="mt-6 text-4xl md:text-5xl">Your skin: {info?.label.replace("For ", "")}</h1>
          <p className="mt-4 max-w-lg text-muted-foreground">{info?.text} We suggest the following regimen.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={() => regimen.forEach((p) => add(p.slug))} className="btn-solid">
              Add regimen · {formatPrice(regimen.reduce((a, p) => a + p.price, 0))} <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
            </button>
            <button onClick={() => setAnswers([])} className="btn-ghost">Start again</button>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {regimen.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
          <Link to="/shop" search={{ skin: result }} className="link-underline mt-12 inline-block text-sm">View all formulations for this skin type</Link>
        </div>
      )}
    </div>
  );
}
