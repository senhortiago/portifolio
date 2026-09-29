import { JourneyConfig } from './journey.types';

const revealBase = 'transition-[opacity,transform] duration-1000 ease-expo-out';

/**
 * Padding compensatório: a seção de Projetos tem um divisor SVG que invade esta seção
 * pela base (h-8 / h-12 / h-16 = 32 / 48 / 64px). Base 96/112px + invasão:
 * pb-32 (96+32), md:pb-40 (112+48), lg:pb-44 (112+64).
 */
export const journeyConfig: JourneyConfig = {
  section: 'relative bg-brand-bg pb-32 pt-24 md:pb-40 md:pt-32 lg:pb-44',
  inner: 'px-4 md:pl-gutter-start md:pr-gutter-end',
  header: 'max-w-3xl',
  label:
    'mb-6 inline-flex rounded-full border-2 border-brand-ink/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-ink',
  title: 'text-display-sm font-bold text-brand-ink',
  titleAmp: 'font-light text-brand-ink/40',
  lead: 'mt-6 max-w-md text-lg leading-relaxed text-brand-ink-soft',
  srOnly: 'sr-only',

  timeline: 'relative mt-16 md:mt-24',
  spine: 'absolute bottom-0 left-3 top-0 w-px -translate-x-1/2 overflow-hidden bg-brand-ink/10 md:left-1/2',
  spineFill: 'absolute inset-0 origin-top scale-y-0 bg-journey-line will-change-transform',
  list: 'relative flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-0',
  item: {
    left: 'relative pl-10 md:col-start-1 md:-mt-36 md:pl-0 md:first:mt-0',
    right: 'relative pl-10 md:col-start-2 md:-mt-36 md:pl-0',
  },
  itemRaised: 'z-20',
  connector: {
    left: 'absolute left-3 top-14 hidden h-px w-7 bg-brand-ink/25 md:left-full md:block md:w-10',
    right: 'absolute left-3 top-14 hidden h-px w-7 bg-brand-ink/25 md:left-auto md:right-full md:block md:w-10',
  },
  dot: {
    left:
      'absolute left-3 top-14 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-ink bg-brand-accent md:left-[calc(100%+2.5rem)]',
    right:
      'absolute left-3 top-14 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-ink bg-brand-accent md:left-[-2.5rem]',
  },
  cardReveal: {
    left: {
      hidden: `${revealBase} origin-bottom-right translate-y-[10%] scale-[0.6] opacity-0`,
      visible: `${revealBase} origin-bottom-right translate-y-0 scale-100 opacity-100`,
    },
    right: {
      hidden: `${revealBase} origin-bottom-left translate-y-[10%] scale-[0.6] opacity-0`,
      visible: `${revealBase} origin-bottom-left translate-y-0 scale-100 opacity-100`,
    },
  },

  year: 'block text-year font-extrabold tabular-nums text-brand-accent-strong [-webkit-text-stroke:3px_theme(colors.brand.ink)] [paint-order:stroke_fill]',
  yearApostrophe: 'mr-0.5',
  cardTitle: 'mt-3 text-2xl font-semibold leading-tight tracking-tight text-brand-ink md:text-[1.7rem]',
  cardSummary: 'mt-2 leading-relaxed text-brand-ink/80',
  cardBottom: 'mt-8 flex items-end justify-between gap-4',
  cardBottomLeft: 'flex items-center gap-3',
  marks: 'flex',
  mark: 'grid h-11 w-11 place-items-center rounded-full border-2 border-brand-glass bg-brand-ink font-mono text-xs font-medium text-brand-accent',
  markSecond: '-ml-3 bg-brand-secondary text-white',
  meta: 'font-mono text-xs leading-snug text-brand-ink/55',

  popup: {
    open: 'pointer-events-auto absolute inset-x-0 -top-3 z-30 origin-top scale-[1.02] opacity-100 transition-[opacity,transform] [transition-duration:400ms,200ms] ease-standard',
    closed:
      'pointer-events-none absolute inset-x-0 -top-3 z-30 origin-top scale-[0.8] opacity-0 transition-[opacity,transform] [transition-duration:400ms,200ms] ease-standard',
  },
  popupTop: 'flex items-start justify-between gap-4',
  popupYear: 'bg-accent-text bg-clip-text text-year font-extrabold text-transparent',
  popupCloseBar: 'absolute h-[2px] w-5 rotate-45 rounded-full bg-current',
  popupCloseBarSecond: 'absolute h-[2px] w-5 -rotate-45 rounded-full bg-current',
  popupTitle: 'mt-10 text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl',
  popupStory: 'mt-4 leading-relaxed text-white/75',

  texts: {
    label: 'Passo a passo',
    titleStart: 'Minha trajetória',
    titleAmp: '(&)',
    titleEnd: 'evolução',
    lead: 'Da bancada do laboratório de Física ao terminal. O caminho é mais fácil de mostrar do que de explicar.',
    readMore: 'Ler mais',
    readMoreAria: 'Ler mais sobre',
    close: 'Fechar',
    now: 'agora',
    yearAgo: 'ano atrás',
    yearsAgo: 'anos atrás',
  },

  entries: [
    {
      year: 2017,
      title: 'Primeiro dia na Física',
      summary: 'Entrei no bacharelado em Física da UFRJ. Cálculo, laboratório e noites tentando entender o universo.',
      story:
        'A Física me ensinou a fazer boas perguntas antes de buscar respostas. Modelar um problema, testar hipóteses e aceitar quando o experimento contraria a teoria — essa base virou meu jeito de pensar software.',
      handle: '@ufrj',
      marks: ['Φ', 'UF'],
    },
    {
      year: 2019,
      title: 'A primeira linha de código',
      summary: 'Python apareceu para simular experimentos. Foi amor à primeira execução.',
      story:
        'Precisava tratar dados de laboratório e resolver equações que não fechavam no papel. Um script virou dez, os gráficos ficaram bonitos e percebi que programar era a ferramenta mais poderosa que eu já tinha usado.',
      handle: '@python',
      marks: ['Py', '>_'],
    },
    {
      year: 2021,
      title: 'Arduino no TCC',
      summary: 'Sensores, protoboards e um TCC que uniu hardware, física e software.',
      story:
        'No trabalho de conclusão de curso, construí um sistema de aquisição de dados com Arduino. Foi a primeira vez que vi código mexendo no mundo físico — e o momento em que a computação deixou de ser hobby.',
      handle: '@arduino',
      marks: ['∞', 'C'],
    },
    {
      year: 2022,
      title: 'Físico formado',
      summary: 'Diploma na mão e uma certeza: eu queria construir coisas com código.',
      story:
        'Terminar a graduação trouxe clareza. A parte favorita de cada projeto sempre tinha sido o código, então decidi seguir por esse caminho de forma séria e estruturada.',
      handle: '@ufrj',
      marks: ['Φ', '✓'],
    },
    {
      year: 2023,
      title: 'Rumo à computação',
      summary: 'Comecei Sistemas de Computação na UFF para transformar paixão em profissão.',
      story:
        'Estruturas de dados, bancos, redes e engenharia de software. A faculdade organizou o que eu aprendia sozinho e abriu portas para projetos maiores e mais bem arquitetados.',
      handle: '@uff',
      marks: ['UF', '{}'],
    },
    {
      year: 2025,
      title: 'Projetos full stack',
      summary: 'Java, Spring Boot e Angular em projetos completos, do banco de dados à interface.',
      story:
        'APIs REST, autenticação, testes e front-ends reativos. Cada projeto me ensinou a pensar no sistema inteiro — performance, segurança e, principalmente, a experiência de quem usa.',
      handle: '@spring',
      marks: ['Jv', 'Ng'],
    },
    {
      year: 2026,
      title: 'A jornada continua',
      summary: 'Portfólio novo, desafios novos. O melhor ainda está por vir.',
      story:
        'Sigo estudando, construindo e buscando times onde eu possa contribuir e crescer. Mesma curiosidade de sempre, ferramentas novas — e muita vontade de fazer acontecer.',
      handle: '@tiago',
      marks: ['TB', '→'],
    },
  ],
};
