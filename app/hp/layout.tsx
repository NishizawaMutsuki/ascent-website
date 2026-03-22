import type { Metadata } from "next";
import "./hp.css";

export const metadata: Metadata = {
  title: "アセント | クリニック・病院向けホームページ制作 / 改善サービス",
  description:
    "アセントは、開業医・クリニック・小規模病院向けのホームページ制作 / 改善サービスです。スマホ対応、SEO基本改善、導線設計、表示速度、信頼感のあるデザインまで丁寧に見直します。",
  alternates: {
    canonical: "https://ascent-web.jp/hp",
  },
  openGraph: {
    type: "website",
    title: "アセント | クリニック・病院向けホームページ制作 / 改善サービス",
    description:
      "医療機関向けに、見やすさ・信頼感・お問い合わせ導線を整えるホームページ制作 / 改善サービス。",
    images: [
      {
        url: "https://ascent-web.jp/images/og-default.svg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "アセント",
            url: "https://ascent-web.jp/hp",
            description:
              "開業医・クリニック向けホームページ制作サービス。セキュリティ最優先の静的サイト設計。",
            priceRange: "月額6,000円〜",
            areaServed: { "@type": "Country", name: "JP" },
            serviceType: "ホームページ制作",
            provider: {
              "@type": "Organization",
              name: "Ascent",
              url: "https://ascent-web.jp",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
