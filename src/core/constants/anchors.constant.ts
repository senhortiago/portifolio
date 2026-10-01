/** Fragmentos de URL usados como âncoras de navegação (ex: /#trajetoria). */
export const anchorsConstant = {
  about: 'sobre',
  journey: 'trajetoria',
  projects: 'projetos',
  contact: 'contato',
} as const;

export type AnchorId = (typeof anchorsConstant)[keyof typeof anchorsConstant];
