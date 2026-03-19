import type { ContentBlock as Block } from "../articles";

function renderInlineText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.includes("\n")) {
      return part.split("\n").map((line, j) => (
        <span key={`${i}-${j}`}>{j > 0 && <br />}{line}</span>
      ));
    }
    return part;
  });
}

export default function ContentBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 id={block.id} className="blog-h2">{block.text}</h2>
      ) : (
        <h3 id={block.id} className="blog-h3">{block.text}</h3>
      );
    case "paragraph":
      return <p className="blog-p">{renderInlineText(block.text)}</p>;
    case "box":
      return (
        <div className={`blog-box blog-box--${block.style}`}>
          {block.title && <p className="blog-box-title">{block.title}</p>}
          <p className="blog-box-text">{renderInlineText(block.text)}</p>
        </div>
      );
    case "list":
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className="blog-list">
          {block.items.map((item, i) => (
            <li key={i}>{renderInlineText(item)}</li>
          ))}
        </Tag>
      );
    case "image":
      return (
        <figure className="blog-figure">
          <img src={block.src} alt={block.alt} loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
  }
}
