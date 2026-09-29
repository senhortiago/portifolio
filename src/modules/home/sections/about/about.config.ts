import { AboutConfig } from './about.types';

export const aboutConfig: AboutConfig = {
  section: 'relative bg-brand-bg pb-24 pt-28 md:pb-32 md:pt-40',
  inner: 'px-4 md:pl-gutter-start md:pr-gutter-end',
  label:
    'mb-8 inline-flex rounded-full border-2 border-brand-ink/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-ink',
  statement:
    'max-w-5xl text-display-sm font-semibold text-brand-ink',
  statementMuted: 'text-brand-ink/40',
  rotatingRow: 'mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 text-display-sm font-semibold text-brand-ink',
  rotatingPrefix: '',
  srOnly: 'sr-only',
  rotatingBadge:
    'inline-flex min-h-[1.15em] items-center rounded-[0.35em] bg-brand-accent px-[0.28em] pb-[0.06em] text-brand-ink',
  rotatingCaret: 'ml-1 inline-block h-[0.8em] w-[3px] animate-caret-blink rounded-full bg-brand-ink',
  grid: 'mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-12',
  bioColumn: 'flex flex-col gap-8 md:col-span-6',
  bio: 'max-w-xl text-lg leading-relaxed text-brand-ink-soft',
  traitList: 'flex flex-wrap gap-2',
  traitIcon: 'h-1.5 w-1.5 rounded-full bg-brand-secondary',
  statsGrid: 'grid grid-cols-2 gap-3 md:col-span-6 md:gap-4',
  statCard: 'flex h-full flex-col justify-between gap-6',
  statValue: 'text-5xl font-bold tracking-[-0.04em] text-brand-ink md:text-6xl',
  statLabel: 'text-sm leading-snug text-brand-ink-soft',
  marquee:
    'relative mt-20 overflow-hidden border-y border-brand-ink/10 py-5 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] md:mt-28',
  marqueeTrack: 'flex w-max animate-marquee items-center',
  marqueeList: 'flex items-center gap-10 pr-10',
  marqueeItem: 'inline-flex items-center gap-10 whitespace-nowrap font-mono text-lg text-brand-ink md:text-2xl',
  marqueeDot: 'h-2 w-2 rounded-full bg-brand-accent-strong',
  reveal: {
    hidden: 'translate-y-10 opacity-0 transition-[opacity,transform] duration-1000 ease-expo-out',
    visible: 'translate-y-0 opacity-100 transition-[opacity,transform] duration-1000 ease-expo-out',
  },

  texts: {
    label: 'Sobre mim',
    statement: 'Formado em Física pela UFRJ, hoje construo software',
    statementMuted: 'onde lógica, dados e boas experiências se encontram.',
    rotatingPrefix: 'Meu foco:',
    bio: [
      'Sou estudante de Sistemas de Computação na UFF e trago da Física o hábito de modelar problemas antes de resolvê-los. Gosto de entender o porquê das coisas — e isso aparece no código.',
      'Trabalho principalmente com Java e Spring Boot no back-end, e Angular com TypeScript no front-end. Curiosidade e vontade de resolver problemas me movem a aprender algo novo a cada projeto.',
    ],
    stackLabel: 'Tecnologias',
  },
  rotatingTerms: ['APIs robustas', 'interfaces fluidas', 'código limpo', 'sistemas escaláveis'],
  traits: ['Curioso', 'Analítico', 'Resiliente', 'Construtor', 'Colaborativo'],
  stats: [
    { value: '02', label: 'formações acadêmicas: Física (UFRJ) e Sistemas de Computação (UFF)' },
    { value: '10+', label: 'tecnologias no dia a dia, do back ao front' },
    { value: '06', label: 'projetos em destaque neste portfólio' },
    { value: '∞', label: 'curiosidade para aprender o próximo desafio' },
  ],
  stack: ['Java', 'Spring Boot', 'Python', 'TypeScript', 'Angular', 'JavaScript', 'SQL', 'MySQL', 'Git', 'HTML', 'CSS', 'Docker'],
  typing: {
    deleteMs: 40,
    typeMs: 45,
    holdMs: 2800,
    pauseMs: 180,
  },
};
