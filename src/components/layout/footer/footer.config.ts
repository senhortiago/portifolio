import { FooterConfig } from './footer.types';

export const footerConfig: FooterConfig = {
  wrapper: 'relative overflow-hidden bg-brand-dark text-brand-on-dark',
  inner: 'relative px-4 pb-8 pt-20 md:pl-gutter-start md:pr-gutter-end',
  top: 'flex flex-col gap-8 md:flex-row md:items-end md:justify-between',
  tagline: 'max-w-md text-lg leading-snug text-brand-on-dark/70',
  socialList: 'flex flex-wrap gap-2',
  socialLink:
    'inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-brand-on-dark/80 transition-colors hover:border-brand-accent hover:text-brand-accent',
  wordmark:
    'mt-16 select-none whitespace-nowrap text-[13vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-brand-on-dark md:text-[10.5vw]',
  bottom:
    'mt-10 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 text-sm text-brand-on-dark/60 md:flex-row md:items-center md:justify-between',
  copy: '',
  backToTop:
    'inline-flex items-center gap-2 self-start rounded-full text-brand-on-dark/80 transition-colors hover:text-brand-accent',
  backToTopLabel: 'Voltar ao topo',
  socialAriaLabel: 'Redes sociais',
  taglineText: 'Obrigado pela visita. Se algo aqui despertou sua curiosidade, vamos conversar.',
  rightsText: 'Todos os direitos reservados.',
};
