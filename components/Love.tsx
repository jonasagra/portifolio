// Detalhe discreto do namoro com a Ana, com um visual para cada aba.

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

function Heart() {
  return (
    <svg className="love-icon love-heartbeat" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.1c2.1-.2 3.9.9 5.4 2.8 1.5-1.9 3.3-3 5.4-2.8 3.7.4 5.7 4.3 4.2 7.7C19.5 16.4 12 21 12 21z"
      />
    </svg>
  );
}

function Ring() {
  return (
    <svg className="love-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M9.2 2.5h5.6l2 2.8-4.8 3.9-4.8-3.9z" />
      <circle cx="12" cy="15" r="6.2" fill="none" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

export function Love({ variant }: { variant: "main" | "minecraft" | "nubank" }) {
  if (variant === "minecraft") {
    return (
      <p className="love love-minecraft">
        <PixelHeart />
        <span>Ana joined the game</span>
      </p>
    );
  }
  if (variant === "nubank") {
    return (
      <p className="love love-nubank">
        <Ring />
        <span>Dating Ana</span>
      </p>
    );
  }
  return (
    <p className="love love-main">
      <Heart />
      <span>Dating Ana</span>
    </p>
  );
}
