/**
 * TextScramble — Efeito de decodificação/desembaralhamento estilo Aino Agency,
 * totalmente monocromático (preto, branco e prata).
 * 
 * Preserva estritamente o layout e comprimento das palavras sem deslocamento.
 */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.-+=/*<>#!';

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char: string | null;
}

export interface ScrambleOptions {
  from?: string;
  spread?: number;
  length?: number;
}

export class TextScramble {
  private el: HTMLElement;
  private queue: QueueItem[] = [];
  private frame = 0;
  private frameRequest = 0;
  private resolve: (() => void) | null = null;

  constructor(el: HTMLElement) {
    this.el = el;
    this.update = this.update.bind(this);
  }

  setText(newText: string, opts: ScrambleOptions = {}): Promise<void> {
    const oldText = opts.from ?? (this.el.textContent || '');
    // Cadência suave e cinematográfica: spread e length aumentados para leitura agradável
    const spread = opts.spread ?? 24;
    const extra = opts.length ?? 32;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => {
      this.resolve = resolve;
    });

    this.queue = [];
    for (let i = 0; i < length; i++) {
      const fromChar = oldText[i] || '';
      const toChar = newText[i] || '';
      
      // Se for espaço em branco mantemos sem embaralhar para preservar o formato da frase
      if (toChar === ' ' && fromChar === ' ') {
        this.queue.push({ from: ' ', to: ' ', start: 0, end: 0, char: ' ' });
        continue;
      }

      // Distribuição suave da decodificação da esquerda para a direita
      const charPosOffset = Math.floor((i / Math.max(1, length)) * spread * 0.8);
      const start = charPosOffset + Math.floor(Math.random() * (spread * 0.4));
      const end = start + Math.floor(Math.random() * extra) + 14;
      this.queue.push({ from: fromChar, to: toChar, start, end, char: null });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.el.dataset.scrambling = '1';
    this.update();
    return promise;
  }

  destroy() {
    cancelAnimationFrame(this.frameRequest);
    delete this.el.dataset.scrambling;
    this.resolve = null;
  }

  private update() {
    const nodes: Node[] = [];
    let buf = '';
    let complete = 0;

    const flush = () => {
      if (buf) {
        nodes.push(document.createTextNode(buf));
        buf = '';
      }
    };

    for (const item of this.queue) {
      const { to, start, end } = item;
      if (this.frame >= end) {
        complete++;
        buf += to;
      } else if (this.frame >= start) {
        // Atualiza caracteres aleatórios a cada 2 frames para dar percepção nítida dos glifos
        if (!item.char || this.frame % 2 === 0) {
          item.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        flush();
        const span = document.createElement('span');
        span.className = 'dud';
        span.style.color = 'rgba(203, 213, 225, 0.7)';
        span.style.textShadow = '0 0 8px rgba(248, 250, 252, 0.4)';
        span.textContent = item.char;
        nodes.push(span);
      } else {
        buf += item.from;
      }
    }
    flush();
    this.el.replaceChildren(...nodes);

    if (complete === this.queue.length) {
      delete this.el.dataset.scrambling;
      this.resolve?.();
      this.resolve = null;
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}
