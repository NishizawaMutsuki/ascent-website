"use client";

import { useState } from "react";
import { articles, categories, categoryColors } from "./articles";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function BlogList() {
  const [active, setActive] = useState<string>("すべて");
  const filtered = active === "すべて" ? articles : articles.filter((a) => a.category === active);

  return (
    <>
      <div className="blog-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`blog-filter-btn${active === cat ? " is-active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
            {cat !== "すべて" && (
              <span className="blog-filter-count">
                {articles.filter((a) => a.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="blog-list">
        {filtered.map((article) => {
          const color = categoryColors[article.category] || "var(--accent)";
          return (
            <a key={article.slug} href={`/hp/blog/${article.slug}`} className="blog-card">
              <div className="blog-card-accent" style={{ background: color }} />
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-card-category" style={{ color, background: `${color}14` }}>
                    {article.category}
                  </span>
                  <time className="blog-card-date">{formatDate(article.date)}</time>
                </div>
                <h2 className="blog-card-title">{article.title}</h2>
                <p className="blog-card-summary">{article.summary}</p>
                <span className="blog-card-readmore" style={{ color }}>
                  記事を読む →
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-soft)", padding: "60px 0" }}>
          該当する記事がありません。
        </p>
      )}
    </>
  );
}
