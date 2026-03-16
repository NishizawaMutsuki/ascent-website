"use client";

import { useEffect, useRef, useCallback, useState, type FormEvent } from "react";

/* ===== SVG Icons ===== */
function IconMedical() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M9 8h6M12 5v6M5 21V8a2 2 0 012-2h1l1-3h6l1 3h1a2 2 0 012 2v13" />
    </svg>
  );
}

function IconAI() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <path d="M9 15c1 1.5 5 1.5 6 0" />
    </svg>
  );
}

function IconWeb() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
    </svg>
  );
}

/* ===== Gravity Canvas ===== */
function GravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const parent = c.parentElement!;
    const rect = parent.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    c.width = w * 2;
    c.height = h * 2;
    c.style.width = w + "px";
    c.style.height = h + "px";
    const ctx = c.getContext("2d")!;
    ctx.setTransform(2, 0, 0, 2, 0, 0);

    type P = { x: number; y: number; r: number; mass: number; vx: number; vy: number; alive: boolean };
    const ps: P[] = Array.from({ length: 45 }, () => {
      const r = 2 + Math.random() * 3.5;
      return {
        x: Math.random() * w, y: Math.random() * h,
        r, mass: r * r,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        alive: true,
      };
    });

    const G = 0.012;
    const connectDist = 150;
    const sCx = w / 2, sCy = h / 2 - h * 0.03;
    const sR = Math.min(w, h) * 0.3;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const alive = ps.filter((p) => p.alive);

      alive.forEach((p) => {
        const dx = p.x - sCx, dy = p.y - sCy;
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

      for (let i = 0; i < alive.length; i++) {
        for (let j = i + 1; j < alive.length; j++) {
          const dx = alive[i].x - alive[j].x, dy = alive[i].y - alive[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            ctx.beginPath();
            ctx.moveTo(alive[i].x, alive[i].y);
            ctx.lineTo(alive[j].x, alive[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${(1 - dist / connectDist) * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      alive.forEach((p) => {
        p.vx *= 0.998; p.vy *= 0.998;
        p.x += p.vx; p.y += p.vy;
        if (p.x < p.r) { p.x = p.r; p.vx *= -0.5; }
        if (p.x > w - p.r) { p.x = w - p.r; p.vx *= -0.5; }
        if (p.y < p.r) { p.y = p.r; p.vy *= -0.5; }
        if (p.y > h - p.r) { p.y = h - p.r; p.vy *= -0.5; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${Math.min(0.45, 0.18 + p.r * 0.012)})`;
        ctx.fill();

        if (p.r > 8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          const g = ctx.createRadialGradient(p.x, p.y, p.r * 0.5, p.x, p.y, p.r * 2.5);
          g.addColorStop(0, "rgba(56,189,248,0.06)");
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

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

/* ===== Contact Form ===== */
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    const subject = encodeURIComponent(`【お問い合わせ】${data.get("company")} ${data.get("name")}様`);
    const body = encodeURIComponent(
      `お名前: ${data.get("name")}\n会社・医院名: ${data.get("company")}\nメール: ${data.get("email")}\nご相談内容: ${data.get("type")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:info@ascent-web.jp?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>お問い合わせフォーム</h3>
      <div className="form-group">
        <label htmlFor="cf-name">お名前 *</label>
        <input id="cf-name" name="name" type="text" required />
      </div>
      <div className="form-group">
        <label htmlFor="cf-company">会社名・医院名</label>
        <input id="cf-company" name="company" type="text" />
      </div>
      <div className="form-group">
        <label htmlFor="cf-email">メールアドレス *</label>
        <input id="cf-email" name="email" type="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="cf-type">ご相談内容</label>
        <select id="cf-type" name="type">
          <option value="HP制作">医院ホームページ制作</option>
          <option value="AI開発">AI開発のご相談</option>
          <option value="その他">その他</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cf-message">メッセージ *</label>
        <textarea id="cf-message" name="message" required />
      </div>
      <button type="submit" className="form-submit" disabled={status === "sending"}>
        {status === "sending" ? "送信中..." : "送信する"}
      </button>
      {status === "sent" && (
        <div className="form-message success">メールクライアントが開きます。そのまま送信してください。</div>
      )}
      {status === "error" && (
        <div className="form-message error">送信に失敗しました。直接メールでお問い合わせください。</div>
      )}
    </form>
  );
}

/* ===== Main Page ===== */
export default function Home() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      revealRefs.current.forEach((el) => el?.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const addRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }, []);

  return (
    <main className="top-page">
      {/* ===== Full-screen Hero ===== */}
      <section className="top-hero">
        <div className="ripple-container" aria-hidden="true">
          <div className="ripple-impact" />
          <div className="ripple ripple-1" />
          <div className="ripple ripple-2" />
          <div className="ripple ripple-3" />
          <div className="ripple ripple-4" />
          <div className="ripple ripple-5" />
        </div>

        <GravityCanvas />

        <div className="top-hero-content">
          <h1>
            <span className="hero-line hero-line-1">Technology</span>
            <span className="hero-line hero-line-2">Accelerates</span>
            <span className="hero-line hero-line-3"><strong>Healthcare.</strong></span>
          </h1>
          <p className="top-hero-sub">
            テクノロジーで、医療をもっと身近に。<br />
            医療機関向けWeb制作とAI開発で、地域医療の成長を支援します。
          </p>
          <div className="top-hero-actions">
            <a href="#contact" className="top-btn top-btn-primary">お問い合わせ</a>
            <a href="#services" className="top-btn top-btn-ghost">事業内容を見る &rarr;</a>
          </div>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ===== Stats Bar ===== */}
      <div className="stats-bar" ref={addRef}>
        <div className="stats-grid reveal" ref={addRef}>
          <div className="stat-item">
            <div className="stat-number">100</div>
            <div className="stat-label">Lighthouse スコア</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">0</div>
            <div className="stat-label">WordPress 脆弱性</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5,000<span style={{ fontSize: '1rem', fontWeight: 400 }}>円〜</span></div>
            <div className="stat-label">月額運用費</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2<span style={{ fontSize: '1rem', fontWeight: 400 }}>週間</span></div>
            <div className="stat-label">最短公開期間</div>
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* ===== About ===== */}
        <section id="about" className="section">
          <p className="section-title">About — 私たちについて</p>
          <div className="about-mission reveal" ref={addRef}>
            <h2 className="about-mission-en">Technology Accelerates Healthcare.</h2>
            <p className="about-mission-ja">テクノロジーで、医療をもっと身近に。</p>
            <p className="about-desc">
              Ascentは、医療機関向けのWeb制作とAIアプリケーション開発を行う事業者です。<br />
              「検索しても出てこない」をなくし、すべての医院に信頼されるデジタルの窓口を届けます。<br />
              セキュリティ最優先の静的サイト設計と、最新のAI技術を組み合わせ、<br />
              地域医療をもっと届きやすくすることが私たちのミッションです。
            </p>
          </div>

          <div className="team-grid">
            <div className="team-card reveal" ref={addRef}>
              <div className="team-avatar">MN</div>
              <div className="team-name">Mutsuki Nishizawa</div>
              <div className="team-role">共同代表 / エンジニア</div>
              <p className="team-bio">
                電気通信大学卒。セキュリティとパフォーマンスを重視したWeb開発、
                LLMを活用したAIアプリケーション開発を担当。
              </p>
            </div>
            <div className="team-card reveal" ref={addRef} style={{ animationDelay: "120ms" }}>
              <div className="team-avatar" style={{ background: 'linear-gradient(135deg, #818cf8, #34d399)' }}>AT</div>
              <div className="team-name">Aoi Tsuzuri</div>
              <div className="team-role">共同代表 / 営業・事業開発</div>
              <p className="team-bio">
                早稲田大学卒。クライアントとの関係構築、営業戦略の策定、
                事業開発を担当。医療機関のニーズに寄り添った提案を行う。
              </p>
            </div>
          </div>
        </section>

        {/* ===== Services ===== */}
        <section id="services" className="section">
          <p className="section-title">Services — 事業内容</p>
          <div className="service-grid-new">
            {[
              {
                icon: <IconMedical />,
                label: "Medical Web",
                title: "医療機関向けHP制作",
                desc: "セキュリティ最優先の静的サイト設計。WordPress不使用で改ざんリスクゼロ。SSL/DDoS防御/WAF標準装備。月額5,000円〜で「Googleに表示される状態」を作ります。",
                link: "/hp",
                linkText: "詳しく見る",
              },
              {
                icon: <IconAI />,
                label: "AI Development",
                title: "AIアプリケーション開発",
                desc: "大規模言語モデル（LLM）を活用した教育・業務支援アプリの設計・開発。音声認識・リアルタイム分析を組み合わせたプロダクトを提供します。",
                link: null,
                linkText: "",
              },
              {
                icon: <IconWeb />,
                label: "Web Service",
                title: "Webサービス運営",
                desc: "SaaS型サービスの企画からインフラ構築・運用まで、プロダクトのライフサイクル全体を一気通貫で担当します。",
                link: null,
                linkText: "",
              },
            ].map((s, i) => (
              <article className="svc-card reveal" key={i} ref={addRef} style={{ animationDelay: `${i * 120}ms` }}>
                <div className="svc-icon">{s.icon}</div>
                <span className="svc-label">{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                {s.link && (
                  <a href={s.link} className="svc-link">{s.linkText} &rarr;</a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <div className="cta-section reveal" ref={addRef}>
          <div className="cta-box">
            <h3>まずはお気軽にご相談ください</h3>
            <p>「ホームページを持っていない」「検索しても出てこない」そんなお悩みを解決します。</p>
            <a href="#contact" className="top-btn top-btn-primary">無料相談はこちら</a>
          </div>
        </div>

        {/* ===== Works ===== */}
        <section id="works" className="section">
          <p className="section-title">Works — 制作実績・デモ</p>
          <div className="works-grid">
            <div className="work-card reveal" ref={addRef}>
              <div className="work-browser">
                <div className="work-browser-dots">
                  <span /><span /><span />
                </div>
                <div className="work-browser-url">demo-clinic-base.pages.dev</div>
              </div>
              <div className="work-preview">
                <div className="work-preview-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span>Base Plan デモサイト</span>
                </div>
              </div>
              <div className="work-info">
                <div className="tag">ベースプラン</div>
                <h3>クリニック向け 1ページLP</h3>
                <p>
                  月額5,000円〜のシンプルプラン。診療案内・アクセス・予約導線を
                  1ページに集約した、Google表示に最適化されたデザイン。
                </p>
              </div>
            </div>

            <div className="work-card reveal" ref={addRef} style={{ animationDelay: "120ms" }}>
              <div className="work-browser">
                <div className="work-browser-dots">
                  <span /><span /><span />
                </div>
                <div className="work-browser-url">demo-clinic-premium.pages.dev</div>
              </div>
              <div className="work-preview">
                <div className="work-preview-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span>Premium Plan デモサイト</span>
                </div>
              </div>
              <div className="work-info">
                <div className="tag">プレミアムプラン</div>
                <h3>皮膚科クリニック 複数ページサイト</h3>
                <p>
                  月額12,000円〜のフルサイトプラン。8〜15ページ構成で、
                  診療科目別ページ・医師紹介・FAQ・予約システム連携に対応。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Products ===== */}
        <section id="products" className="section">
          <p className="section-title">Products — プロダクト</p>
          <div className="product-link-grid">
            <a href="/hp" className="product-link-card reveal" ref={addRef}>
              <div className="tag">クリニック向け — Web制作・運用</div>
              <h3>医院HP制作</h3>
              <p>
                セキュリティ最優先の静的サイト設計。WordPress不使用で改ざんリスクゼロ。
                月額5,000円〜でGoogleに表示される状態を作ります。
              </p>
              <div className="features">
                <span className="feature-tag">レスポンシブ対応</span>
                <span className="feature-tag">SEO / MEO</span>
                <span className="feature-tag">SSL / WAF</span>
                <span className="feature-tag">医療広告GL対応</span>
              </div>
              <span className="product-link-arrow">詳しく見る &rarr;</span>
            </a>

            <a href="/products/talk-trainer" className="product-link-card reveal" ref={addRef} style={{ animationDelay: "120ms" }}>
              <div className="tag">SaaS — 月額サブスクリプション</div>
              <h3>Talk Trainer</h3>
              <p>
                AIコーチが面接回答をリアルタイムで分析し、構造・具体性・フレームワーク適合度を
                スコアリング。面接スキルを効率的に向上させます。
              </p>
              <div className="features">
                <span className="feature-tag">音声認識</span>
                <span className="feature-tag">AI分析</span>
                <span className="feature-tag">フレームワーク評価</span>
                <span className="feature-tag">深掘り練習</span>
              </div>
              <span className="product-link-arrow">詳しく見る &rarr;</span>
            </a>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section id="contact" className="section">
          <p className="section-title">Contact — お問い合わせ</p>
          <div className="contact-grid">
            <div className="contact-details">
              <div className="contact-item">
                <div><div className="label">事業者名</div><div className="value">Ascent</div></div>
              </div>
              <div className="contact-item">
                <div><div className="label">共同代表</div><div className="value">Mutsuki Nishizawa / Aoi Tsuzuri</div></div>
              </div>
              <div className="contact-item">
                <div><div className="label">メールアドレス</div><div className="value"><a href="mailto:info@ascent-web.jp">info@ascent-web.jp</a></div></div>
              </div>
              <div className="contact-item">
                <div><div className="label">お問い合わせ対応</div><div className="value">メールにて受付（営業日2日以内に返信）</div></div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* ===== Policies ===== */}
        <section className="section">
          <p className="section-title">Policies — 各種ポリシー</p>
          <div className="service-grid">
            <a href="/terms" className="service-card" style={{ textDecoration: 'none' }}>
              <h3>利用規約</h3><p>サービスのご利用に関する条件をご確認ください。</p>
            </a>
            <a href="/privacy" className="service-card" style={{ textDecoration: 'none' }}>
              <h3>プライバシーポリシー</h3><p>個人情報の取り扱いについてご確認ください。</p>
            </a>
            <a href="/legal" className="service-card" style={{ textDecoration: 'none' }}>
              <h3>特定商取引法に基づく表記</h3><p>販売者情報と取引条件をご確認ください。</p>
            </a>
            <a href="/refund" className="service-card" style={{ textDecoration: 'none' }}>
              <h3>返金・キャンセルポリシー</h3><p>返金とキャンセルの条件をご確認ください。</p>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
