"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";

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
        <div className="device-bar">
          <div className="device-dots"><span /><span /><span /></div>
          <div className="device-url">{url.replace("https://", "")}</div>
        </div>
        <div className="device-screen" ref={desktopRef}>
          <iframe src={url} title="PC" loading="lazy" />
        </div>
      </div>
      <div className="device-mobile">
        <div className="device-notch" />
        <div className="device-screen-m" ref={mobileRef}>
          <iframe src={url} title="SP" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

type Demo = { url: string; name: string; desc: string; tags: string[] };

function WorksCarousel({ demos }: { demos: Demo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const scrollLeft = track.scrollLeft;
      const slideWidth = track.offsetWidth;
      const idx = Math.round(scrollLeft / slideWidth);
      setActive(idx);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: idx * track.offsetWidth, behavior: "smooth" });
  };

  return (
    <div className="works-carousel">
      <div className="works-track" ref={trackRef}>
        {demos.map((site, i) => (
          <div className="works-slide" key={i}>
            <div className="works-slide-inner">
              <DevicePreview url={site.url} />
              <div className="works-caption">
                <h3>{site.name}</h3>
                <p>{site.desc}</p>
                <div className="works-tags">
                  {site.tags.map((tag, j) => <span key={j}>{tag}</span>)}
                </div>
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="works-link">
                  デモサイトを見る →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="works-nav">
        {demos.map((_, i) => (
          <button
            key={i}
            className={`works-dot${active === i ? " is-active" : ""}`}
            onClick={() => scrollTo(i)}
            type="button"
            aria-label={`スライド ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const demoSites: Demo[] = [
  {
    url: "https://demo-premium.ascent-web.jp",
    name: "プレミアムプラン デモサイト",
    desc: "全12ページ構成、スマホ完全対応、WEB予約連携、医療広告GL準拠",
    tags: ["12ページ", "レスポンシブ", "WEB予約", "医療広告GL準拠"],
  },
  {
    url: "https://demo-standard.ascent-web.jp",
    name: "スタンダードプラン デモサイト",
    desc: "5〜7ページ構成。診療科別ページ・医師紹介を揃えた本格サイト",
    tags: ["5〜7ページ", "レスポンシブ", "SEO対応", "診療科別ページ"],
  },
];

export default function HpLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerLoaded, setHeaderLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formFeedback, setFormFeedback] = useState("");
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderLoaded(true), 100);
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const addRevealRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormFeedback("デモページのため送信はされません。実装時にはフォーム送信やLINE連携に対応できます。");
  };

  const faqItems = [
    { q: "相談だけでも可能ですか？", a: "はい、可能です。現状の課題整理や、何から着手すべきかのご相談だけでもお気軽にお問い合わせください。費用は一切かかりません。" },
    { q: "既存サイトの改善だけでも依頼できますか？", a: "可能です。全面リニューアルではなく、スマホ対応、SSL対応、予約導線の追加など一部の見直しにも対応しています。" },
    { q: "制作期間はどれくらいですか？", a: "ベースプランは2〜3週間、プレミアムプランは1〜2ヶ月が目安です。お急ぎの場合もご相談ください。" },
    { q: "月額費用には何が含まれますか？", a: "ドメイン管理・サーバー費用・SSL維持・テキスト更新（月2〜4回）・セキュリティ監視が含まれます。追加の費用は発生しません。" },
    { q: "解約金はありますか？", a: "解約金はありません。ドメインは先生の名義で取得しますので、解約後もそのままご利用いただけます。" },
    { q: "ドメインは誰の名義になりますか？", a: "先生（医院）の名義で取得します。弊社名義で取得して『ドメイン人質』になるようなことはありません。解約時もスムーズに移管できます。" },
    { q: "WordPressを使わないのはなぜですか？", a: "WordPressはプラグインやコアの更新を怠るとセキュリティリスクが高まります。弊社では静的サイト生成を採用しており、サーバー側の処理がないため、改ざん・不正アクセスのリスクが根本的に低い構成です。" },
    { q: "写真は自分で用意する必要がありますか？", a: "プロカメラマンによる撮影をオプションでご用意しています。お手持ちのスマホ写真でも、こちらで補正して使用できます。" },
    { q: "医療広告ガイドラインへの対応はしてもらえますか？", a: "はい。掲載テキストは医療広告ガイドラインに沿った表現チェックを行います。書面掲示事項のウェブ掲載にも対応しています。" },
    { q: "補助金は使えますか？", a: "個人開業医の先生は小規模事業者持続化補助金（補助率2/3、上限50万円）が活用できる場合があります。申請のサポートも可能です。" },
  ];

  return (
    <div className="lp">
      <div className="page-shell">
        {/* ── Header ── */}
        <header className={`site-header${headerLoaded ? " is-loaded" : ""}${isScrolled ? " is-scrolled" : ""}`} id="top">
          <div className="lp-container header-inner">
            <a className="brand" href="#top" aria-label="アセント トップへ戻る">
              <span className="brand-mark">A</span>
              <span className="brand-text">
                <strong>アセント</strong>
                <small>Medical Web Design</small>
              </span>
            </a>
            <button
              className={`menu-toggle${menuOpen ? " is-active" : ""}`}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ position: "relative", zIndex: 110 }}
            >
              <span></span><span></span><span></span>
              <span className="sr-only">メニューを開閉</span>
            </button>
            <nav className={`site-nav${menuOpen ? " is-open" : ""}`} id="site-nav" aria-label="主要メニュー">
              <a href="#works" onClick={closeMenu}>制作実績</a>
              <a href="#service" onClick={closeMenu}>サービス</a>
              <a href="#pricing" onClick={closeMenu}>料金</a>
              <a href="#flow" onClick={closeMenu}>流れ</a>
              <a href="#faq" onClick={closeMenu}>FAQ</a>
              <div className="nav-cta-group">
                <a href="#contact" className="nav-cta nav-cta-ghost" onClick={closeMenu}>
                  <svg className="nav-cta-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h10v7.5H8.5L5.5 13v-2.5H2V3z" />
                  </svg>
                  <span className="nav-cta-label">Contact</span>
                </a>
                <a href="https://demo-premium.ascent-web.jp" target="_blank" rel="noopener noreferrer" className="nav-cta nav-cta-primary" onClick={closeMenu}>
                  <svg className="nav-cta-icon" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="10" height="8" rx="1" />
                    <line x1="5" y1="12" x2="9" y2="12" />
                    <line x1="7" y1="10" x2="7" y2="12" />
                  </svg>
                  <span className="nav-cta-label">Demo</span>
                </a>
              </div>
            </nav>
          </div>
        </header>

        <main>
          {/* ── Hero ── */}
          <section className="lp-hero">
            <div className="lp-container hero-inner">
              <div className="hero-copy reveal" ref={addRevealRef}>
                <p className="eyebrow">開業医専門ホームページ制作</p>
                <h1>
                  先生の想いを伝え、<br />
                  患者さまに<span className="accent-line">選ばれる</span>クリニックへ。
                </h1>
                <p className="hero-lead">
                  患者さんの8割近くがネットで医院を探す時代。
                  セキュリティ・スマホ対応・SEO/MEOを標準装備した
                  ホームページを、月額6,000円から制作・運用します。
                </p>
                <div className="hero-actions">
                  <a className="lp-button lp-button-primary" href="#contact">無料で相談する</a>
                  <a className="lp-button lp-button-secondary" href="#works">制作実績を見る</a>
                </div>
              </div>
              <div className="hero-stats reveal" ref={addRevealRef}>
                <div className="hero-stat">
                  <span className="hero-stat-number">100</span>
                  <span className="hero-stat-label">Lighthouse Score</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number">0</span>
                  <span className="hero-stat-label">WordPress脆弱性</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number">6,000<small>円〜</small></span>
                  <span className="hero-stat-label">月額</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number">2<small>週間</small></span>
                  <span className="hero-stat-label">最短公開</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Works / Portfolio ── */}
          <section className="lp-section works" id="works">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag-en">Works</p>
                <h2>制作実績</h2>
                <p>スマホでそのまま操作できます。表示速度・デザイン・導線をお確かめください。</p>
              </div>
              <WorksCarousel demos={demoSites} />
            </div>
          </section>

          {/* ── Service Overview ── */}
          <section className="lp-section service" id="service">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag-en">Service</p>
                <h2>サービス内容</h2>
              </div>
              <div className="service-grid">
                {[
                  {
                    num: "01",
                    title: "ファーストビュー設計",
                    desc: "開いた瞬間に「どんな医院か」が伝わる構成。診療科目・受付時間・アクセスを3秒で把握できるレイアウトを設計します。",
                  },
                  {
                    num: "02",
                    title: "先生の顔が見えるデザイン",
                    desc: "院長の写真・メッセージ・経歴を丁寧に配置。患者さんが「この先生に診てもらいたい」と思えるページに仕上げます。",
                  },
                  {
                    num: "03",
                    title: "専門性を伝えるページ構成",
                    desc: "診療科目ごとに専用ページを作成。症状・治療法・費用の目安を患者さん目線で分かりやすく整理します。",
                  },
                  {
                    num: "04",
                    title: "スマホ対応標準装備",
                    desc: "患者さんの大半はスマホで医院を探します。タップしやすいボタン、読みやすい文字サイズ、高速表示を全プランで標準対応。",
                  },
                ].map((item, i) => (
                  <article className="service-card reveal" key={i} ref={addRevealRef}>
                    <span className="service-num">{item.num}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── Security ── */}
          <section className="lp-section security" id="security">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag-en">Security</p>
                <h2>患者さんの個人情報を守る、堅牢な基盤。</h2>
              </div>
              <div className="security-grid">
                {[
                  { icon: "lock", title: "SSL / HTTPS 標準装備", desc: "すべての通信を暗号化。患者さんの名前・メールアドレスが盗み見されるリスクをゼロにします。" },
                  { icon: "shield", title: "DDoS防御 + WAF", desc: "Cloudflareの世界水準のセキュリティ基盤で、不正アクセスや攻撃を自動でブロックします。" },
                  { icon: "zap", title: "WordPress不使用", desc: "静的サイト生成により、サーバー側の処理がありません。改ざん・マルウェア感染のリスクが根本的にゼロです。" },
                  { icon: "globe", title: "CDN 330+拠点", desc: "Cloudflareの CDN で日本を含む世界中のエッジサーバーから配信。高速かつ安定した表示を実現します。" },
                ].map((item, i) => (
                  <article className="security-card reveal" key={i} ref={addRevealRef}>
                    <div className="security-icon-wrap">
                      {item.icon === "lock" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      )}
                      {item.icon === "shield" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                      )}
                      {item.icon === "zap" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                      )}
                      {item.icon === "globe" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                      )}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── Why Us / Differentiators ── */}
          <section className="lp-section reasons" id="reasons">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag-en">Why Us</p>
                <h2>選ばれる理由</h2>
              </div>
              <div className="reason-grid">
                {[
                  { title: "医療広告ガイドライン対応", desc: "誇大表現のチェック、ビフォーアフター写真の掲載基準、書面掲示事項のウェブ掲載まで、制度面を理解した上で制作します。" },
                  { title: "先生の手間はゼロ", desc: "診療時間が変わったら一言ご連絡いただくだけ。テキスト更新・セキュリティ保守・サーバー管理、すべてお任せください。" },
                  { title: "ドメインは先生の名義", desc: "制作会社名義でドメインを取得して『人質』にすることはしません。解約時もスムーズに移管できます。" },
                  { title: "月額6,000円からの明朗会計", desc: "ドメイン・サーバー・SSL・保守すべて込み。追加費用なし。月1新患が増えれば元が取れる価格設計です。" },
                ].map((item, i) => (
                  <article className="reason-card reveal" key={i} ref={addRevealRef}>
                    <span className="reason-number">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── Pricing ── */}
          <section className="lp-section pricing" id="pricing">
            <div className="lp-container">
              <div className="section-heading section-heading-center reveal" ref={addRevealRef}>
                <p className="section-tag-en">Pricing</p>
                <h2>3つのプランをご用意しています。</h2>
                <p>すべてのプランにSSL・セキュリティ・保守が含まれます。最低契約期間は12ヶ月です。</p>
              </div>
              <div className="pricing-grid">
                <article className="plan-card reveal" ref={addRevealRef}>
                  <h3>Lite</h3>
                  <p className="plan-price-group">
                    <span className="plan-price-label">初期費用</span>
                    <span className="plan-price">&yen;80,000</span>
                  </p>
                  <p className="plan-price-group">
                    <span className="plan-price-label">月額</span>
                    <span className="plan-price plan-price-monthly">&yen;6,000</span>
                  </p>
                  <p className="plan-copy">まずはGoogleに医院が表示される状態を作ります。</p>
                  <ul className="plan-features">
                    <li>1ページ構成のLP制作</li>
                    <li>スマホ最適化</li>
                    <li>診療内容の整理</li>
                    <li>問い合わせ導線の設置</li>
                    <li>基本SEO設定</li>
                    <li>軽微修正 月1回</li>
                  </ul>
                  <a href="#contact" className="lp-button lp-button-tertiary">このプランで相談する</a>
                </article>
                <article className="plan-card plan-card-featured reveal" ref={addRevealRef}>
                  <span className="plan-badge">おすすめ</span>
                  <h3>Standard</h3>
                  <p className="plan-price-group">
                    <span className="plan-price-label">初期費用</span>
                    <span className="plan-price">&yen;300,000</span>
                  </p>
                  <p className="plan-price-group">
                    <span className="plan-price-label">月額</span>
                    <span className="plan-price plan-price-monthly">&yen;12,000</span>
                  </p>
                  <p className="plan-copy">診療科別ページ・医師紹介を揃えた本格的なホームページ。</p>
                  <ul className="plan-features">
                    <li>5〜7ページのサイト制作</li>
                    <li>スマホ最適化</li>
                    <li>診療内容の整理・構成設計</li>
                    <li>問い合わせ導線の最適化</li>
                    <li>基本SEO設定</li>
                    <li>軽微修正 月2回</li>
                  </ul>
                  <a href="#contact" className="lp-button lp-button-primary">まずは相談する</a>
                </article>
                <article className="plan-card reveal" ref={addRevealRef}>
                  <h3>Premium</h3>
                  <p className="plan-price-group">
                    <span className="plan-price-label">初期費用</span>
                    <span className="plan-price">&yen;580,000</span>
                  </p>
                  <p className="plan-price-group">
                    <span className="plan-price-label">月額</span>
                    <span className="plan-price plan-price-monthly">&yen;18,000</span>
                  </p>
                  <p className="plan-copy">MEO運用・予約システム・写真撮影・ロゴ制作まで含むフルパッケージ。</p>
                  <ul className="plan-features">
                    <li>10〜15ページのサイト制作</li>
                    <li>スマホ最適化</li>
                    <li>診療内容の整理・構成設計</li>
                    <li>問い合わせ導線の最適化</li>
                    <li>基本SEO + MEO運用</li>
                    <li>予約システム導入</li>
                    <li>院内写真撮影</li>
                    <li>ロゴ制作</li>
                    <li>軽微修正 月4回</li>
                  </ul>
                  <a href="#contact" className="lp-button lp-button-tertiary">詳細を相談する</a>
                </article>
              </div>

              {/* Options */}
              <div className="options-section reveal" ref={addRevealRef}>
                <h3 className="options-title">オプションサービス</h3>
                <div className="options-grid">
                  {[
                    { name: "追加ページ", price: "¥20,000 / ページ" },
                    { name: "院内写真撮影", price: "¥30,000" },
                    { name: "MEO運用", price: "¥8,000 / 月" },
                    { name: "ロゴ制作", price: "¥20,000" },
                    { name: "軽微修正（追加）", price: "¥20,000 / 回" },
                    { name: "予約システム導入", price: "¥50,000" },
                    { name: "AIチャットbot導入", price: "¥100,000" },
                  ].map((opt, i) => (
                    <div className="option-item" key={i}>
                      <span className="option-name">{opt.name}</span>
                      <span className="option-price">{opt.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Referral */}
              <div className="referral-section reveal" ref={addRevealRef}>
                <h3 className="referral-title">紹介制度</h3>
                <p className="referral-desc">ご紹介いただいた医師が契約された場合、双方に特典をご用意しています。</p>
                <div className="referral-grid">
                  <div className="referral-card">
                    <span className="referral-label">紹介した医師</span>
                    <p className="referral-benefit">初期費用の<strong>20%</strong>をキャッシュバック</p>
                  </div>
                  <div className="referral-card">
                    <span className="referral-label">紹介された医師</span>
                    <p className="referral-benefit">月額料金<strong>2ヶ月分</strong>無料</p>
                  </div>
                </div>
              </div>

              <p className="pricing-note reveal" ref={addRevealRef}>
                ※ すべてのプランにドメイン管理・サーバー費用・SSL・セキュリティ保守が含まれます。<br />
                ※ 最低契約期間は12ヶ月です。解約時のドメイン移管費用は¥20,000です。<br />
                ※ 個人開業医の先生は<strong>小規模事業者持続化補助金</strong>（補助率2/3、上限50万円）が活用できる場合があります。
              </p>
            </div>
          </section>

          {/* ── Flow ── */}
          <section className="lp-section flow" id="flow">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag-en">Flow</p>
                <h2>ご相談から公開まで、6つのステップ</h2>
              </div>
              <div className="flow-grid">
                {[
                  { step: "STEP 1", title: "お問い合わせ", desc: "フォームまたはお電話で、現状のお悩みをお聞かせください。相談は無料です。" },
                  { step: "STEP 2", title: "ヒアリング（30分）", desc: "医院の特徴・診療科目・ご要望を伺います。訪問またはオンラインで対応。" },
                  { step: "STEP 3", title: "デザイン提案", desc: "実際にスマホで触れるデモサイトをお見せします。デザインは複数案からお選びいただけます。" },
                  { step: "STEP 4", title: "制作（2〜3週間）", desc: "先生の確認→修正→完成。先生にお願いするのは写真と診療時間の確認だけです。" },
                  { step: "STEP 5", title: "公開", desc: "ドメイン設定・SSL・Google登録まですべて対応。公開日に最終確認します。" },
                  { step: "STEP 6", title: "運用・保守", desc: "公開後のテキスト更新・セキュリティ監視・サーバー保守を継続的にサポートします。" },
                ].map((item, i) => (
                  <article className="flow-step reveal" key={i} ref={addRevealRef}>
                    <span className="flow-badge">{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="lp-section faq" id="faq">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag-en">FAQ</p>
                <h2>よくあるご質問</h2>
              </div>
              <div className="faq-list reveal" ref={addRevealRef}>
                {faqItems.map((item, i) => (
                  <article className={`faq-item${openFaq === i ? " is-open" : ""}`} key={i}>
                    <button
                      className="faq-question"
                      type="button"
                      aria-expanded={openFaq === i}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon" aria-hidden="true"></span>
                    </button>
                    <div className="faq-answer">
                      <div><p>{item.a}</p></div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── Contact ── */}
          <section className="lp-section contact" id="contact">
            <div className="lp-container contact-grid">
              <div className="contact-copy reveal" ref={addRevealRef}>
                <p className="section-tag-en">Contact</p>
                <h2>まずはお気軽にご相談ください。</h2>
                <p>
                  「ホームページがないんだけど」「今のサイトが古くて心配」「セキュリティが不安」 —
                  内容が固まっていなくても問題ありません。現状を伺い、必要な対応を一緒に整理します。
                </p>
                <div className="contact-panels">
                  <div className="contact-panel">
                    <strong>無料相談</strong>
                    <p>ご相談は無料です。お問い合わせ = 契約ではありませんので、お気軽にどうぞ。</p>
                  </div>
                  <div className="contact-panel">
                    <strong>2営業日以内に返信</strong>
                    <p>フォームからのお問い合わせには、2営業日以内にご返信いたします。</p>
                  </div>
                </div>
              </div>
              <div className="contact-form-wrap reveal" ref={addRevealRef}>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label htmlFor="name">お名前 <span className="form-required">必須</span></label>
                    <input id="name" name="name" type="text" placeholder="例）山田 太郎" required />
                  </div>
                  <div className="form-row">
                    <label htmlFor="email">メールアドレス <span className="form-required">必須</span></label>
                    <input id="email" name="email" type="email" placeholder="example@clinic.jp" required />
                  </div>
                  <div className="form-row">
                    <label htmlFor="clinic">医院名</label>
                    <input id="clinic" name="clinic" type="text" placeholder="例）あおぞら内科クリニック" />
                  </div>
                  <div className="form-row">
                    <label htmlFor="message">ご相談内容</label>
                    <textarea id="message" name="message" rows={5} placeholder="現状のお悩みやご希望をご記入ください。"></textarea>
                  </div>
                  <button className="lp-button lp-button-primary lp-button-submit" type="submit">送信する</button>
                  <p className="form-note">※ こちらはデモ用フォームです。お問い合わせはメール（info@ascent-web.jp）でも受け付けております。</p>
                  {formFeedback && <p className="form-feedback" role="status" aria-live="polite">{formFeedback}</p>}
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="site-footer">
          {/* CTA bar */}
          <div className="footer-cta-bar">
            <a href="#contact" className="footer-cta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              お問い合わせ
            </a>
            <a href="https://demo-premium.ascent-web.jp" target="_blank" rel="noopener noreferrer" className="footer-cta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              デモを見る
            </a>
            <a href="#contact" className="footer-cta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              資料請求
            </a>
          </div>

          {/* Link columns */}
          <div className="footer-links-area">
            <div className="lp-container footer-grid">
              <div>
                <a className="brand-footer" href="#top">アセント</a>
                <p className="footer-brand-text">
                  代表者名：西澤（Mutsuki Nishizawa）、廿浦（Aoi Tsuzuura）<br />
                  開業医専門のホームページ制作・運用。セキュリティ最優先の静的サイト設計。
                </p>
              </div>
              <div>
                <p className="footer-title">Service</p>
                <ul className="footer-list">
                  <li>Lite（月額6,000円）</li>
                  <li>Standard（月額12,000円）</li>
                  <li>Premium（月額18,000円）</li>
                </ul>
              </div>
              <div>
                <p className="footer-title">Information</p>
                <ul className="footer-list">
                  <li><a href="#contact">お問い合わせ</a></li>
                  <li><a href="/privacy">プライバシーポリシー</a></li>
                  <li><a href="/terms">利用規約</a></li>
                  <li><a href="/legal">特定商取引法</a></li>
                </ul>
              </div>
              <div>
                <p className="footer-title">Company</p>
                <ul className="footer-list">
                  <li><a href="https://ascent-web.jp">会社HP</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-bottom">
            <div className="lp-container footer-bottom-inner">
              <p>&copy; {new Date().getFullYear()} Ascent. All Rights Reserved.</p>
              <a href="https://ascent-web.jp" className="footer-company-link">ascent-web.jp</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
