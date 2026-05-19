import React from "react";
import { motion } from "motion/react";
import { Check, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { cn, getWhatsAppLink } from "@/src/lib/utils";
import Badge from "./Badge";

type ValidVariant = "default" | "popular" | "bestSeller" | "discount6Meses";

type Props = {
  name: string;
  price: string;
  oldPrice?: string;
  features: string[];
  highlight?: boolean;
  badgeText?: string | null;
  variant?: ValidVariant | ValidVariant[];
  delay?: number;
};

export default function PricingCard({ name, price, oldPrice, features, highlight = false, badgeText = null, variant = "default", delay = 0 }: Props) {
  const isDiscounted = !!oldPrice;

  // Corrige o parseFloat para suportar vírgulas do Real Brasileiro
  const parsePrice = (val: string) => parseFloat(val.replace(/\./g, "").replace(",", "."));
  const percentPriceDiscount = isDiscounted && oldPrice ? Math.round(((parsePrice(oldPrice) - parsePrice(price)) / parsePrice(oldPrice)) * 100) : 0;

  // A nova propriedade variant toma conta do design suportando multiplas tags:
  const activeVariants = Array.isArray(variant) ? variant : [variant];
  const isPopular = activeVariants.includes("popular") || highlight;
  const isBestSeller = activeVariants.includes("bestSeller");
  const isDiscount6Meses = activeVariants.includes("discount6Meses");

  // Array de badges para suportar múltiplos
  type BadgeConfig = { text: string; variant: "popular" | "bestSeller" | "discount6Meses" };
  const badges: BadgeConfig[] = [];

  if (badgeText) {
    badges.push({ text: badgeText, variant: isBestSeller ? "bestSeller" : "popular" });
  } else {
    if (isBestSeller) badges.push({ text: "Mais vendido", variant: "bestSeller" });
    if (isPopular) badges.push({ text: "Mais popular", variant: "popular" });
  }

  // Estilo do Cartão em si:
  let cardStyle = "bg-zinc-900/40 border border-white/5 hover:border-white/20 hover:shadow-2xl hover:bg-zinc-900/60";
  if (isBestSeller) {
    cardStyle = "glass ring-2 ring-orange-500 shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)]";
  } else if (isDiscount6Meses) {
    cardStyle = "glass ring-2 ring-red-500 shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)]";
  } else if (isPopular) {
    cardStyle = "glass ring-2 ring-purple-500 shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]";
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

      {badges.length > 0 && (
        <div className="absolute -top-4 left-0 w-full flex justify-center flex-wrap gap-2 px-2 pointer-events-none z-20">
          {badges.map((b, i) => (
            <Badge key={i} text={b.text} variant={b.variant} />
          ))}
        </div>
      )}

      <div className="mb-8" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-bold text-zinc-400 mb-4">{name}</h3>
        <div className="flex flex-col gap-2">
          {isDiscounted && (
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm bg-red-600 text-white rounded-lg px-2 py-1 font-bold">
                -{percentPriceDiscount}%
              </span>
              <span className="text-sm text-zinc-400 line-through">R$ {oldPrice}</span>
              {isDiscount6Meses && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-full whitespace-nowrap">
                  Válido por 6 meses
                </span>
              )}
            </div>
          )}
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight">R$ {price}</span>
            <span className="text-sm font-medium text-zinc-500">/mês</span>
          </div>
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
          isBestSeller ? "bg-orange-600 text-white shadow-[0_10px_20px_-10px_rgba(234,88,12,0.8)] hover:bg-orange-500" :
          isDiscount6Meses ? "bg-red-600 text-white shadow-[0_10px_20px_-10px_rgba(239,68,68,0.8)] hover:bg-red-500" :
          isPopular ? "bg-purple-500 text-white shadow-[0_10px_20px_-10px_rgba(168,85,247,0.8)] hover:bg-purple-400" :
          "bg-green-600 text-white shadow-[0_10px_20px_-10px_rgba(34,197,94,0.8)] hover:bg-green-500"
        )}
      >
        <span className={cn("relative z-10",
          isBestSeller ? "text-orange-900" :
          isPopular ? "text-purple-800" :
          "text-white"
        )}>Contratar</span>

        <SiWhatsapp className="w-4 h-4 relative z-10" color={
          isBestSeller ? "orange" :
          isPopular ? "purple-800" :
          "white"
        } />

        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      </motion.a>
    </motion.div>
  );
}
