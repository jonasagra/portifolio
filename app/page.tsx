"use client";

import { useEffect, useState } from "react";
import { Socials, MinecraftSocials } from "@/lib/socials";
import { MapPin } from "lucide-react";
import { TechMarquee } from "@/components/TechMarquee";

type TabId = "main" | "minecraft";

const TABS: { id: TabId; label: string; icon: (isDark: boolean) => string; pixel?: boolean }[] = [
  { id: "main", label: "Jonas Agra", icon: (isDark) => (isDark ? "/logo_symbol_dark.svg" : "/logo_symbol_light.svg") },
  { id: "minecraft", label: "Minecraft", icon: () => "/minecraft/grass-block.png", pixel: true },
];

function tabFromHash(): TabId {
  const hash = window.location.hash.replace("#", "");
  return TABS.some((tab) => tab.id === hash) ? (hash as TabId) : "main";
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("main");

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

  const isMinecraft = activeTab === "minecraft";

  return (
    <main className={`page-shell ${isDark ? "theme-dark" : "theme-light"} ${isMinecraft ? "tab-minecraft" : "tab-main"}`}>
      {isLoading && (
        <div className="loader" role="status" aria-label="Carregando página">
          <div className="loader-mark"><img src={isDark ? "/logo_symbol_dark.svg" : "/logo_symbol_light.svg"} alt="" /></div>
          <div className="spinner" />
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
                className={`tab-button ${activeTab === tab.id ? "is-active" : ""}`}
                onClick={() => selectTab(tab.id)}
              >
                <img src={tab.icon(isDark)} alt="" className={`tab-icon ${tab.pixel ? "pixelated" : ""}`} />
              </button>
            ))}
          </div>

          <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="tab-panel" key={activeTab}>
            {isMinecraft ? (
              <>
                <div className="hero-photo hero-photo-skin">
                  <img src="/minecraft/skin.webp" alt="Skin de Minecraft do Corelakes" className="hero-skin" />
                </div>
                <img className={`hero-logo hero-logo-corelakes ${isLoading ? "logo-loading" : "logo-ready"}`} src="/minecraft/corelakes-logo.webp" alt="Corelakes" />
                <div className="badge">
                  <p className="intro">Minecraft Wiki • Content Creator • Streamer</p>
                </div>
                <div className="separator"></div>
                <h1 className="hero-title">About Me</h1>
                <p className="summary">In the Minecraft world I go by Corelakes. I help run the Brazilian Minecraft Wiki, create content and stream on Twitch and YouTube.</p>
                <div className="separator"></div>
                <div className="social-actions" role="navigation">
                  {MinecraftSocials.map((social) => (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={social.name} title={social.name}>
                      <social.icon className="social-icon" />
                    </a>
                  ))}
                </div>
              </>
            ) : (
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
                  <p className="intro">Developer • Quality Assurance • Content Creator</p>
                </div>
                <div className="separator"></div>
                <h1 className="hero-title">About Me</h1>
                <p className="summary">I'm a 26-year-old developer from Brazil. I create online content, help manage online communities, and spend my free time coding. I love React, and figuring out how things work.</p>
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
        <span>© {new Date().getFullYear()} • {isMinecraft ? "Corelakes" : "Jonas Agra"}</span>
        <span><MapPin className="footer-pin" />João Pessoa, BR</span>
      </footer>
    </main>
  );
}
