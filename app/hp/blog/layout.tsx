import "./blog.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
            <nav className="site-nav" aria-label="ブログナビゲーション">
              <a href="/hp">トップ</a>
              <a href="/hp/blog">ブログ</a>
              <a href="/hp#pricing">料金</a>
              <a href="/hp#contact">お問い合わせ</a>
            </nav>
          </div>
        </header>

        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="site-footer">
          {/* CTA bar */}
          <div className="footer-cta-bar">
            <a href="/hp#contact" className="footer-cta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              お問い合わせ
            </a>
            <a href="https://demo-premium.ascent-web.jp" target="_blank" rel="noopener noreferrer" className="footer-cta-item">
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
