# jonasagra-website

Site pessoal de **Jonas Agra** — portfólio de página única (one-page) com apresentação, stack, projetos e contato. Em produção em **[jonasagra.com.br](https://jonasagra.com.br)**.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | **Next.js 15** (App Router) |
| UI | **React 19** |
| Linguagem | **TypeScript 5.8** |
| Estilo | **Tailwind CSS 4** |
| Animações | **Motion** (Framer Motion) 12 · **GSAP** 3 |
| Ícones | **react-icons** 5 · **@lobehub/icons** 5 |
| Utilitários | clsx · tailwind-merge (helper `cn`) |
| Deploy | **Vercel** |

## Estrutura do projeto

```
app/
  layout.tsx      # metadados, Open Graph e JSON-LD (SEO)
  page.tsx        # renderiza <Home />
  globals.css     # estilos globais + animações (marquee)
  sitemap.ts      # gera /sitemap.xml
  robots.ts       # gera /robots.txt
components/
  Home.tsx        # página única: hero + todas as seções + footer
  Footer.tsx      # rodapé com ícones de redes sociais
lib/
  utils.ts        # cn() e helpers (saudação, link de WhatsApp)
  socials.ts      # lista das redes sociais (href + ícone)
public/           # imagens e assets (photo.png, wallpaper, etc.)
```

## Sitemap

Site de **página única**, então só existe uma rota indexável:

| URL | Frequência | Prioridade |
|---|---|---|
| `https://jonasagra.com.br/` | mensal | 1.0 |

O conteúdo está organizado em seções dentro dessa página:

1. **Hero** — nome, "Software Engineer" e foto (primeira tela)
2. **Sobre / O que faço** — apresentação e área de atuação (QA, dev web)
3. **Stack** — tecnologias e plataformas (carrosséis)
4. **IAs** — ferramentas de IA utilizadas
5. **Minecraft Wiki** — atuação como administrador da comunidade
6. **Música** — produção de música eletrônica
7. **Contato** — rodapé com redes sociais

### SEO

- `app/sitemap.ts` → gera **`/sitemap.xml`** automaticamente.
- `app/robots.ts` → gera **`/robots.txt`** (libera tudo e aponta para o sitemap).
- `app/layout.tsx` → metadados, Open Graph e dados estruturados (JSON-LD `Person`).

## Scripts

```bash
npm run dev      # ambiente de desenvolvimento (localhost:3000)
npm run build    # build de produção
npm run start    # roda o build de produção
npm run lint     # checagem do ESLint
```

## Rodando localmente

```bash
npm install
npm run dev
```

## Notas

- As dependências `express` e `@google/genai` estão no `package.json` mas **não são usadas** no código atual — candidatas a remoção.
