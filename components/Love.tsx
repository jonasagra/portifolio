"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

// Namoro com a Ana: começou em 9 de novembro de 2026 (horário de João Pessoa, UTC-3)
const START = new Date("2026-11-09T00:00:00-03:00").getTime();

type Elapsed = { days: number; h: number; m: number; s: number };

function getElapsed(): Elapsed {
  const diff = Math.max(0, Date.now() - START);
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

// Contador ao vivo (só no navegador, para não divergir da versão gerada no servidor)
function useElapsed() {
  const [elapsed, setElapsed] = useState<Elapsed | null>(null);
  useEffect(() => {
    setElapsed(getElapsed());
    const id = window.setInterval(() => setElapsed(getElapsed()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return elapsed;
}

const pad = (n: number) => String(n).padStart(2, "0");
const clock = (e: Elapsed) => `${pad(e.h)}:${pad(e.m)}:${pad(e.s)}`;

// Coração em pixel art (9x8), desenhado à mão: contorno escuro, vermelho e brilho
const PIXEL_HEART = [
  ".##...##.",
  "#hh#.#rr#",
  "#hrr#rrr#",
  "#rrrrrrr#",
  ".#rrrrr#.",
  "..#rrr#..",
  "...#r#...",
  "....#....",
];
const PIXEL_COLORS: Record<string, string> = { "#": "#3a0d0d", r: "#e3262b", h: "#ffb4b4" };

function PixelHeart() {
  return (
    <svg className="love-icon" viewBox="0 0 9 8" shapeRendering="crispEdges" aria-hidden="true">
      {PIXEL_HEART.flatMap((row, y) =>
        row.split("").map((c, x) => (c in PIXEL_COLORS ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={PIXEL_COLORS[c]} /> : null)),
      )}
    </svg>
  );
}

function Heart({ className = "love-icon love-heartbeat" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.1c2.1-.2 3.9.9 5.4 2.8 1.5-1.9 3.3-3 5.4-2.8 3.7.4 5.7 4.3 4.2 7.7C19.5 16.4 12 21 12 21z"
      />
    </svg>
  );
}

// Cartão adicional do Nubank com o nome da Ana e o contador, no estilo dos mockups do nubank.com.br:
// cartão em pé, inclinado no espaço, flutuando; inclina mais seguindo o ponteiro
function AdditionalCard({ elapsed }: { elapsed: Elapsed | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 16, y: px * 20, active: true });
  }

  return (
    <div className="nu-card-scene" onPointerMove={onMove} onPointerLeave={() => setTilt({ x: 0, y: 0, active: false })}>
      <div
        ref={ref}
        className={`nu-card3d ${tilt.active ? "is-tilting" : ""}`}
        style={{ "--rx": `${tilt.x}deg`, "--ry": `${tilt.y}deg`, "--gx": `${50 + tilt.y * 2}%`, "--gy": `${35 - tilt.x * 2}%` } as CSSProperties}
        role="img"
        aria-label={`Cartão adicional do Nubank com o nome Ana${elapsed ? `, juntos há ${elapsed.days} dias` : ""}`}
      >
        <div className="nu-card3d-shine" />
        {/* dois corações sobrepostos (vermelho e amarelo) no lugar da bandeira: os dois */}
        <svg className="nu-card3d-hearts" viewBox="0 0 40 24" aria-hidden="true">
          <path fill="#e5283a" d="M12 22S3 16.6 1.2 11.3C-.4 6.8 2 2.2 6.3 2c2.4-.1 4.3 1.2 5.7 3.3C13.4 3.2 15.3 1.9 17.7 2c4.3.2 6.7 4.8 5.1 9.3C21 16.6 12 22 12 22z" />
          <path fill="#f5b731" fillOpacity="0.88" d="M28 22s-9-5.4-10.8-10.7C15.6 6.8 18 2.2 22.3 2c2.4-.1 4.3 1.2 5.7 3.3C29.4 3.2 31.3 1.9 33.7 2c4.3.2 6.7 4.8 5.1 9.3C37 16.6 28 22 28 22z" />
        </svg>
        <svg className="nu-card3d-chip" viewBox="0 0 30 38" aria-hidden="true">
          <rect x="0.75" y="0.75" width="28.5" height="36.5" rx="5" fill="url(#chipgrad)" stroke="#8d8a93" strokeWidth="1.5" />
          <path d="M10 1v11M20 1v11M10 26v11M20 26v11M1 13h8M21 13h8M1 25h8M21 25h8M9 13c3-3 9-3 12 0v12c-3 3-9 3-12 0z" fill="none" stroke="#8d8a93" strokeWidth="1.2" />
          <defs>
            <linearGradient id="chipgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f2f0f5" />
              <stop offset="0.5" stopColor="#c9c5cf" />
              <stop offset="1" stopColor="#ecebee" />
            </linearGradient>
          </defs>
        </svg>
        <div className="nu-card3d-holder">
          <span className="nu-card3d-name">Ana</span>
          <span className="nu-card3d-counter">{elapsed ? `${elapsed.days}d ${clock(elapsed)}` : "\u00a0"}</span>
          <span className="nu-card3d-since">together since 09.11.2026</span>
        </div>
        <img src="/nubank/nubank-logo.svg" alt="" className="nu-card3d-logo" />
      </div>
    </div>
  );
}

export function Love({ variant }: { variant: "main" | "minecraft" | "nubank" }) {
  const elapsed = useElapsed();

  if (variant === "minecraft") {
    // Mensagens de chat: entrada da Ana e o "dia" do mundo (dia 1 = 9 de novembro)
    return (
      <div className="love love-minecraft" aria-live="off">
        <p>
          <PixelHeart />
          <span>Ana joined the game</span>
        </p>
        <p className="love-minecraft-day">{elapsed ? `Day ${elapsed.days + 1} · ${clock(elapsed)}` : "Day 1"}</p>
      </div>
    );
  }

  if (variant === "nubank") {
    return (
      <div className="love-nubank">
        <AdditionalCard elapsed={elapsed} />
      </div>
    );
  }

  return (
    <p className="love love-main">
      <Heart />
      <span>Dating Ana</span>
      {elapsed && (
        <span className="love-counter">
          {elapsed.days}d {clock(elapsed)}
        </span>
      )}
    </p>
  );
}
