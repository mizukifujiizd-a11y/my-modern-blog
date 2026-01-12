import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google"; // 高級感のあるセリフ体フォント
import "./globals.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// フォントの設定（日本語に対応させるため、太さを指定）
const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "My Tech Blog",
  description: "Next.jsとM4 Macで作成したブログです",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={serif.className}>
        {/* 全ページ共通のヘッダー：Wix風のデザイン */}
        <nav className="border-b py-8 text-center bg-white sticky top-0 z-50">
          <div className="flex justify-center gap-10 text-xs uppercase tracking-[0.2em] font-medium text-gray-600">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <Link href="/about" className="hover:text-black transition-colors">About</Link>
            <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
          </div>
        </nav>

        {/* 各ページの内容が表示される部分 */}
        {children}

        {/* 全ページ共通のフッター */}
        <footer className="border-t py-16 text-center mt-20 bg-gray-50">
          <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">
            © 2026 MY BLOG. PROUDLY CREATED WITH NEXT.JS
          </p>
        </footer>
        {/* 2. 追加：計測用コンポーネント（footerの下に配置） */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}