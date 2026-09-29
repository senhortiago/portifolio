import { ProjectsConfig } from './projects.types';

/**
 * Seção escura com divisores SVG no topo e na base (sem overflow-hidden, por regra).
 * A compensação de espaço é feita nas seções vizinhas (Trajetória / Contato).
 */
export const projectsConfig: ProjectsConfig = {
  section: 'relative z-10 bg-brand-dark pb-16 pt-16 text-brand-on-dark md:pb-24 md:pt-20',
  inner: 'px-4 md:pl-gutter-start md:pr-gutter-end',
  header: 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
  label:
    'mb-6 inline-flex rounded-full border-2 border-white/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-on-dark',
  title: 'max-w-3xl text-display-sm font-bold text-brand-on-dark',
  lead: 'max-w-sm text-lg leading-relaxed text-brand-on-dark/65',
  srOnly: 'sr-only',

  list: 'mt-14 border-t border-white/10 md:mt-20',
  row: 'group border-b border-white/10 transition-colors duration-500',
  rowOpen: 'bg-white/[0.03]',
  trigger:
    'flex w-full cursor-pointer items-center gap-4 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-accent md:gap-8 md:py-8',
  index: 'w-8 shrink-0 font-mono text-xs text-brand-accent md:w-12 md:text-sm',
  titleWrap: 'flex min-w-0 flex-1 flex-col gap-1',
  rowTitle:
    'truncate text-3xl font-bold tracking-[-0.03em] text-brand-on-dark transition-transform duration-500 ease-expo-out group-hover:translate-x-3 md:text-4xl lg:text-5xl',
  rowSummary: 'truncate text-sm text-brand-on-dark/55 md:text-base',
  tags: 'hidden shrink-0 flex-wrap justify-end gap-2 lg:flex lg:max-w-[18rem]',
  year: 'hidden shrink-0 font-mono text-sm text-brand-on-dark/55 sm:block',
  toggleIcon: {
    closed:
      'relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 transition-[background-color,transform] duration-500 ease-expo-out group-hover:bg-brand-accent group-hover:text-brand-ink',
    open: 'relative grid h-10 w-10 shrink-0 rotate-180 place-items-center rounded-full border border-brand-accent bg-brand-accent text-brand-ink transition-[background-color,transform] duration-500 ease-expo-out',
  },
  toggleBar: 'absolute h-[2px] w-3.5 rounded-full bg-current',
  toggleBarVertical: {
    closed: 'absolute h-3.5 w-[2px] rounded-full bg-current transition-transform duration-500',
    open: 'absolute h-3.5 w-[2px] scale-y-0 rounded-full bg-current transition-transform duration-500',
  },

  panel: {
    open: 'grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-700 ease-expo-out',
    closed: 'grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-expo-out',
  },
  panelClip: 'min-h-0 overflow-hidden',
  panelGrid: 'grid gap-8 pb-10 md:grid-cols-12 md:gap-10 md:pl-20',
  cover:
    'relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl bg-project-cover p-5 md:col-span-5',
  coverChrome: 'flex gap-1.5',
  coverChromeDot: 'h-2.5 w-2.5 rounded-full bg-white/60',
  coverTitle: 'text-4xl font-extrabold leading-none tracking-[-0.04em] text-white md:text-5xl',
  coverIndex: 'absolute -bottom-6 -right-2 font-mono text-[9rem] font-bold leading-none text-white/15',
  details: 'flex flex-col gap-6 md:col-span-7',
  description: 'text-lg leading-relaxed text-brand-on-dark/80',
  facts: 'grid grid-cols-2 gap-4 border-y border-white/10 py-5 sm:grid-cols-3',
  factItem: 'flex flex-col gap-1',
  factLabel: 'font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-on-dark/45',
  factValue: 'text-sm text-brand-on-dark',
  actions: 'flex flex-wrap gap-3',

  skeletonRow: 'flex animate-pulse items-center gap-6 border-b border-white/10 py-8',
  skeletonIndex: 'h-3 w-8 rounded bg-white/10',
  skeletonTitle: 'h-10 flex-1 rounded-lg bg-white/10 md:h-14',
  skeletonMeta: 'hidden h-3 w-24 rounded bg-white/10 md:block',

  errorCard: 'mt-14 md:mt-20',
  errorTitle: 'text-2xl font-semibold text-brand-on-dark',
  errorText: 'mt-2 text-brand-on-dark/65',
  errorActions: 'mt-6 flex flex-wrap gap-3',

  skeletonCount: 4,
  texts: {
    label: 'Trabalhos selecionados',
    title: 'Feito com código, pensado para performar.',
    lead: 'Uma seleção de projetos que mostram como penso, construo e resolvo problemas — do back-end à interface.',
    loading: 'Carregando projetos…',
    toggleAria: 'Ver detalhes do projeto',
    role: 'Papel',
    year: 'Ano',
    stack: 'Stack',
    repository: 'Repositório',
    demo: 'Ver demo',
    errorTitle: 'Não foi possível carregar os projetos agora.',
    errorText: 'Tente novamente em instantes ou veja meus trabalhos direto no GitHub.',
    retry: 'Tentar novamente',
    openGithub: 'Abrir GitHub',
    empty: 'Novos projetos chegando em breve.',
  },
};
