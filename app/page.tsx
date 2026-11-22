"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Socials, MinecraftSocials, NubankSocials, LINKEDIN_URL } from "@/lib/socials";
import { ChevronRight, MapPin } from "lucide-react";
import { TechMarquee } from "@/components/TechMarquee";
import { minecraftFont } from "./fonts/minecraft";
import { nubankFont } from "./fonts/nubank";

type TabId = "main" | "minecraft" | "nubank";

const TABS: { id: TabId; label: string; icon: (isDark: boolean) => string; pixel?: boolean }[] = [
  { id: "main", label: "Jonas Agra", icon: (isDark) => (isDark ? "/logo_symbol_dark.svg" : "/logo_symbol_light.svg") },
  { id: "minecraft", label: "Minecraft", icon: () => "/minecraft/grass-block.png", pixel: true },
  { id: "nubank", label: "Nubank", icon: () => "/nubank/nubank-logo.svg" },
];

// Nuvens em blocos (largura em px da arte; cada px é ampliado no CSS)
const MC_CLOUDS = [
  { name: "cloud-3", w: 36, top: "8%", dur: 95, delay: -20 },
  { name: "cloud-1", w: 30, top: "22%", dur: 75, delay: -50 },
  { name: "cloud-4", w: 12, top: "40%", dur: 60, delay: -10 },
  { name: "cloud-2", w: 18, top: "56%", dur: 85, delay: -65 },
  { name: "cloud-1", w: 30, top: "4%", dur: 110, delay: -80 },
  { name: "cloud-4", w: 12, top: "66%", dur: 70, delay: -40 },
];

// Contagem de edições na Minecraft Wiki em português (app/api/wiki-edits consulta a API do MediaWiki)
const WIKI_EDITCOUNT_API = "/api/wiki-edits";

