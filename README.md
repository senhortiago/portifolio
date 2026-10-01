# Portfólio — Tiago Barcelos

Site pessoal de portfólio de **Tiago Barcelos**, desenvolvedor de software (Java, Spring Boot, Python e Angular), em Rio de Janeiro. É uma *single page* em português (pt-BR) com cinco seções, animações suaves, formulário de contato com anti-spam e SEO completo.

Produção: <https://devleal.tech>

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Angular 19 — componentes *standalone*, Signals, `OnPush`, rotas com *lazy loading* |
| Estilo | Tailwind CSS 3 (Design Tokens em `tailwind.config.js`) + PostCSS/Autoprefixer |
| Validação de dados | Zod 4 (valida o `projects.json` ao carregar) |
| Scroll suave | Lenis |
| Renderização | Pré-renderização (SSR/prerender via `@angular/ssr`) para SEO |
| Formulário | EmailJS (envio direto do browser) + Google reCAPTCHA v2 |
| Linguagem | TypeScript 5.7 |
| Testes | Jasmine + Karma |
| Fontes | Inter, JetBrains Mono e Schoolbell (Google Fonts) |

## O que o site tem

Navegação por âncoras na mesma página: **#sobre**, **#trajetoria**, **#projetos** e **#contato**.

### Header e rodapé
- Header fixo com logo, links das seções, botão **CV** (abre o PDF em nova aba) e menu em tela cheia no mobile.
- Rodapé com redes sociais (LinkedIn, GitHub, Instagram, YouTube).
- Linhas de grade decorativas no layout (`layout-lines`).

### Hero
- Animação de introdução (linhas convergindo, vídeo entrando).
- Vídeo de apresentação com **chroma key** (fundo verde removido em *canvas*), em parallax ao rolar.
- Carrossel de frases com contador e barra de progresso. Troca sozinho (8 s) ou por clique nas laterais, setas, toque e *swipe*.
- Cursores personalizados (setas) e indicador "Role para explorar".

### Sobre
- Frase de impacto com texto digitado e rotativo ("Meu foco: APIs robustas, interfaces fluidas…").
- Biografia, traços de personalidade, estatísticas com contador animado (*count-up*).
- *Marquee* (faixa em loop) com as tecnologias: Java, Spring Boot, Python, TypeScript, Angular, JavaScript, SQL, MySQL, Git, HTML, CSS e Docker.
- Elementos aparecem ao entrar na viewport.

### Trajetória
- Linha do tempo de 2015 a 2026 (robótica na Faetec → Física na UFRJ → Python → TCC com Arduino → Sistemas de Computação na UFF → projetos reais).
- Cada marco abre um *popup* escuro com a história completa ("Ler mais").
- Mostra "há X anos" calculado automaticamente.

### Projetos
- Lista de projetos carregada de `public/data/projects.json`, com capa em gradiente, ano, papel, tags e links de repositório/demo.
- Projetos atuais: Gov Risk, Blub, Runeterra Index, GDD Forge, Elo, Agenda Viva, Portfólio, Pay Wallet, Queda Acelerada e Calc One.

### Contato
- Canais (e-mail, redes) e botão de download do currículo.
- Formulário (nome, e-mail, mensagem) com validação, mensagens de erro, estados de envio/sucesso/falha e reCAPTCHA.

## Estética

- **Tema "papel quente"**: fundo creme (`#F5EFDF`), tinta marrom-escura (`#30231E`), destaque amarelo (`#F6DD7A`) e secundário azul (`#2F6BD1`). Há também tons escuros para popups e rodapé.
- Tipografia: **Inter** (texto), **JetBrains Mono** (rótulos técnicos) e **Schoolbell** (toques manuscritos). Títulos grandes e fluidos com `clamp()`.
- Gradientes, linhas diagonais finas, *blobs* desfocados e texto com gradiente dourado.
- Movimento com curvas *expo-out*; respeita `prefers-reduced-motion` (desliga a intro e o scroll suave).
- Layout responsivo com margens laterais fluidas (`gutter-start` / `gutter-end`).
- Todas as cores ficam num único objeto `brand` em `tailwind.config.js` (*white label*): trocar a paleta muda o site inteiro.

## Funcionalidades técnicas

- **SEO**: `title`/`description` por página, Open Graph, Twitter Cards, JSON-LD (Pessoa), `robots.txt`, `sitemap.xml` e suporte à verificação do Google Search Console.
- **Segurança**: Content-Security-Policy no `index.html` liberando apenas o necessário (reCAPTCHA, EmailJS, Google Fonts).
- **Rede**: *interceptors* HTTP com cache em memória para GETs, timeout de 12 s e uma nova tentativa nas leituras.
- **Acessibilidade**: `aria-label`s, navegação por teclado e respeito a movimento reduzido.
- **Feature flags** para ligar/desligar recursos sem remover código.

