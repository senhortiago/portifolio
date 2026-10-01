import { brandConstant } from './brand.constant';

/**
 * Dados globais de SEO (meta tags, Open Graph e JSON-LD).
 * Os textos de cada página (title/description) ficam no `.config.ts` do módulo.
 */
export const seoConstant = {
  /** URL pública, sem barra final. Se mudar o domínio, atualize também public/robots.txt e public/sitemap.xml. */
  siteUrl: 'https://devleal.tech',
  siteName: `${brandConstant.fullName} · Portfólio`,
  language: 'pt-BR',
  locale: 'pt_BR',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  /** Código da meta tag do Google Search Console (método "Tag HTML"). Vazio = não injeta. */
  googleSiteVerification: '',
  keywords: [
    brandConstant.fullName,
    'desenvolvedor de software',
    'desenvolvedor Java',
    'Spring Boot',
    'Python',
    'Angular',
    'TypeScript',
    'desenvolvedor back-end',
    'desenvolvedor full stack',
    'Rio de Janeiro',
    'portfólio',
  ],
  /** Imagem de compartilhamento (1200×630) usada por Google, LinkedIn, WhatsApp e X. */
  ogImage: {
    path: 'og-image.png',
    type: 'image/png',
    width: 1200,
    height: 630,
    alt: `${brandConstant.fullName} — ${brandConstant.role} (Java, Spring Boot, Python e Angular)`,
  },
  person: {
    givenName: 'Tiago',
    familyName: 'Barcelos',
    description:
      'Desenvolvedor de software formado em Física pela UFRJ e estudante de Sistemas de Computação na UFF. Trabalha com Java, Spring Boot e Python no back-end e Angular no front-end.',
    address: {
      locality: 'Rio de Janeiro',
      region: 'RJ',
      country: 'BR',
    },
    alumniOf: [{ name: 'Universidade Federal do Rio de Janeiro', alternateName: 'UFRJ', url: 'https://ufrj.br' }],
    affiliation: [{ name: 'Universidade Federal Fluminense', alternateName: 'UFF', url: 'https://www.uff.br' }],
    knowsAbout: [
      'Java',
      'Spring Boot',
      'Python',
      'TypeScript',
      'Angular',
      'JavaScript',
      'SQL',
      'MySQL',
      'Docker',
      'Git',
      'Desenvolvimento web',
      'APIs REST',
      'Física',
    ],
  },
} as const;
