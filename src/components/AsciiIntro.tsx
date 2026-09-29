import React, { useEffect, useRef, useState } from 'react';

interface AsciiIntroProps {
  onEnter: (withAudio: boolean) => void;
  onStart?: (withAudio: boolean) => void;
  videoSrc?: string;
}

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÃÕÇâêôàü#@$%&*+=<>?/!·-:";
const DENSE = "NAOI1234568908Ø#";
const SPARSE = "·-+:.¬°";
const TEXT_WORD = "luiz.edu";
const PHRASE_CHARS = TEXT_WORD.replace(/\s/g, '');

const INTRO_KEYWORDS = [
  'python',
  'react',
  'ts',
  'llm',
  'api',
  'ai',
  'agent',
  'rag',
  'groq',
  'node',
  'vite',
  'sql',
  'git',
  'langchain',
  'prompt',
  'supabase',
  'next',
  'docker',
  'openai',
  'fastapi',
  'vector',
  'linux',
  'gemini',
  'deepseek',
  'pytorch',
  'claude'
];

interface SpaceParticle {
  r: number;
  a: number;
  z: number;
  j: number;
  sv: number;
  ph: number;
  rock: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ch: string;
  alpha: number;
}

interface PhraseCell {
  x: number;
  y: number;
  char: string;
  baseChar: string;
  heat: number;
}

interface FloatingIntroKeyword {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  displayChars: string[];
  baseAlpha: number;
  heat: number;
  driftAngle: number;
  driftSpeed: number;
  nextJitter: number;
}

interface TrailPoint {
  x: number;
  y: number;
}

const rnd = (a: string | string[]) => a[Math.floor(Math.random() * a.length)];