## Como rodar

Pré-requisito: Node.js 18+ e npm.

```bash
npm install
npm start          # servidor de desenvolvimento em http://localhost:4200
npm run build      # build de produção em dist/portfolio/browser (index.html pré-renderizado)
npm run watch      # build contínuo em modo desenvolvimento
npm test           # testes unitários (Karma + Jasmine)
```

## Estrutura do projeto

```
src/
├── app/                      # bootstrap, rotas e configuração (browser/server)
├── components/
│   ├── elements/             # badge, button, card, chroma-video, section-divider, text-field
│   └── layout/               # header, footer, layout-lines
├── core/
│   ├── constants/            # marca, links, SEO, flags, âncoras, APIs
│   ├── directives/           # count-up, in-view
│   ├── interceptors/         # cache e resiliência HTTP
│   └── services/             # contact-api, projects-api, recaptcha, seo, smooth-scroll, intro-animation
└── modules/home/
    └── sections/             # hero, about, journey, projects, contact
public/                       # projects.json, CV, vídeo, imagens, robots.txt, sitemap.xml
```

Cada componente segue o padrão `*.component.ts` + `*.config.ts` (classes Tailwind e textos) + `*.types.ts`, mantendo o template limpo e o conteúdo fácil de editar.

## Onde trocar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Projetos (validados por Zod) | `public/data/projects.json` |
| Currículo em PDF | `public/cv/tiago-barcelos-cv.pdf` (mantenha o nome) |
| Vídeo do hero (fundo verde) | `public/media/hero-video.mp4` |
| Redes sociais e links | `src/core/constants/links.constant.ts` |
| Nome, cargo, local, disponibilidade | `src/core/constants/brand.constant.ts` |
| Trajetória (anos e textos) | `src/modules/home/sections/journey/journey.config.ts` |
| Frases do hero | `src/modules/home/sections/hero/hero.config.ts` |
| Bio, estatísticas e tecnologias | `src/modules/home/sections/about/about.config.ts` |
| Textos do contato e do formulário | `src/modules/home/sections/contact/contact.config.ts` |
| Links do menu | `src/components/layout/header/header.config.ts` |
| Paleta de cores (Design Tokens) | `tailwind.config.js` |
| Ligar/desligar recursos | `src/core/constants/feature-flags.constant.ts` |
| SEO global (domínio, palavras-chave, JSON-LD, Search Console) | `src/core/constants/seo.constant.ts` |
| Title e description da Home | `src/modules/home/home.config.ts` |
| Imagem de compartilhamento (1200×630) | `public/og-image.png` |
| Rastreamento (atualize se mudar o domínio) | `public/robots.txt` e `public/sitemap.xml` |

### Adicionando um projeto

Inclua um objeto em `public/data/projects.json`:

```json
{
  "id": "meu-projeto",
  "title": "Meu Projeto",
  "summary": "Resumo curto.",
  "description": "Descrição completa.",
  "year": 2026,
  "role": "Full stack",
  "tags": ["Angular", "TypeScript"],
  "links": { "repository": "https://github.com/...", "demo": null },
  "cover": { "from": "#1F3A5F", "to": "#4F86C6" }
}
```

Se o JSON não bater com o schema do Zod, o projeto não é carregado.

### Feature flags

Em `feature-flags.constant.ts`:

| Flag | Efeito |
| --- | --- |
| `heroIntroAnimation` | animação de entrada do hero |
| `heroChromaKey` | remoção do fundo verde do vídeo |
| `heroParallax` | parallax do hero ao rolar |
| `contactForm` | exibe o formulário de contato |

### Vídeo do hero

Se trocar o vídeo e a cor do fundo verde mudar, ajuste `keyColor` em
`src/components/elements/chroma-video/chroma-video.config.ts`.

## Formulário de contato (EmailJS + reCAPTCHA)

- Credenciais públicas em `src/core/constants/emailjs.constant.ts` (Service ID, Template ID e Public Key) e `recaptcha.constant.ts` (site key). Não são segredos.
- A **secret key** do reCAPTCHA fica só no painel do EmailJS (template → Settings → CAPTCHA).
- No EmailJS, restrinja os domínios permitidos ao do site para evitar abuso.
- Se o bloqueador de anúncios impedir o reCAPTCHA, o formulário avisa e oferece contato alternativo.

## Deploy

1. `npm run build`.
2. Publique o conteúdo de `dist/portfolio/browser` em qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, etc.), com fallback de rotas para `index.html`.
3. Se mudar o domínio, atualize `seo.constant.ts`, `robots.txt` e `sitemap.xml`, e o domínio permitido no EmailJS e no reCAPTCHA.
