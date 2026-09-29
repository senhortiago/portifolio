import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  PLATFORM_ID,
  afterNextRender,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { chromaVideoConfig } from './chroma-video.config';
import { ChromaKeySettings, ChromaRenderer } from './chroma-video.types';

interface WebGlState {
  gl: WebGLRenderingContext;
  texture: WebGLTexture;
  uniforms: {
    key: WebGLUniformLocation | null;
    similarity: WebGLUniformLocation | null;
    smoothness: WebGLUniformLocation | null;
    spill: WebGLUniformLocation | null;
  };
}

/**
 * Vídeo com fundo verde recortado em tempo real (WebGL → Canvas 2D → vídeo nativo).
 * O laço de renderização roda fora da zona do Angular.
 */
@Component({
  selector: 'app-chroma-video',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'config.host' },
  template: `
    <video
      #video
      [src]="src()"
      [class]="renderer() === 'native' ? config.nativeVideo : config.hiddenVideo"
      muted
      loop
      playsinline
      preload="auto"
      crossorigin="anonymous"
      [attr.aria-hidden]="renderer() === 'native' ? null : 'true'"
      [attr.aria-label]="renderer() === 'native' ? label() : null"
    ></video>
    @if (renderer() !== 'native') {
      <canvas #canvas [class]="config.canvas" role="img" [attr.aria-label]="label()"></canvas>
    }
  `,
})
export class ChromaVideoComponent {
  readonly src = input.required<string>();
  readonly label = input('');
  readonly playing = input(true);
  readonly settings = input<ChromaKeySettings>(chromaVideoConfig.defaults);

  /** Emitido a cada volta completa do vídeo (usado para sincronizar os slides do hero). */
  readonly loopCompleted = output<void>();
  readonly ready = output<ChromaRenderer>();

  protected readonly config = chromaVideoConfig;
  protected readonly renderer = signal<ChromaRenderer>('webgl');

  private readonly videoRef = viewChild.required<ElementRef<HTMLVideoElement>>('video');
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  private webgl: WebGlState | null = null;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private rafId = 0;
  private lastTime = -1;
  private viewReady = false;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.teardown());

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      this.viewReady = true;
      this.setup();
    });

    effect(() => {
      const shouldPlay = this.playing();
      if (this.viewReady) {
        this.applyPlayback(shouldPlay);
      }
    });
  }

  private setup(): void {
    const video = this.videoRef().nativeElement;
    const canvas = this.canvasRef()?.nativeElement;

    if (canvas && this.initWebGl(canvas)) {
      this.renderer.set('webgl');
    } else if (canvas && this.init2d(canvas)) {
      this.renderer.set('canvas2d');
    } else {
      this.renderer.set('native');
    }

    this.ngZone.runOutsideAngular(() => {
      video.addEventListener('loadedmetadata', () => this.resizeCanvas(), { once: true });
      video.addEventListener('loadeddata', () => this.drawFrame(true));
      video.addEventListener('seeked', () => this.drawFrame(true));
      if (video.readyState >= 1) {
        this.resizeCanvas();
      }
    });

    this.ready.emit(this.renderer());
    this.applyPlayback(this.playing());
  }

  private applyPlayback(shouldPlay: boolean): void {
    const video = this.videoRef().nativeElement;
    if (shouldPlay) {
      video.play().catch(() => this.drawFrame(true));
      this.startLoop();
    } else {
      video.pause();
      this.stopLoop();
      this.drawFrame(true);
    }
  }

  private startLoop(): void {
    if (this.rafId || this.renderer() === 'native') {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      const tick = (): void => {
        this.drawFrame(false);
        this.rafId = requestAnimationFrame(tick);
      };
      this.rafId = requestAnimationFrame(tick);
    });
  }

  private stopLoop(): void {
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  private drawFrame(force: boolean): void {
    const video = this.videoRef().nativeElement;
    if (video.readyState < 2) {
      return;
    }

    const time = video.currentTime;
    if (!force && time === this.lastTime) {
      return;
    }
    if (this.lastTime - time > this.config.loopDetectionToleranceSec) {
      this.loopCompleted.emit();
    }
    this.lastTime = time;

    if (this.webgl) {
      this.drawWebGl(video, this.webgl);
    } else if (this.ctx2d) {
      this.draw2d(video, this.ctx2d);
    }
  }

  private resizeCanvas(): void {
    const video = this.videoRef().nativeElement;
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas || !video.videoWidth) {
      return;
    }
    const scale = this.ctx2d ? this.config.canvas2dScale : 1;
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
  }

  // ---------- WebGL ----------

  private initWebGl(canvas: HTMLCanvasElement): boolean {
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) {
      return false;
    }

    const program = this.createProgram(gl);
    const texture = gl.createTexture();
    const buffer = gl.createBuffer();
    if (!program || !texture || !buffer) {
      return false;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    this.webgl = {
      gl,
      texture,
      uniforms: {
        key: gl.getUniformLocation(program, 'u_key'),
        similarity: gl.getUniformLocation(program, 'u_similarity'),
        smoothness: gl.getUniformLocation(program, 'u_smoothness'),
        spill: gl.getUniformLocation(program, 'u_spill'),
      },
    };
    return true;
  }

  private createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
    const compile = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) {
        return null;
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };

    const vertex = compile(gl.VERTEX_SHADER, this.config.shaders.vertex);
    const fragment = compile(gl.FRAGMENT_SHADER, this.config.shaders.fragment);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      return null;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
  }

  private drawWebGl(video: HTMLVideoElement, state: WebGlState): void {
    const { gl, texture, uniforms } = state;
    const settings = this.settings();

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
    gl.uniform3f(uniforms.key, settings.keyColor[0], settings.keyColor[1], settings.keyColor[2]);
    gl.uniform1f(uniforms.similarity, settings.similarity);
    gl.uniform1f(uniforms.smoothness, settings.smoothness);
    gl.uniform1f(uniforms.spill, settings.spill);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  // ---------- Canvas 2D (fallback) ----------

  private init2d(canvas: HTMLCanvasElement): boolean {
    this.ctx2d = canvas.getContext('2d', { willReadFrequently: true });
    return this.ctx2d !== null;
  }

  private draw2d(video: HTMLVideoElement, ctx: CanvasRenderingContext2D): void {
    const { width, height } = ctx.canvas;
    ctx.drawImage(video, 0, 0, width, height);
    const frame = ctx.getImageData(0, 0, width, height);
    const data = frame.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] ?? 0;
      const g = data[i + 1] ?? 0;
      const b = data[i + 2] ?? 0;
      const greenExcess = g - Math.max(r, b);
      if (greenExcess > 20) {
        const alpha = Math.max(0, Math.min(1, (90 - greenExcess) / 70));
        data[i + 1] = Math.max(r, b);
        data[i + 3] = Math.round(alpha * 255);
      }
    }
    ctx.putImageData(frame, 0, 0);
  }

  private teardown(): void {
    this.stopLoop();
    const video = this.videoRef()?.nativeElement;
    video?.pause();
    this.webgl?.gl.getExtension('WEBGL_lose_context')?.loseContext();
    this.webgl = null;
  }
}
