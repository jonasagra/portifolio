import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

export const getWhatsAppLink = (planName: string) => {
  const greeting = getGreeting();
  const message = `Olá, Jonas! ${greeting}, me interessei pelo plano ${planName}, podemos conversar sobre isso?`;
  return `https://wa.me/5583981306043?text=${encodeURIComponent(message)}`;
};
