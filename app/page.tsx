"use client";

import { useEffect, useState } from "react";
import { Socials } from "@/lib/socials";
import { MapPin } from "lucide-react";
import { CreeperIcon } from "@/components/CreeperIcon";
import { TechMarquee } from "@/components/TechMarquee";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(savedTheme ? savedTheme === "dark" : prefersDark);

    const timer = window.setTimeout(() => setIsLoading(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  function toggleTheme() {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
  }

  return (
    <main className={`page-shell ${isDark ? "theme-dark" : "theme-light"}`}>
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
          <div className="hero-photo">
            {isDark ? (
              <img src="photo.png" alt="Foto de Jonas Agra" className="hero-image" />
            ) : (
              <img src="photo_light.png" alt="Foto de Jonas Agra" className="hero-image" />
            )}
          </div>
          <img className={`hero-logo ${isLoading ? "logo-loading" : "logo-ready"}`} src={isDark ? "/logo_dark.svg" : "/logo_light.svg"} alt="Jonas Agra" />
          <div className="badge">
            <p className="intro">Software Engineer student • Quality Assurance • Content Creator</p>
          </div>
          <div className="separator"></div>
          <h1 className="hero-title">About Me</h1>
          <p className="summary">I'm a 26-year-old software engineering student from Brazil. I create online content, help manage online communities including Minecraft's, and spend my free time coding. I love React, and figuring out how things work.</p>
          <div className="separator"></div>
          <div className="social-actions" role="navigation">
            {Socials.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={social.name}>
                <social.icon className="social-icon" />
              </a>
            ))}
            <a href="https://corelakes.jonasagra.com.br" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Minecraft">
              <CreeperIcon className="social-icon" />
            </a>
          </div>
          <div className="separator"></div>
            <TechMarquee />
          <div className="separator"></div>
          <h2 className="hero-title">My projects</h2>
          <div className="projects">
            <a href="https://br.minecraft.wiki/User:Corelakes" target="_blank" rel="noopener noreferrer" className="mcw-project-logo">
              <img src="/Wiki@2x.png" alt="Minecraft Wiki Brasil" className="projects-logos" />
              <p className="project-descriptions">Representative<br /> Administrator</p>
            </a>
            <a href="https://achadinhos.jonasagra.com.br" target="_blank" rel="noopener noreferrer" className="adj-project-logo">
              {isDark ? (
                <img src="/logo-w.png" alt="Achadinhos do Jonas (ADJ)" className="projects-logos" />
              ) : (
                <img src="/logo-black.svg" alt="Achadinhos do Jonas (ADJ)" className="projects-logos" />
              )}
              <p className="project-descriptions">Founder</p>
            </a>
          </div>
        </div>
      </div>

      <footer>
        <span>© {new Date().getFullYear()} • Jonas Agra</span>
        <span><MapPin className="footer-pin" />João Pessoa, BR</span>
      </footer>
    </main>
  );
}