"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";

export default function HpLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formFeedback, setFormFeedback] = useState("");
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
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

  const demoSites = [
    {
      name: "ベースプラン デモ（架空の医院）",
      desc: "1ページ完結型。スマホで即電話できるCTA設計。Lighthouse高スコア。",
      url: "https://dist-chi-ten-25.vercel.app/",
      tags: ["1ページ LP", "レスポンシブ", "SSL対応", "構造化データ"],
    },
    {
      name: "プレミアムプラン デモ（架空の医院）",
      desc: "9ページ構成。診療科別ページ・院長紹介・施設紹介・スライダー。",
      url: "https://clinic-premium-demo.vercel.app/",
      tags: ["9ページ", "スライダー", "下層ページ", "WEB予約対応"],
    },
  ];

  return (
    <div className="lp">
      <div className="page-shell">
        {/* Header */}
        <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} id="top">
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
            >
              <span></span><span></span><span></span>
              <span className="sr-only">メニューを開閉</span>
            </button>
            <nav className={`site-nav${menuOpen ? " is-open" : ""}`} id="site-nav" aria-label="主要メニュー">
              <a href="#demo" onClick={closeMenu}>制作例</a>
              <a href="#security" onClick={closeMenu}>セキュリティ</a>
              <a href="#pricing" onClick={closeMenu}>料金</a>
              <a href="#flow" onClick={closeMenu}>流れ</a>
              <a href="#faq" onClick={closeMenu}>FAQ</a>
              <a href="#contact" className="nav-cta" onClick={closeMenu}>無料相談</a>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="lp-hero">
            <div className="lp-container hero-grid">
              <div className="hero-copy reveal" ref={addRevealRef}>
                <p className="eyebrow">開業医専門ホームページ制作</p>
                <h1>先生の医院を、患者さんに届ける。</h1>
                <p className="hero-lead">
                  患者さんの8割近くがネットで医院を探す時代。
                  セキュリティ・スマホ対応・SEO/MEOを標準装備した
                  ホームページを、月額6,000円から制作・運用します。
                </p>
                <div className="hero-actions">
                  <a className="lp-button lp-button-primary" href="#contact">無料で相談する</a>
                  <a className="lp-button lp-button-secondary" href="#demo">制作例を見る</a>
                </div>
                <ul className="hero-points" aria-label="サービスの特徴">
                  <li>WordPress不使用 — 改ざんリスクゼロの静的サイト</li>
                  <li>SSL / DDoS防御 / WAF をすべて標準装備</li>
                  <li>医療広告ガイドライン・書面掲示事項に対応</li>
                </ul>
              </div>
              <div className="hero-visual reveal" ref={addRevealRef}>
                <div className="hero-card hero-card-main">
                  <div className="hero-card-header">
                    <span className="status-dot"></span>
                    <span>制作サイト パフォーマンス</span>
                  </div>
                  <div className="hero-card-body">
                    <div className="mock-screen">
                      <div className="mock-screen-top">
                        <span>Performance</span>
                        <span>Accessibility</span>
                        <span>SEO</span>
                      </div>
                      <div className="mock-hero-panel">
                        <div>
                          <p className="mock-label">Lighthouse Score</p>
                          <strong>100 / 100 / 100</strong>
                        </div>
                        <span className="mock-badge">全項目最高点</span>
                      </div>
                      <div className="mock-metrics">
                        <article>
                          <strong>JS出力</strong>
                          <p>ほぼゼロ</p>
                        </article>
                        <article>
                          <strong>表示速度</strong>
                          <p>FCP 0.5秒</p>
                        </article>
                        <article>
                          <strong>セキュリティ</strong>
                          <p>Cloudflare CDN</p>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
                <aside className="hero-note" aria-label="補足情報">
                  <p>WordPressとの違い</p>
                  <ul>
                    <li>サーバー処理なし → 改ざんリスクがゼロ</li>
                    <li>プラグイン更新不要 → 保守コストが低い</li>
                    <li>CDN配信 → 世界330拠点で高速表示</li>
                  </ul>
                </aside>
              </div>
            </div>
          </section>

          {/* Issues */}
          <section className="lp-section issues" id="issues">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag">よくある課題</p>
                <h2>こんなお悩み、ありませんか？</h2>
              </div>
              <div className="issue-grid">
                {[
                  { title: "ホームページがない・壊れている", desc: "Googleで医院名を検索しても出てこない。サイトはあるがSSLエラーで警告が出る。患者さんが不安になって離脱している可能性があります。" },
                  { title: "スマホで見づらい", desc: "患者さんの大半はスマホで医院を探します。スマホで文字が小さい・ボタンが押しにくいサイトは、それだけで選ばれなくなります。" },
                  { title: "フォームのセキュリティが不安", desc: "患者の個人情報を暗号化せずに送信しているサイトが多数あります。HTTP通信のフォームは盗聴リスクがあり、早急な対応が必要です。" },
                  { title: "WordPressの更新が放置されている", desc: "古いバージョンのWordPressは改ざん・マルウェア感染のリスクが高い。プラグインの脆弱性も攻撃の入口になります。" },
                  { title: "書面掲示事項がウェブに未掲載", desc: "2025年6月から、サイトを持つ医療機関は院内掲示事項のウェブ掲載が義務化されています。未対応の場合、監査で指摘される可能性があります。" },
                  { title: "サイトの更新が業者任せで高い", desc: "テキスト1行の修正に数万円。更新依頼から反映まで1週間。そんな運用体制では、医院の情報が常に古くなります。" },
                ].map((item, i) => (
                  <article className="issue-card reveal" key={i} ref={addRevealRef}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Demo Sites */}
          <section className="lp-section demo-section" id="demo">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag">制作例</p>
                <h2>実際に動くデモサイトをご覧ください</h2>
                <p>スマホでそのまま操作できます。表示速度・デザイン・導線をお確かめください。<br />※ デモサイト内の医院名・情報はすべて架空のものです。</p>
              </div>
              <div className="demo-grid">
                {demoSites.map((site, i) => (
                  <article className="demo-card reveal" key={i} ref={addRevealRef}>
                    <div className="demo-card-browser">
                      <div className="demo-browser-bar">
                        <span className="demo-dot"></span>
                        <span className="demo-dot"></span>
                        <span className="demo-dot"></span>
                        <span className="demo-url">{site.url.replace('https://', '')}</span>
                      </div>
                      <div className="demo-preview">
                        <iframe
                          src={site.url}
                          title={site.name}
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        ></iframe>
                      </div>
                    </div>
                    <div className="demo-card-info">
                      <h3>{site.name}</h3>
                      <p>{site.desc}</p>
                      <div className="demo-tags">
                        {site.tags.map((tag, j) => (
                          <span className="demo-tag" key={j}>{tag}</span>
                        ))}
                      </div>
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="lp-button lp-button-secondary demo-link">
                        デモサイトを開く &#8599;
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="lp-section security" id="security">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag">セキュリティ</p>
                <h2>患者さんの個人情報を守る、堅牢な基盤。</h2>
                <p>医療機関のサイトだからこそ、セキュリティは妥協しません。</p>
              </div>
              <div className="security-grid">
                {[
                  { icon: "🔒", title: "SSL / HTTPS 標準装備", desc: "すべての通信を暗号化。患者さんの名前・メールアドレスが盗み見されるリスクをゼロにします。" },
                  { icon: "🛡️", title: "DDoS防御 + WAF", desc: "Cloudflareの世界水準のセキュリティ基盤で、不正アクセスや攻撃を自動でブロックします。" },
                  { icon: "⚡", title: "WordPress不使用", desc: "静的サイト生成により、サーバー側の処理がありません。改ざん・マルウェア感染のリスクが根本的にゼロです。" },
                  { icon: "🌐", title: "世界330+拠点のCDN", desc: "Cloudflareの CDN で日本を含む世界中のエッジサーバーから配信。高速かつ安定した表示を実現します。" },
                ].map((item, i) => (
                  <article className="security-card reveal" key={i} ref={addRevealRef}>
                    <span className="security-icon">{item.icon}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Reasons */}
          <section className="lp-section reasons" id="reasons">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag">選ばれる理由</p>
                <h2>開業医専門だから、話が早い。</h2>
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

          {/* Pricing */}
          <section className="lp-section pricing" id="pricing">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag">料金プラン</p>
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

          {/* Flow */}
          <section className="lp-section flow" id="flow">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag">制作の流れ</p>
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
                    <span>{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="lp-section faq" id="faq">
            <div className="lp-container faq-layout">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag">FAQ</p>
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

          {/* Profile */}
          <section className="lp-section profile" id="profile">
            <div className="lp-container profile-grid">
              <div className="profile-copy reveal" ref={addRevealRef}>
                <p className="section-tag">代表紹介</p>
                <h2>アセント</h2>
                <p className="profile-names">代表：西澤、廿浦</p>
                <p>
                  アセントは「開業医専門」のウェブ制作です。
                  医療広告ガイドライン・書面掲示義務・個人情報保護法 —
                  医療機関特有の制約を理解した上で、先生の医院の強みを患者さんに届けるサイトを作ります。
                </p>
                <p>
                  WordPressではなく静的サイト生成を採用し、セキュリティと表示速度を両立。
                  ドメインは先生の名義で取得し、解約後もそのままお使いいただける透明な運営を行っています。
                </p>
              </div>
              <div className="profile-card reveal" ref={addRevealRef}>
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 420'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23e8f2fb'/%3E%3Cstop offset='100%25' stop-color='%23c8def1'/%3E%3C/linearGradient%3E%3ClinearGradient id='bar' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23143f72'/%3E%3Cstop offset='100%25' stop-color='%23245d98'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='640' height='420' rx='32' fill='url(%23bg)'/%3E%3Crect x='60' y='50' width='520' height='320' rx='24' fill='%23ffffff' opacity='0.94'/%3E%3Ccircle cx='220' cy='160' r='50' fill='%230f3f73' opacity='0.10'/%3E%3Ccircle cx='220' cy='148' r='22' fill='%230f3f73' opacity='0.30'/%3E%3Cpath d='M180 200c12-20 28-30 40-30s28 10 40 30' fill='%230f3f73' opacity='0.30'/%3E%3Ccircle cx='420' cy='160' r='50' fill='%230f3f73' opacity='0.10'/%3E%3Ccircle cx='420' cy='148' r='22' fill='%230f3f73' opacity='0.30'/%3E%3Cpath d='M380 200c12-20 28-30 40-30s28 10 40 30' fill='%230f3f73' opacity='0.30'/%3E%3Crect x='160' y='228' width='120' height='12' rx='6' fill='%230f3f73' opacity='0.22'/%3E%3Crect x='360' y='228' width='120' height='12' rx='6' fill='%230f3f73' opacity='0.22'/%3E%3Crect x='180' y='250' width='80' height='8' rx='4' fill='%230f3f73' opacity='0.12'/%3E%3Crect x='380' y='250' width='80' height='8' rx='4' fill='%230f3f73' opacity='0.12'/%3E%3Crect x='120' y='290' width='400' height='2' rx='1' fill='%230f3f73' opacity='0.08'/%3E%3Crect x='160' y='310' width='320' height='10' rx='5' fill='%230f3f73' opacity='0.10'/%3E%3Crect x='200' y='330' width='240' height='10' rx='5' fill='%230f3f73' opacity='0.08'/%3E%3C/svg%3E"
                  alt="アセント代表紹介 — 西澤・廿浦"
                />
                <div className="profile-card-body">
                  <strong>大切にしていること</strong>
                  <ul>
                    <li>セキュリティを最優先に設計すること</li>
                    <li>先生の手間をゼロにすること</li>
                    <li>嘘をつかない透明な運営をすること</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="lp-section contact" id="contact">
            <div className="lp-container contact-grid">
              <div className="contact-copy reveal" ref={addRevealRef}>
                <p className="section-tag">お問い合わせ</p>
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
                  <p className="form-note">※ こちらはデモ用フォームです。お問い合わせはメール（nszw1101@gmail.com）でも受け付けております。</p>
                  {formFeedback && <p className="form-feedback" role="status" aria-live="polite">{formFeedback}</p>}
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <div className="lp-container footer-grid">
            <div>
              <a className="brand brand-footer" href="#top">アセント</a>
              <p>代表者名：西澤、廿浦</p>
              <p>開業医専門のホームページ制作・運用。セキュリティ最優先の静的サイト設計。</p>
            </div>
            <div>
              <p className="footer-title">サービス</p>
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
          </div>
          <div className="lp-container footer-bottom">
            <p>&copy; {new Date().getFullYear()} Ascent. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
