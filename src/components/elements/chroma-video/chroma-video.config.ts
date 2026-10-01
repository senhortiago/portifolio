import { ChromaVideoConfig } from './chroma-video.types';

export const chromaVideoConfig: ChromaVideoConfig = {
  host: 'block',
  canvas: 'block h-full w-full',
  hiddenVideo: 'pointer-events-none absolute h-px w-px opacity-0',
  nativeVideo: 'block h-full w-full rounded-[2rem] object-cover',
  defaults: {
    keyColor: [0, 0.835, 0],
    similarity: 0.19,
    smoothness: 0.09,
    spill: 0.32,
  },
  loopDetectionToleranceSec: 0.25,
  canvas2dScale: 0.5,
  shaders: {
    vertex: `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = vec2((a_position.x + 1.0) * 0.5, 1.0 - (a_position.y + 1.0) * 0.5);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `,
    // Algoritmo de chroma key no espaço UV (YUV), com supressão de spill.
    fragment: `
      precision mediump float;
      uniform sampler2D u_frame;
      uniform vec3 u_key;
      uniform float u_similarity;
      uniform float u_smoothness;
      uniform float u_spill;
      varying vec2 v_uv;

      vec2 toUV(vec3 rgb) {
        return vec2(
          rgb.r * -0.169 + rgb.g * -0.331 + rgb.b * 0.5 + 0.5,
          rgb.r * 0.5 + rgb.g * -0.419 + rgb.b * -0.081 + 0.5
        );
      }

      void main() {
        vec4 color = texture2D(u_frame, v_uv);
        float chromaDistance = distance(toUV(color.rgb), toUV(u_key));
        float baseMask = chromaDistance - u_similarity;
        float alpha = pow(clamp(baseMask / u_smoothness, 0.0, 1.0), 1.5);
        float spillMask = pow(clamp(baseMask / u_spill, 0.0, 1.0), 1.5);
        float luma = clamp(color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722, 0.0, 1.0);
        vec3 rgb = mix(vec3(luma), color.rgb, spillMask);
        gl_FragColor = vec4(rgb * alpha, alpha);
      }
    `,
  },
};
