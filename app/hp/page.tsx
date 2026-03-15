"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";

export default function HpLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formFeedback, setFormFeedback] = useState("");
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // Sticky header scroll state
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for reveal animations
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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormFeedback("デモページのため送信はされません。実装時にはフォーム送信やLINE連携に対応できます。");
  };

  const faqItems = [
    {
      q: "相談だけでも可能ですか？",
      a: "はい、可能です。現状の課題整理や、何から着手すべきかのご相談だけでもお気軽にお問い合わせください。",
    },
    {
      q: "既存サイトの改善だけでも依頼できますか？",
      a: "可能です。全面リニューアルではなく、スマホ対応、導線整理、表示改善など一部の見直しにも対応しています。",
    },
    {
      q: "医療業界のWeb制作に詳しくなくても大丈夫ですか？",
      a: "問題ありません。こちらで必要事項を整理しながら進めますので、専門知識がなくても安心してご相談いただけます。",
    },
    {
      q: "制作期間はどれくらいですか？",
      a: "内容によりますが、LP改善であれば数週間程度、サイト制作や大きな改善では1〜2か月程度が目安です。",
    },
    {
      q: "SEO対策はどこまで含まれますか？",
      a: "基本的には、タイトル・見出し・構造・内部テキスト整理などの内部改善を中心に対応します。必要に応じて優先順位をご案内します。",
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
              <span></span>
              <span></span>
              <span></span>
              <span className="sr-only">メニューを開閉</span>
            </button>
            <nav className={`site-nav${menuOpen ? " is-open" : ""}`} id="site-nav" aria-label="主要メニュー">
              <a href="#issues" onClick={closeMenu}>課題</a>
              <a href="#services" onClick={closeMenu}>サービス</a>
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
                <p className="eyebrow">クリニック・病院向けホームページ制作 / 改善</p>
                <h1>医院の信頼感が、<br />きちんと伝わるWeb導線へ。</h1>
                <p className="hero-lead">
                  古く見えるホームページ、弱いスマホ対応、伝わりにくい診療内容。
                  アセントは、医療機関に求められる清潔感と安心感を大切にしながら、
                  見やすさ・導線・基本的なSEOを整え、相談につながりやすいサイトへ改善します。
                </p>
                <div className="hero-actions">
                  <a className="lp-button lp-button-primary" href="#contact">無料で相談する</a>
                  <a className="lp-button lp-button-secondary" href="#contact">お問い合わせはこちら</a>
                </div>
                <ul className="hero-points" aria-label="サービスの特徴">
                  <li>新規制作にも既存サイト改善にも対応</li>
                  <li>スマホ最適化・表示速度・導線見直しを一括で整理</li>
                  <li>専門用語に偏らず、丁寧な進行で伴走</li>
                </ul>
              </div>
              <div className="hero-visual reveal" ref={addRevealRef}>
                <div className="hero-card hero-card-main">
                  <div className="hero-card-header">
                    <span className="status-dot"></span>
                    <span>医療機関向けサイト改善プラン</span>
                  </div>
                  <div className="hero-card-body">
                    <div className="mock-screen">
                      <div className="mock-screen-top">
                        <span>診療案内</span>
                        <span>アクセス</span>
                        <span>お問い合わせ</span>
                      </div>
                      <div className="mock-hero-panel">
                        <div>
                          <p className="mock-label">改善ポイント</p>
                          <strong>信頼感のある第一印象</strong>
                        </div>
                        <span className="mock-badge">スマホ対応済み</span>
                      </div>
                      <div className="mock-metrics">
                        <article>
                          <strong>導線設計</strong>
                          <p>相談導線を明確化</p>
                        </article>
                        <article>
                          <strong>SEO基本改善</strong>
                          <p>内部構造を整理</p>
                        </article>
                        <article>
                          <strong>表示速度</strong>
                          <p>閲覧時のストレスを軽減</p>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
                <aside className="hero-note" aria-label="補足情報">
                  <p>こんなお悩みに対応</p>
                  <ul>
                    <li>古い印象のままで更新が止まっている</li>
                    <li>スマホで見づらく、問い合わせ導線が弱い</li>
                    <li>医院の強みや診療方針が伝わりにくい</li>
                  </ul>
                </aside>
              </div>
            </div>
          </section>

          {/* Issues */}
          <section className="lp-section issues" id="issues">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag">課題整理</p>
                <h2>ホームページに、こんな課題はありませんか。</h2>
                <p>
                  医療機関のサイトは、単に情報を載せるだけでなく、
                  患者さまやご家族が安心して閲覧できる導線づくりが大切です。
                </p>
              </div>
              <div className="issue-grid">
                {[
                  { title: "古いデザインのままで、医院の印象に不安が出る", desc: "サイト全体の見た目が古いと、診療内容や院内の丁寧さまで伝わりにくくなることがあります。" },
                  { title: "スマホで見づらく、必要な情報にたどり着きにくい", desc: "診療時間・アクセス・予約方法が探しにくいと、離脱につながりやすくなります。" },
                  { title: "問い合わせや相談の導線が弱い", desc: "連絡先や相談窓口が目立たないと、相談したい方が行動に移りにくくなります。" },
                  { title: "検索流入が弱く、必要な方に見つけてもらいにくい", desc: "タイトルや見出し、内部構造の整理が不十分な場合、基本的なSEOでも機会損失が起こります。" },
                  { title: "セキュリティや更新体制に不安がある", desc: "最低限の保守や表示環境への配慮が不足すると、閲覧時の安心感にも影響します。" },
                  { title: "医院ごとの強みが十分に伝わっていない", desc: "診療方針、得意分野、院内の雰囲気などが整理されていないと、他院との差が見えにくくなります。" },
                ].map((item, i) => (
                  <article className="issue-card reveal" key={i} ref={addRevealRef}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="lp-section services" id="services">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag">サービス内容</p>
                <h2>新規制作から改善まで、必要な範囲を整理してご提案します。</h2>
                <p>
                  大がかりなリニューアルだけでなく、今あるサイトを活かした部分改善にも対応。
                  医療機関に必要な「見やすさ」と「信頼感」を軸に整えます。
                </p>
              </div>
              <div className="service-grid">
                {[
                  { title: "新規ホームページ制作", desc: "医院案内、診療内容、アクセス、採用情報などを整理し、開業時や刷新時の基盤を構築します。" },
                  { title: "既存ホームページ改善", desc: "見た目・導線・情報設計を見直し、今のサイトを活かしながら印象と使いやすさを改善します。" },
                  { title: "LP作成 / 改善", desc: "自由診療、検診、採用、特定施策など、目的に合わせたランディングページを設計します。" },
                  { title: "SEO内部改善", desc: "タイトル、見出し、構造、テキスト整理など、基本的な検索評価につながる要素を整えます。" },
                  { title: "スマホ最適化", desc: "スマートフォンでの閲覧性を高め、診療時間やアクセス情報をすぐ確認しやすくします。" },
                  { title: "表示速度 / 安定性の見直し", desc: "読み込みの重さやレイアウト崩れの原因を整理し、閲覧時の負担を軽減します。" },
                  { title: "導線改善・基本保守", desc: "お問い合わせ、LINE、採用応募などの動線を見直し、必要に応じて軽微な修正や運用も支援します。" },
                ].map((item, i) => (
                  <article className="service-card reveal" key={i} ref={addRevealRef}>
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
                <h2>医療機関に合った、落ち着いた設計と丁寧な進行を大切にしています。</h2>
              </div>
              <div className="reason-grid">
                {[
                  { title: "医療機関向けに最適化した情報設計", desc: "診療案内、アクセス、予約導線など、患者さまが確認したい情報を優先して整理します。" },
                  { title: "清潔感と信頼感を損なわないデザイン", desc: "過度な演出を避け、医院の雰囲気や診療姿勢が落ち着いて伝わる見た目を目指します。" },
                  { title: "お問い合わせ導線まで含めてご提案", desc: "見た目だけで終わらず、相談しやすさや必要な情報への到達しやすさまで一緒に整えます。" },
                  { title: "専門用語に寄りすぎず、丁寧に進行", desc: "Web制作に詳しくない場合でも安心してご相談いただけるよう、要点を分かりやすく共有します。" },
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
                <h2>ご予算と目的に合わせて、3つのプランをご用意しています。</h2>
                <p>内容は一例です。医院の状況やページ数に応じて、無理のない形で調整いたします。</p>
              </div>
              <div className="pricing-grid">
                <article className="plan-card reveal" ref={addRevealRef}>
                  <h3>ライト</h3>
                  <p className="plan-price">&yen;180,000<span>〜</span></p>
                  <p className="plan-copy">必要最低限のLP作成 / 改善に。小規模クリニック向けの導入プランです。</p>
                  <ul className="plan-features">
                    <li>1ページ構成のLP作成 / 改善</li>
                    <li>スマホ表示の最適化</li>
                    <li>CTA導線の基本整理</li>
                    <li>簡易SEO設定</li>
                    <li>軽微な修正 1回</li>
                  </ul>
                  <a href="#contact" className="lp-button lp-button-tertiary">このプランで相談する</a>
                </article>
                <article className="plan-card plan-card-featured reveal" ref={addRevealRef}>
                  <span className="plan-badge">おすすめ</span>
                  <h3>スタンダード</h3>
                  <p className="plan-price">&yen;420,000<span>〜</span></p>
                  <p className="plan-copy">構成改善・デザイン改善・SEO基本対応を含む、最もご相談の多いプランです。</p>
                  <ul className="plan-features">
                    <li>5〜7ページ程度のサイト制作 / 改善</li>
                    <li>構成見直しとデザイン改善</li>
                    <li>SEO基本改善</li>
                    <li>お問い合わせ導線の最適化</li>
                    <li>表示速度・閲覧性のチェック</li>
                    <li>軽微な修正 2回</li>
                  </ul>
                  <a href="#contact" className="lp-button lp-button-primary">まずは相談する</a>
                </article>
                <article className="plan-card reveal" ref={addRevealRef}>
                  <h3>プレミアム</h3>
                  <p className="plan-price">&yen;780,000<span>〜</span></p>
                  <p className="plan-copy">Web集客をより丁寧に整えたい医院向け。戦略設計や追加ページにも対応します。</p>
                  <ul className="plan-features">
                    <li>ページ追加を含む本格制作 / 改善</li>
                    <li>戦略設計と導線強化</li>
                    <li>SEO基本改善 + コンテンツ整理</li>
                    <li>優先対応 / 細かな改善提案</li>
                    <li>運用を見据えた更新設計</li>
                    <li>軽微な修正 3回</li>
                  </ul>
                  <a href="#contact" className="lp-button lp-button-tertiary">詳細を相談する</a>
                </article>
              </div>
            </div>
          </section>

          {/* Flow */}
          <section className="lp-section flow" id="flow">
            <div className="lp-container">
              <div className="section-heading reveal" ref={addRevealRef}>
                <p className="section-tag">制作の流れ</p>
                <h2>ご相談から公開まで、段階を分けて丁寧に進めます。</h2>
              </div>
              <div className="flow-grid">
                {[
                  { step: "STEP 1", title: "お問い合わせ", desc: "まずは現状のお悩みやご希望をお聞かせください。" },
                  { step: "STEP 2", title: "ヒアリング", desc: "診療内容、ターゲット、課題、運用状況などを整理します。" },
                  { step: "STEP 3", title: "ご提案", desc: "必要な対応範囲、スケジュール、概算費用をご案内します。" },
                  { step: "STEP 4", title: "制作 / 改善", desc: "情報設計、デザイン、実装、調整を進めます。" },
                  { step: "STEP 5", title: "公開 / 納品", desc: "最終確認後に公開し、必要な操作方法も共有します。" },
                  { step: "STEP 6", title: "運用サポート", desc: "必要に応じて更新や軽微修正、追加改善もご相談いただけます。" },
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
                <p>初回相談の段階で決まっていなくても問題ありません。状況を伺いながら整理いたします。</p>
              </div>
              <div className="faq-list">
                {faqItems.map((item, i) => (
                  <article className={`faq-item reveal${openFaq === i ? " is-open" : ""}`} key={i} ref={addRevealRef}>
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
                      <div>
                        <p>{item.a}</p>
                      </div>
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
                  アセントは、医院ごとの強みや診療方針を、患者さまにとって分かりやすい形で伝えることを大切にしています。
                  見やすさや清潔感だけでなく、「必要な情報に迷わずたどり着けること」「安心して相談しやすいこと」まで含めて、
                  信頼感のあるWeb導線を丁寧に設計します。
                </p>
                <p>
                  新規制作でも既存サイト改善でも、現場のご負担を増やしすぎない進め方を意識しながら、
                  医院ごとに無理のない現実的な提案を行います。
                </p>
              </div>
              <div className="profile-card reveal" ref={addRevealRef}>
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 420'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23e8f2fb'/%3E%3Cstop offset='100%25' stop-color='%23c8def1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='640' height='420' rx='32' fill='url(%23g)'/%3E%3Crect x='76' y='72' width='488' height='276' rx='24' fill='%23ffffff' opacity='0.92'/%3E%3Crect x='112' y='112' width='156' height='156' rx='78' fill='%230f3f73' opacity='0.12'/%3E%3Ccircle cx='190' cy='168' r='38' fill='%230f3f73' opacity='0.34'/%3E%3Cpath d='M130 256c20-34 48-51 84-51s64 17 84 51' fill='%230f3f73' opacity='0.34'/%3E%3Crect x='310' y='126' width='188' height='18' rx='9' fill='%230f3f73' opacity='0.25'/%3E%3Crect x='310' y='164' width='144' height='14' rx='7' fill='%230f3f73' opacity='0.18'/%3E%3Crect x='310' y='202' width='174' height='14' rx='7' fill='%230f3f73' opacity='0.18'/%3E%3Crect x='112' y='302' width='386' height='14' rx='7' fill='%230f3f73' opacity='0.12'/%3E%3C/svg%3E"
                  alt="医院ごとの強みを整理し、信頼感のあるWeb導線を設計するアセントのイメージ"
                />
                <div className="profile-card-body">
                  <strong>大切にしていること</strong>
                  <ul>
                    <li>医院ごとの強みを、分かりやすく伝えること</li>
                    <li>見やすく、信頼感のあるWeb導線をつくること</li>
                    <li>丁寧で無理のない進行で伴走すること</li>
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
                  新規制作、部分改善、現状サイトの診断など、内容が固まっていなくても問題ありません。
                  まずは現状を伺い、必要な対応を一緒に整理します。
                </p>
                <div className="contact-panels">
                  <div className="contact-panel">
                    <strong>こんなご相談に</strong>
                    <p>「古いサイトを今の医院に合う印象へ整えたい」「問い合わせ導線を見直したい」など。</p>
                  </div>
                  <div className="contact-panel">
                    <strong>ご相談方法</strong>
                    <p>フォームまたはLINE導線を想定したご相談窓口としてご利用いただけます。</p>
                  </div>
                </div>
              </div>
              <div className="contact-form-wrap reveal" ref={addRevealRef}>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label htmlFor="name">お名前</label>
                    <input id="name" name="name" type="text" placeholder="例）山田 太郎" />
                  </div>
                  <div className="form-row">
                    <label htmlFor="email">メールアドレス</label>
                    <input id="email" name="email" type="email" placeholder="example@clinic.jp" />
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
                  <p className="form-note">こちらはデモ用フォームです。実装時にはフォーム送信やLINE連携を追加できます。</p>
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
              <p>クリニック・病院向けホームページの新規作成、改善、LP制作、SEO基本改善に対応しています。</p>
            </div>
            <div>
              <p className="footer-title">サービス概要</p>
              <ul className="footer-list">
                <li>ホームページ新規制作</li>
                <li>既存サイト改善</li>
                <li>LP作成 / 改善</li>
                <li>導線設計・スマホ対応・速度改善</li>
              </ul>
            </div>
            <div>
              <p className="footer-title">Information</p>
              <ul className="footer-list">
                <li><a href="#contact">お問い合わせ</a></li>
                <li><a href="/privacy">プライバシーポリシー</a></li>
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
