"use client";

import { useState, useEffect } from "react";

function AscentLogo() {
  return (
    <svg width="160" height="38" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Ascent">
      <path d="M8 38L20 8L26 22L32 8L44 38" stroke="url(#navPeakGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M14 38L20 24L26 30L32 18L38 38" stroke="url(#navPeakGrad)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.3"/>
      <text x="54" y="32" fontFamily="'Outfit', sans-serif" fontWeight="600" fontSize="24" fill="#e8e8ed" letterSpacing="-0.02em">Ascent</text>
      <defs>
        <linearGradient id="navPeakGrad" x1="0" y1="38" x2="44" y2="8">
          <stop offset="0%" stopColor="#38bdf8"/>
          <stop offset="100%" stopColor="#818cf8"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  /* メニュー展開中は背面スクロールをロック */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo-link">
            <AscentLogo />
          </a>
          <div className="nav-right">
            <ul className="nav-links">
              <li><a href="/#about">会社概要</a></li>
              <li><a href="/#services">サービス</a></li>
              <li><a href="/#works">実績</a></li>
              <li><a href="/#products">プロダクト</a></li>
            </ul>
            <a href="/#contact" className="nav-cta">無料相談</a>
          </div>
        </div>
      </nav>

      {/* ハンバーガーボタン — nav の外でスタッキングコンテキスト回避 */}
      <button
        className={`nav-hamburger${isOpen ? " is-open" : ""}`}
        onClick={toggleMenu}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
      >
        <span /><span /><span />
      </button>

      {/* オーバーレイ（左側コンテンツを暗くする） */}
      <div
        className={`nav-overlay${isOpen ? " is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* 全画面フェードインパネル — nav の外でスタッキングコンテキスト回避 */}
      <div className={`nav-panel${isOpen ? " is-open" : ""}`}>
        <a href="/" className="nav-panel-logo" onClick={closeMenu}>
          <AscentLogo />
        </a>
        <ul className="nav-panel-links">
          <li><a href="/#about" onClick={closeMenu}>会社概要</a></li>
          <li><a href="/#services" onClick={closeMenu}>サービス</a></li>
          <li><a href="/#works" onClick={closeMenu}>実績</a></li>
          <li><a href="/#products" onClick={closeMenu}>プロダクト</a></li>
        </ul>
        <a href="/#contact" className="nav-panel-cta" onClick={closeMenu}>無料相談</a>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="page-container" style={{ paddingBottom: '2rem' }}>
      <div className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <AscentLogo />
            <p>テクノロジーで、医療をもっと身近に。医療機関向けWeb制作とAI開発を行っています。</p>
          </div>
          <div>
            <div className="footer-nav-title">Services</div>
            <div className="footer-nav-links">
              <a href="/hp">医院HP制作</a>
              <a href="/products/talk-trainer">Talk Trainer</a>
            </div>
          </div>
          <div>
            <div className="footer-nav-title">Company</div>
            <div className="footer-nav-links">
              <a href="/#about">会社概要</a>
              <a href="/terms">利用規約</a>
              <a href="/privacy">プライバシーポリシー</a>
              <a href="/legal">特商法表記</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">&copy; {new Date().getFullYear()} Ascent. All rights reserved.</p>
          <a href="mailto:info@ascent-web.jp" className="footer-email">info@ascent-web.jp</a>
        </div>
      </div>
    </footer>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
