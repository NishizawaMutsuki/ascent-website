"use client";

import { useEffect, useRef } from "react";
import "./demos.css";

function DemoFrame({ url, title }: { url: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scale = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const iframe = containerRef.current.querySelector("iframe");
      if (iframe) {
        iframe.style.transform = `scale(${w / 1280})`;
        iframe.style.transformOrigin = "top left";
        iframe.style.width = "1280px";
        iframe.style.height = "800px";
        containerRef.current.style.height = `${(800 * w) / 1280}px`;
      }
    };
    scale();
    window.addEventListener("resize", scale);
    return () => window.removeEventListener("resize", scale);
  }, [url]);

  return (
    <div className="demo-card">
      <div className="demo-browser">
        <div className="demo-browser-bar">
          <div className="demo-dots"><span /><span /><span /></div>
          <div className="demo-url">{url.replace("https://", "")}</div>
        </div>
        <div className="demo-screen" ref={containerRef}>
          <iframe src={url} title={title} loading="lazy" />
        </div>
      </div>
      <div className="demo-meta">
        <h3>{title}</h3>
        <a href={url} target="_blank" rel="noopener noreferrer" className="demo-link">
          別タブで開く →
        </a>
      </div>
    </div>
  );
}

type PlanSection = {
  plan: string;
  price: string;
  description: string;
  demos: { url: string; title: string }[];
};

const sections: PlanSection[] = [
  {
    plan: "Premium",
    price: "月額18,000円",
    description: "10〜15ページ構成。AIチャットbot・WEB予約・MEO運用・写真撮影・ロゴ制作込み。AX（AIトランスフォーメーション）完全対応。",
    demos: [
      { url: "https://demo-premium.ascent-web.jp", title: "プレミアム デモ A" },
      { url: "https://demo-premium.ascent-web.jp", title: "プレミアム デモ B" },
      { url: "https://demo-premium.ascent-web.jp", title: "プレミアム デモ C" },
    ],
  },
  {
    plan: "Standard",
    price: "月額12,000円",
    description: "5〜7ページ構成。診療科別ページ・医師紹介・アクセス情報を揃えた本格サイト。",
    demos: [
      { url: "https://demo-standard.ascent-web.jp", title: "スタンダード デモ A" },
      { url: "https://demo-standard.ascent-web.jp", title: "スタンダード デモ B" },
      { url: "https://demo-standard.ascent-web.jp", title: "スタンダード デモ C" },
    ],
  },
  {
    plan: "Lite",
    price: "月額6,000円",
    description: "1ページ完結型。スマホ最適化・基本SEO・問い合わせ導線を備えたシンプルなLP。",
    demos: [
      { url: "https://demo-light.ascent-web.jp", title: "ライト デモ A" },
      { url: "https://demo-light.ascent-web.jp", title: "ライト デモ B" },
      { url: "https://demo-light.ascent-web.jp", title: "ライト デモ C" },
    ],
  },
];

export default function DemosPage() {
  return (
    <div className="demos-page">
      <div className="demos-hero">
        <p className="demos-eyebrow">DEMO GALLERY</p>
        <h1>制作デモ一覧</h1>
        <p className="demos-lead">
          各プランの制作イメージをご覧いただけます。<br />
          すべてスマホ対応・セキュリティ対策済みの静的サイトです。
        </p>
      </div>

      {sections.map((section) => (
        <section key={section.plan} className="demos-section">
          <div className="demos-section-header">
            <div>
              <h2>{section.plan}</h2>
              <span className="demos-price">{section.price}</span>
            </div>
            <p>{section.description}</p>
          </div>
          <div className="demos-grid">
            {section.demos.map((demo, i) => (
              <DemoFrame key={i} url={demo.url} title={demo.title} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
