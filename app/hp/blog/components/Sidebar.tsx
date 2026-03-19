import type { ContentBlock } from "../articles";
import { articles, categories, categoryColors } from "../articles";
import TableOfContents from "./TableOfContents";

type Props = {
  blocks: ContentBlock[];
  currentSlug: string;
  currentCategory: string;
};

export default function Sidebar({ blocks, currentSlug, currentCategory }: Props) {
  const related = articles
    .filter((a) => a.category === currentCategory && a.slug !== currentSlug)
    .slice(0, 3);

  return (
    <aside className="blog-sidebar">
      <TableOfContents blocks={blocks} />

      {/* CTA */}
      <div className="blog-sidebar-cta">
        <p className="blog-sidebar-cta-label">無料相談受付中</p>
        <p className="blog-sidebar-cta-text">ホームページ制作のお悩み、<br />お気軽にご相談ください。</p>
        <a href="/hp#contact" className="blog-sidebar-cta-btn">無料で相談する</a>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="blog-sidebar-section">
          <p className="blog-sidebar-heading">関連記事</p>
          <ul className="blog-sidebar-articles">
            {related.map((a) => (
              <li key={a.slug}>
                <a href={`/hp/blog/${a.slug}`} className="blog-sidebar-article-link">
                  <span className="blog-sidebar-article-cat" style={{ color: categoryColors[a.category] }}>
                    {a.category}
                  </span>
                  {a.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Categories */}
      <div className="blog-sidebar-section">
        <p className="blog-sidebar-heading">カテゴリ</p>
        <ul className="blog-sidebar-categories">
          {categories.filter((c) => c !== "すべて").map((cat) => (
            <li key={cat}>
              <a href="/hp/blog" className="blog-sidebar-cat-link">
                <span className="blog-sidebar-cat-dot" style={{ background: categoryColors[cat] }} />
                {cat}
                <span className="blog-sidebar-cat-count">{articles.filter((a) => a.category === cat).length}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
