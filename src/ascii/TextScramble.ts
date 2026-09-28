/**
 * TextScramble — algoritmo clássico de "decrypt reveal" (soulwire),
 * com o alfabeto de ruído e jitter (dx/dy) observados no aino.agency.
 */

const CHARS = 'NO0I3=:?<>-+!/93.6874ONI';
const JITTER_X = 2;
const JITTER_Y = 1;

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char: string | null;
}

const escapeHtml = (ch: string) => {
  if (ch === '<') return '<';
  if (ch === '>') return '>';
  if (ch === '&') return '&';
  return ch;
};

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

  setText(newText: string): Promise<void> {
    const oldText = this.el.textContent || '';
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => {
      this.resolve = resolve;
    });

    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20) + 10;
      this.queue.push({ from, to, start, end, char: null });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  destroy() {
    cancelAnimationFrame(this.frameRequest);
    this.resolve = null;
  }

  private update() {
    let output = '';
    let complete = 0;

    for (const item of this.queue) {
      const { to, start, end } = item;
      if (this.frame >= end) {
        complete++;
        output += to === ' ' ? ' ' : escapeHtml(to);
      } else if (this.frame >= start) {
        if (!item.char || Math.random() < 0.3) {
          item.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        const jx = (Math.random() * 2 - 1) * JITTER_X;
        const jy = (Math.random() * 2 - 1) * JITTER_Y;
        output += `<span class="dud" style="display:inline-block;transform:translate(${jx.toFixed(1)}px,${jy.toFixed(1)}px)">${escapeHtml(item.char)}</span>`;
      } else {
        output += item.from === ' ' ? ' ' : escapeHtml(item.from);
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve?.();
      this.resolve = null;
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}
