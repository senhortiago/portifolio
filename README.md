# Portfólio — Tiago Barcelos

Angular 19 (standalone + Signals), Tailwind CSS, Zod e Lenis.

## Rodando

```bash
npm install
npm start          # http://localhost:4200
npm run build      # saída em dist/portfolio/browser
```

## Onde trocar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Projetos (validados por Zod) | `public/data/projects.json` |
| Currículo em PDF | `public/cv/tiago-barcelos-cv.pdf` (mantenha o nome) |
| Vídeo do hero (fundo verde) | `public/media/hero-video.mp4` |
| Redes sociais e links | `src/core/constants/links.constant.ts` |
| Nome, cargo, disponibilidade | `src/core/constants/brand.constant.ts` |
| Trajetória (anos e textos) | `src/modules/home/sections/journey/journey.config.ts` |
| Frases do hero | `src/modules/home/sections/hero/hero.config.ts` |
| Paleta de cores (Design Tokens) | `tailwind.config.js` |
| Ligar/desligar recursos | `src/core/constants/feature-flags.constant.ts` |

Se trocar o vídeo e a cor do fundo verde mudar, ajuste `keyColor` em
`src/components/elements/chroma-video/chroma-video.config.ts`.
