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

// Cartão adicional do Nubank com o nome da Ana: inclina em 3D seguindo o ponteiro e flutua parado
function AdditionalCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 18, y: px * 22, active: true });
  }

  return (
    <div className="nu-card-scene" onPointerMove={onMove} onPointerLeave={() => setTilt({ x: 0, y: 0, active: false })}>
      <div
        ref={ref}
        className={`nu-card3d ${tilt.active ? "is-tilting" : ""}`}
        style={{ "--rx": `${tilt.x}deg`, "--ry": `${tilt.y}deg`, "--gx": `${50 + tilt.y * 2}%`, "--gy": `${50 - tilt.x * 2}%` } as CSSProperties}
        role="img"
        aria-label="Cartão adicional do Nubank com o nome Ana"
      >
        <div className="nu-card3d-shine" />
        <img src="/nubank/nubank-logo.svg" alt="" className="nu-card3d-logo" />
        <Heart className="nu-card3d-heart" />
        <div className="nu-card3d-chip" />
        <svg className="nu-card3d-contactless" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 7.5a6 6 0 0 1 0 9M11.5 5a9.5 9.5 0 0 1 0 14M15 2.5a13 13 0 0 1 0 19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <div className="nu-card3d-holder">
          <span className="nu-card3d-label">Additional card</span>
          <span className="nu-card3d-name">ANA</span>
        </div>
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
        <AdditionalCard />
        <p className="love-nubank-since">
          Together since Nov 9, 2026
          {elapsed && (
            <>
              {" · "}
              <strong>
                {elapsed.days}d {clock(elapsed)}
              </strong>
            </>
          )}
        </p>
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
