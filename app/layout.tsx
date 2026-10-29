import type { Metadata } from 'next';
import "./globals.css";

const description =
  'Jonas Agra — desenvolvedor independente de João Pessoa (PB), entusiasta de programação e desenvolvimento web.';
// Antigo (oculto): 'Jonas Agra — estudante de Engenharia de Software com foco em QA, desenvolvedor web, produtor de música eletrônica e administrador da Minecraft Wiki Brasil (Corelakes).'

export const metadata: Metadata = {
  metadataBase: new URL('https://jonasagra.com.br'),
  title: 'Jonas Agra | Developer',
  description,
  keywords: ['Jonas Agra', 'Corelakes', 'developer', 'desenvolvedor', 'desenvolvedor independente', 'programação', 'desenvolvimento web', 'João Pessoa'],
  // Antigas (ocultas): 'QA', 'software', 'minecraft', 'minecraft wiki', 'música eletrônica', 'engenharia de software'
  authors: [{ name: 'Jonas Agra' }],
  robots: 'index, follow',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon_dark.svg', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon_light.svg', media: '(prefers-color-scheme: light)' },
    ],
  },
  openGraph: {
    title: 'Jonas Agra | Developer',
    description,
    url: 'https://jonasagra.com.br',
    siteName: 'Jonas Agra',
    type: 'website',
    locale: 'pt_BR',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jonas Agra',
  alternateName: 'Corelakes',
  url: 'https://jonasagra.com.br',
  jobTitle: 'Desenvolvedor independente', // antigo: 'Estudante de Engenharia de Software'
  address: { '@type': 'PostalAddress', addressLocality: 'João Pessoa', addressRegion: 'PB', addressCountry: 'BR' },
  description,
  sameAs: [
    // 'https://open.spotify.com/intl-pt/artist/1CHO0ZLJs1YX3IlDotU2Be', // oculto
    'https://github.com/jonasagra',
    // 'https://br.minecraft.wiki/User:Corelakes', // oculto
    // 'https://corelakes.jonasagra.com.br', // oculto
    // 'https://namemc.com/profile/Corelakes', // oculto
    'https://instagram.com/jnasagr',
    'https://www.linkedin.com/in/jonasagra/',
    // 'https://music.amazon.com.br/artists/B0925P28GL/jonas-agra', // oculto
    'https://www.facebook.com/jonasagrabr/?locale=pt_PT',
    'https://x.com/jonasagra',
    'https://x.com/corelakes',
    'https://www.twitch.tv/corelakes',
    'https://youtube.com/@corelakes',
    'https://www.youtube.com/@jonazagra',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}