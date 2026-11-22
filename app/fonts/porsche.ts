import localFont from "next/font/local";

// Michroma (SIL Open Font License 1.1, ver Michroma-OFL.txt): fonte larga e geométrica, alternativa gratuita
// ao letreiro da Porsche (que é exclusivo da marca); usada nos títulos da aba principal
export const porscheFont = localFont({
  src: [{ path: "./Michroma-400.woff2", weight: "400", style: "normal" }],
  variable: "--font-porsche",
  display: "swap",
});
