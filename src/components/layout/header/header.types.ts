import { ButtonVariant } from '../../elements/button/button.types';

export interface NavItem {
  label: string;
  fragment: string;
}

export type HeaderTone = 'light' | 'dark';

export interface HeaderToneClasses {
  logo: string;
  status: string;
  nav: string;
  navLink: string;
  navIndex: string;
  buttonVariant: ButtonVariant;
}

export interface HeaderConfig {
  blurStrip: string;
  bar: Record<'hidden' | 'visible', string>;
  inner: string;
  brandGroup: string;
  logo: string;
  logoMark: string;
  status: string;
  statusDot: string;
  statusPulse: string;
  statusDotCore: string;
  nav: string;
  navLink: string;
  navIndex: string;
  tones: Record<HeaderTone, HeaderToneClasses>;
  actions: string;
  resumeHost: string;
  resumeLabel: string;
  mobileResumeLabel: string;
  resumeAriaLabel: string;
  menuHost: string;
  menuIcon: string;
  menuIconBar: string;
  menuIconBarTopOpen: string;
  menuIconBarBottomOpen: string;
  menuLabelOpen: string;
  menuLabelClose: string;
  mobilePanel: Record<'open' | 'closed', string>;
  mobileNav: string;
  mobileLink: string;
  mobileIndex: string;
  mobileFooter: string;
  navAriaLabel: string;
  logoAriaLabel: string;
  /** Linha (px a partir do topo) usada para detectar se o header está sobre uma seção escura. */
  toneProbeY: number;
  darkSectionSelector: string;
  items: NavItem[];
}
