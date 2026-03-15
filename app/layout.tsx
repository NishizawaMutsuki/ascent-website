import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ascent — AI & Web Solutions",
  description: "Ascent（アセント）は、AI技術を活用したソフトウェア開発と、開業医向けウェブサイト制作・運用を行う個人事業です。",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
