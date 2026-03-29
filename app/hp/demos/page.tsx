"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "../hp.css";

type Demo = { url: string; name: string };

type PlanSection = {
  plan: string;
  price: string;
  features: string[];
  demos: Demo[];
};

const sections: PlanSection[] = [
  {
    plan: "Premium",
    price: "月額18,000円",
    features: [
      "10〜15ページ構成",
      "AIチャットbot導入",
      "WEB予約システム",
      "MEO運用代行",
      "写真撮影・ロゴ制作込み",
      "軽微修正 4回/月",
    ],
    demos: [
      { url: "https://demo-premium.ascent-web.jp", name: "プレミアム デモ A" },
      { url: "https://demo-premium.ascent-web.jp", name: "プレミアム デモ B" },
      { url: "https://demo-premium.ascent-web.jp", name: "プレミアム デモ C" },
    ],
  },
  {
    plan: "Standard",
    price: "月額12,000円",
    features: [
      "5〜7ページ構成",
      "診療科別ページ",
      "医師紹介・施設紹介",
      "基本SEO対応",
      "問い合わせ導線設計",
      "軽微修正 2回/月",
    ],
    demos: [
      { url: "https://demo-standard.ascent-web.jp", name: "スタンダード デモ A" },
      { url: "https://demo-standard.ascent-web.jp", name: "スタンダード デモ B" },
      { url: "https://demo-standard.ascent-web.jp", name: "スタンダード デモ C" },
    ],
  },
  {
    plan: "Lite",
    price: "月額6,000円",
    features: [
      "1ページ完結型LP",
      "スマホ最適化",
      "問い合わせ導線",
      "基本SEO対応",
      "SSL / セキュリティ対策",
      "軽微修正 1回/月",
    ],
    demos: [
      { url: "https://demo-light.ascent-web.jp", name: "ライト デモ A" },
      { url: "https://demo-light.ascent-web.jp", name: "ライト デモ B" },
      { url: "https://demo-light.ascent-web.jp", name: "ライト デモ C" },
    ],
  },
];

function DemoCarousel({ section }: { section: PlanSection }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const desktopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scaleIframes = useCallback(() => {
    desktopRefs.current.forEach((el) => {
      if (!el) return;
      const w = el.offsetWidth;
      const iframe = el.querySelector("iframe");
      if (iframe) iframe.style.transform = `scale(${w / 1280})`;
    });
    mobileRefs.current.forEach((el) => {
      if (!el) return;
      const w = el.offsetWidth;
      const iframe = el.querySelector("iframe");
      if (iframe) iframe.style.transform = `scale(${w / 375})`;
    });
  }, []);

  useEffect(() => {
    scaleIframes();
    window.addEventListener("resize", scaleIframes);
    return () => window.removeEventListener("resize", scaleIframes);
  }, [scaleIframes]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const idx = Math.round(track.scrollLeft / track.offsetWidth);
      setActive(idx);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (idx: number) => {
    trackRef.current?.scrollTo({ left: idx * trackRef.current.offsetWidth, behavior: "smooth" });
  };

  return (
    <section className="demos-plan-section">
      <div className="demos-plan-content" style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>
        {/* Left: carousel (PC + SP) */}
        <div className="demos-carousel-area" style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          <div
            className="demos-track"
            ref={trackRef}
            style={{
              display: "flex",
              overflowX: "auto",
              overflowY: "hidden",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              flexWrap: "nowrap",
              scrollbarWidth: "none",
            } as React.CSSProperties}
          >
            {section.demos.map((demo, i) => (
              <div
                className="demos-slide"
                key={i}
                style={{
                  minWidth: "100%",
                  flex: "0 0 100%",
                  scrollSnapAlign: "start",
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-end",
                  boxSizing: "border-box",
                  padding: "0 2px",
                }}
              >
                {/* PC - Laptop frame */}
                <div className="device-desktop" style={{ flex: 1, minWidth: 0 }}>
                  <div className="device-laptop-lid">
                    <div className="device-laptop-camera" />
                    <div className="device-bar">
                      <div className="device-dots"><span /><span /><span /></div>
                      <div className="device-url">{demo.url.replace("https://", "")}</div>
                    </div>
                    <div className="device-screen" ref={(el) => { desktopRefs.current[i] = el; }}>
                      <iframe src={demo.url} title={`${demo.name} PC`} loading="lazy" />
                    </div>
                  </div>
                  <div className="device-laptop-hinge" />
                  <div className="device-laptop-base" />
                </div>
                {/* SP - Phone frame */}
                <div className="device-mobile">
                  <div className="device-notch" />
                  <div className="device-screen-m" ref={(el) => { mobileRefs.current[i] = el; }}>
                    <iframe src={demo.url} title={`${demo.name} SP`} loading="lazy" />
                  </div>
                  <div className="device-home-indicator" />
                </div>
              </div>
            ))}
          </div>
          {/* Nav dots */}
          <div className="demos-nav">
            {section.demos.map((_, i) => (
              <button
                key={i}
                className={`works-dot${active === i ? " is-active" : ""}`}
                onClick={() => scrollTo(i)}
                type="button"
                aria-label={`デモ ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: plan info */}
        <div className="demos-plan-info" style={{ width: 240, flexShrink: 0, paddingTop: 8 }}>
          <div className="demos-plan-badge">{section.plan}</div>
          <p className="demos-plan-price">{section.price}</p>
          <ul className="demos-feature-list">
            {section.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <a
            href={section.demos[active]?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="demos-fullscreen-link"
          >
            別タブで全画面表示 →
          </a>
        </div>
      </div>
    </section>
  );
}

export default function DemosPage() {
  return (
    <div className="lp">
      <div className="page-shell">
        {/* Header */}
        <header className="site-header is-loaded is-scrolled" id="top">
          <div className="lp-container header-inner">
            <a className="brand" href="/hp" aria-label="アセント トップへ戻る">
              <img src="/images/logo-icon.svg" alt="Ascent" className="brand-mark-img" />
              <span className="brand-text">
                <strong>アセント</strong>
                <small>Medical Web Design</small>
              </span>
            </a>
            <nav className="site-nav" aria-label="ナビゲーション">
              <a href="/hp">トップ</a>
              <a href="/hp/blog">ブログ</a>
              <a href="/hp#pricing">料金</a>
              <a href="/hp#contact">お問い合わせ</a>
            </nav>
          </div>
        </header>

        <main>
          <div className="lp-container">
            <div className="demos-hero">
              <p className="demos-eyebrow">DEMO GALLERY</p>
              <h1>制作デモ一覧</h1>
              <p className="demos-lead">
                各プランの制作イメージをご覧いただけます。<br />
                すべてスマホ対応・セキュリティ対策済みの静的サイトです。
              </p>
            </div>

            {sections.map((section) => (
              <DemoCarousel key={section.plan} section={section} />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-cta-bar">
            <a href="/hp#contact" className="footer-cta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              お問い合わせ
            </a>
            <a href="/hp/demos" className="footer-cta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              デモを見る
            </a>
            <a href="/hp#contact" className="footer-cta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              資料請求
            </a>
          </div>
          <div className="footer-links-area">
            <div className="lp-container footer-grid">
              <div>
                <a className="brand-footer" href="/hp">アセント</a>
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
                  <li><a href="/hp/blog">ブログ</a></li>
                  <li><a href="/hp#contact">お問い合わせ</a></li>
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
