import type { Metadata } from "next";
import "./hp.css";

export const metadata: Metadata = {
  title: "アセント | クリニック・病院向けホームページ制作 / 改善サービス",
  description:
    "アセントは、開業医・クリニック・小規模病院向けのホームページ制作 / 改善サービスです。スマホ対応、SEO基本改善、導線設計、表示速度、信頼感のあるデザインまで丁寧に見直します。",
  openGraph: {
    type: "website",
    title: "アセント | クリニック・病院向けホームページ制作 / 改善サービス",
    description:
      "医療機関向けに、見やすさ・信頼感・お問い合わせ導線を整えるホームページ制作 / 改善サービス。",
  },
};

export default function HpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
