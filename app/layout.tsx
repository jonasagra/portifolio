import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jonas Agra | Developer',
  description: 'Desenvolvedor de sites e aplicações e um estudante de Engenharia de Software',
  keywords: ['Jonas Agra', 'developer', 'desenvolvedor', 'site', 'aplicação', 'programação', 'minecraft', 'minecraft wiki', 'corelakes', 'servidor', 'sites baratos', 'desenvolvedor de sites'],
  authors: [{ name: 'Jonas Agra' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Jonas Agra | Developer',
    description: 'Desenvolvedor de sites e aplicações e um estudante de Engenharia de Software',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  );
}
