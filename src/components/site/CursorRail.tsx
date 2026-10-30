import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal rail that glides on its own when the cursor drifts toward either edge.
 * Speed eases in with distance from centre; touch devices simply swipe.
 */
export function CursorRail({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [thumb, setThumb] = useState(30);

  const loop = () => {
    const el = ref.current;
    if (!el) return;
    // ease speed toward target for a silky start/stop
    current.current += (target.current - current.current) * 0.08;
    if (Math.abs(current.current) > 0.05) {
      el.scrollLeft += current.current;
      raf.current = requestAnimationFrame(loop);
    } else {
      current.current = 0;
      raf.current = null;
    }
  };
  const kick = () => { if (raf.current == null) raf.current = requestAnimationFrame(loop); };

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const zone = 0.32;
    let v = 0;
    if (x < zone) v = -Math.pow((zone - x) / zone, 1.5) * 14;
    else if (x > 1 - zone) v = Math.pow((x - (1 - zone)) / zone, 1.5) * 14;
    target.current = v;
    kick();
  };
  const onLeave = () => { target.current = 0; kick(); };

  const update = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setThumb(Math.min(100, (el.clientWidth / el.scrollWidth) * 100));
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const step = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.75, behavior: "smooth" });

  return (
    <div className="relative">
      <div
        ref={ref}
        role="region"
        aria-label={label}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onScroll={update}
        className="flex gap-4 overflow-x-auto px-5 md:px-[4.5rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
        <span aria-hidden className="w-1 shrink-0" />
      </div>
      <div className="mt-10 flex items-center gap-6 px-5 md:px-[4.5rem]">
        <div className="relative h-px flex-1 bg-border">
          <span
            className="absolute inset-y-0 bg-foreground transition-[left] duration-200"
            style={{ width: `${thumb}%`, left: `${progress * (100 - thumb)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button aria-label="Previous" onClick={() => step(-1)} className="p-1 hover:opacity-60"><ChevronLeft className="h-4 w-4" strokeWidth={1.25} /></button>
          <button aria-label="Next" onClick={() => step(1)} className="p-1 hover:opacity-60"><ChevronRight className="h-4 w-4" strokeWidth={1.25} /></button>
        </div>
      </div>
    </div>
  );
}
