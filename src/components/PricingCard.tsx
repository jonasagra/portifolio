import React from "react";
import { motion } from "motion/react";
import { Check, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { cn, getWhatsAppLink } from "@/src/lib/utils";
import Badge from "./Badge";

type Props = {
  name: string;
  price: string;
  oldPrice?: string;
  features: string[];
  highlight?: boolean;
  badgeText?: string | null;
  variant?: "default" | "popular" | "bestSeller";
  delay?: number;
};

export default function PricingCard({ name, price, oldPrice, features, highlight = false, badgeText = null, variant = "default", delay = 0 }: Props) {
  const isDiscounted = !!oldPrice;

  // Corrige o parseFloat para suportar vírgulas do Real Brasileiro
  const parsePrice = (val: string) => parseFloat(val.replace(/\./g, "").replace(",", "."));
  const percentPriceDiscount = isDiscounted && oldPrice ? Math.round(((parsePrice(oldPrice) - parsePrice(price)) / parsePrice(oldPrice)) * 100) : 0;

  // A nova propriedade variant toma conta do design:
  const isPopular = variant === "popular" || highlight;
  const isBestSeller = variant === "bestSeller";

  // Determina a badge exibida:
  let computedBadge = badgeText;
  if (!computedBadge) {
    if (isPopular) computedBadge = "Mais popular";
    if (isBestSeller) computedBadge = "Mais vendido";
  }

  // Variante usada no componente da Badge
  const badgeVariant = isBestSeller ? "bestSeller" : "popular";

  // Estilo do Cartão em si:
  let cardStyle = "bg-zinc-900/40 border border-white/5 hover:border-white/20 hover:shadow-2xl hover:bg-zinc-900/60";
  if (isPopular) {
    cardStyle = "glass ring-2 ring-purple-500 shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]";
  } else if (isBestSeller) {
    cardStyle = "glass ring-2 ring-orange-500 shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)]"; // Gradient-like highlight para o Mais Vendido
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -10, rotateX: 5, rotateY: -5, scale: 1.02 }}
      className={cn(
        "relative p-8 rounded-3xl flex flex-col group transition-all duration-300 transform-gpu",
        cardStyle
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 pointer-events-none" />
      {computedBadge && <Badge text={computedBadge} variant={badgeVariant} />}

      <div className="mb-8" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-bold text-zinc-400 mb-2">{name}</h3>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-zinc-500"></span>
            {!isDiscounted && <span className="text-5xl md:text-5xl font-black text-white mt-1.2">R$ {price}</span>}
            {isDiscounted && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-red-600 rounded-lg px-2 py-1 font-bold">
                    -{percentPriceDiscount}%
                  </span>
                  <span className="text-sm text-zinc-400 line-through">R$ {oldPrice}</span>
                </div>
                <span className="text-5xl md:text-5xl font-black text-white mt-1">R$ {price}</span>
              </div>
            )}
          </div>
          <span className="text-sm font-medium text-zinc-500 -mt-1.5">/mês</span>
        </div>
      </div>

      <ul className="flex-grow space-y-4 mb-10 relative z-10" style={{ transform: "translateZ(20px)" }}>
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
            <Check className="w-4 h-4 mt-0.5 text-purple-500 shrink-0 drop-shadow-[0_0_8px_rgba(168,85,247,1)]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <motion.a
        href={getWhatsAppLink(name)}
        target="_blank"
        rel="noopener noreferrer"
        style={{ transform: "translateZ(40px)" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm transition-all duration-300 relative overflow-hidden",
          isBestSeller ? "bg-red-600 text-white shadow-lg hover:bg-red-800" : "bg-green-600 text-white shadow-[0_10px_20px_-10px_rgba(168,85,247,0.8)] hover:bg-green-500"
        )}
      >
        <SiWhatsapp className="w-4 h-4 relative z-10" color="white" />
        <span className="relative z-10">Contratar</span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      </motion.a>
    </motion.div>
  );
}
