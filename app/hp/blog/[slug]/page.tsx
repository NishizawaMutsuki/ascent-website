import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, categoryColors } from "../articles";
import ContentBlock from "../components/ContentBlock";
import Breadcrumbs from "../components/Breadcrumbs";
import Sidebar from "../components/Sidebar";
import AuthorProfile from "../components/AuthorProfile";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | アセント ブログ`,
    description: article.summary,
    alternates: {
      canonical: `https://ascent-web.jp/hp/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
    },
  };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const color = categoryColors[article.category] || "var(--accent)";
  const related = articles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3);

  return (
    <div className="lp-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.summary,
            datePublished: article.date,
            author: { "@type": "Organization", name: "アセント" },
            publisher: {
              "@type": "Organization",
              name: "アセント",
              url: "https://ascent-web.jp",
            },
          }),
        }}
      />
      <Breadcrumbs category={article.category} title={article.title} />

      {/* Article header */}
      <div className="blog-article-header">
        <div className="blog-article-header-meta">
          <span className="blog-card-category" style={{ color, background: `${color}14` }}>
            {article.category}
          </span>
          <time className="blog-card-date">{formatDate(article.date)}</time>
        </div>
        <h1 className="blog-article-title">{article.title}</h1>
        <p className="blog-article-summary">{article.summary}</p>
      </div>

      {/* 2-column layout */}
      <div className="blog-article-layout">
        <article className="blog-article-main">
          {article.body.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}

          {/* Author */}
          <AuthorProfile />

          {/* CTA */}
          <div className="blog-article-cta">
            <p className="blog-article-cta-title">ホームページ制作のご相談はアセントへ</p>
            <p className="blog-article-cta-text">セキュリティ最優先の静的サイト設計。月額6,000円から制作・運用します。</p>
            <a href="/hp#contact" className="blog-article-cta-btn">無料で相談する</a>
          </div>
        </article>

        <Sidebar blocks={article.body} currentSlug={article.slug} currentCategory={article.category} />
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="blog-related">
          <h2 className="blog-related-heading">関連記事</h2>
          <div className="blog-related-grid">
            {related.map((a) => {
              const c = categoryColors[a.category] || "var(--accent)";
              return (
                <a key={a.slug} href={`/hp/blog/${a.slug}`} className="blog-related-card">
                  <span className="blog-card-category" style={{ color: c, background: `${c}14` }}>
                    {a.category}
                  </span>
                  <h3>{a.title}</h3>
                  <p>{a.summary}</p>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
