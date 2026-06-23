'use client';

import { motion } from 'motion/react';
import type { IconType } from 'react-icons';
import { FaAws, FaNodeJs, FaPython, FaReact, FaSpotify } from 'react-icons/fa';
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
  SiOpenai,
} from 'react-icons/si';
import { cn } from '@/lib/utils';
import { DeepSeek, Lovable, Codex, NotebookLM, NanoBanana, Figma, Cloudflare } from '@lobehub/icons';

type LogoItem = {
  name: string;
  icon: IconType;
};

const LogoMarquee = ({
  items,
  speed = 30,
  direction = 'left',
}: {
  items: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
}) => (
  <div className="relative flex overflow-hidden py-16 select-none group">
    <div
      className={cn(
        'flex min-w-full shrink-0 items-center justify-around gap-12',
        direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
      )}
      style={{ '--duration': `${speed}s` } as React.CSSProperties}
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

const RevealText = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: -20, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    style={{ transformPerspective: 1000 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-zinc-950 overflow-x-hidden">

      {/* INTRO SECTION */}
      <section className="relative z-30 mt-2 bg-zinc-950 px-10 pt-10 pb-20 md:-mt-8 md:pt-16 md:pb-48 overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-16">

          <RevealText className="flex flex-col gap-2 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">About Me</p>
            <h3 className="text-2xl md:text-4xl font-semibold leading-relaxed">
              Olá, sou <span className="text-white">Jonas Agra</span>, tenho 25 anos, estudante de Engenharia de Software apaixonado por tecnologia, desenvolvimento web e qualidade de software (QA).
            </h3>
          </RevealText>

          <RevealText delay={0.2} className="flex flex-col gap-6 ml-auto max-w-2xl text-right">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">What I Do</p>
            <h4 className="text-xl md:text-3xl font-medium text-zinc-400 leading-relaxed italic">
              Desenvolvo aplicações web, de landing pages a SaaS, com React, Next.js, Node.js e um pouco de Python. Tenho me dedicado a QA e testes, focado em construir software confiável e bem feito.
            </h4>
          </RevealText>

          <RevealText delay={0.4} className="flex flex-col items-center gap-4 py-12 text-center">
            <div className="relative group perspective-1000">
              <h5 className="text-5xl md:text-8xl font-black tracking-tighter text-white opacity-40 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:[transform:rotateX(10deg)_scale(1.05)] cursor-default">
                Quality-driven development
              </h5>
              <div className="absolute -inset-10 bg-purple-600/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 rounded-full" />
            </div>
            <p className="text-zinc-500 font-medium tracking-wide uppercase text-sm mt-4">
              Construo pensando em qualidade, do código aos testes.
            </p>
          </RevealText>
        </div>
      </section>

      {/* LOGO MARQUEE SECTION */}
      <section className="py-5 bg-zinc-950 border-y border-white/5 -space-y-2">
        <LogoMarquee
          items={[
            { name: 'WordPress', icon: SiWordpress },
            { name: 'Vercel', icon: SiVercel },
            { name: 'GitHub Pages', icon: SiGithubpages },
            { name: 'Cloudflare Pages', icon: Cloudflare },
            { name: 'Amazon AWS', icon: FaAws },
            { name: 'DigitalOcean', icon: SiDigitalocean },
          ]}
          speed={30}
          direction="left"
        />
        <LogoMarquee
          items={[
            { name: 'React', icon: FaReact },
            { name: 'Next.js', icon: SiNextdotjs },
            { name: 'JavaScript', icon: SiJavascript },
            { name: 'Python', icon: FaPython },
            { name: 'Prisma', icon: SiPrisma },
            { name: 'Tailwind CSS', icon: SiTailwindcss },
            { name: 'Node.js', icon: FaNodeJs },
            { name: 'GSAP', icon: SiGreensock },
          ]}
          speed={30}
          direction="right"
        />
      </section>

      {/* AI TOOLS MARQUEE */}
      <section className="py-5 bg-zinc-950 border-y border-white/5">
        <p className="text-zinc-400 text-lg md:text-xl font-medium text-center">
          IAs e mais coisas que utilizo para otimizar <br />e potencializar os projetos.
        </p>
        <LogoMarquee
          items={[
            { name: 'Claude', icon: SiClaude },
            { name: 'Gemini', icon: SiGooglegemini },
            { name: 'ChatGPT', icon: SiOpenai },
            { name: 'DeepSeek', icon: DeepSeek },
            { name: 'Lovable', icon: Lovable },
            { name: 'Codex', icon: Codex },
            { name: 'NotebookLM', icon: NotebookLM },
            { name: 'NanoBanana', icon: NanoBanana },
            { name: 'Figma', icon: Figma },
          ]}
          speed={20}
          direction="left"
        />
      </section>

      {/* MINECRAFT SECTION */}
      <section
        className="relative py-24 bg-green-700 z-10 mt-16"
        style={{ backgroundImage: "url('/Background-HiDPI.png')" }}
      >
        <div className="MC-Transition">
          <div className="MC-Transition-Fade"></div>
        </div>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="logo-Wiki-Container">
            <img
              src="/Wiki@2x.png"
              alt="Minecraft Wiki"
              className="block w-full h-auto max-h-[25svh] md:max-h-[50vh] object-contain"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Community Administrator</h2>
          <p className="text-zinc-400 text-lg md:text-xl font-medium mt-6">
            Eu administro a comunidade da{' '}
            <a href="http://br.minecraft.wiki" className="text-white font-bold hover:text-blue-500 transition-all duration-200 ease-in-out">
              Minecraft Wiki
            </a>{' '}
            no Brasil. Um website gigante e colaborativo que contém informações sobre o jogo Minecraft, suas atualizações, mods, mapas, servidores e tudo relacionado ao universo do jogo. O site conta com mais de{' '}
            <span className="text-white font-bold">8 mil páginas</span> e mais de{' '}
            <span className="text-white font-bold">1 milhão de visualizações por mês</span>.
          </p>
          <p className="text-zinc-400 text-lg md:text-xl font-medium mt-6">
            Minha trajetória no Minecraft começou em 2020 com a{' '}
            <span className="text-white font-bold">Minecraft Interessante</span>, uma página de conteúdo e curiosidades que criei no Facebook e que chegou a mais de{' '}
            <span className="text-white font-bold">20 mil curtidas</span> antes de ser encerrada em 2021. Hoje atuo como administrador e burocrata da wiki sob o pseudônimo{' '}
            <span className="text-white font-bold">Corelakes</span>.
          </p>
        </div>
        <div className="Socials-Container p-2 mt-10 items-center justify-center">
          <a href="http://instagram.com/minecraftwikibr">
            <img src="/Socials_Instagram.png" alt="Instagram" />
          </a>
          <a href="http://x.com/BRMinecraftWiki">
            <img src="/Socials_X.png" alt="X" />
          </a>
          <a href="http://namemc.com/profile/Corelakes">
            <img src="/Socials_NameMC.png" alt="NameMC" className="rounded-3xl" />
          </a>
        </div>
      </section>

      {/* MUSIC SECTION */}
      <section className="relative z-30 py-24 bg-zinc-950 px-10 overflow-hidden">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-500">Music Producer</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Música Eletrônica</h2>
          <p className="text-zinc-400 text-lg md:text-xl font-medium">
            Produzo música eletrônica desde 2017, com faixas como{' '}
            <span className="text-white font-semibold">Cabedelo</span>,{' '}
            <span className="text-white font-semibold">Chinatown</span> e{' '}
            <span className="text-white font-semibold">Cave on Hub</span>.
          </p>
          <a
            href="https://open.spotify.com/intl-pt/artist/1CHO0ZLJs1YX3IlDotU2Be"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-green-600 px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-green-500"
          >
            <FaSpotify className="h-6 w-6" />
            Ouça no Spotify
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center">
        <p className="text-zinc-500 font-medium text-sm">
          Criado por <span className="text-white tracking-widest uppercase">Jonas Agra</span> © 2026
          <br />
          <span className="text-gray-500 font-normal text-xs">Todos os direitos reservados.</span>
        </p>
      </footer>
    </main>
  );
}
