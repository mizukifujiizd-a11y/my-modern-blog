---
title: "Vercel Analyticsを有効にする作業"
date: "2026-01-12"
excerpt: "Vercel Analyticsを有効にするためにやっとことをメモしておきます。"
image: "https://unsplash.com/ja/%E5%86%99%E7%9C%9F/%E3%83%99%E3%83%83%E3%83%89%E3%81%AE%E4%B8%8A%E3%81%AB%E5%BA%A7%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%83%A9%E3%83%83%E3%83%97%E3%83%88%E3%83%83%E3%83%97%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%82%BF-qkeiNu2s_-E"
---

## 1. Vercelダッシュボードでの有効化
まずはブラウザでVercelのプロジェクトページを開きます。
・プロジェクトのトップタブにある 「Analytics」 をクリックします。
・「Enable」 ボタンを押して、プラン（まずはFreeのHobbyプランでOK）を選択して有効化します。
・同様に 「Speed Insights」 タブも有効にしておくと、より詳細なパフォーマンス分析が可能になります。

## 2. プロジェクトへのパッケージ導入
次に、コード側でデータを送信するための設定を行います。ターミナルで以下のコマンドを実行してください。

```bash
# npmの場合
npm install @vercel/analytics @vercel/speed-insights

# yarnの場合
yarn add @vercel/analytics @vercel/speed-insights
```
## 3. コードへの追記
Next.jsの場合、layout.tsx（または _app.tsx）にコンポーネントを追加するだけで完了です。これにより、全ページのデータを計測できるようになります。

### App Routerの場合 (app/layout.tsx):
```bash
TypeScript

import { Analytics } from '@vercel/analytics/react';
import { Speed_Insights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        {/* コンポーネントを配置するだけで計測が始まります */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## 4. 変更を保存してコミットする
VS Codeなどのターミナルで、以下のコマンドを順番に実行します。

```bash

# 1. 変更したファイルをステージング（準備）する
git add .

# 2. メッセージを付けて保存を確定させる
git commit -m "Add Vercel Analytics and Speed Insights"

# 3. GitHubに送信する
git push origin main
※ main の部分は、お使いの環境によっては master の場合があります。
```