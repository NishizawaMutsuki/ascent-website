export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="dot" />
          Software Studio
        </div>
        <h1>
          AIで、もっと<br />
          <strong>スマートに学ぶ</strong>
        </h1>
        <p>
          Ascent（アセント）は、AI技術を活用したソフトウェアの企画・開発・運営を行っています。
          学習や業務を支援するプロダクトを通じて、一人ひとりの成長をテクノロジーで加速させます。
        </p>
      </section>

      <div className="page-container">
        {/* Services */}
        <section id="services" className="section">
          <p className="section-title">Services — 事業内容</p>
          <div className="service-grid">
            <div className="service-card">
              <div className="icon">🤖</div>
              <h3>AI アプリケーション開発</h3>
              <p>大規模言語モデル（LLM）を活用した教育・業務支援アプリケーションの設計・開発。</p>
            </div>
            <div className="service-card">
              <div className="icon">🌐</div>
              <h3>Web サービス運営</h3>
              <p>SaaS型サービスの企画からインフラ構築・運用まで、プロダクトのライフサイクル全体を担当。</p>
            </div>
            <div className="service-card">
              <div className="icon">📊</div>
              <h3>データ分析・自動化</h3>
              <p>業務プロセスの分析と自動化ソリューションの提供。効率化とコスト削減を実現。</p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="section">
          <p className="section-title">Products — プロダクト</p>
          <div className="product-card">
            <div className="tag">SaaS — 月額サブスクリプション</div>
            <h3>Talk Trainer</h3>
            <p>
              AIコーチが面接回答をリアルタイムで分析し、構造・具体性・フレームワーク適合度を
              スコアリング。Matt Abrahams著「Think Fast, Talk Smart」のメソッドに基づいた
              コーチングで、面接スキルを効率的に向上させます。
            </p>
            <p>
              無料プランでは10回まで練習可能。Proプラン（月額990円・税込）では、
              無制限の練習と高精度AIモデルによる詳細なフィードバックをご利用いただけます。
            </p>
            <div className="features">
              <span className="feature-tag">音声認識</span>
              <span className="feature-tag">AI分析</span>
              <span className="feature-tag">フレームワーク評価</span>
              <span className="feature-tag">深掘り練習</span>
              <span className="feature-tag">1分チャレンジ</span>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section">
          <p className="section-title">Contact — お問い合わせ</p>
          <div className="contact-info">
            <div className="contact-item">
              <div>
                <div className="label">事業者名</div>
                <div className="value">Ascent（個人事業）</div>
              </div>
            </div>
            <div className="contact-item">
              <div>
                <div className="label">代表者</div>
                <div className="value">西澤 睦生</div>
              </div>
            </div>
            <div className="contact-item">
              <div>
                <div className="label">メールアドレス</div>
                <div className="value">
                  <a href="mailto:nszw1101@gmail.com">nszw1101@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div>
                <div className="label">お問い合わせ対応</div>
                <div className="value">メールにて受付（営業日2日以内に返信）</div>
              </div>
            </div>
          </div>
        </section>

        {/* Policies summary */}
        <section className="section">
          <p className="section-title">Policies — 各種ポリシー</p>
          <div className="service-grid">
            <a href="/terms" className="service-card" style={{ textDecoration: 'none' }}>
              <h3>利用規約</h3>
              <p>サービスのご利用に関する条件をご確認ください。</p>
            </a>
            <a href="/privacy" className="service-card" style={{ textDecoration: 'none' }}>
              <h3>プライバシーポリシー</h3>
              <p>個人情報の取り扱いについてご確認ください。</p>
            </a>
            <a href="/legal" className="service-card" style={{ textDecoration: 'none' }}>
              <h3>特定商取引法に基づく表記</h3>
              <p>販売者情報と取引条件をご確認ください。</p>
            </a>
            <a href="/refund" className="service-card" style={{ textDecoration: 'none' }}>
              <h3>返金・キャンセルポリシー</h3>
              <p>返金とキャンセルの条件をご確認ください。</p>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
