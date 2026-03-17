"use client";

import { useEffect, useRef, useCallback } from "react";

export default function TalkTrainerPage() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

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
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const addRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }, []);

  return (
    <main className="page-container" style={{ paddingTop: "1rem" }}>
      <a href="/" className="back-link">&larr; トップに戻る</a>

      {/* Hero */}
      <section className="tt-hero reveal" ref={addRef}>
        <div className="tt-hero-badge">SaaS — 月額サブスクリプション</div>
        <h1 className="tt-hero-title">Talk Trainer</h1>
        <p className="tt-hero-sub">
          AIコーチがあなたの面接回答をリアルタイムで分析。<br />
          構造・具体性・フレームワーク適合度をスコアリングし、<br />
          面接スキルを効率的に向上させます。
        </p>
        <div className="top-hero-actions" style={{ marginTop: "2rem" }}>
          <a href="#pricing" className="top-btn top-btn-primary">料金プランを見る</a>
        </div>
      </section>

      {/* Method */}
      <section className="section">
        <p className="section-title">Method — メソッド</p>
        <div className="tt-method reveal" ref={addRef}>
          <p>
            Matt Abrahams著「<strong>Think Fast, Talk Smart</strong>」のメソッドに基づいたコーチング。
            即興的な会話力と構造的な回答力の両方を鍛えるフレームワークで、
            面接だけでなくプレゼンテーションや日常のコミュニケーションにも活用できます。
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <p className="section-title">Features — 機能</p>
        <div className="tt-features-grid">
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                  <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
                </svg>
              ),
              title: "音声認識",
              desc: "ブラウザ上でリアルタイムに音声を認識。マイクに向かって話すだけで、回答がテキスト化されます。",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="15" cy="9" r="1.5" fill="currentColor" stroke="none" />
                  <path d="M9 15c1 1.5 5 1.5 6 0" />
                </svg>
              ),
              title: "AI分析",
              desc: "大規模言語モデルが回答の構造・具体性・論理性を多角的に評価。改善ポイントを明確に提示します。",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              ),
              title: "フレームワーク評価",
              desc: "STAR法・PREP法などのフレームワークに沿った回答ができているかを自動で判定・スコアリング。",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              ),
              title: "1分チャレンジ",
              desc: "制限時間1分で簡潔に要点を伝える練習モード。プレゼンや面接での端的な回答力を鍛えます。",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              ),
              title: "深掘り練習",
              desc: "AIが面接官として追加質問を投げかけ、深掘りに対応する力を養います。実践さながらの練習が可能。",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              ),
              title: "詳細レポート",
              desc: "練習ごとにスコアと改善アドバイスをレポート化。成長の推移を可視化できます。",
            },
          ].map((f, i) => (
            <div className="tt-feature-card reveal" key={i} ref={addRef} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="svc-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <p className="section-title">How it works — 使い方</p>
        <div className="tt-steps">
          {[
            { step: "01", title: "質問を選ぶ", desc: "業界・職種に合わせた質問リストから選択、またはカスタム質問を入力。" },
            { step: "02", title: "声で回答する", desc: "マイクに向かって回答。リアルタイムで音声認識されテキスト化。" },
            { step: "03", title: "AIが分析", desc: "構造・具体性・フレームワーク適合度をスコアリング。改善点を提示。" },
            { step: "04", title: "深掘り＆改善", desc: "AIの追加質問に答え、フィードバックを元に繰り返し練習。" },
          ].map((s, i) => (
            <div className="tt-step reveal" key={i} ref={addRef} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="tt-step-number">{s.step}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section">
        <p className="section-title">Pricing — 料金プラン</p>
        <div className="tt-pricing-grid">
          <div className="tt-pricing-card reveal" ref={addRef}>
            <div className="tt-pricing-name">Free</div>
            <div className="tt-pricing-price">
              <span className="tt-price-amount">¥0</span>
            </div>
            <ul className="tt-pricing-features">
              <li>月10回まで練習可能</li>
              <li>基本的なAI分析</li>
              <li>フレームワーク評価</li>
              <li>1分チャレンジ</li>
            </ul>
            <a href="#" className="top-btn top-btn-ghost" style={{ width: "100%", justifyContent: "center" }}>無料で始める</a>
          </div>

          <div className="tt-pricing-card tt-pricing-featured reveal" ref={addRef} style={{ animationDelay: "120ms" }}>
            <div className="tt-pricing-badge">おすすめ</div>
            <div className="tt-pricing-name">Pro</div>
            <div className="tt-pricing-price">
              <span className="tt-price-amount">¥990</span>
              <span className="tt-price-period">/ 月（税込）</span>
            </div>
            <ul className="tt-pricing-features">
              <li>無制限の練習</li>
              <li>高精度AIモデルによる詳細分析</li>
              <li>深掘り練習モード</li>
              <li>詳細レポート＆成長記録</li>
              <li>カスタム質問の作成</li>
              <li>優先サポート</li>
            </ul>
            <a href="#" className="top-btn top-btn-primary" style={{ width: "100%", justifyContent: "center" }}>Pro を始める</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section reveal" ref={addRef}>
        <div className="cta-box">
          <h3>まずは無料プランで試してみませんか？</h3>
          <p>アカウント登録不要。ブラウザを開いてすぐに練習を始められます。</p>
          <a href="#" className="top-btn top-btn-primary">無料で練習を始める</a>
        </div>
      </div>
    </main>
  );
}
