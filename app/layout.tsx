import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ascent — AI-Powered Software Solutions",
  description: "Ascent（アセント）は、AI技術を活用したソフトウェアの企画・開発・運営を行う個人事業です。",
};

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="/" className="nav-logo">
          Ascent<span>.</span>
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
