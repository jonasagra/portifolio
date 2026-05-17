
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Plus,
  Github,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Rocket,
  Globe,
  Cloud
} from "lucide-react";
import type { IconType } from "react-icons";
import { FaAws, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
  SiCloudflarepages,
  SiDigitalocean,
  SiGithubpages,
  SiGreensock,
  SiJavascript,
  SiNextdotjs,
  SiPrisma,
  SiTailwindcss,
  SiVercel,
  SiWordpress,
  SiClaude,
  SiGooglegemini,
  SiOpenai
} from "react-icons/si";
import { cn } from "@/src/lib/utils";
import PricingCard from "./components/PricingCard";
import { DeepSeek, Lovable, Codex, NotebookLM, NanoBanana, Figma, Cloudflare } from "@lobehub/icons";

gsap.registerPlugin(ScrollTrigger);

// --- Helpers ---


// --- Components ---

type LogoItem = {
  name: string;
  icon: IconType;
};

const LogoMarquee = ({ items, speed = 30, direction = "left" }: { items: LogoItem[], speed?: number, direction?: "left" | "right" }) => {
  return (
    <div className="relative flex overflow-hidden py-12 select-none group">
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-12",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        )}
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
      >
        {items.concat(items).map(({ name, icon: Icon }, i) => (
          <span
            key={i}
            className="inline-flex h-16 w-24 items-center justify-center text-zinc-700 hover:text-white transition-colors duration-300 md:h-20 md:w-32"
            title={name}
          >
            <Icon aria-hidden="true" className="h-10 w-10 md:h-14 md:w-14" />
            <span className="sr-only">{name}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const RevealText = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: -20, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    style={{ transformPerspective: 1000 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Smooth Reveal for sections
    const sections = gsap.utils.toArray<HTMLElement>(".reveal");
    sections.forEach((section) => {
      gsap.fromTo(section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-zinc-950 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-[20px] h-[72svh] md:h-screen md:min-h-[680px] w-full flex flex-col items-center justify-center bg-white overflow-hidden"
      >
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full bg-black" />
          <div className="w-1/2 h-full bg-white" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden mix-blend-difference z-0">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] font-black leading-none text-white tracking-tighter whitespace-nowrap text-center flex items-center justify-center h-full"
            style={{ fontFamily: '"Helvetica Now", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, sans-serif' }}
          >
            JONAS AGRA
          </motion.h1>
        </div>

        <div className="absolute inset-x-0 top-1/2 left-0 w-full flex justify-center pointer-events-none z-50 translate-y-[6vw] md:translate-y-[7vw] mix-blend-difference">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <h2
              className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase italic text-white"
              style={{ fontFamily: '"Helvetica Now", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, sans-serif' }}
            >
              SOFTWARE ENGINEER
            </h2>
            <p className="text-zinc-500 font-medium tracking-wide uppercase text-sm -mt-2">
              STUDENT
            </p>
          </motion.div>
        </div>

        <div className="absolute inset-0 z-10 flex items-end justify-center px-4 pointer-events-none">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-20 w-[min(104vw,34rem)] sm:w-[min(86vw,40rem)] md:w-[min(72vw,56rem)] lg:w-[min(66vw,64rem)] translate-x-[6vw] md:translate-x-0 pointer-events-auto"
          >
            <img
              src="/photo.png"
              alt="Jonas Agra"
              className="block w-full h-auto max-h-[122svh] md:max-h-[98vh] object-contain brightness-110 contrast-125 hero-photo-mask"
            />
          </motion.div>
        </div>
      </section>


      {/* 2. INTRO SECTION */}
      <section className="relative z-30 -mt-6 bg-zinc-950 px-10 pt-10 pb-20 md:-mt-8 md:pt-16 md:pb-48 overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-16">

        {/* Small Description */}
        <RevealText className="flex flex-col gap-2 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">About Me</p>
          <h3 className="text-2xl md:text-4xl font-semibold leading-relaxed">
            Olá, sou <span className="text-white">Jonas Agra</span>, tenho 25 anos, sou um estudante de Engenharia de Software. Entusiasta por tecnologia e desenvolvimento web.
          </h3>
        </RevealText>

        {/* Medium Description */}
        <RevealText delay={0.2} className="flex flex-col gap-6 ml-auto max-w-2xl text-right">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">Service Specialty</p>
          <h4 className="text-xl md:text-3xl font-medium text-zinc-400 leading-relaxed italic">
            Aqui, eu cuido do seu site, faço manutenção e criação de websites como landing pages e SaaS para gestão de pequenas e médias empresas usando React, Node.js, e um pouco de Python para otimização de dados.
          </h4>
        </RevealText>

        {/* English Phrase */}
        <RevealText delay={0.4} className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="relative group perspective-1000">
            <h5 className="text-5xl md:text-8xl font-black tracking-tighter text-white opacity-40 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:[transform:rotateX(10deg)_scale(1.05)] cursor-default">
              Managed hosting with me
            </h5>
            <div className="absolute -inset-10 bg-purple-600/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 rounded-full" />
          </div>
          <p className="text-zinc-500 font-medium tracking-wide uppercase text-sm mt-4">
            Hospedagem e manutenção gerenciada por mim.
          </p>
        </RevealText>
        </div>
      </section>

      {/* 3. LOGO MARQUEE SECTION */}
      <section className="py-5 bg-zinc-950 border-y border-white/5 -space-y-2">
        <LogoMarquee
          items={[
            { name: "WordPress", icon: SiWordpress },
            { name: "Vercel", icon: SiVercel },
            { name: "GitHub Pages", icon: SiGithubpages },
            { name: "Cloudflare Pages", icon: Cloudflare },
            { name: "Amazon AWS", icon: FaAws },
            { name: "DigitalOcean", icon: SiDigitalocean }
          ]}
          speed={30}
          direction="left"
        />
        <LogoMarquee
          items={[
            { name: "React", icon: FaReact },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "JavaScript", icon: SiJavascript },
            { name: "Python", icon: FaPython },
            { name: "Prisma", icon: SiPrisma },
            { name: "Tailwind CSS", icon: SiTailwindcss },
            { name: "Node.js", icon: FaNodeJs },
            { name: "GSAP", icon: SiGreensock }
          ]}
          speed={30}
          direction="right"
        />
      </section>

      {/* 3.1 Logotipos de IAs */}
      <section className="py-24 bg-zinc-950 border-y border-white/5">
      <p className="text-zinc-400 text-lg md:text-xl font-medium text-center">
        IAs e mais coisas que utilizo para otimizar <br />e potencializar os projetos.
      </p>
        <LogoMarquee
          items={[
            { name: "Claude", icon: SiClaude },
            { name: "Gemini", icon: SiGooglegemini },
            { name: "ChatGPT", icon: SiOpenai },
            { name: "DeepSeek", icon: DeepSeek },
            { name: "Lovable", icon: Lovable },
            { name: "Codex", icon: Codex },
            { name: "NotebookLM", icon: NotebookLM },
            { name: "NanoBanana", icon: NanoBanana },
            { name: "Figma", icon: Figma }
          ]}
          speed={20}
          direction="left"
        />

      </section>

      {/* Minecraft Section - Community Administrator */}
      <section className="relative py-24 bg-green-700 z-10 mt-16" style={{ backgroundImage: "url('/Background-HiDPI.png')" }}>
        {/* Minecraft.net Transition */}
        <div className="MC-Transition">
          <div className="MC-Transition-Fade"></div>
        </div>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="logo-Wiki-Container">
            <img src="/Wiki@2x.png" alt="Minecraft Wiki" className="block w-full h-auto max-h-[25svh] md:max-h-[50vh] object-contain" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Community Administrator
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-medium mt-6">
            Eu administro a comunidade da <a href="http://br.minecraft.wiki" className="text-white font-bold hover:text-blue-500 transition-all duration-200 ease-in-out">Minecraft Wiki</a> no Brasil. Um website gigante e colaborativo que contém informações sobre o jogo Minecraft, suas atualizações, mods, mapas, servidores e tudo relacionado ao universo do jogo. O site conta com mais de <span className="text-white font-bold">8 mil páginas</span> e mais de <span className="text-white font-bold">1 milhão de visualizações por mês</span>.
          </p>
        </div>
        <div className="Socials-Container p-2 mt-10 items-center justify-center">
          <a href='http://instagram.com/minecraftwikibr' ><img src="/Socials_Instagram.png" alt="Instagram" /></a>
          <a href='http://x.com/BRMinecraftWiki' ><img src="/Socials_X.png" alt="X" /></a>
          <a href='http://namemc.com/profile/Corelakes' ><img src="/Socials_NameMC.png" alt="NameMC" className="rounded-3xl"/></a>
        </div>
      </section>

      {/* 4. PRICING SECTION */}
      <section className="py-24 md:py-48 px-4 bg-vibrant relative overflow-hidden">
        {/* Geometric Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[150px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 blur-[150px] -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto">
          <RevealText className="text-center mb-16 md:mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-6">ESCOLHA SEU <span className="neon-text">PLANO</span></h2>
            <p className="text-zinc-400 max-w-xl mx-auto">Soluções escaláveis para cada etapa do seu negócio digital.</p>
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PricingCard
              name="Starter"
              price="20,90"
              oldPrice="79,90"
              variant="popular"
              features={[
                "1 Página",
                "Landing Page Responsiva",
                "Hospedagem em Vercel, GitHub Pages ou Cloudflare Pages",
                "Integração com WhatsApp",
                "Formulário de Contato",
                "SEO Básico",
                "Certificado SSL",
                "Suporte Básico"
              ]}
              delay={0.1}
            />
            <PricingCard
              name="Core"
              price="199,90"
              features={[
                "Até 3 Páginas",
                "Plataformas Modernas (WordPress/Bubble)",
                "Hospedagem Gerenciada",
                "Domínio Personalizado",
                "Integração Social Medias",
                "Formulários Avançados",
                "Otimização de Performance",
                "Suporte Intermediário"
              ]}
              delay={0.2}
            />
            <PricingCard
              name="Premium"
              price="349,90"
              features={[
                "Estrutura Avançada",
                "Painel Administrativo Simples",
                "Configuração WordPress Completa",
                "Dashboard Básico",
                "Integração com Gestão",
                "Design e UX Estratégico",
                "Suporte Prioritário",
                "Manutenção Avançada"
              ]}
              delay={0.3}
            />
            <PricingCard
              name="Business"
              price="499,90"
              features={[
                "Estrutura Empresarial Completa",
                "Hospedagem Premium Gerenciada",
                "Soluções Avançadas Bubble",
                "Integração com Recursos de IA",
                "Automação Inteligente",
                "E-Commerce Básico",
                "SEO Avançado",
                "Suporte e Manutenção Máxima"
              ]}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center">
        <p className="text-zinc-500 font-medium text-sm tracking-widest uppercase">
          Designed by <span className="text-white">Jonas Agra</span> © 2026
        </p>
      </footer>
    </main>
  );
}
