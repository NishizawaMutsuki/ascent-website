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

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
