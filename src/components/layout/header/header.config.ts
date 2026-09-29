import { anchorsConstant } from '../../../core/constants/anchors.constant';
import { HeaderConfig } from './header.types';

export const headerConfig: HeaderConfig = {
  blurStrip:
    'pointer-events-none fixed inset-x-0 top-0 z-header h-24 backdrop-blur-[6px] [mask-image:linear-gradient(to_bottom,#000,transparent)]',
  bar: {
    hidden: 'pointer-events-none -translate-y-3 opacity-0',
    visible: 'translate-y-0 opacity-100',
  },
  inner:
    'fixed inset-x-0 top-0 z-header flex items-center justify-between gap-4 px-4 py-4 transition-[opacity,transform] duration-500 ease-out md:px-8',
  brandGroup: 'flex items-center gap-4',
  logo: 'group inline-flex items-center gap-2 rounded-full text-[0.95rem] font-semibold tracking-tight transition-colors duration-500',
  logoMark:
    'grid h-9 w-9 place-items-center rounded-full bg-brand-ink font-mono text-xs font-medium text-brand-accent ring-1 ring-white/10 transition-transform duration-300 group-hover:rotate-[-8deg]',
  status:
    'hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-colors duration-500 lg:inline-flex',
  statusDot: 'relative flex h-2 w-2',
  statusPulse: 'absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-success',
  statusDotCore: 'relative inline-flex h-2 w-2 rounded-full bg-brand-success',
  nav: 'hidden items-center gap-1 rounded-full border p-1 backdrop-blur-md transition-colors duration-500 md:flex',
  navLink:
    'group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
  navIndex: 'font-mono text-[0.65rem] transition-colors group-hover:text-brand-accent',
  tones: {
    light: {
      logo: 'text-brand-ink',
      status: 'border-brand-ink/10 bg-white/60 text-brand-ink-soft',
      nav: 'border-brand-ink/10 bg-white/60',
      navLink: 'text-brand-ink-soft hover:bg-brand-ink hover:text-brand-bg',
      navIndex: 'text-brand-muted',
      buttonVariant: 'solid',
    },
    dark: {
      logo: 'text-brand-on-dark',
      status: 'border-white/15 bg-white/10 text-brand-on-dark/80',
      nav: 'border-white/15 bg-white/10',
      navLink: 'text-brand-on-dark/75 hover:bg-brand-on-dark hover:text-brand-ink',
      navIndex: 'text-brand-on-dark/45',
      buttonVariant: 'accent',
    },
  },
  actions: 'flex items-center gap-2',
  resumeHost: 'hidden sm:inline-flex',
  resumeLabel: 'CV',
  mobileResumeLabel: 'Ver currículo (PDF)',
  resumeAriaLabel: 'Abrir currículo em PDF em uma nova aba',
  menuHost: 'md:hidden',
  menuIcon: 'flex flex-col gap-1',
  menuIconBar: 'block h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ease-standard',
  menuIconBarTopOpen: 'translate-y-[3px] rotate-45',
  menuIconBarBottomOpen: '-translate-y-[3px] -rotate-45',
  menuLabelOpen: 'Menu',
  menuLabelClose: 'Fechar',
  mobilePanel: {
    open: 'pointer-events-auto opacity-100 [clip-path:circle(150%_at_calc(100%-3rem)_2.5rem)]',
    closed: 'pointer-events-none opacity-0 [clip-path:circle(0%_at_calc(100%-3rem)_2.5rem)]',
  },
  mobileNav:
    'fixed inset-0 z-[45] flex flex-col justify-between bg-brand-dark px-6 pb-10 pt-28 text-brand-on-dark transition-[clip-path,opacity] duration-700 ease-expo-out md:hidden',
  mobileLink:
    'flex items-baseline gap-3 border-b border-white/10 py-4 text-4xl font-semibold tracking-tight text-brand-on-dark transition-colors hover:text-brand-accent',
  mobileIndex: 'font-mono text-xs text-brand-accent',
  mobileFooter: 'flex flex-col gap-4',
  navAriaLabel: 'Navegação principal',
  logoAriaLabel: 'Tiago Barcelos — voltar ao início',
  toneProbeY: 40,
  darkSectionSelector: '[data-header-theme="dark"]',
  items: [
    { label: 'Sobre', fragment: anchorsConstant.about },
    { label: 'Trajetória', fragment: anchorsConstant.journey },
    { label: 'Projetos', fragment: anchorsConstant.projects },
    { label: 'Contato', fragment: anchorsConstant.contact },
  ],
};
