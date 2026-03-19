"use client";

import { useEffect, useState } from "react";
import type { ContentBlock } from "../articles";

type Props = {
  blocks: ContentBlock[];
};

export default function TableOfContents({ blocks }: Props) {
  const headings = blocks.filter((b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading");
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="blog-toc" aria-label="目次">
      <p className="blog-toc-label">目次</p>
      <ul className="blog-toc-list">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`blog-toc-item${h.level === 3 ? " blog-toc-item--sub" : ""}${activeId === h.id ? " is-active" : ""}`}
          >
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
