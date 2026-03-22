import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = "https://ascent-web.jp";

const pages = [
  { loc: "/", priority: "1.0", changefreq: "monthly" },
  { loc: "/hp", priority: "1.0", changefreq: "weekly" },
  { loc: "/hp/blog", priority: "0.8", changefreq: "weekly" },
  { loc: "/hp/blog/internal-medicine-hp", priority: "0.7", changefreq: "monthly" },
  { loc: "/hp/blog/dermatology-hp", priority: "0.7", changefreq: "monthly" },
  { loc: "/hp/blog/orthopedics-hp", priority: "0.7", changefreq: "monthly" },
  { loc: "/hp/blog/medical-ad-guideline-2026", priority: "0.7", changefreq: "monthly" },
  { loc: "/hp/blog/clinic-seo-basics", priority: "0.7", changefreq: "monthly" },
  { loc: "/hp/blog/ai-chatbot-clinic", priority: "0.7", changefreq: "monthly" },
  { loc: "/hp/blog/clinic-hp-security-incidents", priority: "0.7", changefreq: "monthly" },
  { loc: "/hp/blog/dermatology-hp-design-tips", priority: "0.7", changefreq: "monthly" },
  { loc: "/privacy", priority: "0.3", changefreq: "yearly" },
  { loc: "/terms", priority: "0.3", changefreq: "yearly" },
  { loc: "/legal", priority: "0.3", changefreq: "yearly" },
  { loc: "/refund", priority: "0.3", changefreq: "yearly" },
];

const today = new Date().toISOString().split("T")[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = resolve(__dirname, "..", "out", "sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`sitemap.xml generated → ${outPath}`);
