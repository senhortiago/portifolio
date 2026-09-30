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
      year: 2015,
      title: 'O chamado',
      summary: 'Na equipe de robótica da Faetec, ainda no ensino médio, escrevi minha primeira linha de código.',
      story:
        'Um robô parado na bancada e um LED que se recusava a piscar. Quando finalmente acendeu, algo acendeu junto em mim: a descoberta de que algumas linhas de texto podiam dar vida a uma máquina. Eu ainda não sabia, mas ali começava a minha jornada.',
      handle: '@faetec',
      marks: ['⚙', '>_'],
    },
    {
      year: 2019,
      title: 'Rumo ao desconhecido',
      summary: 'Entrei na faculdade de Física atrás das perguntas mais fundamentais do universo.',
      story:
        'Cálculo, laboratório e noites tentando entender como tudo funciona. A Física me ensinou a fazer boas perguntas antes de buscar respostas, a modelar problemas e a aceitar quando o experimento contraria a teoria. O código ficou em segundo plano, mas nunca foi embora.',
      handle: '@ufrj',
      marks: ['Φ', 'UF'],
    },
    {
      year: 2021,
      title: 'O reencontro',
      summary: 'Voltei ao código e entendi, de vez, que era isso que eu queria fazer.',
      story:
        'Precisava tratar dados e resolver equações que não fechavam no papel. Um script virou dez, e a parte favorita de cada trabalho passou a ser a hora de programar. Foi o reencontro com aquele garoto da robótica, e desta vez com a certeza de que eu não queria mais me afastar.',
      handle: '@python',
      marks: ['Py', '{}'],
    },
    {
      year: 2024,
      title: 'A grande prova',
      summary: 'Um TCC com Arduino que uniu física, hardware e programação.',
      story:
        'Sensores, protoboards e muitas horas de depuração. No trabalho de conclusão de curso, construí um sistema com Arduino e vi, de novo, o código mexendo no mundo físico. Foi a prova de que as duas metades da minha história se encaixavam.',
      handle: '@arduino',
      marks: ['∞', 'C'],
    },
    {
      year: 2025,
      title: 'Renascimento',
      summary: 'Físico formado e um novo começo: a computação, agora como caminho principal.',
      story:
        'Diploma na mão, fechei um ciclo e abri outro. Comecei a estudar computação de forma séria e estruturada: estruturas de dados, bancos, redes e engenharia de software. Tudo o que eu aprendia sozinho ganhou forma, e a paixão começou a virar profissão.',
      handle: '@uff',
      marks: ['Φ', '→'],
    },
    {
      year: 2026,
      title: 'O retorno com o elixir',
      summary: 'Projetos reais e produtos que resolvem problemas de verdade.',
      story:
        'Hoje eu construo para pessoas: APIs, interfaces e produtos completos que nascem de problemas reais. Cada projeto junta tudo o que a jornada me deu, a curiosidade da robótica, o rigor da Física e o ofício da computação. E o melhor ainda está por vir.',
      handle: '@tiago',
      marks: ['TB', '✓'],
    },
  ],
};
