"use client";

import { useEffect, useRef, useCallback, useState, type FormEvent } from "react";
import GravityCanvas from "@/components/GravityCanvas";

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

/* ===== Device Preview ===== */
function DevicePreview({ url }: { url: string }) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scale = () => {
      if (desktopRef.current) {
        const w = desktopRef.current.offsetWidth;
        const iframe = desktopRef.current.querySelector("iframe");
        if (iframe) iframe.style.transform = `scale(${w / 1280})`;
      }
      if (mobileRef.current) {
        const w = mobileRef.current.offsetWidth;
        const iframe = mobileRef.current.querySelector("iframe");
        if (iframe) iframe.style.transform = `scale(${w / 375})`;
      }
    };
    scale();
    window.addEventListener("resize", scale);
    return () => window.removeEventListener("resize", scale);
  }, []);

  return (
    <div className="works-devices">
      <div className="device-desktop">
        <div className="device-browser-bar">
          <div className="work-browser-dots"><span /><span /><span /></div>
          <div className="work-browser-url">{url.replace("https://", "")}</div>
        </div>
        <div className="device-screen" ref={desktopRef}>
          <iframe src={url} title="デモサイト（PC表示）" loading="lazy" />
        </div>
      </div>
      <div className="device-mobile">
        <div className="device-mobile-notch" />
        <div className="device-screen-mobile" ref={mobileRef}>
          <iframe src={url} title="デモサイト（スマホ表示）" loading="lazy" />
        </div>
      </div>
    </div>
  );
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
            <div className="stat-number">6,000<span style={{ fontSize: '1rem', fontWeight: 400 }}>円〜</span></div>
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
          <p className="section-title">About</p>
          <div className="about-layout reveal" ref={addRef}>
            <div>
              <span className="about-heading-en">Technology Accelerates Healthcare.</span>
              <h2 className="about-heading">テクノロジーで、<br />医療をもっと身近に。</h2>
            </div>
            <div className="about-body">
              <p className="about-desc">
                Ascentは、医療機関向けのWeb制作とAIアプリケーション開発を行う事業者です。
                「検索しても出てこない」をなくし、すべての医院に信頼されるデジタルの窓口を届けます。
                セキュリティ最優先の静的サイト設計と、最新のAI技術を組み合わせ、
                地域医療をもっと届きやすくすることが私たちのミッションです。
              </p>
            </div>
          </div>

          <div className="team-grid">
            <div className="team-card reveal" ref={addRef}>
              <div className="team-avatar">MN</div>
              <div className="team-info">
                <div className="team-name">Mutsuki Nishizawa</div>
                <div className="team-role">共同代表 / エンジニア</div>
                <p className="team-bio">
                  電気通信大学卒。セキュリティとパフォーマンスを重視したWeb開発、
                  LLMを活用したAIアプリケーション開発を担当。
                </p>
              </div>
            </div>
            <div className="team-card reveal" ref={addRef} style={{ animationDelay: "120ms" }}>
              <div className="team-avatar">AT</div>
              <div className="team-info">
                <div className="team-name">Aoi Tsuzuura</div>
                <div className="team-role">共同代表 / 営業・事業開発</div>
                <p className="team-bio">
                  早稲田大学法学部在籍。クライアントとの関係構築、営業戦略の策定、
                  事業開発を担当。医療機関のニーズに寄り添った提案を行う。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Services ===== */}
        <section id="services" className="section">
          <p className="section-title">Services</p>
          <div className="service-grid-new">
            {[
              {
                icon: <IconMedical />,
                label: "Medical Web",
                title: "医療機関向けHP制作",
                desc: "セキュリティ最優先の静的サイト設計。WordPress不使用で改ざんリスクゼロ。SSL/DDoS防御/WAF標準装備。月額6,000円〜で「Googleに表示される状態」を作ります。",
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
            <div>
              <h3>まずはお気軽にご相談ください</h3>
              <p>「ホームページを持っていない」「検索しても出てこない」そんなお悩みを解決します。</p>
            </div>
            <a href="#contact" className="cta-inline-link">無料相談はこちら &rarr;</a>
          </div>
        </div>

        {/* ===== Works ===== */}
        <section id="works" className="section">
          <p className="section-title">Works</p>
          <div className="works-showcase reveal" ref={addRef}>
            <div className="works-info">
              <div className="tag">プレミアムプラン — デモサイト</div>
              <h3>医院の魅力を最大限に引き出す、プレミアムホームページ制作</h3>
              <p>
                患者からの質問にAIが24時間対応。WEB予約・院長ブログ・オーダーメイド開発も可能。
                AX（AIトランスフォーメーション）完全対応で、クリニックの未来を一歩先へ。
              </p>
              <a href="https://demo-premium.ascent-web.jp" target="_blank" rel="noopener noreferrer" className="svc-link">デモサイトを見る &rarr;</a>
            </div>
            <DevicePreview url="https://demo-premium.ascent-web.jp" />
          </div>
        </section>

        {/* ===== Products ===== */}
        <section id="products" className="section">
          <p className="section-title">Products</p>
          <div className="product-link-grid">
            <a href="/hp" className="product-link-card reveal" ref={addRef}>
              <div className="tag">クリニック向け — Web制作・運用</div>
              <h3>医院HP制作</h3>
              <p>
                セキュリティ最優先の静的サイト設計。WordPress不使用で改ざんリスクゼロ。
                月額6,000円〜でGoogleに表示される状態を作ります。
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
          <p className="section-title">Contact</p>
          <div className="contact-grid">
            <div className="contact-details">
              <div className="contact-item">
                <div><div className="label">事業者名</div><div className="value">Ascent</div></div>
              </div>
              <div className="contact-item">
                <div><div className="label">共同代表</div><div className="value">Mutsuki Nishizawa / Aoi Tsuzuura</div></div>
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
          <p className="section-title">Policies</p>
          <div className="policy-list">
            <a href="/terms" className="policy-item">
              <span className="policy-name">利用規約</span>
              <span className="policy-arrow">&rarr;</span>
            </a>
            <a href="/privacy" className="policy-item">
              <span className="policy-name">プライバシーポリシー</span>
              <span className="policy-arrow">&rarr;</span>
            </a>
            <a href="/legal" className="policy-item">
              <span className="policy-name">特定商取引法に基づく表記</span>
              <span className="policy-arrow">&rarr;</span>
            </a>
            <a href="/refund" className="policy-item">
              <span className="policy-name">返金・キャンセルポリシー</span>
              <span className="policy-arrow">&rarr;</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
