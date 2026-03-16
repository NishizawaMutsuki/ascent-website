import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ascent — 医療機関向けWeb制作 & AI開発",
  description:
    "Ascent（アセント）は、医療機関向けホームページ制作とAIアプリケーション開発を行う事業者です。セキュリティ最優先の静的サイト設計で、月額5,000円〜。",
  metadataBase: new URL("https://ascent-web.jp"),
  openGraph: {
    title: "Ascent — 医療機関向けWeb制作 & AI開発",
    description:
      "テクノロジーで、医療をもっと身近に。セキュリティ最優先の静的サイト設計で、月額5,000円からGoogleに表示される状態を作ります。",
    url: "https://ascent-web.jp",
    siteName: "Ascent",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ascent — 医療機関向けWeb制作 & AI開発",
    description:
      "テクノロジーで、医療をもっと身近に。医療機関向けHP制作とAI開発。",
  },
  alternates: {
    canonical: "https://ascent-web.jp",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ascent",
              url: "https://ascent-web.jp",
              email: "info@ascent-web.jp",
              description:
                "医療機関向けホームページ制作とAIアプリケーション開発",
              foundingDate: "2025",
              founder: [
                {
                  "@type": "Person",
                  name: "Mutsuki Nishizawa",
                  jobTitle: "共同代表 / エンジニア",
                },
                {
                  "@type": "Person",
                  name: "Aoi Tsuzuri",
                  jobTitle: "共同代表 / 営業・事業開発",
                },
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
