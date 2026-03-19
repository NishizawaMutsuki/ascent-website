import type { Metadata } from "next";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "ブログ | アセント — 開業医専門ホームページ制作",
  description:
    "内科・皮膚科・整形外科など診療科別のホームページ制作ポイントや、集患・SEO・医療広告ガイドラインの最新情報をお届けします。",
};

export default function BlogPage() {
  return (
    <>
      <section className="blog-hero">
        <div className="lp-container">
          <p className="blog-hero-label">BLOG</p>
          <h1 className="blog-hero-title">
            医院ホームページ制作の<br className="sp-only" />知識とヒント
          </h1>
          <p className="blog-hero-lead">
            診療科ごとの制作ポイント、医療広告ガイドライン対応、SEO・集患のコツなど、<br className="pc-only" />
            開業医の先生に役立つ情報を発信しています。
          </p>
        </div>
      </section>

      <section className="lp-section blog-section">
        <div className="lp-container">
          <BlogList />
        </div>
      </section>
    </>
  );
}
