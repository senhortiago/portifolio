export type ChromaRenderer = 'webgl' | 'canvas2d' | 'native';

export interface ChromaKeySettings {
  /** Cor do fundo a remover, RGB normalizado (0–1). */
  keyColor: readonly [number, number, number];
  /** Distância de croma abaixo da qual o pixel some. */
  similarity: number;
  /** Suavidade da borda do recorte. */
  smoothness: number;
  /** Intensidade da remoção do reflexo verde (spill). */
  spill: number;
}

export interface ChromaVideoConfig {
  host: string;
  canvas: string;
  hiddenVideo: string;
  nativeVideo: string;
  defaults: ChromaKeySettings;
  loopDetectionToleranceSec: number;
  canvas2dScale: number;
  shaders: {
    vertex: string;
    fragment: string;
  };
}