export const AsciiIntro: React.FC<AsciiIntroProps> = ({ onEnter, onStart }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onEnterRef = useRef(onEnter);
  const onStartRef = useRef(onStart);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    onEnterRef.current = onEnter;
    onStartRef.current = onStart;
  }, [onEnter, onStart]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let finished = false;
    const finish = (audio = true) => {
      if (finished) return;
      finished = true;
      onEnterRef.current(audio);
    };

    if (
      window.location.hash === '#nointro' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      finish(false);
      return;
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);

    let spaceParticles: SpaceParticle[] = [];
    let phraseCells: PhraseCell[] = [];
    const keywords: FloatingIntroKeyword[] = [];
    const t0 = performance.now();

    let mx = W / 2;
    let my = H * 0.75;
    let bx = mx;
    let by = my;
    const trail: TrailPoint[] = [];

    type State = 'swirl' | 'zoom' | 'exit';
    let state: State = 'swirl';
    let zoomStartTime = 0;
    let lastTakeTime = 0;
    let animId: number;

    const buildPhraseCells = () => {
      if (!W || !H) return;
      const off = document.createElement('canvas');
      off.width = W;
      off.height = H;
      const octx = off.getContext('2d');
      if (!octx) return;

      const fs = Math.min(W * 0.75 / (TEXT_WORD.length * 0.58), H * 0.3);
      octx.font = `bold ${fs}px "JetBrains Mono", ui-monospace, monospace`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillStyle = '#ffffff';
      octx.fillText(TEXT_WORD, W / 2, H / 2);

      const d = octx.getImageData(0, 0, W, H).data;
      const step = W < 600 ? 4 : 5;
      phraseCells = [];

      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const alpha = d[(y * W + x) * 4 + 3];
          if (alpha > 100) {
            const ch = rnd(PHRASE_CHARS);
            phraseCells.push({
              x,
              y,
              char: ch,
              baseChar: ch,
              heat: 0
            });
          }
        }
      }
    };

    const size = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      if (W < 2 || H < 2) return;

      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = W < 600 ? 2200 : 3400;
      if (spaceParticles.length === 0 || spaceParticles.length !== count) {
        spaceParticles = [];
        for (let i = 0; i < count; i++) {
          const mode = Math.random();
          let r: number;
          let a: number;
          let isVeil = false;
          let far = false;

          if (mode < 0.48) {
            // 1. Véu homogêneo sobre toda a extensão da frase "luiz.edu" (sem acúmulo no centro)
            isVeil = true;
            r = 0.07 + Math.random() * 0.44;
            a = Math.random() * Math.PI * 2;
          } else if (mode < 0.85) {
            // 2. Braços em espiral estendidos suavemente pelos arredores
            const arm = i % 4;
            r = 0.18 + Math.random() * 0.72;
            a = arm * 1.57 + r * 5.0 + (Math.random() - 0.5) * 1.2;
          } else {
            // 3. Campo cósmico amplo e periférico
            far = true;
            r = 0.55 + Math.random() * 0.5;
            a = Math.random() * Math.PI * 2;
          }

          const rock = Math.random() < 0.035;
          spaceParticles.push({
            r,
            a,
            z: 0.35 + Math.random() * 0.65,
            j: (Math.random() - 0.5) * (far ? 0.6 : 0.35),
            sv: 0.5 + Math.random() * 0.75,
            ph: Math.random() * 6.28,
            rock,
            x: W / 2,
            y: H / 2,
            vx: 0,
            vy: 0,
            ch: rnd(isVeil ? (Math.random() < 0.5 ? DENSE : 'ABO+=1IXKZ') : r < 0.5 ? '01XKZ+-' : SPARSE),
            alpha: isVeil
              ? 0.28 + Math.random() * 0.35
              : far
              ? 0.14 + Math.random() * 0.22
              : 0.22 + Math.random() * 0.32
          });
        }
      }

      if (keywords.length === 0) {
        const shuffled = [...INTRO_KEYWORDS].sort(() => Math.random() - 0.5);
        const kwCount = W < 600 ? 12 : 22;
        for (let i = 0; i < kwCount; i++) {
          const kw = shuffled[i % shuffled.length];
          keywords.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * (W < 600 ? 0.22 : 0.32),
            vy: (Math.random() - 0.5) * (W < 600 ? 0.22 : 0.32),
            text: kw,
            displayChars: kw.split(''),
            baseAlpha: Math.random() * 0.25 + 0.25,
            heat: 0,
            driftAngle: Math.random() * Math.PI * 2,
            driftSpeed: 0.15 + Math.random() * 0.25,
            nextJitter: 0
          });
        }
      }

      buildPhraseCells();
    };

    size();
    const onResize = () => {
      size();
    };
    window.addEventListener('resize', onResize);

    const triggerBurst = () => {
      if (reduce) return;
      const vcx = W / 2;
      const vcy = H / 2;
      spaceParticles.forEach((p) => {
        const dx = p.x - vcx;
        const dy = p.y - vcy;
        const d = Math.hypot(dx, dy) + 1;
        const f = 18 + Math.random() * 26;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      });

      keywords.forEach((kw) => {
        const dx = kw.x - vcx;
        const dy = kw.y - vcy;
        const d = Math.hypot(dx, dy) + 1;
        kw.vx += (dx / d) * 14;
        kw.vy += (dy / d) * 14;
      });
    };

    let fadeOutTriggered = false;

    const leave = () => {
      if (state !== 'zoom') return;
      if (!fadeOutTriggered) {
        fadeOutTriggered = true;
        setFading(true);
      }
      setTimeout(() => finish(true), 600);
    };

    const click = () => {
      if (state === 'swirl') {
        onStartRef.current?.(true);
        state = 'zoom';
        zoomStartTime = performance.now();
        triggerBurst();
      } else if (state === 'zoom') {
        leave();
      }
    };

    // Suporte a toque com simulação de arrasto (deslize) e toque direto (tap)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let hasDragged = false;

    const onPointerDown = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      touchStartX = e.clientX;
      touchStartY = e.clientY;
      touchStartTime = Date.now();
      hasDragged = false;

      // No mouse (desktop), clique inicia a transição imediatamente
      if (e.pointerType === 'mouse') {
        click();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        const dist = Math.hypot(e.clientX - touchStartX, e.clientY - touchStartY);
        if (dist > 8) {
          hasDragged = true;
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        const duration = Date.now() - touchStartTime;
        // Se foi um toque simples (sem arrasto longo), inicia a transição imediatamente
        if (!hasDragged || duration < 320) {
          click();
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        click();
      } else if (e.key === 'Escape') {
        finish(false);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    window.addEventListener('keydown', onKeyDown);

    let lastF = performance.now();

    const frame = (now: number) => {
      animId = requestAnimationFrame(frame);
      if (!W || !H) return;
      const t = (now - t0) / 1000;
      const dt = Math.min((now - lastF) / 1000, 0.05);
      lastF = now;

      bx += (mx - bx) * 0.22;
      by += (my - by) * 0.22;
      trail.push({ x: bx, y: by });
      if (trail.length > 55) trail.shift();

      const vcx = W / 2;
      const vcy = H / 2;
      const R = Math.max(W, H) * 0.75;

      let scale = 0.85;
      let phraseAlpha = 1.0;

      if (state === 'zoom') {
        const elapsed = (now - zoomStartTime) / 1000;
        const totalDuration = 2.3;
        const progress = Math.min(elapsed / totalDuration, 1);

        const ease = Math.pow(progress, 3.2);
        scale = reduce ? 1.0 : 0.85 + 16.5 * ease;

        if (progress > 0.65) {
          const fadeProgress = (progress - 0.65) / 0.35;
          phraseAlpha = Math.max(0, 1 - fadeProgress * fadeProgress);
          if (!fadeOutTriggered) {
            fadeOutTriggered = true;
            setFading(true);
          }
        }

        if (now - lastTakeTime > 70 && !reduce) {
          lastTakeTime = now;
          phraseCells.forEach((c) => {
            c.char = Math.random() < 0.45 ? rnd(PHRASE_CHARS) : rnd(POOL);
          });
        }

        if (progress >= 1.0) {
          finish(true);
          return;
        }
      }

      ctx.fillStyle = '#05060c';
      ctx.fillRect(0, 0, W, H);

      // 1. Estrelas distantes
      ctx.fillStyle = 'rgba(210, 225, 255, 0.28)';
      for (let i = 0; i < 70; i++) {
        const sx = ((i * 977) % W) + (bx - W / 2) * -0.02 * (i % 3);
        const sy = (i * 613) % H;
        ctx.fillRect(sx, sy, 1.2, 1.2);
      }

      const infl = Math.max(70, Math.min(105, W * 0.085));
      const HEAT_R = Math.max(65, Math.min(95, W * 0.075));

      // 2. Palavras-Chave de Skills Flutuantes
      if (state === 'swirl') {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < keywords.length; i++) {
          const kw = keywords[i];
          kw.driftAngle += 0.006;
          kw.x += Math.cos(kw.driftAngle) * kw.driftSpeed * dt * 35 + kw.vx * dt * 50;
          kw.y += Math.sin(kw.driftAngle) * kw.driftSpeed * dt * 35 + kw.vy * dt * 50;

          if (kw.x < -80) kw.x = W + 40;
          else if (kw.x > W + 80) kw.x = -40;
          if (kw.y < -30) kw.y = H + 20;
          else if (kw.y > H + 30) kw.y = -20;

          const ox = kw.x - bx;
          const oy = kw.y - by;
          const d = Math.hypot(ox, oy);

          if (d < infl) {
            const f = 1 - d / infl;
            const push = f * f * 2.8;
            kw.x += (ox / (d || 1)) * push * 4;
            kw.y += (oy / (d || 1)) * push * 4;
            kw.heat = Math.max(kw.heat, f);

            if (now > kw.nextJitter) {
              kw.displayChars = kw.text.split('').map((ch) =>
                Math.random() < 0.45 * f ? rnd(POOL) : ch
              );
              kw.nextJitter = now + 45;
            }
          }

          kw.heat *= 0.965;
          if (kw.heat < 0.08) kw.displayChars = kw.text.split('');

          const kwAlpha = Math.min(0.95, kw.baseAlpha + kw.heat * 0.7);
          const fontSize = Math.floor(10 + kw.heat * 3);
          ctx.font = `600 ${fontSize}px "JetBrains Mono", ui-monospace, monospace`;

          if (kw.heat > 0.2) {
            ctx.fillStyle = `rgba(255, 255, 255, ${kwAlpha.toFixed(2)})`;
          } else {
            ctx.fillStyle = `rgba(180, 205, 245, ${kwAlpha.toFixed(2)})`;
          }

          ctx.fillText(`[${kw.displayChars.join('')}]`, kw.x, kw.y);
        }
      }

      // 3. Render da Frase luiz.edu
      if (phraseCells.length > 0) {
        const cellFontSize = Math.floor(Math.max(7, 8.5 * (scale / 0.85)));
        ctx.font = `700 ${cellFontSize}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < phraseCells.length; i++) {
          const c = phraseCells[i];

          const drawX = vcx + (c.x - vcx) * scale;
          const drawY = vcy + (c.y - vcy) * scale;

          if (drawX < -30 || drawX > W + 30 || drawY < -30 || drawY > H + 30) continue;

          if (state === 'swirl') {
            const dist = Math.hypot(drawX - bx, drawY - by);
            if (dist < HEAT_R) {
              c.heat = Math.max(c.heat, (1 - dist / HEAT_R) * 1.2);
            }
            c.heat *= 0.982;

            if (c.heat > 0.25 && Math.random() < 0.2) {
              c.char = rnd(POOL);
            } else if (c.heat < 0.05) {
              c.char = c.baseChar;
            }

            const alpha = Math.min(1, 0.08 + c.heat * 0.92);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
          } else {
            const alpha = Math.min(1, phraseAlpha * (0.88 + Math.min(scale, 1) * 0.12));
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
          }

          ctx.fillText(c.char, drawX, drawY);
        }
      }

      // 4. Partículas do Espaço e Onda de Expansão
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const expansionRadius = (W * 0.38) * (scale / 0.85);

      for (let i = 0; i < spaceParticles.length; i++) {
        const p = spaceParticles[i];

        const sp = 0.38 / Math.pow(0.22 + p.r, 0.58);
        const th = p.a + t * sp * 0.22 * p.sv;
        const rad = p.r * R * (1 + p.j) + Math.sin(t * 0.6 + p.ph) * 12;
        const aspectX = W > H ? 1.28 : 1.05;
        const aspectY = W > H ? 0.68 : 0.88;
        let dx = vcx + Math.cos(th) * rad * aspectX;
        let dy = vcy + Math.sin(th) * rad * aspectY + Math.cos(t * 0.5 + p.ph) * 8;
        let glow = 0;

        const ox = dx - bx;
        const oy = dy - by;
        const d = Math.hypot(ox, oy);

        if (d < infl) {
          const f = 1 - d / infl;
          const push = 1 + f * f * 2.8;
          dx = bx + ox * push;
          dy = by + oy * push;
          glow = f * 0.85;

          p.vx += (ox / (d || 1)) * f * 1.0;
          p.vy += (oy / (d || 1)) * f * 1.0;
        }

        if (state === 'zoom' || state === 'exit') {
          const pdx = p.x - vcx;
          const pdy = p.y - vcy;
          const pdist = Math.hypot(pdx, pdy) || 1;

          if (pdist < expansionRadius + 90) {
            const pushF = Math.max(0, 1 - pdist / (expansionRadius + 90)) * 22;
            p.vx += (pdx / pdist) * pushF;
            p.vy += (pdy / pdist) * pushF;
          }
        }

        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += (dx - p.x) * 0.12 + p.vx;
        p.y += (dy - p.y) * 0.12 + p.vy;

        if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) continue;

        const fs = p.rock ? 15 + p.z * 10 : 5.5 + p.z * 6.5;
        ctx.font = `600 ${Math.floor(fs)}px "JetBrains Mono", monospace`;

        let curAlpha = p.alpha;
        if (state === 'zoom' || state === 'exit') {
          curAlpha *= phraseAlpha * 0.45;
        }

        if (glow > 0.15) {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, curAlpha + glow * 0.6).toFixed(2)})`;
        } else {
          ctx.fillStyle = `rgba(205, 218, 250, ${curAlpha.toFixed(2)})`;
        }
        ctx.fillText(p.ch, p.x, p.y);
      }

      // 5. Render do Cometa Interativo
      if (state !== 'exit') {
        ctx.lineCap = 'round';

        for (let i = 1; i < trail.length; i++) {
          const a0 = trail[i - 1];
          const a1 = trail[i];
          const f = i / trail.length;
          ctx.strokeStyle = `rgba(220, 235, 255, ${(f * f * 0.6).toFixed(2)})`;
          ctx.lineWidth = 1 + f * 4.5;
          ctx.beginPath();
          ctx.moveTo(a0.x, a0.y);
          ctx.lineTo(a1.x, a1.y);
          ctx.stroke();
        }

        const hg = ctx.createRadialGradient(bx, by, 0, bx, by, 26);
        hg.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        hg.addColorStop(0.25, 'rgba(235, 245, 255, 0.6)');
        hg.addColorStop(0.6, 'rgba(190, 215, 255, 0.15)');
        hg.addColorStop(1, 'rgba(190, 215, 255, 0)');
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(bx, by, 26, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 2; i < trail.length; i += 2) {
          const q = trail[trail.length - 1 - i];
          const f = 1 - i / trail.length;
          ctx.font = `${Math.floor(7 + f * 6)}px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(240, 245, 255, ${(f * 0.65).toFixed(2)})`;
          ctx.fillText(
            rnd(POOL),
            q.x + (Math.random() - 0.5) * 10 * (1 - f) * 2,
            q.y + (Math.random() - 0.5) * 10 * (1 - f) * 2
          );
        }

        const isMobile = W <= 768;

        if (isMobile) {
          // No Mobile: Instrução centralizada e elegante fixada na parte inferior
          const instructionText =
            state === 'zoom'
              ? 'TOQUE PARA CONTINUAR'
              : 'DESLIZE PARA EXPLORAR • TOQUE PARA ENTRAR';

          ctx.font = `600 11px "JetBrains Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const tw = ctx.measureText(instructionText).width;
          const px = 14;
          const ph = 30;
          const lx = W / 2 - tw / 2 - px;
          const ly = H - 56;

          ctx.fillStyle = 'rgba(7, 8, 16, 0.88)';
          ctx.beginPath();
          ctx.roundRect(lx, ly, tw + px * 2, ph, 15);
          ctx.fill();

          ctx.strokeStyle = 'rgba(215, 230, 255, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.fillText(instructionText, W / 2, ly + ph / 2);
        } else {
          // No Desktop: Pill elegante com dinâmica fluida seguindo o cometa de perto
          const word = 'CLIQUE';
          const q = trail[Math.max(0, trail.length - 6)] || { x: bx, y: by };
          ctx.font = `600 12px "JetBrains Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const tw = ctx.measureText(word).width;
          const px = 10;
          const ph = 24;

          let lx = q.x + 18;
          let ly = q.y + 14;
          if (lx + tw + px * 2 > W - 12) lx = q.x - 18 - tw - px * 2;
          if (ly + ph > H - 12) ly = q.y - 14 - ph;

          ctx.fillStyle = 'rgba(5, 6, 12, 0.88)';
          ctx.beginPath();
          ctx.roundRect(lx, ly, tw + px * 2, ph, 4);
          ctx.fill();

          ctx.strokeStyle = 'rgba(215, 230, 255, 0.45)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.fillText(word, lx + tw / 2 + px, ly + ph / 2);
        }
      }
    };

    animId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className={`ascii-intro-container ${fading ? 'ascii-intro-container--fading' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#05060c',
        cursor: 'none',
        opacity: fading ? 0 : 1,
        transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: fading ? 'none' : 'auto'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          touchAction: 'none'
        }}
        aria-label="Abertura Espacial Cósmica em ASCII com Frase em Zoom"
      />
    </div>
  );
};
