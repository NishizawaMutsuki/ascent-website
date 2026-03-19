type Props = {
  category: string;
  title: string;
};

export default function Breadcrumbs({ category, title }: Props) {
  return (
    <nav className="blog-breadcrumbs" aria-label="パンくずリスト">
      <a href="/hp">トップ</a>
      <span className="blog-breadcrumbs-sep">/</span>
      <a href="/hp/blog">ブログ</a>
      <span className="blog-breadcrumbs-sep">/</span>
      <span className="blog-breadcrumbs-current">{title}</span>
    </nav>
  );
}
