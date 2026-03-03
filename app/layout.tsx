import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ascent — AI-Powered Software Solutions",
  description: "Ascent（アセント）は、AI技術を活用したソフトウェアの企画・開発・運営を行う個人事業です。",
  icons: {
    icon: "/favicon.svg",
  },
};

function AscentLogo() {
  return (
    <svg width="160" height="38" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Ascent">
      <circle cx="24" cy="24" r="16" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none"/>
      <path d="M24 36V12" stroke="url(#navOrbitGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M18 18L24 12L30 18" stroke="url(#navOrbitGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="url(#navOrbitGrad)" strokeWidth="1" fill="none" opacity="0.3" transform="rotate(-20 24 24)"/>
      <text x="52" y="31" fontFamily="'Outfit', sans-serif" fontWeight="500" fontSize="23" fill="#e8e8ed" letterSpacing="0.06em">ASCENT</text>
      <defs>
        <linearGradient id="navOrbitGrad" x1="24" y1="36" x2="24" y2="12">
          <stop offset="0%" stopColor="#38bdf8"/>
          <stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="/" className="nav-logo-link">
          <AscentLogo />
        </a>
        <ul className="nav-links">
          <li><a href="/#services">サービス</a></li>
          <li><a href="/#products">プロダクト</a></li>
          <li><a href="/#contact">お問い合わせ</a></li>
        </ul>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="page-container">
      <div className="footer">
        <div className="footer-logo">
          <AscentLogo />
        </div>
        <div className="footer-links">
          <a href="/terms">利用規約</a>
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/legal">特定商取引法に基づく表記</a>
          <a href="/refund">返金・キャンセルポリシー</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Ascent. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