function tabFromHash(): TabId {
  const hash = window.location.hash.replace("#", "");
  return TABS.some((tab) => tab.id === hash) ? (hash as TabId) : "main";
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("main");
  const [horizon, setHorizon] = useState<number | null>(null);
  const [wikiEdits, setWikiEdits] = useState<number | null>(null);
  const shellRef = useRef<HTMLElement>(null);
  const corelakesLogoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(savedTheme ? savedTheme === "dark" : prefersDark);
    setActiveTab(tabFromHash());

    const onHashChange = () => setActiveTab(tabFromHash());
    window.addEventListener("hashchange", onHashChange);

    const timer = window.setTimeout(() => setIsLoading(false), 1200);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    if (activeTab !== "minecraft" || wikiEdits !== null) return;
    const controller = new AbortController();
    fetch(WIKI_EDITCOUNT_API, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const count = data?.editcount;
        if (typeof count === "number") setWikiEdits(count);
      })
      .catch(() => {
        /* sem rede: o texto usa o valor aproximado */
      });
    return () => controller.abort();
  }, [activeTab, wikiEdits]);

  // Na aba Minecraft, a linha da grama fica na base do logo do Corelakes (o logo "pisa" na grama)
  useEffect(() => {
    if (activeTab !== "minecraft") return;
    const measure = () => {
      const shell = shellRef.current;
      const logo = corelakesLogoRef.current;
      if (!shell || !logo) return;
      const top = logo.getBoundingClientRect().top - shell.getBoundingClientRect().top;
      setHorizon(Math.round(top + logo.offsetHeight * 0.88));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (shellRef.current) observer.observe(shellRef.current);
    if (corelakesLogoRef.current) observer.observe(corelakesLogoRef.current);
    // mede de novo quando a animação de entrada da aba termina
    const settle = window.setTimeout(measure, 400);
    return () => {
      observer.disconnect();
      window.clearTimeout(settle);
    };
  }, [activeTab]);

  function toggleTheme() {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
  }

  function selectTab(id: TabId) {
    setActiveTab(id);
    const url = id === "main" ? window.location.pathname : `#${id}`;
    window.history.replaceState(null, "", url);
  }

  const footerName = activeTab === "minecraft" ? "Corelakes" : "Jonas Agra";

  return (
    <main ref={shellRef} className={`page-shell ${minecraftFont.variable} ${nubankFont.variable} ${isDark ? "theme-dark" : "theme-light"} tab-${activeTab}`}>
      {isLoading && (
        <div className="loader" role="status" aria-label="Carregando página">
          <div className="loader-mark"><img src={isDark ? "/logo_symbol_dark.svg" : "/logo_symbol_light.svg"} alt="" /></div>
          <div className="spinner" />
        </div>
      )}

      {activeTab === "minecraft" && (
        <div className="mc-world" aria-hidden="true" style={horizon !== null ? ({ "--horizon": `${horizon}px` } as CSSProperties) : undefined}>
          <div className="mc-sky" />
          <div className="mc-ground" />
          <div className="mc-stone" />
          <div className="mc-cloud-layer">
            <img src={isDark ? "/minecraft/moon.png" : "/minecraft/sun.png"} alt="" className={`mc-celestial ${isDark ? "is-moon" : "is-sun"}`} />
            {MC_CLOUDS.map((cloud, i) => (
              <img
                key={i}
                src={`/minecraft/${cloud.name}.png`}
                alt=""
                className="mc-cloud"
                style={{ "--cw": cloud.w, top: cloud.top, animationDuration: `${cloud.dur}s`, animationDelay: `${cloud.delay}s` } as CSSProperties}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "nubank" && (
        <div className="nu-decor" aria-hidden="true">
          <div className="nu-orb nu-orb-1" />
          <div className="nu-orb nu-orb-2" />
          <div className="nu-orb nu-orb-3" />
          <div className="nu-grid" />
          <img src="/nubank/nubank-logo.svg" alt="" className="nu-watermark nu-watermark-1" />
          <img src="/nubank/nubank-logo.svg" alt="" className="nu-watermark nu-watermark-2" />
          <img src="/nubank/nubank-logo.svg" alt="" className="nu-watermark nu-watermark-3" />
          {/* Filtro duotone roxo para a foto (sombras roxo-escuro, luzes lilás), misturado 75% com a foto original */}
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <filter id="nu-duotone" colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" result="gray" />
              <feComponentTransfer in="gray" result="duo">
                <feFuncR type="table" tableValues="0.10 0.553 0.957" />
                <feFuncG type="table" tableValues="0.012 0.051 0.91" />
                <feFuncB type="table" tableValues="0.19 0.89 1" />
              </feComponentTransfer>
              <feComposite in="duo" in2="SourceGraphic" operator="arithmetic" k1="0" k2="0.75" k3="0.25" k4="0" />
            </filter>
          </svg>
        </div>
      )}

      <nav className="topbar" aria-label="Navegação principal">
        <button className="theme-toggle" onClick={toggleTheme} aria-label={`Ativar modo ${isDark ? "claro" : "escuro"}`}>
          <span className="theme-icon" aria-hidden="true">{isDark ? "☼" : "◐"}</span>
          <span>{isDark ? "Light" : "Dark"}</span>
        </button>
      </nav>

      <div className="hero" id="inicio">
        <div className="hero-copy">
          <div className="tab-switcher" role="tablist" aria-label="Seções do perfil">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls="tab-panel"
                aria-label={tab.label}
                title={tab.label}
                className={`tab-button tab-button-${tab.id} ${activeTab === tab.id ? "is-active" : ""}`}
                onClick={() => selectTab(tab.id)}
              >
                <img src={tab.icon(isDark)} alt="" className={`tab-icon ${tab.pixel ? "pixelated" : ""}`} />
              </button>
            ))}
          </div>

          <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="tab-panel" key={activeTab}>
            {activeTab === "minecraft" && (
              <>
                <div className="hero-photo hero-photo-skin">
                  <img src="/minecraft/skin.webp" alt="Skin de Minecraft do Corelakes" className="hero-skin" />
                </div>
                <img
                  ref={corelakesLogoRef}
                  className={`hero-logo hero-logo-corelakes ${isLoading ? "logo-loading" : "logo-ready"}`}
                  src="/minecraft/corelakes-logo.webp"
                  alt="Corelakes"
                />
                <div className="badge">
                  <p className="intro">Admin &amp; Bureaucrat @ Minecraft Wiki</p>
                </div>
                <div className="separator"></div>
                <h1 className="hero-title">About Me</h1>
                <p className="summary">In the Minecraft world I go by Corelakes. I&apos;ve been editing the Portuguese Minecraft Wiki since 2020, with {wikiEdits !== null ? (<a className="wiki-edits" href="https://pt.minecraft.wiki/w/Especial:Contribui%C3%A7%C3%B5es/Corelakes" target="_blank" rel="noopener noreferrer">{wikiEdits.toLocaleString("en-US")} edits</a>) : "more than 16,500 edits"}, and I&apos;ve been one of its administrators and bureaucrats since 2023.</p>
                <div className="separator"></div>
                <div className="social-actions" role="navigation">
                  {MinecraftSocials.map((social) => (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={social.name} title={social.name}>
                      <social.icon className="social-icon" />
                    </a>
                  ))}
                </div>
              </>
            )}

            {activeTab === "nubank" && (
              <>
                <div className="hero-photo">
                  <img src={isDark ? "photo.png" : "photo_light.png"} alt="Foto de Jonas Agra" className="hero-image nu-photo" />
                </div>
                <div className={`hero-logo nu-logo ${isLoading ? "logo-loading" : "logo-ready"}`} role="img" aria-label="Jonas Agra" />
                <div className="badge">
                  <p className="intro">Collections Specialist @ Nubank</p>
                </div>
                <div className="separator"></div>
                <h1 className="hero-title">About Me</h1>
                <p className="summary">Since September 2024 I&apos;ve been a Collections Specialist at Nubank, outsourced through AeC. Alongside the job, I&apos;m studying Quality Assurance and I keep building things for the web.</p>
                <section className="nu-block" aria-label="Experiência no Nubank">
                  <div className="nu-block-head">
                    <img src="/nubank/nubank-logo.svg" alt="Nubank" className="nu-block-logo" />
                    <span className="nu-block-divider" aria-hidden="true" />
                    <img src="/nubank/aec-logo-white.png" alt="AeC" className="nu-block-logo nu-block-logo-aec" />
                  </div>
                  <p className="nu-block-eyebrow">Since Sep 2024 · Indirect contract</p>
                  <h2 className="nu-block-title">Collections Specialist at&nbsp;Nubank</h2>
                  <p className="nu-block-text">Outsourced through AeC, working in the collections team of Nubank, a Brazilian digital bank.</p>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="nu-button">
                    View on LinkedIn
                    <ChevronRight className="nu-button-icon" aria-hidden="true" />
                  </a>
                </section>
                <div className="separator"></div>
                <div className="social-actions" role="navigation">
                  {NubankSocials.map((social) => (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={social.name}>
                      <social.icon className="social-icon" />
                    </a>
                  ))}
                </div>
              </>
            )}

            {activeTab === "main" && (
              <>
                <div className="hero-photo">
                  {isDark ? (
                    <img src="photo.png" alt="Foto de Jonas Agra" className="hero-image" />
                  ) : (
                    <img src="photo_light.png" alt="Foto de Jonas Agra" className="hero-image" />
                  )}
                </div>
                <img className={`hero-logo ${isLoading ? "logo-loading" : "logo-ready"}`} src={isDark ? "/logo_dark.svg" : "/logo_light.svg"} alt="Jonas Agra" />
                <div className="badge">
                  <p className="intro">QA Student • Web Developer • JavaScript &amp; React</p>
                </div>
                <div className="separator"></div>
                <h1 className="hero-title">About Me</h1>
                <p className="summary">I&apos;m a 26-year-old developer from João Pessoa, Brazil, moving into Quality Assurance. I already do manual testing and bug reporting with Jira, and I&apos;m learning Cypress and TypeScript. My strongest side is the web: JavaScript and React.</p>
                <div className="separator"></div>
                <div className="social-actions" role="navigation">
                  {Socials.map((social) => (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={social.name}>
                      <social.icon className="social-icon" />
                    </a>
                  ))}
                </div>
                <div className="separator"></div>
                <TechMarquee />
              </>
            )}
          </div>
        </div>
      </div>

      <footer>
        <span>© {new Date().getFullYear()} • {footerName}</span>
        <span><MapPin className="footer-pin" />João Pessoa, BR</span>
      </footer>
    </main>
  );
}
