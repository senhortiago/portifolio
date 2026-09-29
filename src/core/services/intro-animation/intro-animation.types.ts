/**
 * pending  → linhas na posição inicial (centro / acima da tela)
 * converge → verticais deslizam até as margens, horizontais se agrupam
 * reveal   → horizontais se abrem em leque, header e conteúdo surgem
 * done     → estado final estável
 */
export type IntroPhase = 'pending' | 'converge' | 'reveal' | 'done';

export const introTimeline = {
  convergeDelayMs: 60,
  revealDelayMs: 620,
  doneDelayMs: 2600,
  horizontalStaggerMs: 150,
} as const;
