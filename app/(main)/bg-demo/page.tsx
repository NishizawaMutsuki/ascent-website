"use client";

import { useEffect, useRef } from "react";

function initCanvas(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement!;
  const rect = parent.getBoundingClientRect();
  const w = Math.round(rect.width);
  const h = Math.round(rect.height);
  canvas.width = w * 2;
  canvas.height = h * 2;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  return { ctx, w, h };
}

export default function BgDemo() {
  const c1Ref = useRef<HTMLCanvasElement>(null);
  const c2Ref = useRef<HTMLCanvasElement>(null);
  const c3Ref = useRef<HTMLCanvasElement>(null);

  // === 案1: 上昇するパーティクル ===
  useEffect(() => {
    const c = c1Ref.current;
    if (!c) return;
    const { ctx, w, h } = initCanvas(c);

    type P = { x: number; y: number; r: number; speed: number; opacity: number };
    const ps: P[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.5 + Math.random() * 3,
      speed: 0.15 + Math.random() * 0.4,
      opacity: 0.15 + Math.random() * 0.35,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ps.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  // === 案2: 外に広がる粒子 ===
  useEffect(() => {
    const c = c2Ref.current;
    if (!c) return;
    const { ctx, w, h } = initCanvas(c);
    const cx = w / 2, cy = h / 2;

    type P = { angle: number; dist: number; r: number; speed: number; opacity: number };
    const ps: P[] = Array.from({ length: 50 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 30,
      r: 1.5 + Math.random() * 3,
      speed: 0.1 + Math.random() * 0.3,
      opacity: 0.2 + Math.random() * 0.3,
    }));

    let raf: number;
    const maxDist = Math.sqrt(cx * cx + cy * cy);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ps.forEach((p) => {
        const x = cx + Math.cos(p.angle) * p.dist;
        const y = cy + Math.sin(p.angle) * p.dist;
        const fade = Math.max(1 - p.dist / maxDist, 0);
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${p.opacity * fade})`;
        ctx.fill();
        p.dist += p.speed;
        if (p.dist > maxDist) { p.dist = 0; p.angle = Math.random() * Math.PI * 2; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  // === 案3: 引力で合体 + シールド ===
  useEffect(() => {
    const c = c3Ref.current;
    if (!c) return;
    const { ctx, w, h } = initCanvas(c);

    type P = { x: number; y: number; r: number; mass: number; vx: number; vy: number; alive: boolean };
    const ps: P[] = Array.from({ length: 40 }, () => {
      const r = 2.5 + Math.random() * 3.5;
      return {
        x: Math.random() * w, y: Math.random() * h,
        r, mass: r * r,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        alive: true,
      };
    });

    const G = 0.012;
    const connectDist = 150;
    const sCx = w / 2, sCy = h / 2 - 2;
    const sR = Math.min(w, h) * 0.42;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Shield — invisible but still repels particles

      const alive = ps.filter((p) => p.alive);

      // Shield repulsion
      alive.forEach((p) => {
        const dx = p.x - sCx;
        const dy = p.y - sCy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = sR + p.r;
        if (dist < minDist && dist > 0) {
          const nx = dx / dist, ny = dy / dist;
          p.x = sCx + nx * minDist;
          p.y = sCy + ny * minDist;
          const dot = p.vx * nx + p.vy * ny;
          p.vx -= 2 * dot * nx * 0.6;
          p.vy -= 2 * dot * ny * 0.6;
        }
      });

      // Gravity
      for (let i = 0; i < alive.length; i++) {
        for (let j = i + 1; j < alive.length; j++) {
          const a = alive[i], b = alive[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);
          if (dist < 1) continue;

          if (dist < a.r + b.r) {
            const big = a.mass >= b.mass ? a : b;
            const sm = a.mass >= b.mass ? b : a;
            const tm = big.mass + sm.mass;
            big.vx = (big.vx * big.mass + sm.vx * sm.mass) / tm;
            big.vy = (big.vy * big.mass + sm.vy * sm.mass) / tm;
            big.x = (big.x * big.mass + sm.x * sm.mass) / tm;
            big.y = (big.y * big.mass + sm.y * sm.mass) / tm;
            big.mass = tm; big.r = Math.sqrt(tm);
            sm.alive = false;
            continue;
          }

          const force = G * a.mass * b.mass / Math.max(distSq, 100);
          const fx = force * dx / dist, fy = force * dy / dist;
          a.vx += fx / a.mass; a.vy += fy / a.mass;
          b.vx -= fx / b.mass; b.vy -= fy / b.mass;
        }
      }

      // Lines
      for (let i = 0; i < alive.length; i++) {
        for (let j = i + 1; j < alive.length; j++) {
          const dx = alive[i].x - alive[j].x, dy = alive[i].y - alive[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            ctx.beginPath();
            ctx.moveTo(alive[i].x, alive[i].y);
            ctx.lineTo(alive[j].x, alive[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${(1 - dist / connectDist) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Dots
      alive.forEach((p) => {
        p.vx *= 0.998; p.vy *= 0.998;
        p.x += p.vx; p.y += p.vy;
        if (p.x < p.r) { p.x = p.r; p.vx *= -0.5; }
        if (p.x > w - p.r) { p.x = w - p.r; p.vx *= -0.5; }
        if (p.y < p.r) { p.y = p.r; p.vy *= -0.5; }
        if (p.y > h - p.r) { p.y = h - p.r; p.vy *= -0.5; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${Math.min(0.5, 0.2 + p.r * 0.015)})`;
        ctx.fill();

        if (p.r > 8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          const g = ctx.createRadialGradient(p.x, p.y, p.r * 0.5, p.x, p.y, p.r * 2.5);
          g.addColorStop(0, "rgba(56,189,248,0.08)");
          g.addColorStop(1, "rgba(56,189,248,0)");
          ctx.fillStyle = g;
          ctx.fill();
        }
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  const panels = [
    { title: "案1: 上昇するパーティクル", desc: "粒子がゆっくり下から上へ。Ascent（上昇）のメタファー。" },
    { title: "案2: 外に広がる粒子", desc: "中心から外に向かって散っていく。波紋の余韻。" },
    { title: "案3: 引力で合体 + シールド", desc: "粒子が引き合い合体。中央のシールドがヒーローを守り、粒子を弾く。" },
  ];
  const refs = [c1Ref, c2Ref, c3Ref];

  return (
    <main style={{ padding: "2rem 1.5rem", maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "Outfit", fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
        背景アニメーション 3案比較
      </h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginBottom: "2rem" }}>
        水滴リップル後に表示される背景の候補。
      </p>
      <div style={{ display: "grid", gap: "2rem" }}>
        {panels.map((panel, i) => (
          <div key={i}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.25rem" }}>{panel.title}</h2>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>{panel.desc}</p>
            <div style={{ position: "relative", background: "#000", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", height: 400 }}>
              <canvas ref={refs[i]} style={{ position: "absolute", inset: 0 }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1, pointerEvents: "none", paddingBottom: 0 }}>
                <span style={{ fontFamily: "Outfit", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 200, color: "rgba(255,255,255,0.9)", lineHeight: 1.05 }}>Technology</span>
                <span style={{ fontFamily: "Outfit", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 200, color: "rgba(255,255,255,0.4)", lineHeight: 1.05 }}>Accelerates</span>
                <span style={{ fontFamily: "Outfit", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05, background: "linear-gradient(135deg, #38bdf8, #818cf8, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Business.</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
