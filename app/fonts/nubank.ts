import localFont from "next/font/local";

// Plus Jakarta Sans (SIL Open Font License 1.1, ver PlusJakartaSans-OFL.txt): a fonte gratuita mais parecida
// com a nuSans do nubank.com.br, usada só na aba Nubank
export const nubankFont = localFont({
  src: [
    { path: "./PlusJakartaSans-400.woff2", weight: "400", style: "normal" },
    { path: "./PlusJakartaSans-500.woff2", weight: "500", style: "normal" },
    { path: "./PlusJakartaSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-nubank",
  display: "swap",
});
