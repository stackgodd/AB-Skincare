import cleanser from "@/assets/cleanser.jpg";
import toner from "@/assets/toner.jpg";
import hero from "@/assets/hero.jpg";
import serum from "@/assets/serum.jpg";
import eye from "@/assets/eye.jpg";
import cream from "@/assets/cream.jpg";
import spf from "@/assets/spf.jpg";

export type Category = "Cleanse" | "Tone" | "Hydrate" | "Treat" | "Eye" | "Repair" | "Protect";

export type SkinType = "normal" | "dry" | "oily" | "combination" | "mature" | "sensitive";

export const skinTypes: { id: SkinType; label: string; text: string }[] = [
  { id: "normal", label: "For ‘normal’ skin", text: "Neither oily, nor dry—better described as ‘balanced’." },
  { id: "dry", label: "For dry skin", text: "Can be fragile, flaky, and dull in appearance resulting from a lack of sebum." },
  { id: "oily", label: "For oily skin", text: "Often shiny in appearance with large pores due to an over-supply of sebum." },
  { id: "combination", label: "For combination skin", text: "Both oily and dry in nature, with a greater propensity to reactivity." },
  { id: "mature", label: "For mature skin", text: "Naturally depleted with diminishing oil production and moisture retention." },
  { id: "sensitive", label: "For sensitive skin", text: "Delicate and prone to aggravation and reactivity; can affect all skin types." },
];

export interface Product {
  skin: SkinType[];
  label?: "Notable formulation" | "Daily essential" | "New";
  slug: string;
  name: string;
  step: number;
  category: Category;
  price: number;
  size: string;
  image: string;
  short: string;
  description: string;
  ingredients: string[];
  texture: string;
  howTo: string;
  bestseller?: boolean;
}

export const products: Product[] = [
  {
    slug: "lumina-cleansing-gel",
    skin: ["normal","oily","combination","sensitive"],
    label: "Daily essential",
    name: "Lumina Cleansing Gel",
    step: 1,
    category: "Cleanse",
    price: 42,
    size: "200 mL",
    image: cleanser,
    short: "A low-foam amino acid cleanser for a clean, undisturbed barrier.",
    description:
      "A low-foam amino acid cleanser that lifts sunscreen, makeup and daily residue without disturbing the skin barrier.",
    ingredients: ["Amino acids", "Chamomile", "Glycerin"],
    texture: "Translucent gel",
    howTo: "Massage a small amount over damp skin morning and evening. Rinse with lukewarm water.",
    bestseller: true,
  },
  {
    slug: "dewpoint-toner-mist",
    skin: ["normal","dry","sensitive","mature"],
    name: "Dewpoint Toner Mist",
    step: 2,
    category: "Tone",
    price: 38,
    size: "100 mL",
    image: toner,
    short: "A fine, balancing mist that prepares skin to receive.",
    description:
      "A fine balancing mist that restores comfort after cleansing and prepares the skin for the formulations that follow.",
    ingredients: ["Rose water", "Panthenol", "Hyaluronic acid"],
    texture: "Weightless mist",
    howTo: "Mist over the face and neck after cleansing. Press gently into the skin.",
  },
  {
    slug: "aqua-veil-essence",
    skin: ["dry","mature","normal"],
    label: "New",
    name: "Aqua Veil Essence",
    step: 3,
    category: "Hydrate",
    price: 54,
    size: "50 mL",
    image: hero,
    short: "Layered hydration that leaves a soft, luminous veil.",
    description:
      "A fluid essence of multi-weight hyaluronic acids that draws moisture into the skin and leaves a soft, luminous finish.",
    ingredients: ["Hyaluronic acid", "Beta-glucan", "Allantoin"],
    texture: "Fluid essence",
    howTo: "Pat three to four drops into the skin after toning.",
  },
  {
    slug: "radiance-c-serum",
    skin: ["normal","combination","mature"],
    label: "Notable formulation",
    name: "Radiance C Serum",
    step: 4,
    category: "Treat",
    price: 68,
    size: "30 mL",
    image: serum,
    short: "Vitamin C and peptides for an even, rested complexion.",
    description:
      "A concentrated vitamin C and peptide treatment for a more even, resilient and visibly rested complexion.",
    ingredients: ["Vitamin C", "Peptides", "Niacinamide"],
    texture: "Silken serum",
    howTo: "Apply two to three drops in the morning before moisturiser and sun protection.",
    bestseller: true,
  },
  {
    slug: "clarity-eye-cream",
    skin: ["dry","mature","normal","sensitive"],
    name: "Clarity Eye Cream",
    step: 5,
    category: "Eye",
    price: 58,
    size: "15 mL",
    image: eye,
    short: "A cushioning cream for the delicate eye contour.",
    description:
      "A cushioning cream that smooths, brightens and comforts the delicate skin around the eyes.",
    ingredients: ["Caffeine", "Peptides", "Shea butter"],
    texture: "Rich cream",
    howTo: "Tap a rice-grain amount along the orbital bone with your ring finger.",
  },
  {
    slug: "nocturne-barrier-cream",
    skin: ["dry","mature","sensitive"],
    label: "Notable formulation",
    name: "Nocturne Barrier Cream",
    step: 6,
    category: "Repair",
    price: 72,
    size: "60 mL",
    image: cream,
    short: "A breathable ceramide cream for overnight recovery.",
    description:
      "A breathable ceramide cream that seals in hydration and supports recovery through the night.",
    ingredients: ["Ceramides", "Squalane", "Oat lipids"],
    texture: "Whipped balm-cream",
    howTo: "Smooth over the face and neck as the final step of your evening ritual.",
    bestseller: true,
  },
  {
    slug: "daily-defense-spf-50",
    skin: ["normal","oily","combination","dry","mature","sensitive"],
    label: "Daily essential",
    name: "Daily Defense SPF 50",
    step: 7,
    category: "Protect",
    price: 46,
    size: "50 mL",
    image: spf,
    short: "Invisible broad-spectrum protection for every day.",
    description:
      "An invisible, broad-spectrum mineral-hybrid sunscreen that wears comfortably beneath makeup.",
    ingredients: ["Zinc oxide", "Vitamin E", "Green tea"],
    texture: "Sheer lotion",
    howTo: "Apply generously as the last step each morning. Reapply every two hours in sun.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const formatPrice = (n: number) => `NZ$ ${n.toFixed(2)}`;

export const categoryInfo: Record<Category, string> = {
  Cleanse: "Cleansers",
  Tone: "Toners",
  Hydrate: "Hydrators",
  Treat: "Serums & Treats",
  Eye: "Eye Care",
  Repair: "Night Repair",
  Protect: "Sun Care",
};
export const FREE_SHIPPING = 150;
