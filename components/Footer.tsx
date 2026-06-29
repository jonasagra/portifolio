import { SOCIALS } from '@/lib/socials';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 text-center">
      <p className="text-zinc-500 font-medium text-1xl m-2">Entre em contato comigo</p>
      {/* Ícones de redes sociais */}
        <nav
          aria-label="Redes sociais"
          className="mx-auto mb-4 flex max-w-xs sm:max-w-none flex-wrap items-center justify-center gap-5"
        >
        {SOCIALS.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={name}
            aria-label={name}
            className="text-zinc-500 transition-colors duration-300 hover:text-white"
          >
            <Icon aria-hidden="true" className="h-10 w-10" />
            <span className="sr-only">{name}</span>
          </a>
        ))}
      </nav>
      <p className="text-white font-extrabold text-xl uppercase">© 2026 Jonas Agra</p>
    </footer>
  );
}
