import localFont from "next/font/local";

// Monocraft (SIL Open Font License 1.1, ver Monocraft-OFL.txt): fonte inspirada no Minecraft, usada só na aba Minecraft
export const minecraftFont = localFont({
  src: [
    { path: "./Monocraft-Regular.woff2", weight: "400", style: "normal" },
    { path: "./Monocraft-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-minecraft",
  display: "swap",
});
